import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, ImageIcon, Mic, Zap, ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Zap className="h-12 w-12 text-indigo-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">AI SaaS Platform</h1>
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Unlock the power of AI with our comprehensive suite of tools. Chat, generate images, transcribe audio, and
            more - all in one platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <MessageSquare className="h-8 w-8 text-violet-600 mb-2" />
              <CardTitle>AI Chat</CardTitle>
              <CardDescription>Engage in intelligent conversations with our advanced AI assistant</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Natural language processing</li>
                <li>• Context-aware responses</li>
                <li>• Multiple conversation threads</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <ImageIcon className="h-8 w-8 text-pink-600 mb-2" />
              <CardTitle>Image Generation</CardTitle>
              <CardDescription>Create stunning images from text descriptions using DALL-E</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• High-quality image generation</li>
                <li>• Multiple styles and sizes</li>
                <li>• Commercial usage rights</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Mic className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle>Audio Transcription</CardTitle>
              <CardDescription>Convert speech to text with high accuracy using Whisper AI</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Multiple language support</li>
                <li>• High accuracy transcription</li>
                <li>• Various audio formats</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to supercharge your productivity?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users who are already leveraging AI to transform their work.
          </p>
          <Button asChild size="lg">
            <Link href="/sign-up">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
