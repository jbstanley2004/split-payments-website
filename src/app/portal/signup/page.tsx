"use client";

import SignInForm from "@/components/portal/SignInForm";
import { motion } from "framer-motion";
import MetricsStrip from "@/components/MetricsStrip";
import BackgroundChart from "@/components/portal/BackgroundChart";

export default function PortalSignUpPage() {
    return (
        <main className="w-full relative overflow-hidden flex flex-col items-center justify-center p-4 pt-8 pb-16">
            {/* Background Effects */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-gray-50 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-gray-50 rounded-full blur-[100px]" />

                {/* Background Chart */}
                <div className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-60">
                    <BackgroundChart />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-8 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="w-full"
                >
                    <SignInForm initialMode="signup" />
                </motion.div>
            </div>

            <MetricsStrip />
        </main>
    );
}
