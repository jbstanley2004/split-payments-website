'use server';

import { createAdminClient } from '@/lib/supabase/admin';

export async function updateUserCredentials(uid: string, newEmail: string, newPassword?: string) {
    try {
        console.log(`[AdminAuth] Updating credentials for user: ${uid}`);
        const supabase = createAdminClient();

        if (!supabase) {
            console.warn('[AdminAuth] Supabase not configured; skipping credential update.');
            return { success: false, error: 'Supabase is not configured.' };
        }

        // Update the user's email and password directly.
        // This preserves the UID and application data linkage.
        const { data: user, error } = await supabase.auth.admin.updateUserById(
            uid,
            {
                email: newEmail,
                password: newPassword,
                email_confirm: true, // Auto-confirm the new email
                user_metadata: { email: newEmail } // Ensure metadata syncs
            }
        );

        if (error) throw error;

        // Optionally, we could remove OAuth identities here if we wanted to enforce strict Email/Pass,
        // but adding a password is sufficient to enable Email/Pass login.

        console.log(`[AdminAuth] Updated user: ${uid} with new credentials`);
        return { success: true };

    } catch (error: any) {
        console.error('[AdminAuth] Error updating user credentials:', error);
        return { success: false, error: error.message };
    }
}
