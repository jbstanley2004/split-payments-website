type EnvValue = string | undefined

function coalesceEnv(...values: EnvValue[]) {
  return values.find((value) => value && value.length > 0)
}

export function getSupabaseUrl() {
  return coalesceEnv(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_URL,
  )
}

export function getSupabaseAnonKey() {
  return coalesceEnv(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    process.env.SUPABASE_ANON_KEY,
  )
}

export function getSupabaseServiceKey() {
  return coalesceEnv(
    process.env.SUPABASE_SERVICE_KEY,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  )
}
