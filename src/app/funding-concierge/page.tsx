
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DynamicIslandNav } from '@/components/dynamic-island-nav';
import QuoteCard from '../../components/funding-concierge/QuoteCard';
import { AIAvatar } from '../../components/funding-concierge/AIAvatar';
import { ApplicationWizard } from '../../components/funding-concierge/ApplicationWizard';
import { AuthFlow } from '../../components/funding-concierge/AuthFlow';
import { AIBadge } from '../../components/funding-concierge/AIBadge';
import { INITIAL_MESSAGE } from '../../lib/funding-constants';
import { sendGeminiMessage } from '../../actions/gemini-action';
import { Message, UserProfile, Quote, ApplicationData, User } from '../../types/funding-types';

const SUGGESTIONS = [
    "Check funding eligibility",
    "How do payments work?"
];

const FundingConciergePage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 'init', role: 'model', text: INITIAL_MESSAGE }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile>({});
    const [currentUser, setCurrentUser] = useState<User | null>(null); // Track verified user
    const [activeQuote, setActiveQuote] = useState<Quote | null>(null);
    const [attachment, setAttachment] = useState<{ name: string; type: string; data: string } | null>(null);
    const [isWizardActive, setIsWizardActive] = useState(false);
    const [wizardInitialData, setWizardInitialData] = useState<Partial<ApplicationData>>({});
    const [isInputHidden, setIsInputHidden] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const isInitialState = messages.length === 1;
    const isReadyToSend = inputValue.trim().length > 0 || attachment !== null;

    const scrollToBottom = () => {
        if (!isInitialState) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, activeQuote, isInitialState, isWizardActive]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            if (inputValue) {
                textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
            }
        }
    }, [inputValue]);

    const handleAuthComplete = (user: User) => {
        setCurrentUser(user);
        // Add a system message acting as the transition
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'model',
            text: `Thanks, ${user.name}. Your account has been verified. \n\nTo initiate your application, please upload your last 3 months of merchant processing statements (PDF). This helps us get an accurate depiction of your business so we can give accurate offers.`
        }]);
    };

    const handleSendMessage = async (overrideText?: string) => {
        const textToSend = overrideText || inputValue;
        if ((!textToSend.trim() && !attachment) || isLoading) return;

        // Check for Application Intent if not logged in
        const lowerText = textToSend.toLowerCase();
        const isApplicationIntent = lowerText.includes('apply') || lowerText.includes('application') || lowerText.includes('start app') || lowerText.includes('qualif');

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: textToSend,
            attachment: attachment ? { ...attachment } : undefined
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setAttachment(null);
        setIsLoading(true);
        setActiveQuote(null);

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }

        // INTERCEPT: If user wants to apply but isn't verified, show Auth Flow
        if (isApplicationIntent && !currentUser && !attachment) {
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: Date.now().toString() + '_auth',
                    role: 'model',
                    text: "Before we start the qualification process, let's get your secure account set up so you can save your progress.",
                    isAuthFlow: true
                }]);
                setIsLoading(false);
            }, 600);
            return;
        }

        try {
            let promptToSend = userMsg.text;

            // If sending a file, guide AI to extract data
            if (userMsg.attachment) {
                promptToSend = `[User uploaded file: ${userMsg.attachment.name}]. 
        Analyze this document.
        If this is a merchant processing statement or bank statement, please extract the following fields if available:
        - Legal Name
        - Physical Address (Street, City, State, Zip)
        - Monthly Processing Volume (Average)
        - Current Processor Name
        
        After extracting, proceed IMMEDIATELY to call the start_application tool with this data. Do not ask for confirmation.
        
        User message: "${userMsg.text || "Please analyze this file for my application."}"`;
            }

            // CALL SERVER ACTION
            const response = await sendGeminiMessage(
                promptToSend, 
                messages, // Send history
                userMsg.attachment
            );

            if (response.error) {
                 setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: 'model',
                    text: response.error || "An error occurred."
                }]);
            } else {
                // Process tool calls if any
                if (response.toolCalls) {
                    response.toolCalls.forEach(tool => {
                        if (tool.name === 'save_contact_info') {
                            setUserProfile(prev => ({ ...prev, ...tool.result }));
                        } else if (tool.name === 'generate_quote') {
                            setActiveQuote(tool.result);
                        } else if (tool.name === 'start_application') {
                            setIsWizardActive(true);
                            if (tool.result) {
                                setWizardInitialData(tool.result);
                            }
                            
                            const confirmationText = "Great, let's get your qualification started. Please review the details below.";
                             setMessages(prev => [...prev, {
                                id: Date.now().toString() + '_wiz',
                                role: 'model',
                                text: confirmationText,
                                isApplicationWizard: true
                            }]);
                        }
                    });
                }

                // If no wizard active, show the text response
                if (!response.toolCalls?.some(t => t.name === 'start_application')) {
                     setMessages(prev => [...prev, {
                        id: (Date.now() + 1).toString(),
                        role: 'model',
                        text: response.text,
                    }]);
                }
            }

        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'model',
                text: "I apologize, but I encountered a momentary connection issue. Please try again."
            }]);
        } finally {
            if (!isWizardActive) setIsLoading(false);
        }
    };

    const handleApplicationSubmit = async (data: ApplicationData) => {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'user',
            text: "Application Submitted ✅"
        }]);

        setIsLoading(true);
        // Call Server Action for follow up
        const response = await sendGeminiMessage(
            `The user has submitted the application form with the following data: ${JSON.stringify(data)}. Please thank them, confirm receipt, and tell them an underwriter will review it shortly.`,
            messages
        );

        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'model',
            text: response.text
        }]);
        setIsLoading(false);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setAttachment({
                        name: file.name,
                        type: file.type,
                        data: event.target.result as string
                    });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatMessage = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-bold text-black">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="flex flex-col h-screen bg-white font-sans text-base selection:bg-black selection:text-white overflow-hidden">
            <DynamicIslandNav />

            <main className="flex-1 flex flex-col pt-20 overflow-y-auto scroll-smooth no-scrollbar relative z-0">
                <div className={`w-full max-w-4xl mx-auto px-4 md:px-6 transition-all duration-700 ease-in-out flex-1 flex flex-col ${isInitialState ? 'justify-center pb-32 md:pb-40' : 'justify-start pt-4 pb-[400px]'}`}>

                    {messages.map((msg, index) => {
                        const isFirstMessage = index === 0;

                        if (isFirstMessage && isInitialState && msg.role === 'model') {
                            const parts = msg.text.split('\n\n');
                            const headline = parts[0];
                            const subhead = parts.slice(1).join('\n\n');

                            return (
                                <div key={msg.id} className="flex flex-col items-center text-center w-full animate-in fade-in duration-1000 slide-in-from-bottom-8">

                                    <div className="mb-8">
                                        <AIAvatar className="w-14 h-14 shadow-xl" />
                                    </div>

                                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-6 max-w-4xl">
                                        {headline}
                                    </h1>
                                    <p className="text-xl md:text-2xl text-gray-500 max-w-2xl leading-relaxed font-normal mb-12">
                                        {subhead}
                                    </p>

                                    <div className="flex flex-col items-center gap-5 w-full mb-10">
                                        <div className="flex flex-wrap justify-center gap-3">
                                            {SUGGESTIONS.map((s, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleSendMessage(s)}
                                                    className="px-7 py-3 bg-black text-white rounded-full text-[15px] font-medium hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Featured "Start Qualification" Button */}
                                        <button
                                            onClick={() => handleSendMessage("Start Qualification")}
                                            className="px-12 py-4 rounded-full text-[16px] font-medium tracking-wide transition-all duration-500 border border-black bg-white text-black hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:bg-gradient-to-b hover:from-white hover:to-gray-50 hover:-translate-y-1"
                                        >
                                            Start Qualification
                                        </button>
                                    </div>

                                    {/* Powered by Badge displayed in the center for initial state */}
                                    <div className="animate-in fade-in zoom-in duration-1000 delay-300 opacity-0 fill-mode-forwards">
                                        <AIBadge />
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div
                                key={msg.id}
                                className={`flex w-full transition-all duration-700 ease-in-out
                    ${msg.role === 'user' ? 'justify-end mb-6 md:mb-8 animate-fly-in' : 'justify-start mb-6 md:mb-8'}
                    flex-row items-start gap-3 md:gap-4
                  `}
                            >
                                {msg.role === 'model' && (
                                    <div className="transition-all duration-700 ease-in-out flex-shrink-0 mt-1">
                                        <AIAvatar className="w-10 h-10" />
                                    </div>
                                )}

                                <div className={`flex flex-col min-w-0 transition-all duration-700 items-start max-w-[90%] md:max-w-[85%]`}>

                                    {!msg.isApplicationWizard && !msg.isAuthFlow && (
                                        <div
                                            className={`relative transition-all duration-700 ease-in-out
                                ${msg.role === 'user'
                                                    ? 'bg-black text-white rounded-[24px] rounded-br-sm px-6 py-4 md:px-8 md:py-5 text-[1rem] md:text-[1.05rem] shadow-sm'
                                                    : 'bg-white text-gray-900 border border-black rounded-[24px] rounded-bl-sm px-6 py-4 md:px-8 md:py-6 text-[1rem] md:text-[1.05rem] leading-relaxed shadow-sm'
                                                }`}
                                        >
                                            {msg.attachment && (
                                                <div className={`mb-4 p-3 rounded-2xl flex items-center gap-3 ${msg.role === 'user' ? 'bg-white/10 border border-white/20' : 'bg-gray-50 border border-black'}`}>
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-black border border-white/20 text-white' : 'bg-white border border-black text-black'}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className={`text-xs font-bold uppercase tracking-wider ${msg.role === 'user' ? 'text-white/60' : 'text-gray-500'}`}>File Uploaded</div>
                                                        <div className={`text-sm font-medium truncate ${msg.role === 'user' ? 'text-white' : 'text-gray-900'}`}>{msg.attachment.name}</div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="whitespace-pre-line">
                                                {formatMessage(msg.text)}
                                            </div>
                                        </div>
                                    )}

                                    {/* Auth Flow Rendering */}
                                    {msg.isAuthFlow && (
                                        <AuthFlow onComplete={handleAuthComplete} />
                                    )}

                                    {/* Application Wizard Rendering */}
                                    {msg.isApplicationWizard && (
                                        <ApplicationWizard
                                            onSubmit={handleApplicationSubmit}
                                            initialData={wizardInitialData}
                                            onToggleInput={(hide) => setIsInputHidden(hide)}
                                        />
                                    )}

                                    {/* Quote Card Rendering */}
                                    {msg.role === 'model' && activeQuote && index === messages.length - 1 && (
                                        <div className="mt-8 w-full max-w-md mx-auto md:mx-0">
                                            <QuoteCard quote={activeQuote} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {isLoading && (
                        <div className="flex w-full justify-start animate-in fade-in duration-300 mb-8">
                            <div className="flex gap-3 md:gap-4 max-w-[90%] md:max-w-[85%]">
                                <div className="flex-shrink-0 mt-1">
                                    <AIAvatar className="w-10 h-10" />
                                </div>
                                <div className="bg-white border border-black px-6 py-4 rounded-[24px] rounded-bl-sm inline-flex items-center gap-2 shadow-sm">
                                    <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            <div className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${isInputHidden ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
                <div className="w-full max-w-4xl mx-auto px-4 md:px-6 pb-6 md:pb-10 flex items-end gap-3">

                    <div className={`flex-shrink-0 pb-3`}>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-black border border-black text-white hover:bg-gray-800 hover:scale-105 transition-all shadow-lg focus:outline-none group"
                            title="Add File"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:rotate-12 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                            </svg>
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*,.pdf"
                            onChange={handleFileSelect}
                        />
                    </div>

                    <div className="flex-1 min-w-0 bg-white rounded-[40px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-500 ease-in-out relative group hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]">

                        <div className="flex justify-between items-end gap-3 w-full p-3 md:p-4 z-10 relative">
                            <textarea
                                ref={textareaRef}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about funding or payments..."
                                className={`w-full bg-transparent border-none p-3 md:p-4 text-xl md:text-2xl text-gray-900 placeholder-gray-300 focus:ring-0 focus:outline-none resize-none max-h-[200px] ${inputValue ? 'overflow-y-auto' : 'overflow-hidden'}`}
                                style={{ minHeight: '64px' }}
                                rows={1}
                                autoFocus={!isInitialState}
                            />

                            <button
                                onClick={() => handleSendMessage()}
                                disabled={!isReadyToSend && isLoading}
                                className={`flex-shrink-0 w-14 h-14 bg-black text-white rounded-full transition-all duration-300 flex items-center justify-center shadow-md mb-1 mr-1 ${isReadyToSend ? 'shadow-[0_0_0_2px_#ffffff,0_0_20px_rgba(0,0,0,0.1)]' : 'hover:bg-gray-800 hover:scale-105 active:scale-95'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                                </svg>
                            </button>
                        </div>

                        {attachment && (
                            <div className="px-6 pb-4 bg-white">
                                <div className="flex items-center gap-3 bg-gray-50 w-fit px-4 py-3 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-bottom-2">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-400">
                                            <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875ZM12.75 12a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V18a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V12Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{attachment.name}</span>
                                    <button onClick={() => setAttachment(null)} className="ml-2 text-gray-400 hover:text-red-500 p-1 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FundingConciergePage;
