"use client";

import { ApplicationStatus, Message } from "@/types/portal";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Bell, Send, Shield, FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { doc, updateDoc, arrayUnion, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface AccountDetailProps {
    account: ApplicationStatus;
    onBack: () => void;
    onUpdate: (account: ApplicationStatus) => void; // Keep for optimistic UI updates if needed, though Firestore listener in parent handles it
}

export default function AccountDetail({ account, onBack, onUpdate }: AccountDetailProps) {
    const [notificationText, setNotificationText] = useState("");
    const [actionType, setActionType] = useState<'update' | 'action_required'>('update');
    const [isUpdating, setIsUpdating] = useState(false);

    // Helper to find the doc ID (since we store it by UID, we need to query or pass UID)
    // For this prototype, we'll assume we can query by email if we don't have the UID handy,
    // OR better: we update AccountList to pass the full document including ID.
    // For now, let's query by email to be safe since we didn't add ID to the type yet.
    const getAccountRef = async () => {
        const q = query(collection(db, "applications"), where("businessInfo.email", "==", account.businessInfo.email));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;
        return doc(db, "applications", snapshot.docs[0].id);
    };

    const handleStatusChange = async (newStage: ApplicationStatus['stage']) => {
        setIsUpdating(true);
        try {
            const ref = await getAccountRef();
            if (ref) {
                await updateDoc(ref, { stage: newStage });
                // Optimistic update
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
            category: 'updates',
            actionUrl: actionType === 'action_required' ? '/portal/dashboard?section=profile' : undefined
        };

        try {
            const ref = await getAccountRef();
            if (ref) {
                await updateDoc(ref, {
                    messages: arrayUnion(newMessage)
                });
                // Optimistic update
                onUpdate({
                    ...account,
                    messages: [newMessage, ...account.messages]
                });
                setNotificationText("");
            }
        } catch (e) {
            console.error("Error sending notification:", e);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-black/50 hover:text-black transition-colors mb-8 font-poppins font-medium"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Accounts</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Business Card */}
                    <div className="bg-white rounded-[40px] p-8 shadow-sm border border-black/5">
                        <div className="flex items-start justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-black font-poppins mb-2">
                                    {account.businessInfo.businessName}
                                </h2>
                                <p className="text-black/50 font-lora text-lg">
                                    {account.businessInfo.industry} • {account.businessInfo.yearsInBusiness} Years in Business
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold text-black/40 uppercase tracking-widest mb-1 font-poppins">
                                    Pre-Qualified
                                </div>
                                <div className="text-3xl font-bold text-black font-poppins">
                                    ${account.approvalAmount.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-[#F6F5F4]">
                                <div className="text-xs font-bold text-black/40 uppercase tracking-widest mb-2 font-poppins">Email</div>
                                <div className="font-medium font-poppins">{account.businessInfo.email}</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-[#F6F5F4]">
                                <div className="text-xs font-bold text-black/40 uppercase tracking-widest mb-2 font-poppins">Revenue</div>
                                <div className="font-medium font-poppins">${account.businessInfo.monthlyRevenue.toLocaleString()}/mo</div>
                            </div>
                        </div>
                    </div>

                    {/* Documents & Verification */}
                    <div className="bg-white rounded-[40px] p-8 shadow-sm border border-black/5">
                        <h3 className="text-xl font-bold text-black font-poppins mb-6">Documentation</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#F6F5F4]">
                                <div className="flex items-center gap-4">
                                    <Shield className="w-5 h-5 text-black/40" />
                                    <span className="font-medium font-poppins">Identity Verification</span>
                                </div>
                                {account.verificationInfo.completed ? (
                                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">Verified</span>
                                ) : (
                                    <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">Pending</span>
                                )}
                            </div>

                            {account.documents.map(doc => (
                                <div key={doc.id} className="flex items-center justify-between p-4 rounded-2xl bg-[#F6F5F4]">
                                    <div className="flex items-center gap-4">
                                        <FileText className="w-5 h-5 text-black/40" />
                                        <span className="font-medium font-poppins">{doc.type.replace('_', ' ')}</span>
                                    </div>
                                    <span className="text-sm text-black/50 font-lora">Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</span>
                                </div>
                            ))}

                            {account.documents.length === 0 && (
                                <div className="text-center py-8 text-black/40 font-lora italic">
                                    No documents uploaded yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions Column */}
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
                </div>
            </div>
        </div>
    );
}
