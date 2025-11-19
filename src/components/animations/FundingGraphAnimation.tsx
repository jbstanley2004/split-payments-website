"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Wallet } from "lucide-react";

export default function FundingGraphAnimation() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Static, High-Fidelity Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                    <Wallet className="w-5 h-5" />
                </div>
                <div>
                    <div className="font-bold text-sm text-gray-900">Capital Account</div>
                    <div className="text-xs text-gray-500">Active Offer</div>
                </div>
            </div>
            <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">
                Qualified
            </div>
        </div>

        {/* Main Value */}
        <div className="p-8 text-center">
            <div className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-widest">Available Funding</div>
            <div className="text-5xl font-bold text-black mb-4 tracking-tight">$85,000</div>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
                Funds available for immediate deposit. Repayment adjusts automatically with daily sales.
            </p>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-2 border-t border-gray-100 divide-x divide-gray-100 bg-gray-50/50">
            <div className="p-6 text-center">
                <div className="text-xs text-gray-400 font-bold uppercase mb-1">Fixed Fee</div>
                <div className="text-xl font-bold text-gray-900">4.5%</div>
            </div>
            <div className="p-6 text-center">
                <div className="text-xs text-gray-400 font-bold uppercase mb-1">Split Rate</div>
                <div className="text-xl font-bold text-gray-900">12%</div>
            </div>
        </div>

        {/* Action */}
        <div className="p-4 bg-black text-white text-center font-bold text-sm py-4 cursor-pointer hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
            View Offer Details <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
      
      {/* Decorative Elements - Clean lines, no blobs */}
      <div className="absolute -z-10 top-4 -right-4 w-full h-full rounded-3xl border border-gray-200 bg-gray-50" />
    </div>
  );
}
