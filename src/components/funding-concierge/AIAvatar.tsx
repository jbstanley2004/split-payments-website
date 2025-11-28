
import React from 'react';

interface AIAvatarProps {
    className?: string;
}

export const AIAvatar: React.FC<AIAvatarProps> = ({ className = "w-10 h-10" }) => {
    return (
        // Outer gradient wrapper providing the 1px border effect
        <div className={`${className} relative flex-shrink-0 p-[1px] rounded-[22%] bg-gradient-to-r from-sky-200/60 via-sky-50 to-sky-200/60 shadow-md animate-in fade-in zoom-in-95 duration-500`}>
            {/* Inner white container */}
            <div className="w-full h-full rounded-[22%] bg-white flex items-center justify-center relative overflow-hidden">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-[60%] h-[60%]"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {/* Left Eye */}
                    <circle cx="8" cy="10" r="1.5" className="fill-[#1a1a1a] stroke-none" />

                    {/* Right Eye (Matching Left) */}
                    <circle cx="16" cy="10" r="1.5" className="fill-[#1a1a1a] stroke-none" />

                    {/* Gentle Smile */}
                    <path d="M8.5 15.5c1.5 1 5.5 1 7 0" className="stroke-[#1a1a1a]" strokeWidth="1.5" />
                </svg>

                {/* Subtle highlight for polish */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-transparent to-black/5 pointer-events-none" />
            </div>
        </div>
    );
};
