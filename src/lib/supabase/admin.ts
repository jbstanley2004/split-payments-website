
import { createClient } from '@supabase/supabase-js'
import { getSupabaseServiceKey, getSupabaseUrl } from './env'

export function createAdminClient() {
    const url = getSupabaseUrl()
    const serviceRoleKey = getSupabaseServiceKey()

    if (!url || !serviceRoleKey) {
        console.warn('[supabase/admin] Missing Supabase envs; returning null admin client.')
        return null as unknown as ReturnType<typeof createClient>
    }

    return createClient(
        url,
        serviceRoleKey,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    )
}
