"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, File, X, Check, AlertCircle } from "lucide-react";
import { Document, DocumentType, DOCUMENT_REQUIREMENTS } from "@/types/portal";

interface DocumentUploadProps {
    documentType: DocumentType;
    existingDocument?: Document;
    onUpload: (document: Document) => void;
    onRemove: () => void;
}

export default function DocumentUpload({
    documentType,
    existingDocument,
    onUpload,
    onRemove
}: DocumentUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const requirement = DOCUMENT_REQUIREMENTS[documentType];

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFile = (file: File) => {
        // Simulate upload
        setIsUploading(true);

        setTimeout(() => {
            const newDocument: Document = {
                id: `doc-${Date.now()}`,
                type: documentType,
                filename: file.name,
                uploadedAt: new Date(),
                status: 'uploaded',
                fileSize: file.size,
                fileUrl: URL.createObjectURL(file)
            };

            onUpload(newDocument);
            setIsUploading(false);
        }, 1500);
    };

    if (existingDocument) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-gray-300 transition-colors"
            >
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-6 h-6 text-black" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-black font-poppins">{requirement.title}</h4>
                            <p className="text-sm text-gray-500 mt-1 font-poppins">{existingDocument.filename}</p>
                            <p className="text-xs text-gray-400 mt-1 font-poppins">
                                Uploaded {existingDocument.uploadedAt.toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onRemove}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-6">
            <div className="mb-4">
                <h4 className="font-semibold text-black font-poppins">{requirement.title}</h4>
                <p className="text-sm text-gray-500 mt-1 font-poppins">{requirement.description}</p>
                <p className="text-xs text-gray-400 mt-1 font-poppins">
                    Accepted formats: {requirement.acceptedFormats.join(', ')}
                </p>
            </div>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative rounded-lg border-2 border-dashed transition-all ${isDragging
                    ? 'border-black bg-gray-50'
                    : 'border-gray-300 hover:border-gray-400'
                    }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={requirement.acceptedFormats.join(',')}
                    onChange={handleFileSelect}
                    className="hidden"
                />

                <div className="p-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-4 flex items-center justify-center">
                        {isUploading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <Upload className="w-6 h-6 text-gray-400" />
                            </motion.div>
                        ) : (
                            <Upload className="w-6 h-6 text-gray-400" />
                        )}
                    </div>

                    {isUploading ? (
                        <p className="text-sm text-gray-600 font-poppins">Uploading...</p>
                    ) : (
                        <>
                            <p className="text-sm text-gray-600 mb-2 font-poppins">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-black font-semibold hover:underline"
                                >
                                    Click to upload
                                </button>{" "}
                                or drag and drop
                            </p>
                            <p className="text-xs text-gray-400 font-poppins">
                                Maximum file size: 10MB
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
