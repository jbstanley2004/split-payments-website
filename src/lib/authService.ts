
import { User } from '../types/funding-types';

// Mock database
let verificationCodes: Record<string, string> = {};
let users: Record<string, User> = {};

export const authService = {
    // Simulate sending an email via backend (e.g. SendGrid/AWS SES)
    requestVerificationCode: async (email: string, name: string): Promise<string> => {
        // In a real app, this would call your API
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

        // Generate a random 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        verificationCodes[email] = code;

        // FOR DEMO PURPOSES ONLY: Log code to console
        console.log(`[BACKEND MOCK] Verification email sent to ${email}. Code: ${code}`);

        // Return the code so the UI can auto-fill it for the demo/prototype experience
        return code;
    },

    // Verify the code matches backend record
    verifyCode: async (email: string, code: string): Promise<User | null> => {
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay

        if (verificationCodes[email] === code) {
            const newUser: User = {
                id: 'usr_' + Date.now(),
                email,
                name: 'Valued Merchant', // Placeholder until profile update, or pass name through
                verified: true
            };
            // Save user to "database"
            users[email] = newUser;
            return newUser;
        }
        return null;
    },

    // Simulate saving application progress to database
    saveProgress: async (userId: string, data: any) => {
        console.log(`[BACKEND MOCK] Saving progress for user ${userId}:`, data);
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    }
};
