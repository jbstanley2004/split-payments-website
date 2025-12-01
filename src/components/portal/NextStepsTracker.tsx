"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, FileText, Shield, Sparkles } from "lucide-react";
import { ApplicationStage } from "@/types/portal";

interface NextStepsTrackerProps {
    stage: ApplicationStage;
    documentsCount: number;
    verificationComplete: boolean;
    progressPercentage: number;
}

export default function NextStepsTracker({
    stage,
    documentsCount,
    verificationComplete,
    progressPercentage
}: NextStepsTrackerProps) {
    const steps = [
        {
            id: 'submitted',
            label: 'Application Submitted',
            icon: CheckCircle2,
            completed: true
        },
        {
            id: 'documents',
            label: 'Upload Documents',
            subtitle: `${documentsCount}/3 uploaded`,
            icon: FileText,
            completed: documentsCount === 3,
            active: stage === 'pending_documents' || (stage === 'in_review' && documentsCount < 3)
        },
        {
            id: 'verification',
            label: 'Provide Verification Info',
            subtitle: verificationComplete ? 'Completed' : 'EIN & SSN required',
            icon: Shield,
            completed: verificationComplete,
            active: stage === 'in_review' && documentsCount === 3 && !verificationComplete
        },
        {
            id: 'review',
            label: 'Final Review',
            subtitle: stage === 'final_review' ? 'In progress...' : 'Pending',
            icon: Clock,
            completed: stage === 'approved',
            active: stage === 'final_review'
        },
        {
            id: 'ready',
            label: 'Funding Ready',
            icon: Sparkles,
            completed: stage === 'approved',
            active: false
        }
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-black font-poppins">Next Steps</h3>
                    <span className="text-sm font-medium text-gray-500 font-poppins">
                        {progressPercentage}% Complete
                    </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-black rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                </div>
            </div>

            <div className="space-y-4">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-start gap-4 p-4 rounded-xl transition-all border ${step.active
                                    ? 'bg-white border-orange-500'
                                    : step.completed
                                        ? 'bg-white border-gray-200'
                                        : 'bg-gray-50 border-gray-200'
                                }`}
                        >
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${step.completed
                                    ? 'bg-black border-black text-white'
                                    : step.active
                                        ? 'bg-orange-500 border-orange-500 text-white'
                                        : 'bg-white border-gray-300 text-gray-400'
                                }`}>
                                <Icon className="w-5 h-5" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4 className={`font-semibold font-poppins ${step.active ? 'text-black' : step.completed ? 'text-black' : 'text-gray-600'
                                    }`}>
                                    {step.label}
                                </h4>
                                {step.subtitle && (
                                    <p className="text-sm text-gray-500 mt-0.5 font-poppins">{step.subtitle}</p>
                                )}
                            </div>

                            {step.active && (
                                <div className="flex-shrink-0">
                                    <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full font-poppins">
                                        Action Required
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-900 font-poppins">
                    <strong>Pro tip:</strong> Complete all steps faster to accelerate your approval process. Most applications are processed within 24-48 hours of submission.
                </p>
            </div>
        </div>
    );
}
