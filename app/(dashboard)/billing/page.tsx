"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Check, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "10 AI conversations per month",
      "5 image generations per month",
      "1 hour of transcription per month",
      "Basic support",
    ],
    current: true,
  },
  {
    name: "Pro",
    price: "$19",
    description: "Best for professionals",
    features: [
      "Unlimited AI conversations",
      "100 image generations per month",
      "10 hours of transcription per month",
      "Priority support",
      "Advanced AI models",
    ],
    current: false,
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For teams and organizations",
    features: [
      "Everything in Pro",
      "Unlimited image generations",
      "Unlimited transcription",
      "Custom AI models",
      "Dedicated support",
      "API access",
    ],
    current: false,
  },
]

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubscribe = async (planName: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: planName.toLowerCase(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Billing & Subscription</h2>
      </div>

      <div className="space-y-6">
        {/* Current Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Current Usage
            </CardTitle>
            <CardDescription>Your usage for this billing period</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>AI Conversations</span>
                <span>7 / 10</span>
              </div>
              <Progress value={70} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Image Generations</span>
                <span>3 / 5</span>
              </div>
              <Progress value={60} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Transcription Hours</span>
                <span>0.5 / 1</span>
              </div>
              <Progress value={50} />
            </div>
          </CardContent>
        </Card>

        {/* Pricing Plans */}
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.current ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.current && <Badge>Current Plan</Badge>}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={plan.current || isLoading}
                  className="w-full"
                  variant={plan.current ? "outline" : "default"}
                >
                  {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
