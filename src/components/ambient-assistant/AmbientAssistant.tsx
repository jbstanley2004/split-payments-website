'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rnd } from 'react-rnd';
import { ArrowUp, Plus, X, Minimize2, Edit } from 'lucide-react';
import { HistoryDropdown } from './HistoryDropdown';
import { AIAvatar } from '../funding-concierge/AIAvatar';
import { useAmbientAssistant } from '../../contexts/AmbientAssistantContext';
import { sendAmbientMessage } from '../../actions/ambient-action';
import './AmbientAssistant.css';

// Using Lucide icons for consistency
const EditIcon = () => <Edit size={18} />;
const MinimizeIcon = () => <Minimize2 size={18} />;
const PlusIcon = () => <Plus size={20} />;
const ArrowUpIcon = () => <ArrowUp size={20} strokeWidth={2.5} />; // Thicker stroke
const CloseIcon = () => <X size={14} />;


// File type icons
const FileTypeIcon = ({ type }: { type: string }) => {
    const isPdf = type.includes('pdf');

    if (isPdf) {
        return (
            <div className="file-icon file-icon-pdf">
                <span>PDF</span>
            </div>
        );
    }
    return (
        <div className="file-icon file-icon-doc">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z" />
            </svg>
        </div>
    );
};

// Format message with markdown-like rendering
const formatMessage = (text: string) => {
    if (!text) return null;

    // Split by double newlines for paragraphs
    const paragraphs = text.split(/\n\n+/);

    return paragraphs.map((paragraph, pIndex) => {
        // Check for bold title pattern (text ending with colon or starting a sentence)
        const lines = paragraph.split('\n');

        return (
            <div key={pIndex} className="ambient-paragraph">
                {lines.map((line, lIndex) => {
                    // Handle bold text with **
                    const parts = line.split(/(\*\*.*?\*\*)/g);
                    const formattedLine = parts.map((part, i) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={i}>{part.slice(2, -2)}</strong>;
                        }
                        return part;
                    });

                    // Check if this looks like a title (short, ends with : or is first line and bold)
                    const isTitle = lIndex === 0 && line.length < 80 &&
                        (line.endsWith(':') || line.includes('**'));

                    return (
                        <React.Fragment key={lIndex}>
                            {isTitle ? (
                                <div className="ambient-title">{formattedLine}</div>
                            ) : (
                                <>{formattedLine}{lIndex < lines.length - 1 && <br />}</>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        );
    });
};

// 3 prompt templates - black button style, pyramid layout
const PROMPT_TEMPLATES = [
    { label: 'Research', action: 'Tell me about Split funding options and how they work.' },
    { label: 'Summarize', action: 'Summarize my current application status and next steps.' },
    { label: 'Analyze', action: 'Analyze my business profile and suggest improvements.' },
];

// Size constraints
const MIN_WIDTH = 380;
const MAX_WIDTH = 800;
const MIN_HEIGHT = 480;
const MAX_HEIGHT = 900;
const DEFAULT_WIDTH = 440;
const DEFAULT_HEIGHT = 600;

interface Attachment {
    id: string;
    name: string;
    type: string;
    data: string;
    preview?: string;
}

export function AmbientAssistant() {
    const {
        isOpen,
        messages,
        pageContext,
        isLoading,
        conversationId,
        toggleAssistant,
        closeAssistant,
        addMessage,
        clearMessages,
        setLoading,
        setConversationId,
    } = useAmbientAssistant();

    const [input, setInput] = useState('');
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initial position logic
    // We want it to start at bottom right: right 20px, bottom 20px
    const [position, setPosition] = useState<{ x: number, y: number } | undefined>(undefined);
    const [size, setSize] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });

    // Set initial position on mount (client-side only)
    useEffect(() => {
        if (typeof window !== 'undefined' && !position) {
            setPosition({
                x: window.innerWidth - DEFAULT_WIDTH - 20,
                y: window.innerHeight - DEFAULT_HEIGHT - 20
            });
        }
    }, [position]);

    // Auto-resize textarea
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 150) + 'px';
        }
    }, [input]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input when panel opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // ========== FILE HANDLING ==========
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const maxFiles = 12;
        const remaining = maxFiles - attachments.length;
        const filesToAdd = Array.from(files).slice(0, remaining);

        filesToAdd.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    const newAttachment: Attachment = {
                        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                        name: file.name,
                        type: file.type,
                        data: event.target.result as string,
                    };

                    if (file.type.startsWith('image/')) {
                        newAttachment.preview = event.target.result as string;
                    }

                    setAttachments(prev => [...prev, newAttachment]);
                }
            };
            reader.readAsDataURL(file);
        });

        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeAttachment = (id: string) => {
        setAttachments(prev => prev.filter(a => a.id !== id));
    };

    // ========== MESSAGE HANDLING ==========
    const handleSubmit = async (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText && attachments.length === 0) return;
        if (isLoading) return;

        let content = messageText;
        if (attachments.length > 0) {
            content = messageText || `Uploaded ${attachments.length} file(s)`;
        }

        addMessage({ role: 'user', content });

        const currentAttachments = [...attachments];
        setInput('');
        setAttachments([]);
        setLoading(true);

        try {
            const firstAttachment = currentAttachments[0];
            const response = await sendAmbientMessage(
                messageText,
                pageContext,
                conversationId, // Pass current conversation ID
                firstAttachment ? { data: firstAttachment.data, type: firstAttachment.type } : undefined
            );

            // Update conversation ID if it was new
            if (response.conversationId && response.conversationId !== conversationId) {
                setConversationId(response.conversationId);
            }

            addMessage({
                role: 'assistant',
                content: response.text,
                embeddedComponent: response.embeddedComponent,
            });

            if (response.action?.type === 'navigate' && response.action.destination) {
                window.location.href = response.action.destination;
            }
        } catch (error) {
            console.error('Ambient assistant error:', error);
            addMessage({
                role: 'assistant',
                content: 'I apologize, but I encountered an issue. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleNewChat = () => {
        clearMessages();
        setInput('');
        setAttachments([]);
    };

    return (
        <React.Fragment>
            {/* 
              Mount Rnd only when open. 
            */}
            {isOpen && position ? (
                <Rnd
                    size={size}
                    position={position}
                    onDragStop={(e, d) => {
                        setPosition({ x: d.x, y: d.y });
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        setSize({
                            width: parseInt(ref.style.width),
                            height: parseInt(ref.style.height),
                        });
                        setPosition(position);
                    }}
                    minWidth={MIN_WIDTH}
                    minHeight={MIN_HEIGHT}
                    maxWidth={MAX_WIDTH}
                    maxHeight={MAX_HEIGHT}
                    bounds="window"
                    enableResizing={true}
                    disableDragging={false}
                    className="z-50"
                    dragHandleClassName="" // Empty = entire element is handle (except form elements usually)
                    cancel="button" // Cancel drag on buttons so clicking them works reliably
                    style={{ position: 'fixed', zIndex: 9999 }}
                >
                    <motion.div
                        className="ambient-panel"
                        initial={{ opacity: 0, scale: 0.96, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        style={{ width: '100%', height: '100%', position: 'relative' }} // ensure panel fills Rnd
                    >
                        {/* Header */}
                        <div className="ambient-header">
                            <HistoryDropdown />
                            <div className="ambient-header-spacer" />
                            <div className="ambient-header-actions">
                                <button
                                    className="ambient-icon-btn"
                                    onClick={(e) => { e.stopPropagation(); handleNewChat(); }}
                                    title="New chat"
                                    onPointerDown={(e) => e.stopPropagation()}
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    className="ambient-icon-btn"
                                    onClick={(e) => { e.stopPropagation(); closeAssistant(); }}
                                    title="Minimize"
                                    onPointerDown={(e) => e.stopPropagation()}
                                >
                                    <MinimizeIcon />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            className="ambient-messages"
                            onPointerDown={(e) => e.stopPropagation()} // Stop drag when interacting with messages
                        >
                            {messages.length === 0 ? (
                                <div className="ambient-welcome">
                                    <AIAvatar className="w-12 h-12" />
                                    <h2 className="ambient-welcome-title">How can I help you today?</h2>

                                    {/* Prompt templates - pyramid layout */}
                                    <div className="ambient-prompts">
                                        <div className="ambient-prompts-row">
                                            <button
                                                className="ambient-prompt-btn"
                                                onClick={() => handleSubmit(PROMPT_TEMPLATES[0].action)}
                                            >
                                                {PROMPT_TEMPLATES[0].label}
                                            </button>
                                            <button
                                                className="ambient-prompt-btn"
                                                onClick={() => handleSubmit(PROMPT_TEMPLATES[1].action)}
                                            >
                                                {PROMPT_TEMPLATES[1].label}
                                            </button>
                                        </div>
                                        <div className="ambient-prompts-row">
                                            <button
                                                className="ambient-prompt-btn"
                                                onClick={() => handleSubmit(PROMPT_TEMPLATES[2].action)}
                                            >
                                                {PROMPT_TEMPLATES[2].label}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`ambient-message ambient-message-${message.role}`}
                                        >
                                            {message.role === 'assistant' && (
                                                <AIAvatar className="w-7 h-7 flex-shrink-0 mt-1" />
                                            )}
                                            <div className="ambient-message-content">
                                                {message.role === 'assistant'
                                                    ? formatMessage(message.content)
                                                    : message.content
                                                }
                                                {/* Placeholder for Generative UI rendering */}
                                                {message.embeddedComponent && (
                                                    <div className="text-xs text-gray-400 mt-2 border border-dashed border-gray-300 p-2 rounded">
                                                        [Generated UI: {message.embeddedComponent.type}]
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="ambient-message ambient-message-assistant">
                                            <AIAvatar className="w-7 h-7 flex-shrink-0" />
                                            <div className="ambient-loading">
                                                <div className="ambient-loading-dot" />
                                                <div className="ambient-loading-dot" />
                                                <div className="ambient-loading-dot" />
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Attachments Preview */}
                        {attachments.length > 0 && (
                            <div className="ambient-attachments">
                                {attachments.map((attachment) => (
                                    <div key={attachment.id} className="ambient-attachment-card">
                                        {attachment.preview ? (
                                            <img
                                                src={attachment.preview}
                                                alt={attachment.name}
                                                className="ambient-attachment-preview"
                                            />
                                        ) : (
                                            <FileTypeIcon type={attachment.type} />
                                        )}
                                        <div className="ambient-attachment-info">
                                            <span className="ambient-attachment-name">{attachment.name}</span>
                                            <span className="ambient-attachment-type">
                                                {attachment.type.split('/')[1]?.toUpperCase() || 'FILE'}
                                            </span>
                                        </div>
                                        <button
                                            className="ambient-attachment-remove"
                                            onClick={() => removeAttachment(attachment.id)}
                                        >
                                            <CloseIcon />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="ambient-input-area">
                            <div className="ambient-input-container">
                                <textarea
                                    ref={inputRef}
                                    className="ambient-input"
                                    placeholder="Ask a question about this page..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    rows={1}
                                />
                                <div className="ambient-input-actions">
                                    <button
                                        className="ambient-icon-btn"
                                        title="Add file"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <PlusIcon />
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="ambient-file-input-hidden"
                                        accept="image/*,.pdf,.doc,.docx,.txt"
                                        onChange={handleFileSelect}
                                        multiple
                                    />
                                    <button
                                        className="ambient-send-btn"
                                        onClick={() => handleSubmit()}
                                        title="Send message"
                                    >
                                        <ArrowUpIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </Rnd>
            ) : (
                <AnimatePresence>
                    {!isOpen && (
                        <motion.button
                            className="ambient-trigger"
                            onClick={toggleAssistant}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            title="Open AI Assistant"
                            style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 50 }}
                        >
                            <AIAvatar className="w-full h-full" />
                        </motion.button>
                    )}
                </AnimatePresence>
            )}
        </React.Fragment>
    );
}

export default AmbientAssistant;
