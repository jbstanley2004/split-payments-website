"use client";

import { ApplicationStatus, Message, DocumentType } from "@/types/portal";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Bell, Send, Shield, FileText, Loader2, Trash2, User, ChevronDown, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface AccountDetailProps {
    account: ApplicationStatus;
    onBack: () => void;
    onUpdate: (account: ApplicationStatus) => void;
}

export default function AccountDetail({ account, onBack, onUpdate }: AccountDetailProps) {
    const [notificationText, setNotificationText] = useState("");
    const [actionType, setActionType] = useState<'update' | 'action_required'>('update');
    const [isUpdating, setIsUpdating] = useState(false);
    const supabase = createClient();

    // Local state for profile edits
    const [localAccount, setLocalAccount] = useState<ApplicationStatus>(account);
    const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
        'business-identity': false,
        'contact-location': true,
        'financial-information': true,
        'equipment-information': true,
        'owner-information': true
    });
    const [securityForm, setSecurityForm] = useState({ email: '', password: '' });

    // Import server action
    const { updateUserCredentials } = require('@/actions/admin-auth');

    const handleUpdateCredentials = async () => {
        if (!confirm("Are you sure? This will change the user's login method to Email/Password.")) return;

        setIsUpdating(true);
        try {
            const result = await updateUserCredentials((account as any).id, securityForm.email, securityForm.password);

            if (result.success) {
                alert("Credentials updated successfully. The user can now log in with the new email and password.");
                setSecurityForm({ email: '', password: '' });
                // Optionally update local state if email changed
                if (securityForm.email !== account.businessInfo.email) {
                    // Update email in DB application record as well?
                    // The server action only updates Auth User.
                    // Ideally we should sync specific application fields if they are just copies of auth email.
                    // But businessInfo.email might be different.
                }
            } else {
                alert("Failed to update credentials: " + result.error);
            }
        } catch (e) {
            console.error("Error updating credentials:", e);
            alert("An error occurred.");
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        setLocalAccount(account);
    }, [account]);

    // Mark messages as read when viewing the account
    useEffect(() => {
        const markMessagesAsRead = async () => {
            if (!account.messages) return;
            const unreadMessages = account.messages.filter(m => !m.read && m.sender === 'merchant');
            if (unreadMessages.length > 0) {
                try {
                    const updatedMessages = account.messages.map(msg =>
                        (msg.sender === 'merchant' && !msg.read) ? { ...msg, read: true } : msg
                    );

                    const id = (account as any).id;
                    if (id) {
                        // Update with full replacement of messages array
                        const { error } = await supabase.from('applications')
                            .update({ messages: updatedMessages })
                            .eq('id', id);

                        if (error) console.error("Error marking messages read:", error);
                    }
                } catch (e) {
                    console.error("Error marking messages as read:", e);
                }
            }
        };
        markMessagesAsRead();
    }, [account.messages]);

    const getMessageDate = (timestamp: any): Date => {
        if (!timestamp) return new Date();
        if (timestamp instanceof Date) return timestamp;
        if (typeof timestamp === 'object' && 'seconds' in timestamp) {
            return new Date(timestamp.seconds * 1000);
        }
        return new Date(timestamp);
    };

    const visibleMessages = (account.messages || [])
        .filter(m => !m.isDeleted)
        .sort((a, b) => getMessageDate(b.timestamp).getTime() - getMessageDate(a.timestamp).getTime());

    const handleStatusChange = async (newStage: ApplicationStatus['stage']) => {
        setIsUpdating(true);
        try {
            const id = (account as any).id;
            if (id) {
                await supabase.from('applications').update({ stage: newStage }).eq('id', id);
                onUpdate({ ...account, stage: newStage });
            }
        } catch (e) {
            console.error("Error updating status:", e);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleSendNotification = async () => {
        if (!notificationText) return;
        setIsUpdating(true);

        const newMessage: Message = {
            id: Date.now().toString(),
            subject: actionType === 'action_required' ? 'Action Required' : 'Status Update',
            body: notificationText,
            timestamp: new Date(),
            read: false,
            category: actionType === 'action_required' ? 'action_required' : 'general',
            actionUrl: actionType === 'action_required' ? '/portal/dashboard?section=profile' : undefined,
            sender: 'admin'
        };

        // Sanitize object to remove undefined values for Postgres
        const sanitizedMessage = JSON.parse(JSON.stringify(newMessage));

        try {
            const id = (account as any).id;
            if (id) {
                // Fetch latest messages to ensure we don't overwrite concurrent?
                // For simplicity in migration, append to current prop account.messages
                const updatedMessages = [...(account.messages || []), sanitizedMessage];

                await supabase.from('applications')
                    .update({ messages: updatedMessages })
                    .eq('id', id);

                onUpdate({
                    ...account,
                    messages: [newMessage, ...(account.messages || [])] // Prepend for local UI if needed or append?
                    // Actually original code did `arrayUnion`.
                    // And `visibleMessages` sorts by date.
                    // Local `onUpdate` should match.
                });

                setNotificationText("");
            }
        } catch (e) {
            console.error("Error sending notification:", e);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteMessage = async (messageId: string) => {
        try {
            const id = (account as any).id;
            if (id) {
                const updatedMessages = (account.messages || []).map(msg =>
                    msg.id === messageId ? { ...msg, isDeleted: true } : msg
                );
                await supabase.from('applications').update({ messages: updatedMessages }).eq('id', id);
                onUpdate({ ...account, messages: updatedMessages });
            }
        } catch (e) {
            console.error("Error deleting message:", e);
        }
    };

    const handleDeleteAccount = async () => {
        if (confirm("Are you sure you want to delete this account? This action cannot be undone.")) {
            setIsUpdating(true);
            try {
                const id = (account as any).id;
                if (id) {
                    await supabase.from('applications').delete().eq('id', id);
                    onBack();
                }
            } catch (e) {
                console.error("Error deleting account:", e);
                setIsUpdating(false);
            }
        }
    };

    const handleSaveSection = async (sectionId: string, data: any) => {
        setIsUpdating(true);
        try {
            const id = (account as any).id;
            if (id) {
                // Map camel keys to snake keys for DB update
                const updates: any = {};
                // We assume data contains one root key like businessInfo, contactInfo, etc.
                if (data.businessInfo) updates.business_info = data.businessInfo;
                if (data.contactInfo) updates.contact_info = data.contactInfo;
                if (data.ownerInfo) updates.owner_info = data.ownerInfo;
                if (data.equipmentInfo) updates.equipment_info = data.equipmentInfo;

                // Sanitize
                const sanitizedData = JSON.parse(JSON.stringify(updates));

                await supabase.from('applications').update(sanitizedData).eq('id', id);
                onUpdate({ ...account, ...data });

                // Show simple feedback
                const btn = document.getElementById(`save-${sectionId}`);
                if (btn) {
                    btn.classList.add('bg-green-600');
                    btn.innerHTML = '<span class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Saved</span>';
                    setTimeout(() => {
                        btn.classList.remove('bg-green-600');
                        btn.innerHTML = '<span class="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Save</span>';
                    }, 2000);
                }
            }
        } catch (e) {
            console.error("Error saving section:", e);
        } finally {
            setIsUpdating(false);
        }
    };

    // Sub-component for editable fields
    const EditableField = ({ label, value, onChange, type = "text", placeholder = "" }: any) => (
        <div className="mb-4">
            <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">{label}</label>
            <input
                type={type}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all font-poppins"
                placeholder={placeholder}
            />
        </div>
    );

    // Section Renderer
    const renderSection = (id: string, title: string, content: React.ReactNode) => (
        <div className="bg-white rounded-[40px] p-8 shadow-sm border border-black/5 mb-6">
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setCollapsedSections(prev => ({ ...prev, [id]: !prev[id] }))}
            >
                <h3 className="text-xl font-bold text-black font-poppins">{title}</h3>
                <ChevronDown className={`w-5 h-5 transition-transform ${collapsedSections[id] ? '' : 'rotate-180'}`} />
            </div>

            <AnimatePresence>
                {!collapsedSections[id] && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-8 space-y-6">
                            {content}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    // Document Helper
    const renderDocuments = (type: DocumentType) => {
        const docs = account.documents?.filter(d => d.type === type) || [];
        if (docs.length === 0) return <div className="text-sm text-black/30 italic">No documents uploaded</div>;

        return (
            <div className="space-y-2 mt-2">
                {docs.map(doc => (
                    <a
                        key={doc.id}
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl bg-[#F6F5F4] hover:bg-black/5 transition-colors group"
                    >
                        <FileText className="w-4 h-4 text-black/40 group-hover:text-black" />
                        <span className="text-sm font-medium text-black underline decoration-black/20 group-hover:decoration-black">{doc.filename}</span>
                        <span className="text-xs text-black/30 ml-auto">{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                    </a>
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-black/50 hover:text-black transition-colors font-poppins font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Accounts</span>
                </button>

                <button
                    onClick={handleDeleteAccount}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors font-poppins font-medium px-4 py-2 hover:bg-red-50 rounded-full"
                >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Account</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Profile Sections */}
                <div className="lg:col-span-2">
                    {/* Business Identity */}
                    {renderSection('business-identity', 'Business Identity', (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <EditableField
                                    label="Legal Name"
                                    value={localAccount.businessInfo.businessName}
                                    onChange={(v: string) => setLocalAccount(prev => ({ ...prev, businessInfo: { ...prev.businessInfo, businessName: v } }))}
                                />
                                <EditableField
                                    label="DBA"
                                    value={localAccount.businessInfo.dba}
                                    onChange={(v: string) => setLocalAccount(prev => ({ ...prev, businessInfo: { ...prev.businessInfo, dba: v } }))}
                                />
                                <EditableField
                                    label="Industry"
                                    value={localAccount.businessInfo.industry}
                                    onChange={(v: string) => setLocalAccount(prev => ({ ...prev, businessInfo: { ...prev.businessInfo, industry: v } }))}
                                />
                                <EditableField
                                    label="EIN"
                                    value={localAccount.businessInfo.ein}
                                    onChange={(v: string) => setLocalAccount(prev => ({ ...prev, businessInfo: { ...prev.businessInfo, ein: v } }))}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Documents</label>
                                {renderDocuments('voided_check')}
                            </div>
                            <div className="flex justify-end pt-4">
                                <button
                                    id="save-business-identity"
                                    onClick={() => handleSaveSection('business-identity', { businessInfo: localAccount.businessInfo })}
                                    className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all duration-300"
                                >
                                    <Save className="w-4 h-4" /> Save
                                </button>
                            </div>
                        </>
                    ))}

                    {/* Contact & Location */}
                    {renderSection('contact-location', 'Contact & Location', (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <EditableField
                                        label="Physical Address"
                                        value={localAccount.contactInfo?.physicalAddress}
                                        onChange={(v: string) => setLocalAccount(prev => ({ ...prev, contactInfo: { ...prev.contactInfo!, physicalAddress: v } }))}
                                    />
                                </div>
                                <EditableField
                                    label="Email"
                                    value={localAccount.contactInfo?.email || localAccount.businessInfo.email}
                                    onChange={(v: string) => setLocalAccount(prev => ({ ...prev, contactInfo: { ...prev.contactInfo!, email: v } }))}
                                />
                                <EditableField
                                    label="Phone"
                                    value={localAccount.contactInfo?.businessPhone}
                                    onChange={(v: string) => setLocalAccount(prev => ({ ...prev, contactInfo: { ...prev.contactInfo!, businessPhone: v } }))}
                                />
                            </div>
                            <div className="flex justify-end pt-4">
                                <button
                                    id="save-contact-location"
                                    onClick={() => handleSaveSection('contact-location', { contactInfo: localAccount.contactInfo })}
                                    className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all duration-300"
                                >
                                    <Save className="w-4 h-4" /> Save
                                </button>
                            </div>
                        </>
                    ))}

                    {/* Financial Information */}
                    {renderSection('financial-information', 'Financial Information', (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <EditableField
                                    label="Monthly Revenue"
                                    value={localAccount.businessInfo.monthlyRevenue}
                                    onChange={(v: string) => setLocalAccount(prev => ({ ...prev, businessInfo: { ...prev.businessInfo, monthlyRevenue: Number(v) } }))}
                                    type="number"
                                />
                                <EditableField
                                    label="Annual Revenue"
                                    value={localAccount.businessInfo.annualRevenue}
                                    onChange={(v: string) => setLocalAccount(prev => ({ ...prev, businessInfo: { ...prev.businessInfo, annualRevenue: Number(v) } }))}
                                    type="number"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Documents</label>
                                {renderDocuments('merchant_statements')}
                            </div>
                            <div className="flex justify-end pt-4">
                                <button
                                    id="save-financial-information"
                                    onClick={() => handleSaveSection('financial-information', { businessInfo: localAccount.businessInfo })}
                                    className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all duration-300"
                                >
                                    <Save className="w-4 h-4" /> Save
                                </button>
                            </div>
                        </>
                    ))}

                    {/* Equipment Information */}
                    {renderSection('equipment-information', 'Equipment Information', (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <EditableField
                                    label="Make"
                                    value={localAccount.equipmentInfo?.make}
                                    onChange={(v: string) => setLocalAccount(prev => ({ ...prev, equipmentInfo: { ...prev.equipmentInfo!, make: v } }))}
                                />
                                <EditableField
                                    label="Model"
                                    value={localAccount.equipmentInfo?.model}
                                    onChange={(v: string) => setLocalAccount(prev => ({ ...prev, equipmentInfo: { ...prev.equipmentInfo!, model: v } }))}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Documents</label>
                                {renderDocuments('equipment_photo')}
                            </div>
                            <div className="flex justify-end pt-4">
                                <button
                                    id="save-equipment-information"
                                    onClick={() => handleSaveSection('equipment-information', { equipmentInfo: localAccount.equipmentInfo })}
                                    className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all duration-300"
                                >
                                    <Save className="w-4 h-4" /> Save
                                </button>
                            </div>
                        </>
                    ))}

                    {/* Owner Information */}
                    {renderSection('owner-information', 'Owner Information', (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <EditableField
                                    label="Full Name"
                                    value={localAccount.ownerInfo?.fullName}
                                    onChange={(v: string) => setLocalAccount(prev => ({ ...prev, ownerInfo: { ...prev.ownerInfo!, fullName: v } }))}
                                />
                                <EditableField
                                    label="Title"
                                    value={localAccount.ownerInfo?.title}
                                    onChange={(v: string) => setLocalAccount(prev => ({ ...prev, ownerInfo: { ...prev.ownerInfo!, title: v } }))}
                                />
                                <EditableField
                                    label="SSN"
                                    value={localAccount.ownerInfo?.ssn}
                                    onChange={(v: string) => setLocalAccount(prev => ({ ...prev, ownerInfo: { ...prev.ownerInfo!, ssn: v } }))}
                                />
                                <EditableField
                                    label="Cell Phone"
                                    value={localAccount.ownerInfo?.cellPhone}
                                    onChange={(v: string) => setLocalAccount(prev => ({ ...prev, ownerInfo: { ...prev.ownerInfo!, cellPhone: v } }))}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Documents</label>
                                {renderDocuments('photo_id')}
                            </div>
                            <div className="flex justify-end pt-4">
                                <button
                                    id="save-owner-information"
                                    onClick={() => handleSaveSection('owner-information', { ownerInfo: localAccount.ownerInfo })}
                                    className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all duration-300"
                                >
                                    <Save className="w-4 h-4" /> Save
                                </button>
                            </div>
                        </>
                    ))}
                </div>

                {/* Right Column: Actions & History */}
                <div className="space-y-8">
                    {/* Status Control */}
                    <div className="bg-black text-white rounded-[40px] p-8 shadow-xl relative overflow-hidden">
                        {isUpdating && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                <Loader2 className="w-6 h-6 animate-spin text-white" />
                            </div>
                        )}
                        <h3 className="text-xl font-bold font-poppins mb-6">Application Status</h3>

                        <div className="space-y-2">
                            {['pending_documents', 'in_review', 'final_review', 'funded'].map((stage) => (
                                <button
                                    key={stage}
                                    onClick={() => handleStatusChange(stage as any)}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${account.stage === stage
                                        ? 'bg-white text-black font-bold'
                                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                                        }`}
                                >
                                    <span className="capitalize font-poppins">{stage.replace('_', ' ')}</span>
                                    {account.stage === stage && <Check className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notification Manager */}
                    <div className="bg-white rounded-[40px] p-8 shadow-sm border border-black/5 relative overflow-hidden">
                        {isUpdating && (
                            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                                <Loader2 className="w-6 h-6 animate-spin text-black" />
                            </div>
                        )}
                        <h3 className="text-xl font-bold text-black font-poppins mb-6">Notify Client</h3>

                        <div className="flex gap-2 mb-4 bg-[#F6F5F4] p-1 rounded-full">
                            <button
                                onClick={() => setActionType('update')}
                                className={`flex-1 py-2 rounded-full text-sm font-bold transition-all font-poppins ${actionType === 'update' ? 'bg-black text-white shadow-md' : 'text-black/50 hover:text-black'
                                    }`}
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setActionType('action_required')}
                                className={`flex-1 py-2 rounded-full text-sm font-bold transition-all font-poppins ${actionType === 'action_required' ? 'bg-[#FF4306] text-white shadow-md' : 'text-black/50 hover:text-black'
                                    }`}
                            >
                                Action Req.
                            </button>
                        </div>

                        <textarea
                            value={notificationText}
                            onChange={(e) => setNotificationText(e.target.value)}
                            placeholder={actionType === 'update' ? "Send a status update..." : "Describe the action required..."}
                            className="w-full h-32 p-4 rounded-2xl bg-[#F6F5F4] border-none focus:ring-2 focus:ring-black/5 resize-none font-lora mb-4 text-sm"
                        />

                        <button
                            onClick={handleSendNotification}
                            disabled={!notificationText}
                            className="w-full py-4 rounded-full bg-black text-white font-bold font-poppins hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                        >
                            <Send className="w-4 h-4" />
                            <span>Send Notification</span>
                        </button>
                    </div>

                    {/* Account Security */}
                    <div className="bg-white rounded-[40px] p-8 shadow-sm border border-black/5">
                        <h3 className="text-xl font-bold text-black font-poppins mb-6">Account Security</h3>
                        <p className="text-sm text-black/60 font-lora mb-6">
                            Update the client's login credentials. This will convert Google accounts to email/password login.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">New Email</label>
                                <input
                                    type="email"
                                    value={securityForm.email}
                                    onChange={(e) => setSecurityForm(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all font-poppins"
                                    placeholder="client@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={securityForm.password}
                                    onChange={(e) => setSecurityForm(prev => ({ ...prev, password: e.target.value }))}
                                    className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all font-poppins"
                                    placeholder="Min. 6 characters"
                                />
                            </div>

                            <button
                                onClick={handleUpdateCredentials}
                                disabled={isUpdating || !securityForm.email || !securityForm.password}
                                className="w-full py-3 rounded-full bg-black text-white font-bold font-poppins hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                <Shield className="w-4 h-4" />
                                <span>Update Credentials</span>
                            </button>
                        </div>
                    </div>

                    {/* Message History */}
                    <div className="bg-white rounded-[40px] p-8 shadow-sm border border-black/5">
                        <h3 className="text-xl font-bold text-black font-poppins mb-6">Message History</h3>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {visibleMessages.length === 0 ? (
                                <div className="text-center py-8 text-black/40 font-lora italic">
                                    No messages yet.
                                </div>
                            ) : (
                                visibleMessages.map(msg => (
                                    <div
                                        key={msg.id}
                                        className={`p-6 rounded-3xl border ${msg.sender === 'merchant'
                                            ? 'bg-[#F6F5F4] border-black/5 ml-8'
                                            : 'bg-white border-black/10 mr-8'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div className="flex items-center gap-2">
                                                {msg.sender === 'merchant' ? (
                                                    <div className="p-1.5 bg-black text-white rounded-full">
                                                        <User className="w-3 h-3" />
                                                    </div>
                                                ) : (
                                                    <div className="p-1.5 bg-black/5 text-black/60 rounded-full">
                                                        <Shield className="w-3 h-3" />
                                                    </div>
                                                )}
                                                <span className="text-sm font-bold font-poppins">
                                                    {msg.sender === 'merchant' ? 'Client' : 'Admin'}
                                                </span>
                                                <span className="text-xs text-black/40 font-poppins uppercase tracking-wider">
                                                    {getMessageDate(msg.timestamp).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteMessage(msg.id)}
                                                className="text-black/20 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="font-bold text-sm mb-1">{msg.subject}</div>
                                        <p className="text-black/70 font-lora text-sm whitespace-pre-wrap">{msg.body}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}