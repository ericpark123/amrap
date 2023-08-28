"use client"

import { useUser, SignInButton, SignUpButton } from '@clerk/nextjs'
import Link from 'next/link'

const LandingPage = () => {
  const { isSignedIn, isLoaded, user } = useUser()
  
  return (
    <div className="flex justify-center mt-11">
      <h1>Landing Page </h1>
      {
        isSignedIn ?
        <Link href="/home">Welcome {user.firstName}</Link>:
        (
          <div className="flex justify-end">
            <SignInButton />
            <SignUpButton />
          </div>
        )    
      }
    </div>   
  )
}

export default LandingPage