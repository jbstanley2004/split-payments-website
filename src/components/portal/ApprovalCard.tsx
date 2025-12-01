"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";

interface ApprovalCardProps {
    approvalAmount: number;
    businessName: string;
}

export default function ApprovalCard({ approvalAmount, businessName }: ApprovalCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black rounded-2xl p-8 text-white relative overflow-hidden border border-gray-800"
        >
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle2 className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 font-poppins">Application Status</p>
                        <p className="text-lg font-semibold font-poppins">Pre-Approved</p>
                    </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-3 font-poppins">
                    Congratulations, {businessName}!
                </h2>

                <p className="text-lg text-gray-300 mb-6 font-lora">
                    You're pre-approved for up to{" "}
                    <span className="text-2xl font-bold text-white">
                        ${approvalAmount.toLocaleString()}
                    </span>{" "}
                    in funding.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-all font-poppins">
                        View Details
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
