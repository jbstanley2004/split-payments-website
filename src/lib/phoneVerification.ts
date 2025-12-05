export interface PhoneVerificationResult {
    isValid: boolean;
    normalized: string;
    formatted: string;
    reason?: string;
}

const normalizeDigits = (input: string) => input.replace(/\D/g, '');

export const formatNormalizedPhone = (normalized: string): string => {
    if (normalized.length !== 10) return normalized;
    const area = normalized.slice(0, 3);
    const prefix = normalized.slice(3, 6);
    const line = normalized.slice(6);
    return `(${area}) ${prefix}-${line}`;
};

export const verifyPhoneNumber = (input: string): PhoneVerificationResult => {
    const trimmed = input.trim();
    const digits = normalizeDigits(trimmed);
    const normalized = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
    const isValid = normalized.length === 10;

    return {
        isValid,
        normalized: normalized || '',
        formatted: isValid ? formatNormalizedPhone(normalized) : trimmed,
        reason: isValid ? undefined : 'Enter a valid 10-digit phone number.'
    };
};
