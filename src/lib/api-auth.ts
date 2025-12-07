export function validateApiKey(request: Request): boolean {
  // Accept either `Authorization: Bearer <key>` or `x-api-key` header (used by MCP)
  const authHeader = request.headers.get("authorization") || request.headers.get("Authorization")
  const apiKeyHeader = request.headers.get("x-api-key") || request.headers.get("X-API-Key")

  const providedKey = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : apiKeyHeader
  const validKey = process.env.SPLIT_API_KEY

  if (!validKey) {
    console.error("SPLIT_API_KEY not configured")
    return false
  }

  if (!providedKey) return false

  if (providedKey.length !== validKey.length) {
    return false
  }

  let result = 0
  for (let i = 0; i < providedKey.length; i++) {
    result |= providedKey.charCodeAt(i) ^ validKey.charCodeAt(i)
  }

  return result === 0
}
