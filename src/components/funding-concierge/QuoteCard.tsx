
import React from 'react';
import { Quote } from '../../types/funding-types';

interface QuoteCardProps {
    quote: Quote;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
    return (
        <div className="group w-full max-w-md bg-white text-black p-8 rounded-[32px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative overflow-hidden">

            {/* Decorative background blob */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gray-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 pointer-events-none"></div>

            <div className="flex justify-between items-start mb-10 relative z-10">
                <div>
                    <div className="inline-flex items-center gap-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]"></span>
                        Pre-Approved
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight text-gray-900">Funding Offer</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center shadow-lg">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </div>
            </div>

            <div className="mb-10 relative z-10">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Total Capital Available</p>
                <div className="text-6xl font-bold tracking-tighter text-gray-900">
                    ${quote.amount.toLocaleString()}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                <div className="p-5 bg-[#F9F9FA] rounded-2xl border border-gray-100 group-hover:border-gray-200 transition-colors">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Term / Structure</p>
                    <p className="text-lg font-medium leading-tight">{quote.term}</p>
                </div>
                <div className="p-5 bg-[#F9F9FA] rounded-2xl border border-gray-100 group-hover:border-gray-200 transition-colors">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Repayment</p>
                    <p className="text-lg font-medium leading-tight">{quote.repaymentSchedule}</p>
                </div>
            </div>

            <button className="relative z-10 w-full bg-black text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-[#FF4D00] transition-colors shadow-lg shadow-black/10 flex items-center justify-center gap-3 group-hover:-translate-y-1 duration-300">
                <span>Accept Proposal</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-10v6h2V7h-2z" /></svg>
                <span className="font-medium">Secure 256-bit encrypted offer</span>
            </div>
        </div>
    );
};

export default QuoteCard;
