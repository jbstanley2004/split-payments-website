"use client";

import { Message } from "@/types/portal";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Bell } from "lucide-react";
import { useState } from "react";

interface InboxViewProps {
    messages: Message[];
    onMarkAsRead: (messageId: string) => void;
}

export default function InboxView({ messages, onMarkAsRead }: InboxViewProps) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleMessage = (id: string) => {
        if (expandedId === id) {
            setExpandedId(null);
        } else {
            setExpandedId(id);
            onMarkAsRead(id);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl font-bold font-poppins mb-4 text-black">Notifications</h2>
                <p className="text-xl text-black/50 font-lora">Updates on your funding application.</p>
            </motion.div>

            <div className="space-y-4">
                {messages.map((message, index) => (
                    <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`group relative bg-white rounded-3xl overflow-hidden transition-all duration-300 ${expandedId === message.id
                                ? "shadow-lg ring-1 ring-black/5"
                                : "hover:shadow-md border border-transparent hover:border-black/5"
                            }`}
                    >
                        {/* Unread Indicator */}
                        {!message.read && (
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#FF4306]" />
                        )}

                        <button
                            onClick={() => toggleMessage(message.id)}
                            className="w-full text-left p-6 md:p-8 flex items-start gap-6"
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${message.read ? "bg-black/5 text-black/40" : "bg-orange-50 text-[#FF4306]"
                                }`}>
                                <Bell className="w-5 h-5" />
                            </div>

                            <div className="flex-1 min-w-0 pt-1">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className={`text-lg font-bold font-poppins truncate ${message.read ? "text-black/70" : "text-black"
                                        }`}>
                                        {message.subject}
                                    </h4>
                                    <span className="text-xs font-medium text-black/30 font-poppins flex-shrink-0 ml-4 uppercase tracking-wider">
                                        {new Date(message.timestamp).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className={`text-base font-lora truncate transition-colors ${message.read ? "text-black/40" : "text-black/60"
                                    }`}>
                                    {message.body}
                                </p>
                            </div>

                            <ChevronRight className={`w-5 h-5 text-black/20 transition-transform duration-300 mt-2 ${expandedId === message.id ? "rotate-90 text-black" : "group-hover:text-black/40"
                                }`} />
                        </button>

                        <AnimatePresence>
                            {expandedId === message.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-6 md:px-8 pb-8 pl-[5.5rem]"
                                >
                                    <div className="pt-6 border-t border-black/5">
                                        <p className="text-black/70 font-lora leading-relaxed text-lg">
                                            {message.body}
                                        </p>
                                        {message.actionUrl && (
                                            <button className="mt-6 text-sm font-bold text-black border-b-2 border-black/10 hover:border-black transition-all font-poppins pb-0.5">
                                                View Details
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
