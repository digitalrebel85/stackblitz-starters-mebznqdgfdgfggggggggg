import Link from "next/link"
import { Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <Coffee className="h-16 w-16 text-amber-500 mb-4" />
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or no longer exists.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button className="bg-amber-500 hover:bg-amber-600">
            Return Home
          </Button>
        </Link>
        <Link href="/coffee-shops">
          <Button variant="outline">
            Explore Coffee Shops
          </Button>
        </Link>
      </div>
    </div>
  )
}