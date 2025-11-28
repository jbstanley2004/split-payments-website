"use client";

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle } from 'lucide-react';

interface FileUploadWidgetProps {
    onFilesSelected: (files: File[]) => void;
    acceptedTypes?: string;
}

export function FileUploadWidget({
    onFilesSelected,
    acceptedTypes = "application/pdf,image/*,.doc,.docx"
}: FileUploadWidgetProps) {
    const [isDragging, setIsDragging] = React.useState(false);

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
        onFilesSelected(droppedFiles);
    }, [onFilesSelected]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            onFilesSelected(selectedFiles);
        }
    }, [onFilesSelected]);

    return (
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
            </label>
        </div>
    );
}
