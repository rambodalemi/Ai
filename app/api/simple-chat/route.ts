export async function POST(req: Request) {
  try {
    console.log("Simple chat API called")

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ error: "No API key" }, { status: 500 })
    }

    const { message } = await req.json()
    console.log("Received message:", message)

    // Simple fetch to OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        max_tokens: 100,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("OpenAI API error:", response.status, errorText)
      return Response.json({ error: `OpenAI API error: ${response.status}` }, { status: 500 })
    }

    const data = await response.json()
    console.log("OpenAI response:", data)

    return Response.json({
      reply: data.choices[0]?.message?.content || "No response",
      usage: data.usage,
    })
  } catch (error) {
    console.error("Simple chat error:", error)
    return Response.json({ error: error }, { status: 500 })
  }
}
