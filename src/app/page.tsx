import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4 py-8">
      <Card className="w-full max-w-4xl text-center shadow-lg rounded-2xl p-10 space-y-6">
        <CardContent>
          <h2 className="text-4xl font-HarryFont text-primary mb-4">
            Welcome to Potterdle
          </h2>

          <p className="text-base md:text-lg text-muted-foreground">
            Potterdle is a magical guessing game inspired by the world of Harry Potter.
          </p>

          <p className="text-base md:text-lg text-muted-foreground">
            Test your knowledge with daily challenges and uncover magical secrets hidden
            across the wizarding world.
          </p>

          <p className="mt-6 italic text-primary font-medium">
            "Embark on challenges and unravel the mysteries of the magical world of Harry Potter."
          </p>

          <div className="mt-8">
            <Link href="/login">
              <Button size="lg" className="text-lg">
                Start the Challenge
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}