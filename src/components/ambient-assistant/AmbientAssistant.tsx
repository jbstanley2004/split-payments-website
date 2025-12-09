'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rnd } from 'react-rnd';
import { useAmbientAssistant } from '../../contexts/AmbientAssistantContext';
import { sendAmbientMessage } from '../../actions/ambient-action';
import { AmbientPanel } from './AmbientPanel';
import { MobileAmbientWrapper } from './MobileAmbientWrapper';
import { AIAvatar } from '../funding-concierge/AIAvatar';
import './AmbientAssistant.css';

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
    const [isMobile, setIsMobile] = useState(false);

    // Initial setup: check mobile and set position
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkMobile = () => {
                setIsMobile(window.innerWidth < 768);
            };

            checkMobile();
            window.addEventListener('resize', checkMobile);

            // Initialize position if not set
            if (!position && window.innerWidth >= 768) {
                setPosition({
                    x: window.innerWidth - DEFAULT_WIDTH - 20,
                    y: window.innerHeight - DEFAULT_HEIGHT - 20
                });
            }

            return () => window.removeEventListener('resize', checkMobile);
        }
    }, [position]);

    // Safeguard: Ensure position is valid when opening on desktop
    useEffect(() => {
        if (isOpen && !isMobile && !position && typeof window !== 'undefined') {
            setPosition({
                x: window.innerWidth - DEFAULT_WIDTH - 20,
                y: window.innerHeight - DEFAULT_HEIGHT - 20
            });
        }
    }, [isOpen, isMobile, position]);

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

    const panelProps = {
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
        onKeyDown: handleKeyDown,
        promptTemplates: PROMPT_TEMPLATES
    };

    return (
        <React.Fragment>
            {isMobile ? (
                <MobileAmbientWrapper
                    isOpen={isOpen}
                    onClose={closeAssistant}
                    panelProps={panelProps}
                />
            ) : (
                /* Desktop View: Draggable Rnd */
                <AnimatePresence>
                    {isOpen && position && (
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
                            cancel="button, textarea, input, .ambient-messages" // Cancel drag on interactive elements
                            style={{ position: 'fixed', zIndex: 9999 }}
                        >
                            <motion.div
                                className="ambient-panel"
                                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                                transition={{ duration: 0.2, ease: 'easeOut' }}
                                style={{ width: '100%', height: '100%', position: 'relative' }}
                            >
                                <AmbientPanel {...panelProps} />
                            </motion.div>
                        </Rnd>
                    )
                    }
                </AnimatePresence>
            )}

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
        </React.Fragment>
    );
}

export default AmbientAssistant;
