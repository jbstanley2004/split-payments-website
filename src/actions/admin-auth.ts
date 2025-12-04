'use server';

import { getAdminAuth } from '@/lib/firebase-admin';

export async function updateUserCredentials(uid: string, newEmail: string, newPassword?: string) {
    try {
        console.log(`[AdminAuth] Updating credentials for user: ${uid}`);
        const auth = getAdminAuth();

        // 1. Get existing user record
        const userRecord = await auth.getUser(uid);
        console.log(`[AdminAuth] Found user: ${userRecord.email}`);

        // 2. Delete the user
        // This removes all providers (including Google)
        await auth.deleteUser(uid);
        console.log(`[AdminAuth] Deleted user: ${uid}`);

        // 3. Recreate the user with the same UID
        // This effectively "resets" them to an email/password user
        const newUser = await auth.createUser({
            uid: uid,
            email: newEmail,
            password: newPassword, // Required for email/password auth
            displayName: userRecord.displayName,
            photoURL: userRecord.photoURL,
            emailVerified: true, // Auto-verify since admin is doing it
        });

        // 4. Restore custom claims if any
        if (userRecord.customClaims) {
            await auth.setCustomUserClaims(uid, userRecord.customClaims);
        }

        // 4. Restore custom claims if any
        if (userRecord.customClaims) {
            await admin.auth().setCustomUserClaims(uid, userRecord.customClaims);
        }

        console.log(`[AdminAuth] Recreated user: ${newUser.uid} with new credentials`);
        return { success: true };

    } catch (error: any) {
        console.error('[AdminAuth] Error updating user credentials:', error);
        return { success: false, error: error.message };
    }
}
