"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Mic, FileAudio, Loader2, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TranscriptionPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [transcription, setTranscription] = useState("")
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAudioFile(file)
      setTranscription("")
    }
  }

  const transcribeAudio = async () => {
    if (!audioFile) {
      toast({
        title: "Error",
        description: "Please select an audio file first",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append("audio", audioFile)

      const response = await fetch("/api/transcription", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to transcribe audio")
      }

      const data = await response.json()
      setTranscription(data.transcription)

      toast({
        title: "Success",
        description: "Audio transcribed successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to transcribe audio. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const downloadTranscription = () => {
    const element = document.createElement("a")
    const file = new Blob([transcription], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "transcription.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="flex-1 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Audio Transcription</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Upload Audio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="audio-upload">Audio File</Label>
              <div className="flex items-center gap-4">
                <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Audio File
                </Button>
                <input ref={fileInputRef} type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
              </div>
              {audioFile && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileAudio className="h-4 w-4" />
                  {audioFile.name}
                </div>
              )}
            </div>

            <Button onClick={transcribeAudio} disabled={isLoading || !audioFile} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Transcribing...
                </>
              ) : (
                "Transcribe Audio"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transcription Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              placeholder="Transcription will appear here..."
              rows={12}
              className="resize-none"
            />
            {transcription && (
              <Button onClick={downloadTranscription} variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Transcription
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
