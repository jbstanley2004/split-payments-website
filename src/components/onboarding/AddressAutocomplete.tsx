"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from '@/hooks/useDebounce';

interface AddressAutocompleteProps {
    label: string;
    value?: string;
    onChange: (address: string, city: string, state: string, zip: string) => void;
    error?: string;
    helperText?: string;
    placeholder?: string;
    className?: string;
}

interface Prediction {
    placePrediction: {
        placeId: string;
        text: {
            text: string;
        };
        structuredFormat: {
            mainText: { text: string };
            secondaryText: { text: string };
        };
    };
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
    const [inputValue, setInputValue] = useState(value || '');
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Use local debounced value for API calls
    const debouncedInput = useDebounce(inputValue, 500);
    const containerRef = useRef<HTMLDivElement>(null);

    // Sync prop value to state if it changes externally
    useEffect(() => {
        if (value !== undefined && value !== inputValue) {
            setInputValue(value);
        }
    }, [value]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch predictions (New Places API v1)
    useEffect(() => {
        const fetchPredictions = async () => {
            if (!debouncedInput || debouncedInput.length < 3) {
                setPredictions([]);
                return;
            }

            // If input matches the current saved value, don't search (user is looking at saved state)
            // But we can't easily track "saved state" vs "typing", so we search if length > 3
            // Optimization: If inputs match prop value, maybe skip? No, user might want to edit.

            setIsLoading(true);
            try {
                const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
                if (!apiKey) throw new Error("Missing Google Maps API Key");

                const response = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Goog-Api-Key': apiKey,
                    },
                    body: JSON.stringify({
                        input: debouncedInput,
                        includedPrimaryTypes: ['street_address', 'premise', 'subpremise', 'route'],
                        includedRegionCodes: ['us'],
                    }),
                });

                const data = await response.json();
                if (data.suggestions) {
                    setPredictions(data.suggestions);
                    setIsOpen(true);
                } else {
                    setPredictions([]);
                }
            } catch (err) {
                console.error('Error fetching autocomplete:', err);
                setPredictions([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPredictions();
    }, [debouncedInput]);

    const handleSelect = async (prediction: Prediction) => {
        const placeId = prediction.placePrediction.placeId;
        const mainText = prediction.placePrediction.text.text;

        // Optimistic update of input
        setInputValue(mainText);
        setIsOpen(false);

        try {
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
            const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}?fields=addressComponents,formattedAddress`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': apiKey || '',
                    'X-Goog-FieldMask': 'addressComponents,formattedAddress'
                }
            });

            const data = await response.json();

            if (data) {
                let streetNumber = '';
                let route = '';
                let city = '';
                let state = '';
                let zip = '';
                // Prefer formattedAddress, or construct it
                let fullAddress = data.formattedAddress || mainText;

                if (data.addressComponents) {
                    data.addressComponents.forEach((component: any) => {
                        const types = component.types;
                        if (types.includes('street_number')) {
                            streetNumber = component.longText;
                        }
                        if (types.includes('route')) {
                            route = component.longText;
                        }
                        if (types.includes('locality') || types.includes('sublocality')) {
                            city = component.longText;
                        }
                        if (types.includes('administrative_area_level_1')) {
                            state = component.shortText;
                        }
                        if (types.includes('postal_code')) {
                            zip = component.longText;
                        }
                    });
                }

                const constructedStreet = `${streetNumber} ${route}`.trim();
                if (constructedStreet) {
                    // Update fullAddress to be just the street part if possible, 
                    // allowing city/state/zip to be separate
                    // But usually users want the "Full line 1"
                    fullAddress = constructedStreet;
                }

                // Update Input with the Clean Address
                setInputValue(fullAddress);

                // Propagate to parent
                onChange(fullAddress, city, state, zip);
            }

        } catch (err) {
            console.error('Error fetching place details:', err);
        }
    };

    const inputId = label.toLowerCase().replace(/\s+/g, '-');

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1.5 relative z-20"
            ref={containerRef}
        >
            <label htmlFor={inputId} className="text-xs font-semibold tracking-wide text-black/70">
                {label}
            </label>
            <div className="relative">
                <input
                    id={inputId}
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        // If user clears input, allow it
                        if (e.target.value === '') {
                            setIsOpen(false);
                            onChange('', '', '', '');
                        }
                    }}
                    onFocus={() => {
                        if (predictions.length > 0) setIsOpen(true);
                    }}
                    placeholder={placeholder || "Enter address"}
                    className={`w-full rounded-xl px-4 py-3 text-base text-black transition-all outline-none ${error
                        ? 'border border-red-400 focus:border-red-500 bg-white'
                        : 'bg-[#F6F5F4] border border-transparent focus:bg-white focus:ring-2 focus:ring-black/5 focus:border-black/10'
                        } ${className}`}
                    autoComplete="off"
                />

                {/* Custom Dropdown */}
                <AnimatePresence>
                    {isOpen && predictions.length > 0 && (
                        <motion.ul
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute z-50 left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-60 overflow-y-auto"
                        >
                            {predictions.map((prediction) => (
                                <li
                                    key={prediction.placePrediction.placeId}
                                    onClick={() => handleSelect(prediction)}
                                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-none flex flex-col"
                                >
                                    <span className="font-medium text-black text-sm">
                                        {prediction.placePrediction.structuredFormat.mainText.text}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {prediction.placePrediction.structuredFormat.secondaryText?.text}
                                    </span>
                                </li>
                            ))}
                            {/* Powered by Google Footer? Technically required by ToS */}
                            <li className="px-4 py-2 bg-gray-50 flex justify-end">
                                <span className="text-[10px] text-gray-400">Powered by Google</span>
                            </li>
                        </motion.ul>
                    )}
                </AnimatePresence>
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
