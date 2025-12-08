'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MessageSquare, ChevronDown } from 'lucide-react';
import { getHistory } from '../../actions/history-actions';
import { useAmbientAssistant } from '../../contexts/AmbientAssistantContext';

interface HistoryItem {
    id: string;
    title: string;
    updatedAt: string;
    preview: string;
}

export function HistoryDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const { loadChat, clearMessages, conversationId } = useAmbientAssistant();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            refreshHistory();
        }
    };

    const refreshHistory = async () => {
        const data = await getHistory();
        setHistory(data as any);
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (id: string) => {
        if (id === conversationId) return; // Already on this chat
        loadChat(id);
        setIsOpen(false);
    };

    const handleNewChat = () => {
        clearMessages(); // This clears messages and sets conversationId to null
        setIsOpen(false);
    };

    // Group history by date (Today, Last 7 Days, etc) - simplifed for now
    const today = new Date();
    const todayHistory = history.filter(h => new Date(h.updatedAt).toDateString() === today.toDateString());
    const olderHistory = history.filter(h => new Date(h.updatedAt).toDateString() !== today.toDateString());

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleOpen}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
            >
                <span>History</span>
                <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                        style={{ maxHeight: '400px', display: 'flex', flexDirection: 'column' }}
                    >
                        <div className="p-2 border-b border-gray-50">
                            <button
                                onClick={handleNewChat}
                                className="w-full text-left px-3 py-2 text-sm font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center gap-2"
                            >
                                <MessageSquare size={14} />
                                New Chat
                            </button>
                        </div>

                        <div className="overflow-y-auto py-2">
                            {todayHistory.length > 0 && (
                                <div className="mb-2">
                                    <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Today</div>
                                    {todayHistory.map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleSelect(item.id)}
                                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex flex-col gap-0.5 ${item.id === conversationId ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                                        >
                                            <span className="font-medium truncate">{item.title}</span>
                                            <span className="text-xs text-gray-400 truncate">{item.preview}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {olderHistory.length > 0 && (
                                <div>
                                    <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Previous</div>
                                    {olderHistory.map(item => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleSelect(item.id)}
                                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex flex-col gap-0.5 ${item.id === conversationId ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                                        >
                                            <span className="font-medium truncate">{item.title}</span>
                                            <span className="text-xs text-gray-400 truncate">{item.preview}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {history.length === 0 && (
                                <div className="px-4 py-8 text-center text-sm text-gray-400">
                                    No history yet
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
