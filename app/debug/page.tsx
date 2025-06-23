"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [testResult, setTestResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const getDebugInfo = async () => {
    try {
      const response = await fetch("/api/debug-chat")
      const data = await response.json()
      setDebugInfo(data)
    } catch (error) {
      setDebugInfo({ error: error })
    }
  }

  const testOpenAI = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ test: true }),
      })
      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      setTestResult({ error: error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Debug Information</h1>

      <Card>
        <CardHeader>
          <CardTitle>Environment Check</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={getDebugInfo}>Check Environment</Button>
          {debugInfo && (
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>OpenAI API Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testOpenAI} disabled={loading}>
            {loading ? "Testing..." : "Test OpenAI API"}
          </Button>
          {testResult && (
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(testResult, null, 2)}</pre>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
