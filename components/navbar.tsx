import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export function Navbar() {
  return (
    <div className="flex items-center p-4">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu />
      </Button>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}
