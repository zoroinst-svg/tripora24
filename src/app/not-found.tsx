import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlaneIcon } from "@/components/ui/icons"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <PlaneIcon className="h-16 w-16 text-muted-foreground mx-auto" />
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground text-lg">Diese Seite wurde nicht gefunden — vielleicht ist sie abgehoben?</p>
        <Link href="/">
          <Button size="lg">Zurück zu Tripora24</Button>
        </Link>
      </div>
    </div>
  )
}
