import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Split — Payments & Merchant Funding';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    // We can load fonts here if needed, but for now we'll use system fonts or standard fallbacks
    // to ensure reliability.

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    position: 'relative',
                }}
            >
                {/* Main Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        marginTop: -40, // Slight optical adjustment
                    }}
                >
                    <div
                        style={{
                            fontSize: 80,
                            fontWeight: 600,
                            color: '#000',
                            lineHeight: 1.1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <span>Payments and funding.</span>
                        <span style={{ color: '#333' }}>Connected.</span>
                    </div>
                    <div
                        style={{
                            fontSize: 24,
                            color: '#666',
                            marginTop: 20,
                            maxWidth: 800,
                            textAlign: 'center',
                            lineHeight: 1.5,
                        }}
                    >
                        One secure platform where your business can process payments, access working capital, and grow with confidence.
                    </div>
                </div>

                {/* Brand Logos Footer (Simulated) */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 40,
                        opacity: 0.6,
                    }}
                >
                    {/* Visa */}
                    <svg width="60" height="20" viewBox="0 0 100 32" fill="none">
                        <path fill="#1434CB" d="M33.606 2.04l-6.578 29.136h10.55l6.576-29.136h-10.55zM58.75 2.04c-2.52 0-4.64 1.34-5.606 3.66l-19.89 27.516h10.96l2.18-6.03h13.36l1.26 6.03h9.67L58.75 2.04zm-5.06 16.8l3.43-16.43 5.54 16.43h-8.97zM78.69 11.23c.63-.33 2.02-.69 3.73-.69 4.7 0 8.16 2.51 8.18 7.7.03 5.97-5.36 9.06-10.55 9.06-1.74 0-2.69-.1-4.14-.34l-1.46 6.81h-10.2l6.3-29.73h10.86l-1.02 4.88c-.9-.33-2.06-.57-2.7-.57-2.9 0-5.9 1.54-6.81 5.86-.22 1.06.18 1.66 1.02 2.06 1.14.53 4.06 1.02 5.36 1.02 1.6 0 2.38-.24 2.38-.77 0-.53-1.06-1.5-3.38-2.56-4.78-2.2-7.06-5.86-7.06-9.52 0-3.38 2.5-6.75 7.5-6.75 1.86 0 3.2.16 4.1.36l-1.06 4.88zM14.65 2.04H.05L0 2.53c9.94 2.52 16.5 8.62 19.22 15.98l2.76-13.7c.46-2.08 1.8-3.94 4.14-4.5l-11.47 1.73z" />
                    </svg>

                    {/* Mastercard */}
                    <svg width="50" height="30" viewBox="0 0 50 32" fill="none">
                        <circle cx="16" cy="16" r="16" fill="#EB001B" fillOpacity="0.8" />
                        <circle cx="34" cy="16" r="16" fill="#F79E1B" fillOpacity="0.8" />
                    </svg>

                    {/* Amex */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#006FCF', color: 'white', fontWeight: 'bold', fontSize: 14, padding: '4px 8px', borderRadius: 4 }}>
                        AMEX
                    </div>

                    {/* Discover */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 16, color: '#F9A021' }}>
                        DISCOVER
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
