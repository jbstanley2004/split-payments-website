export interface GovernmentIdVerificationResult {
    isValid: boolean;
    normalized: string;
    formatted: string;
    reason?: string;
}

export const digitsOnly = (input: string) => input.replace(/\D/g, "");

export const formatEin = (value: string): string => {
    const digits = digitsOnly(value).slice(0, 9);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}-${digits.slice(2)}`;
};

export const formatSsn = (value: string): string => {
    const digits = digitsOnly(value).slice(0, 9);
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
};

export const verifyEin = (value: string): GovernmentIdVerificationResult => {
    const normalized = digitsOnly(value).slice(0, 9);

    if (normalized.length !== 9) {
        return {
            isValid: false,
            normalized: "",
            formatted: formatEin(value),
            reason: "Enter a 9-digit EIN (XX-XXXXXXX)."
        };
    }

    if (/^(\d)\1{8}$/.test(normalized)) {
        return {
            isValid: false,
            normalized: "",
            formatted: formatEin(normalized),
            reason: "Enter a working EIN, not repeating digits."
        };
    }

    if (/^00/.test(normalized)) {
        return {
            isValid: false,
            normalized: "",
            formatted: formatEin(normalized),
            reason: "EIN cannot start with 00."
        };
    }

    return {
        isValid: true,
        normalized,
        formatted: formatEin(normalized)
    };
};

export const verifySsn = (value: string): GovernmentIdVerificationResult => {
    const normalized = digitsOnly(value).slice(0, 9);

    if (normalized.length !== 9) {
        return {
            isValid: false,
            normalized: "",
            formatted: formatSsn(value),
            reason: "Enter a 9-digit SSN (XXX-XX-XXXX)."
        };
    }

    if (/^(\d)\1{8}$/.test(normalized)) {
        return {
            isValid: false,
            normalized: "",
            formatted: formatSsn(normalized),
            reason: "Enter a real SSN, not repeating digits."
        };
    }

    const area = normalized.slice(0, 3);
    const group = normalized.slice(3, 5);
    const serial = normalized.slice(5);

    if (area === "000" || area === "666" || Number(area) >= 900) {
        return {
            isValid: false,
            normalized: "",
            formatted: formatSsn(normalized),
            reason: "SSN area number is invalid."
        };
    }

    if (group === "00" || serial === "0000") {
        return {
            isValid: false,
            normalized: "",
            formatted: formatSsn(normalized),
            reason: "SSN group/serial numbers are invalid."
        };
    }

    return {
        isValid: true,
        normalized,
        formatted: formatSsn(normalized)
    };
};
