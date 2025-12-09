import React, { useRef, useEffect } from 'react';
import { ArrowUp, Plus, X, Minimize2, Edit } from 'lucide-react';
import { HistoryDropdown } from './HistoryDropdown';
import { AIAvatar } from '../funding-concierge/AIAvatar';
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

interface Attachment {
    id: string;
    name: string;
    type: string;
    data: string;
    preview?: string;
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    embeddedComponent?: any;
}

interface AmbientPanelProps {
    messages: Message[];
    isLoading: boolean;
    input: string;
    setInput: (value: string) => void;
    attachments: Attachment[];
    removeAttachment: (id: string) => void;
    handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (text?: string) => void;
    handleNewChat: () => void;
    closeAssistant: () => void;
    inputRef: React.RefObject<HTMLTextAreaElement>;
    fileInputRef: React.RefObject<HTMLInputElement>;
    messagesEndRef: React.RefObject<HTMLDivElement>;
    onKeyDown: (e: React.KeyboardEvent) => void;
    promptTemplates: Array<{ label: string, action: string }>;
}

export function AmbientPanel({
    messages,
    isLoading,
    input,
    setInput,
    attachments,
    removeAttachment,
    handleFileSelect,
    handleSubmit,
    handleNewChat,
    closeAssistant,
    inputRef,
    fileInputRef,
    messagesEndRef,
    onKeyDown,
    promptTemplates
}: AmbientPanelProps) {

    // Auto-resize textarea
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto'; // Reset to auto
            // Use scrollHeight but cap it, and ensure a minimum
            const scrollHeight = inputRef.current.scrollHeight;
            inputRef.current.style.height = Math.min(Math.max(scrollHeight, 44), 150) + 'px';
        }
    }, [input, inputRef]);

    return (
        <React.Fragment>
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
                                    onClick={() => handleSubmit(promptTemplates[0].action)}
                                >
                                    {promptTemplates[0].label}
                                </button>
                                <button
                                    className="ambient-prompt-btn"
                                    onClick={() => handleSubmit(promptTemplates[1].action)}
                                >
                                    {promptTemplates[1].label}
                                </button>
                            </div>
                            <div className="ambient-prompts-row">
                                <button
                                    className="ambient-prompt-btn"
                                    onClick={() => handleSubmit(promptTemplates[2].action)}
                                >
                                    {promptTemplates[2].label}
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
                        onKeyDown={onKeyDown}
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
        </React.Fragment>
    );
}
