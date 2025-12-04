"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, User, Mail, LogOut, Bell } from "lucide-react";
import { useState } from "react";

interface PortalNavProps {
    activeSection: 'dashboard' | 'profile' | 'inbox';
    onSectionChange: (section: 'dashboard' | 'profile' | 'inbox') => void;
    unreadMessages?: number;
}

export default function PortalNav({ activeSection, onSectionChange, unreadMessages = 0 }: PortalNavProps) {
    const [showUserMenu, setShowUserMenu] = useState(false);

    const sections = [
        { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
        { id: 'profile' as const, label: 'Business Profile', icon: User },
        { id: 'inbox' as const, label: 'Inbox', icon: Mail, badge: unreadMessages }
    ];

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-black font-poppins">Split</span>
                        <span className="text-sm text-gray-500 font-poppins">Portal</span>
                    </Link>

                    {/* Section Tabs */}
                    <div className="flex items-center gap-1">
                        {sections.map(section => (
                            <button
                                key={section.id}
                                onClick={() => onSectionChange(section.id)}
                                className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all font-poppins ${activeSection === section.id
                                    ? 'text-black'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <section.icon className="w-4 h-4" />
                                    <span className="hidden sm:inline">{section.label}</span>
                                    {section.badge > 0 && (
                                        <span className="relative inline-flex items-center justify-center w-5 h-5">
                                            {/* Gradient border */}
                                            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF4306] via-[#FF4306]/50 to-transparent p-[1.5px]">
                                                <span className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                                    <span className="text-white text-xs font-semibold">{section.badge}</span>
                                                </span>
                                            </span>
                                        </span>
                                    )}
                                </div>
                                {activeSection === section.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* User Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                                U
                            </div>
                        </button>

                        {showUserMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                            >
                                <Link
                                    href="/portal/signin"
                                    className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700 font-poppins text-sm"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
