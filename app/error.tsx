"use client"

import { useEffect } from "react"
import { Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <Coffee className="h-16 w-16 text-amber-500 mb-4" />
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        We apologize for the inconvenience. An error occurred while processing your request.
      </p>
      <div className="flex gap-4">
        <Button
          className="bg-amber-500 hover:bg-amber-600"
          onClick={reset}
        >
          Try Again
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location.href = '/'}
        >
          Return Home
        </Button>
      </div>
    </div>
  )
}