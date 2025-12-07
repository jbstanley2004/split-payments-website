import { type NextRequest, NextResponse } from "next/server"
import { validateApiKey } from "@/lib/api-auth"

// In production, use proper authentication (Supabase, NextAuth, etc.)

const users = new Map<string, { id: string; email: string; passwordHash: string; name?: string }>()

export async function POST(req: NextRequest) {
  // Validate API key for external requests
  const isInternalRequest = req.headers.get("x-internal-request") === "true"
  if (!isInternalRequest && !validateApiKey(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { email, password, isSignUp, name } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    if (isSignUp) {
      const existingUser = Array.from(users.values()).find((u) => u.email === email)
      if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 409 })
      }

      const userId = `user_${Date.now().toString(36)}`
      users.set(userId, {
        id: userId,
        email,
        passwordHash: password,
        name,
      })

      return NextResponse.json({
        userId,
        email,
        name,
        message: "Account created successfully",
      })
    } else {
      const user = Array.from(users.values()).find((u) => u.email === email)
      if (!user || user.passwordHash !== password) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
      }

      return NextResponse.json({
        userId: user.id,
        email: user.email,
        name: user.name,
        message: "Signed in successfully",
      })
    }
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
