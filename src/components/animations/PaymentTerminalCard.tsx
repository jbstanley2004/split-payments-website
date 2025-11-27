"use client";

export default function PaymentTerminalCard() {
    return (
        <div className="relative w-full h-full overflow-hidden bg-[#f7f4ed]">
            <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                src="/brand_cc.mp4"
            />
        </div>
    );
}
