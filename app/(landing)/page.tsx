"use client"

import { useUser, SignInButton, SignUpButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '../(components)/ui/shadcn/button'

const LandingPage = () => {
  const { isSignedIn, isLoaded, user } = useUser()
  
  return (
    <div className='container relative'>
      {
        isSignedIn ?
        <main className='flex items-center justify-center py-4'>
          <Link href="/home">Welcome {user.firstName}</Link>
        </main>:
        (
          <div className="mt-4">   
            <nav className= "flex justify-center items-center space-x-6 text-sm font-medium">
              <div>
              <Button variant={"ghost"}>
                <SignInButton />
              </Button>
              </div>
              <div>
              <Button variant={"ghost"}>
                <SignUpButton />
              </Button>
              </div>
            </nav>    
          </div>
        )    
      }
    </div>   
  )
}

export default LandingPage