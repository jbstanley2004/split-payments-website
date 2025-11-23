import React, { InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    helperText?: string;
}

export function FormInput({ label, error, helperText, id, className = '', ...props }: FormInputProps) {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1.5"
        >
            <label htmlFor={inputId} className="text-xs font-semibold tracking-wide text-black/70">
                {label}
            </label>
            <input
                id={inputId}
                className={`rounded-xl border bg-white px-3.5 py-2.5 text-sm text-black outline-none transition-all ${error
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-[#FF4306] focus:ring-2 focus:ring-[#FF4306]/10'
                    } ${className}`}
                {...props}
            />
            {error && (
                <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs text-red-500"
                >
                    {error}
                </motion.p>
            )}
            {helperText && !error && (
                <p className="text-xs text-black/50">
                    {helperText}
                </p>
            )}
        </motion.div>
    );
}
