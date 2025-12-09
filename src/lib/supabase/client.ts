
import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseAnonKey, getSupabaseUrl } from './env'

export function createClient() {
    const url = getSupabaseUrl()
    const anonKey = getSupabaseAnonKey()

    if (!url || !anonKey) {
        console.warn('[supabase/client] Missing Supabase envs; returning null client.')
        return null as unknown as ReturnType<typeof createBrowserClient>
    }

    return createBrowserClient(
        url,
        anonKey,
    )
}
