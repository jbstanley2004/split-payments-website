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
    
    // More lenient validation: area code must start with 2-9, but exchange can start with 0-9
    const match = normalized.match(/^([2-9]\d{2})(\d{3})(\d{4})$/);

    if (!match) {
        return {
            isValid: false,
            normalized: '',
            formatted: trimmed,
            reason: 'Enter a valid US phone number.'
        };
    }

    // Prevent obviously fake numbers made of the same digit (e.g., 1111111111)
    if (/^(\d)\1{9}$/.test(normalized)) {
        return {
            isValid: false,
            normalized: '',
            formatted: trimmed,
            reason: 'Enter a working US phone number, not repeating digits.'
        };
    }

    return {
        isValid: true,
        normalized,
        formatted: formatNormalizedPhone(normalized)
    };
};

/**
 * Attempt to verify the phone number against Veriphone API (free tier: 250 requests/month).
 * Falls back to local validation when no API key is provided or the request fails.
 */
export const verifyPhoneNumberWithApi = async (
    input: string,
    { signal }: RemoteVerificationOptions = {}
): Promise<RemotePhoneVerificationResult> => {
    const localResult = verifyPhoneNumber(input);
    const apiKey = process.env.NEXT_PUBLIC_VERIPHONE_API_KEY;
    const endpoint = 'https://api.veriphone.io/v2/verify';

    if (!localResult.isValid) {
        return { ...localResult, checkedWithApi: false };
    }

    // If no API key, just return local validation
    if (!apiKey) {
        return { ...localResult, checkedWithApi: false };
    }

    try {
        const params = new URLSearchParams({
            key: apiKey,
            phone: `+1${localResult.normalized}`, // Veriphone expects international format
            country: 'US'
        });

        const response = await fetch(`${endpoint}?${params.toString()}`, { signal });
        if (!response.ok) {
            throw new Error('Veriphone API unavailable');
        }

        const data = await response.json();
        
        // Veriphone response structure: { status: "success", phone: "+1...", phone_valid: true, phone_type: "mobile", country: "US", ... }
        const apiValid = Boolean(
            data?.status === 'success' &&
            data?.phone_valid === true &&
            data?.country === 'US' &&
            data?.phone_type && 
            ['mobile', 'landline', 'fixed_line'].includes(data.phone_type)
        );

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
