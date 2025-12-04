"use client";

import { ApplicationStatus } from "@/types/portal";
import { motion } from "framer-motion";
import { ChevronRight, Search, Filter, Loader2, Bell, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface AccountListProps {
    onSelect: (account: ApplicationStatus) => void;
}

export default function AccountList({ onSelect }: AccountListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [accounts, setAccounts] = useState<ApplicationStatus[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState<'all' | 'unread' | 'new'>('all');

    useEffect(() => {
        const q = query(collection(db, "applications"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const apps: ApplicationStatus[] = [];
            querySnapshot.forEach((doc) => {
                apps.push({ ...doc.data(), id: doc.id } as ApplicationStatus);
            });
            setAccounts(apps);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const filteredAccounts = accounts.filter(acc => {
        const matchesSearch =
            acc.businessInfo?.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            acc.businessInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (filterType === 'unread') {
            return acc.messages?.some(m => !m.read && m.sender === 'merchant');
        }
        if (filterType === 'new') {
            return !acc.adminViewed;
        }
        return true;
    });

    const unreadCount = accounts.reduce((acc, curr) =>
        acc + (curr.messages?.filter(m => !m.read && m.sender === 'merchant').length || 0), 0);

    const newAccountsCount = accounts.filter(a => !a.adminViewed).length;

    const handleAccountClick = async (account: ApplicationStatus) => {
        if (!account.adminViewed) {
            try {
                const docId = (account as any).id;
                if (docId) {
                    const ref = doc(db, "applications", docId);
                    await updateDoc(ref, { adminViewed: true });
                }
            } catch (e) {
                console.error("Error marking account as viewed:", e);
            }
        }
        onSelect(account);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-black/20" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button
                    onClick={() => setFilterType(filterType === 'unread' ? 'all' : 'unread')}
                    className={`p-6 rounded-3xl border transition-all flex items-center gap-6 shadow-sm text-left ${filterType === 'unread' ? 'bg-orange-50 border-[#FF4306]' : 'bg-white border-black/5 hover:border-black/10'
                        }`}
                >
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF4306] flex items-center justify-center">
                        <Bell className="w-7 h-7" />
                    </div>
                    <div>
                        <div className="text-3xl font-bold font-poppins text-black">{unreadCount}</div>
                        <div className="text-sm text-black/50 font-lora font-medium">Unread Messages</div>
                    </div>
                </button>
                <button
                    onClick={() => setFilterType(filterType === 'new' ? 'all' : 'new')}
                    className={`p-6 rounded-3xl border transition-all flex items-center gap-6 shadow-sm text-left ${filterType === 'new' ? 'bg-blue-50 border-blue-600' : 'bg-white border-black/5 hover:border-black/10'
                        }`}
                >
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <UserPlus className="w-7 h-7" />
                    </div>
                    <div>
                        <div className="text-3xl font-bold font-poppins text-black">{newAccountsCount}</div>
                        <div className="text-sm text-black/50 font-lora font-medium">New Applications</div>
                    </div>
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/30" />
                    <input
                        type="text"
                        placeholder="Search accounts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-black/5 focus:border-black/20 focus:ring-0 transition-all font-poppins text-sm"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/5 text-black/60 hover:text-black hover:border-black/20 transition-all text-sm font-medium font-poppins">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                </button>
            </div>

            {/* List */}
            <div className="space-y-4">
                {filteredAccounts.length === 0 && (
                    <div className="text-center py-12 text-black/40 font-lora italic">
                        No accounts found.
                    </div>
                )}
                {filteredAccounts.map((account, index) => (
                    <motion.div
                        key={account.id || account.businessInfo?.email || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleAccountClick(account)}
                        className="group bg-white rounded-3xl p-6 border border-black/5 hover:border-black/10 hover:shadow-lg transition-all cursor-pointer flex items-center justify-between"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold font-poppins text-lg">
                                {account.businessInfo?.businessName?.charAt(0) || '?'}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-black font-poppins mb-1">
                                    {account.businessInfo?.businessName || 'Unknown Business'}
                                </h3>
                                <div className="flex items-center gap-3 text-sm text-black/50 font-lora">
                                    <span>{account.businessInfo?.email || 'No email'}</span>
                                    <span className="w-1 h-1 rounded-full bg-black/20" />
                                    <span>${(account.businessInfo?.monthlyRevenue || 0).toLocaleString()}/mo</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            {/* Unread Message Indicator */}
                            {account.messages?.some(m => !m.read && m.sender === 'merchant') && (
                                <div className="w-3 h-3 rounded-full bg-[#FF4306] animate-pulse" title="New Message" />
                            )}

                            {/* Status Badge */}
                            <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-poppins ${account.stage === 'final_review' || account.stage === 'funded'
                                ? 'bg-green-50 text-green-600'
                                : account.stage === 'in_review'
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'bg-orange-50 text-[#FF4306]'
                                }`}>
                                {account.stage?.replace('_', ' ') || 'New'}
                            </div>

                            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
