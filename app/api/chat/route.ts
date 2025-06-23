import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const { messages } = await req.json()

    console.log("Chat API called with messages:", messages?.length || 0)

    const result = streamText({
      model: openai("gpt-3.5-turbo"),
      messages: messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API Error:", error)
    return new Response("Error occurred", { status: 500 })
  }
}
