import type { NextRequest } from "next/server"

export async function GET() {
  try {
    // Check environment variables
    const hasOpenAIKey = !!process.env.OPENAI_API_KEY
    const keyLength = process.env.OPENAI_API_KEY?.length || 0

    return Response.json({
      status: "Debug info",
      hasOpenAIKey,
      keyLength,
      keyPrefix: process.env.OPENAI_API_KEY?.substring(0, 7) + "...",
      nodeVersion: process.version,
    })
  } catch (error) {
    return Response.json({ error: error }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("=== DEBUG CHAT API START ===")

    // Check if we have OpenAI key
    if (!process.env.OPENAI_API_KEY) {
      console.log("❌ No OpenAI API key found")
      return Response.json({ error: "No OpenAI API key configured" }, { status: 500 })
    }

    console.log("✅ OpenAI API key found, length:", process.env.OPENAI_API_KEY.length)

    const body = await req.json()
    console.log("📝 Request body:", JSON.stringify(body, null, 2))

    // Test direct OpenAI API call
    const OpenAI = require("openai")
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    console.log("🤖 Making OpenAI API call...")

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say hello" }],
      max_tokens: 50,
    })

    console.log("✅ OpenAI API response:", completion.choices[0]?.message?.content)

    return Response.json({
      success: true,
      response: completion.choices[0]?.message?.content,
      usage: completion.usage,
    })
  } catch (error) {
    console.error("❌ Debug chat error:", error)
    let errorMessage = "Unknown error";
    let errorType = "Unknown";
    let errorStack = undefined;
    if (error && typeof error === "object") {
      if ("message" in error && typeof (error as any).message === "string") {
        errorMessage = (error as any).message;
      }
      if ("constructor" in error && (error as any).constructor?.name) {
        errorType = (error as any).constructor.name;
      }
      if ("stack" in error && typeof (error as any).stack === "string") {
        errorStack = (error as any).stack;
      }
    }
    return Response.json(
      {
        error: errorMessage,
        type: errorType,
        stack: errorStack,
      },
      { status: 500 },
    )
  }
}
