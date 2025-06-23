import { auth } from "@clerk/nextjs/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const { prompt, size = "1024x1024", style = "natural" } = await req.json()

    if (!prompt || prompt.trim().length === 0) {
      return new Response("Prompt is required", { status: 400 })
    }

    // Validate prompt length (OpenAI has limits)
    if (prompt.length > 1000) {
      return new Response("Prompt is too long. Maximum 1000 characters.", { status: 400 })
    }

    console.log("Generating image with prompt:", prompt.substring(0, 100) + "...")

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt.trim(),
      size: size as "1024x1024" | "1024x1792" | "1792x1024",
      style: style as "natural" | "vivid",
      quality: "standard",
      n: 1,
    })

    if (!response.data || response.data.length === 0) {
      throw new Error("No image generated")
    }

    return Response.json({ imageUrl: response.data[0].url })
  } catch (error) {
    console.error("Image generation error:", error)

    // Handle specific OpenAI errors
    if (error === 400) {
      return new Response("Invalid request. Please check your prompt and try again.", { status: 400 })
    }

    if (error === "content_policy_violation") {
      return new Response("Content policy violation. Please modify your prompt.", { status: 400 })
    }

    return new Response("Failed to generate image. Please try again.", { status: 500 })
  }
}
