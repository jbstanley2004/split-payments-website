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
    }, [files, maxFiles, onChange]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            const newFiles = [...files, ...selectedFiles].slice(0, maxFiles);
            onChange(newFiles);
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
                className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ${isDragging
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
                    className="flex flex-col items-center justify-center gap-3 px-6 py-12 cursor-pointer"
                >
                    <motion.div
                        animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                        className="rounded-full p-4 bg-white"
                    >
                        <Upload className="h-8 w-8 text-black/70" />
                    </motion.div>

                    <div className="text-center">
                        <p className="text-sm font-semibold text-black">
                            Drop merchant statements here or click to browse
                        </p>
                        <p className="mt-1 text-xs text-black/50">
                            Upload your merchant statements (PDF, images, or documents)
                        </p>
                    </div>

                    {files.length > 0 && (
                        <div className="text-xs text-black/60">
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
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex items-center gap-3 rounded-xl bg-white border border-[gray-200] px-4 py-3"
                            >
                                <div className="flex-shrink-0">
                                    <div className="rounded-lg bg-[white] p-2">
                                        <FileText className="h-5 w-5 text-[brand-black/70]" />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-[brand-black] truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-[brand-black/50]">
                                        {formatFileSize(file.size)}
                                    </p>
                                </div>

                                <button
                                    onClick={() => removeFile(index)}
                                    className="flex-shrink-0 rounded-full p-1.5 hover:bg-red-50 text-[brand-black/50] hover:text-red-600 transition-colors"
                                    aria-label="Remove file"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
