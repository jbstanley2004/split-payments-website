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
    const match = normalized.match(/^([2-9]\d{2})([2-9]\d{2})(\d{4})$/);
    const isValid = Boolean(match);

    return {
        isValid,
        normalized: isValid ? normalized : '',
        formatted: isValid ? formatNormalizedPhone(normalized) : trimmed,
        reason: isValid ? undefined : 'Enter a valid US phone number with a 10-digit area/exchange starting at 2-9.'
    };
};
