
import React from 'react';
import { AIFundingDeskWordmark } from './AIFundingDeskWordmark';

export const AIBadge: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        // Gradient border wrapper: 1px padding with gradient background
        <div className={`group relative p-[1px] rounded-full bg-gradient-to-r from-sky-200/60 via-sky-50 to-sky-200/60 shadow-sm ${className}`}>
            {/* Inner content with white background to mask the center of the gradient */}
            <div className="flex items-center justify-center px-3.5 py-1.5 rounded-full bg-white relative z-10">
                <AIFundingDeskWordmark />
            </div>
        </div>
    );
};
