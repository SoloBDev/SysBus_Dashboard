import { Bus } from "lucide-react"
import { Link } from "react-router-dom"

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 rounded-full bg-background/90 px-4 py-2">
      <span className="text-xl font-bold">ADDIS</span>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Bus className="h-5 w-5" />
      </div>
    </Link>
  )
}
