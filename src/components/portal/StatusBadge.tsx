"use client";

import { ApplicationStage } from "@/types/portal";

interface StatusBadgeProps {
    stage: ApplicationStage;
}

export default function StatusBadge({ stage }: StatusBadgeProps) {
    const statusConfig = {
        pending_documents: {
            label: 'Pending Documents',
            color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            dot: 'bg-yellow-500'
        },
        in_review: {
            label: 'In Review',
            color: 'bg-blue-100 text-blue-800 border-blue-200',
            dot: 'bg-blue-500'
        },
        final_review: {
            label: 'Final Review',
            color: 'bg-purple-100 text-purple-800 border-purple-200',
            dot: 'bg-purple-500'
        },
        approved: {
            label: 'Approved',
            color: 'bg-green-100 text-green-800 border-green-200',
            dot: 'bg-green-500'
        },
        action_required: {
            label: 'Action Required',
            color: 'bg-orange-100 text-orange-800 border-orange-200',
            dot: 'bg-orange-500'
        }
    };

    const config = statusConfig[stage];

    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border font-semibold text-sm font-poppins ${config.color}`}>
            <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
            {config.label}
        </div>
    );
}
