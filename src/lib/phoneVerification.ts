export interface PhoneVerificationResult {
    isValid: boolean;
    normalized: string;
    formatted: string;
    reason?: string;
}

export interface RemotePhoneVerificationResult extends PhoneVerificationResult {
    checkedWithApi: boolean;
}

interface RemoteVerificationOptions {
    signal?: AbortSignal;
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

/**
 * Attempt to verify the phone number against a free carrier-aware API (Abstract Phone Validation).
 * Falls back to local validation when no API key is provided or the request fails.
 */
export const verifyPhoneNumberWithApi = async (
    input: string,
    { signal }: RemoteVerificationOptions = {}
): Promise<RemotePhoneVerificationResult> => {
    const localResult = verifyPhoneNumber(input);
    const apiKey = process.env.NEXT_PUBLIC_ABSTRACT_PHONE_API_KEY;
    const endpoint = process.env.NEXT_PUBLIC_ABSTRACT_PHONE_ENDPOINT || 'https://phonevalidation.abstractapi.com/v1/';

    if (!localResult.isValid || !apiKey) {
        return { ...localResult, checkedWithApi: false };
    }

    try {
        const params = new URLSearchParams({
            api_key: apiKey,
            phone: localResult.normalized,
            country: 'US'
        });

        const response = await fetch(`${endpoint}?${params.toString()}`, { signal });
        if (!response.ok) {
            throw new Error('Validation API unavailable');
        }

        const data = await response.json();
        const apiValid = Boolean(data?.valid && data?.country?.code === 'US' && data?.type !== 'invalid');

        if (!apiValid) {
            return {
                isValid: false,
                normalized: '',
                formatted: input.trim(),
                reason: 'This number could not be confirmed as active. Please double-check and try again.',
                checkedWithApi: true
            };
        }

        return {
            ...localResult,
            checkedWithApi: true
        };
    } catch (error) {
        return {
            ...localResult,
            checkedWithApi: false,
            reason: localResult.reason || 'Unable to confirm number right now. Please try again.'
        };
    }
};
