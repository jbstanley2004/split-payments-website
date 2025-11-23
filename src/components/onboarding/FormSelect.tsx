import React, { SelectHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    options: Array<{ value: string; label: string }>;
}

export function FormSelect({ label, error, options, id, className = '', ...props }: FormSelectProps) {
    const selectId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1.5"
        >
            <label htmlFor={selectId} className="text-xs font-semibold tracking-wide text-black/70">
                {label}
            </label>
            <select
                id={selectId}
                className={`rounded-xl border bg-white px-3.5 py-2.5 text-sm text-black outline-none transition-all ${error
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-200 focus:border-[#FF4306] focus:ring-2 focus:ring-[#FF4306]/10'
                    } ${className}`}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs text-red-500"
                >
                    {error}
                </motion.p>
            )}
        </motion.div>
    );
}
