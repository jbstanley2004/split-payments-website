
import React from 'react';

interface SplitAvatarProps {
    className?: string;
}

export const SplitAvatar: React.FC<SplitAvatarProps> = ({ className = "w-10 h-10" }) => {
    return (
        <div className={`${className} relative flex-shrink-0 rounded-full bg-white border border-[#FF4D00]/30 flex items-center justify-center overflow-hidden shadow-[0_0_20px_-5px_rgba(255,77,0,0.15)]`}>
            <svg
                viewBox="0 0 100 100"
                className="w-[65%] h-[65%] text-black translate-y-[2%]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {/* Square Glasses Frames */}
                <path d="M 15 35 L 42 35 L 42 62 L 15 62 Z" strokeWidth="5" rx="5" />
                <path d="M 58 35 L 85 35 L 85 62 L 58 62 Z" strokeWidth="5" rx="5" />

                {/* Bridge */}
                <path d="M 42 48 L 58 48" strokeWidth="5" />

                {/* Stems (Earpieces) */}
                <path d="M 15 48 L 2 48" strokeWidth="5" />
                <path d="M 85 48 L 98 48" strokeWidth="5" />

                {/* Eyes (Simple dots) */}
                <circle cx="28.5" cy="48.5" r="4" fill="currentColor" stroke="none" />
                <circle cx="71.5" cy="48.5" r="4" fill="currentColor" stroke="none" />

                {/* Minimalist Smile */}
                <path d="M 35 78 Q 50 85 65 78" strokeWidth="5" />
            </svg>
        </div>
    );
};
