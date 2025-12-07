"use client";

import React, { useEffect } from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getZipCode,
    getDetails,
} from 'use-places-autocomplete';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface AddressAutocompleteProps {
    label: string;
    value?: string;
    onChange: (address: string, city: string, state: string, zip: string) => void;
    error?: string;
    helperText?: string;
    placeholder?: string;
    className?: string;
}

export function AddressAutocomplete({
    label,
    value,
    onChange,
    error,
    helperText,
    placeholder,
    className = '',
}: AddressAutocompleteProps) {
    const {
        ready,
        value: inputValue,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
            componentRestrictions: { country: 'us' },
        },
        debounce: 300,
        defaultValue: value || '',
    });

    // Sync internal state with external value prop if it changes
    useEffect(() => {
        if (value !== undefined && value !== inputValue) {
            setValue(value, false);
        }
    }, [value, setValue]); // Removed inputValue from deps to avoid loop

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSelect = async (description: string) => {
        setValue(description, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address: description });
            const result = results[0];

            // Extract address components
            let streetNumber = '';
            let route = '';
            let city = '';
            let state = '';
            let zip = '';

            result.address_components.forEach((component) => {
                const types = component.types;
                if (types.includes('street_number')) {
                    streetNumber = component.long_name;
                }
                if (types.includes('route')) {
                    route = component.long_name;
                }
                if (types.includes('locality') || types.includes('sublocality')) {
                    city = component.long_name;
                }
                if (types.includes('administrative_area_level_1')) {
                    state = component.short_name;
                }
                if (types.includes('postal_code')) {
                    zip = component.long_name;
                }
            });

            const fullAddress = `${streetNumber} ${route}`.trim();

            // If we didn't get a street number/route, just use the description or part of it
            // But usually for business address we want the street line.
            // If the user selected a city/zip only, fullAddress might be empty.
            // Let's fallback to the description if fullAddress is empty, 
            // but ideally we want structured data.

            onChange(fullAddress || description, city, state, zip);

        } catch (error) {
            console.error('Error: ', error);
        }
    };

    const inputId = label.toLowerCase().replace(/\s+/g, '-');

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1.5 relative"
        >
            <label htmlFor={inputId} className="text-xs font-semibold tracking-wide text-black/70">
                {label}
            </label>
            <div className="relative">
                <input
                    id={inputId}
                    value={inputValue}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder={placeholder}
                    className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-base text-black outline-none transition-all ${error
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-gray-200 focus:border-[#FF4306] focus:ring-2 focus:ring-[#FF4306]/10'
                        } ${className}`}
                    autoComplete="off"
                />
                {status === 'OK' && (
                    <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-auto py-1">
                        {data.map(({ place_id, description, structured_formatting }) => (
                            <li
                                key={place_id}
                                onClick={() => handleSelect(description)}
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-start gap-3 transition-colors"
                            >
                                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <span className="block text-sm font-medium text-gray-900">
                                        {structured_formatting.main_text}
                                    </span>
                                    <span className="block text-xs text-gray-500">
                                        {structured_formatting.secondary_text}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
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
