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

    const formData = await req.formData()
    const audioFile = formData.get("audio") as File

    if (!audioFile) {
      return new Response("Audio file is required", { status: 400 })
    }

    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
    })

    return Response.json({ transcription: transcription.text })
  } catch (error) {
    console.error("Transcription error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
