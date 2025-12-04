"use client";

import { Message } from "@/types/portal";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Bell, Trash2, Send, Plus, X as XIcon, Inbox as InboxIcon } from "lucide-react";
import { useState } from "react";

interface InboxViewProps {
    messages: Message[];
    onMarkAsRead: (messageId: string) => void;
    onNavigate: (sectionId: string) => void;
    onSendMessage: (subject: string, body: string) => void;
    onDeleteMessage: (messageId: string) => void;
}

export default function InboxView({
    messages,
    onMarkAsRead,
    onNavigate,
    onSendMessage,
    onDeleteMessage
}: InboxViewProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'inbox' | 'sent'>('inbox');
    const [isComposing, setIsComposing] = useState(false);
    const [composeForm, setComposeForm] = useState({ subject: '', body: '' });

    const toggleMessage = (id: string) => {
        if (expandedId === id) {
            setExpandedId(null);
        } else {
            setExpandedId(id);
            // Only mark as read if it's an inbox message
            const msg = messages.find(m => m.id === id);
            if (msg && msg.sender !== 'merchant') {
                onMarkAsRead(id);
            }
        }
    };

    // Define handleSend at the top level of the component
    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!composeForm.subject.trim() || !composeForm.body.trim()) return;

        onSendMessage(composeForm.subject, composeForm.body);
        setComposeForm({ subject: '', body: '' });
        setIsComposing(false);
        setActiveTab('sent');
    };

    const getMessageDate = (timestamp: any): Date => {
        if (!timestamp) return new Date();
        if (timestamp instanceof Date) return timestamp;
        // Handle Firestore Timestamp
        if (typeof timestamp === 'object' && 'seconds' in timestamp) {
            return new Date(timestamp.seconds * 1000);
        }
        // Handle string/number
        return new Date(timestamp);
    };

    const filteredMessages = messages
        .filter(m => !m.isDeleted)
        .filter(m => {
            if (activeTab === 'inbox') return m.sender !== 'merchant'; // Admin or system messages
            return m.sender === 'merchant';
        })
        .sort((a, b) => {
            const dateA = getMessageDate(a.timestamp);
            const dateB = getMessageDate(b.timestamp);
            return dateB.getTime() - dateA.getTime();
        });

    return (
        <div className="max-w-3xl mx-auto relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6"
            >
                <div className="text-center md:text-left">
                    <h2 className="text-4xl font-bold font-poppins mb-2 text-black">Messages</h2>
                    <p className="text-xl text-black/50 font-lora">Communicate with our support team.</p>
                </div>

                <button
                    onClick={() => setIsComposing(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Message</span>
                </button>
            </motion.div>

            {/* Tabs */}
            <div className="flex p-1.5 bg-[#F6F5F4] rounded-full mb-8 w-fit mx-auto md:mx-0">
                {(['inbox', 'sent'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative px-10 py-3 rounded-full text-base font-bold font-poppins transition-colors duration-200 ${activeTab === tab ? 'text-black' : 'text-black/40 hover:text-black/60'
                            }`}
                    >
                        {activeTab === tab && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-white rounded-full shadow-sm"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10 capitalize">{tab}</span>
                    </button>
                ))}
            </div>

            {/* Message List */}
            <div className="space-y-4 min-h-[400px]">
                <AnimatePresence mode="popLayout">
                    {filteredMessages.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20 text-black/20"
                        >
                            <InboxIcon className="w-16 h-16 mb-4 opacity-50" />
                            <p className="font-lora text-lg">No messages in {activeTab}</p>
                        </motion.div>
                    ) : (
                        filteredMessages.map((message, index) => (
                            <motion.div
                                key={message.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                className={`group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 ${expandedId === message.id
                                        ? "shadow-lg ring-1 ring-black/5"
                                        : "hover:shadow-md border border-transparent hover:border-black/5"
                                    }`}
                            >
                                {/* Unread Indicator (Inbox only) */}
                                {!message.read && activeTab === 'inbox' && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FF4306]" />
                                )}

                                <div className="flex items-start">
                                    <button
                                        onClick={() => toggleMessage(message.id)}
                                        className="flex-1 text-left p-6 md:p-8 flex items-start gap-6"
                                    >
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${message.sender === 'merchant'
                                                ? "bg-black text-white"
                                                : message.read
                                                    ? "bg-black/5 text-black/40"
                                                    : "bg-orange-50 text-[#FF4306]"
                                            }`}>
                                            {message.sender === 'merchant' ? (
                                                <Send className="w-5 h-5" />
                                            ) : (
                                                <Bell className="w-5 h-5" />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0 pt-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className={`text-lg font-bold font-poppins truncate ${message.read || activeTab === 'sent' ? "text-black/70" : "text-black"
                                                    }`}>
                                                    {message.subject}
                                                </h4>
                                                <span className="text-xs font-medium text-black/30 font-poppins flex-shrink-0 ml-4 uppercase tracking-wider">
                                                    {getMessageDate(message.timestamp).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className={`text-base font-lora line-clamp-2 transition-colors ${message.read || activeTab === 'sent' ? "text-black/40" : "text-black/60"
                                                }`}>
                                                {message.body}
                                            </p>
                                        </div>

                                        <ChevronRight className={`w-5 h-5 text-black/20 transition-transform duration-300 mt-2 ${expandedId === message.id ? "rotate-90 text-black" : "group-hover:text-black/40"
                                            }`} />
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {expandedId === message.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 md:px-8 pb-8 pl-[5.5rem]"
                                        >
                                            <div className="pt-6 border-t border-black/5 relative">
                                                <p className="text-black/70 font-lora leading-relaxed text-lg whitespace-pre-wrap">
                                                    {message.body}
                                                </p>

                                                <div className="flex items-center justify-between mt-8">
                                                    {message.actionUrl && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onNavigate(message.actionUrl!);
                                                            }}
                                                            className="text-sm font-bold text-black border-b-2 border-black/10 hover:border-black transition-all font-poppins pb-0.5"
                                                        >
                                                            View Details
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onDeleteMessage(message.id);
                                                        }}
                                                        className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors ml-auto"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            {/* Compose Modal */}
            <AnimatePresence>
                {isComposing && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsComposing(false)}
                            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold font-poppins">New Message</h3>
                                    <button
                                        onClick={() => setIsComposing(false)}
                                        className="p-2 hover:bg-black/5 rounded-full transition-colors"
                                    >
                                        <XIcon className="w-6 h-6 text-black/40" />
                                    </button>
                                </div>

                                <form onSubmit={handleSend} className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Subject</label>
                                        <input
                                            type="text"
                                            value={composeForm.subject}
                                            onChange={e => setComposeForm(prev => ({ ...prev, subject: e.target.value }))}
                                            className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all font-poppins"
                                            placeholder="What is this regarding?"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-black/40 uppercase tracking-wide mb-2">Message</label>
                                        <textarea
                                            value={composeForm.body}
                                            onChange={e => setComposeForm(prev => ({ ...prev, body: e.target.value }))}
                                            className="w-full bg-[#F6F5F4] border-transparent rounded-xl px-4 py-3 text-base focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10 outline-none transition-all font-lora resize-none h-40"
                                            placeholder="Type your message here..."
                                            required
                                        />
                                    </div>

                                    <div className="flex justify-end pt-2">
                                        <button
                                            type="submit"
                                            className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
                                        >
                                            <Send className="w-4 h-4" />
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
