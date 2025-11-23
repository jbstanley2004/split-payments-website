"use client";

import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, CheckCircle } from 'lucide-react';

interface FileUploadZoneProps {
    files: File[];
    onChange: (files: File[]) => void;
    maxFiles?: number;
    acceptedTypes?: string;
}

export function FileUploadZone({
    files,
    onChange,
    maxFiles = 999,
    acceptedTypes = "application/pdf,image/*,.doc,.docx"
}: FileUploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        const newFiles = [...files, ...droppedFiles].slice(0, maxFiles);
        onChange(newFiles);

        // Trigger icon animation
        setAnimationKey(prev => prev + 1);
    }, [files, maxFiles, onChange]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            const newFiles = [...files, ...selectedFiles].slice(0, maxFiles);
            onChange(newFiles);

            // Trigger icon animation
            setAnimationKey(prev => prev + 1);
        }
    }, [files, maxFiles, onChange]);

    const removeFile = useCallback((index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        onChange(newFiles);
    }, [files, onChange]);

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="space-y-4">
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden ${isDragging
                    ? 'border-black bg-black/5'
                    : 'border-gray-200 bg-white/50'
                    }`}
            >
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    multiple
                    accept={acceptedTypes}
                    onChange={handleFileSelect}
                />

                <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center gap-3 px-6 py-12 cursor-pointer relative"
                >
                    <motion.div
                        animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                        className="rounded-full p-4 bg-white relative z-10 overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            {files.length > 0 ? (
                                <motion.div
                                    key={`check-${animationKey}`}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 180 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 15
                                    }}
                                >
                                    <CheckCircle className="h-8 w-8 text-[#FF4306]" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={`upload-${animationKey}`}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 180 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 15
                                    }}
                                >
                                    <Upload className="h-8 w-8 text-black/70" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <div className="text-center relative z-10">
                        <p className="text-sm font-semibold text-black">
                            Drop merchant statements here or click to browse
                        </p>
                        <p className="mt-1 text-xs text-black/50">
                            Upload your merchant statements (PDF, images, or documents)
                        </p>
                    </div>

                    {files.length > 0 && (
                        <div className="text-xs text-black/60 relative z-10">
                            {files.length} file{files.length !== 1 ? 's' : ''} uploaded
                        </div>
                    )}
                </label>
            </div>

            <AnimatePresence mode="popLayout">
                {files.length > 0 && (
                    <div className="space-y-2">
                        {files.map((file, index) => (
                            <motion.div
                                key={`${file.name}-${index}`}
                                initial={{
                                    opacity: 0,
                                    y: -50,
                                    rotate: index % 2 === 0 ? -5 : 5,
                                    scale: 0.9
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    rotate: 0,
                                    scale: 1
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.9,
                                    x: -40,
                                    transition: { duration: 0.2 }
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    mass: 0.8,
                                    delay: index * 0.08
                                }}
                                whileHover={{
                                    y: -2,
                                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)"
                                }}
                                className="flex items-center gap-3 rounded-xl bg-white border border-gray-200 px-4 py-3"
                                style={{
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
                                }}
                            >
                                <motion.div
                                    className="flex-shrink-0"
                                    initial={{ rotate: -15, scale: 0 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 15,
                                        delay: index * 0.08 + 0.1
                                    }}
                                >
                                    <div className="rounded-lg bg-gray-50 p-2">
                                        <FileText className="h-5 w-5 text-black/70" />
                                    </div>
                                </motion.div>

                                <div className="flex-1 min-w-0">
                                    <motion.p
                                        className="text-sm font-medium text-black truncate"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.08 + 0.15 }}
                                    >
                                        {file.name}
                                    </motion.p>
                                    <motion.p
                                        className="text-xs text-black/50"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.08 + 0.2 }}
                                    >
                                        {formatFileSize(file.size)}
                                    </motion.p>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => removeFile(index)}
                                    className="flex-shrink-0 rounded-full p-1.5 hover:bg-red-50 text-black/50 hover:text-red-600 transition-colors"
                                    aria-label="Remove file"
                                >
                                    <X className="h-4 w-4" />
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
