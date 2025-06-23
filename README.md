# API Documentation

This document describes the API endpoints available in the AI SaaS Platform.

## Authentication

All API endpoints require authentication via Clerk. Include the session token in your requests.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://yourdomain.com/api`

## Endpoints

### Chat API

Create AI chat conversations with streaming responses.

#### `POST /api/chat`

**Request Body:**
\`\`\`json
{
  "messages": [
    {
      "role": "user" | "assistant" | "system",
      "content": "string"
    }
  ]
}
\`\`\`

**Response:**
Streaming response with AI-generated content.

**Example:**
\`\`\`javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Hello, how are you?' }
    ]
  })
});
\`\`\`

**Error Responses:**
- `401`: Unauthorized - User not authenticated
- `400`: Bad Request - Invalid message format
- `500`: Internal Server Error - OpenAI API error

---

### Image Generation API

Generate images using DALL-E 3.

#### `POST /api/image`

**Request Body:**
\`\`\`json
{
  "prompt": "string",
  "size": "1024x1024" | "1024x1792" | "1792x1024",
  "style": "natural" | "vivid"
}
\`\`\`

**Response:**
\`\`\`json
{
  "imageUrl": "https://oaidalleapiprodscus.blob.core.windows.net/..."
}
\`\`\`

**Example:**
\`\`\`javascript
const response = await fetch('/api/image', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'A beautiful sunset over mountains',
    size: '1024x1024',
    style: 'natural'
  })
});

const data = await response.json();
console.log(data.imageUrl);
\`\`\`

**Error Responses:**
- `401`: Unauthorized - User not authenticated
- `400`: Bad Request - Invalid prompt or parameters
- `500`: Internal Server Error - Image generation failed

---

### Audio Transcription API

Transcribe audio files using Whisper AI.

#### `POST /api/transcription`

**Request Body:**
Form data with audio file.

**Response:**
\`\`\`json
{
  "transcription": "string"
}
\`\`\`

**Example:**
\`\`\`javascript
const formData = new FormData();
formData.append('audio', audioFile);

const response = await fetch('/api/transcription', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data.transcription);
\`\`\`

**Supported Audio Formats:**
- MP3
- MP4
- MPEG
- MPGA
- M4A
- WAV
- WEBM

**Error Responses:**
- `401`: Unauthorized - User not authenticated
- `400`: Bad Request - No audio file provided
- `500`: Internal Server Error - Transcription failed

---

### Stripe Checkout API

Create Stripe checkout sessions for subscriptions.

#### `POST /api/stripe/checkout`

**Request Body:**
\`\`\`json
{
  "plan": "pro" | "enterprise"
}
\`\`\`

**Response:**
\`\`\`json
{
  "url": "https://checkout.stripe.com/pay/..."
}
\`\`\`

**Example:**
\`\`\`javascript
const response = await fetch('/api/stripe/checkout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    plan: 'pro'
  })
});

const data = await response.json();
window.location.href = data.url;
\`\`\`

**Error Responses:**
- `401`: Unauthorized - User not authenticated
- `400`: Bad Request - Invalid plan
- `500`: Internal Server Error - Stripe error

---

## Rate Limits

### OpenAI API Limits
- Depends on your OpenAI plan and credits
- Free tier: Very limited requests per minute
- Paid tier: Higher limits based on usage tier

### Application Limits
- No additional rate limiting implemented
- Consider implementing rate limiting for production use

## Error Handling

All API endpoints return consistent error responses:

\`\`\`json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
\`\`\`

## Usage Examples

### React Hook for Chat
\`\`\`typescript
import { useChat } from '@ai-sdk/react';

function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat'
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={handleInputChange}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        Send
      </button>
    </form>
  );
}
\`\`\`

### Image Generation Hook
\`\`\`typescript
const [image, setImage] = useState<string | null>(null);
const [loading, setLoading] = useState(false);

const generateImage = async (prompt: string) => {
  setLoading(true);
  try {
    const response = await fetch('/api/image', {
      method: 'POST',
      headers: { 'Content-Type': 
