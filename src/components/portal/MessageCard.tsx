"use client";

import { Message } from "@/types/portal";
import { motion } from "framer-motion";
import { Clock, ChevronRight, AlertCircle, CheckCircle, Info } from "lucide-react";

interface MessageCardProps {
    message: Message;
    onClick: () => void;
    isSelected?: boolean;
}

export default function MessageCard({ message, onClick, isSelected }: MessageCardProps) {
    const categoryConfig = {
        updates: { icon: Info, color: 'text-blue-600', bg: 'bg-blue-50' },
        action_required: { icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
        general: { icon: CheckCircle, color: 'text-gray-600', bg: 'bg-gray-50' }
    };

    const config = categoryConfig[message.category];
    const Icon = config.icon;

    const formatTimestamp = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));

        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        return date.toLocaleDateString();
    };

    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.01 }}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${isSelected
                ? 'border-black bg-gray-50'
                : message.read
                    ? 'border-gray-200 bg-white hover:border-gray-300'
                    : 'border-black/20 bg-gray-50 hover:border-black/40'
                }`}
        >
            <div className="flex items-start gap-4">
                {/* Unread indicator bar on left */}
                {!message.read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-black rounded-l-xl" />
                )}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${message.read ? config.bg : 'bg-black/5'}`}>
                    <Icon className={`w-5 h-5 ${message.read ? config.color : 'text-black'}`} />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className={`font-semibold font-poppins ${message.read ? 'text-gray-700' : 'text-black'}`}>
                            {message.subject}
                        </h4>
                        {!message.read && (
                            <div className="w-2 h-2 rounded-full bg-black flex-shrink-0 mt-1.5" />
                        )}
                    </div>

                    <p className="text-sm text-gray-500 line-clamp-2 font-poppins">
                        {message.body}
                    </p>

                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-400 flex items-center gap-1 font-poppins">
                            <Clock className="w-3 h-3" />
                            {formatTimestamp(message.timestamp)}
                        </span>
                        {message.category === 'action_required' && (
                            <span className="text-xs font-semibold text-black bg-black/10 px-2 py-0.5 rounded-full font-poppins">
                                Action Required
                            </span>
                        )}
                    </div>
                </div>

                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-2" />
            </div>
        </motion.button>
    );
}
