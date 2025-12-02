
import React from 'react';

interface AIFundingDeskWordmarkProps {
    className?: string;
    variant?: 'default' | 'light';
}

export const AIFundingDeskWordmark: React.FC<AIFundingDeskWordmarkProps> = ({
    className = "",
    variant = "default"
}) => {
    const isLight = variant === 'light';

    return (
        <div className={`flex items-center font-sans select-none leading-none ${className}`}>
            <span className={`font-bold tracking-tighter text-[14px] ${isLight ? 'text-white' : 'text-gray-900'}`}>AI</span>
            <span className={`mx-2 h-3 w-px rotate-12 ${isLight ? 'bg-white/30' : 'bg-gray-300'}`}></span>
            <span className={`font-medium tracking-[0.15em] text-[10px] translate-y-[0.5px] ${isLight ? 'text-white/80' : 'text-gray-500'}`}>Help Desk</span>
        </div>
    );
};
