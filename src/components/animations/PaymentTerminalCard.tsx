"use client";

export default function PaymentTerminalCard() {
    return (
        <div className="w-full max-w-[560px] aspect-[16/9] overflow-hidden">
            <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                src="/brand_cc.mp4"
            />
        </div>
    );
}
