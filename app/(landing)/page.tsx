import { UserButton } from "@clerk/nextjs"
import { Button } from "../(components)/ui/button"
import Link from "next/link"

export default function Landing() {
  return (
    <div>
      Landing Page
      <div>
        <Link href="/sign-in">
          <Button>
            Login
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button>
            Register
          </Button>
        </Link>
        <UserButton afterSignOutUrl="/"/>
      </div>
    </div>
    
  )
}