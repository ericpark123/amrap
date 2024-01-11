"use client"

import { useUser, SignInButton, SignUpButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '../(components)/ui/shadcn/button'
import Image from 'next/image'

const LandingPage = () => {
  const { isSignedIn, user } = useUser()
  
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      {
        isSignedIn ?
        <main className='flex items-center justify-center py-4'>
          <Button variant={'ghost'}>
            <Link href="/home">Welcome {user.firstName}</Link>
          </Button>
        </main>:
        (
            <main className='rounded-lg border-solid border-2 py-10 px-10 border-background bg-white shadow-lg'>
              <h1 className='flex justify-center'>
                <Image
                  src="/amrap_logo.png"
                  priority
                  height={0}
                  width={0}
                  style={{width:'300px', height: "auto" }}
                  alt="AMRAP logo"
                />
              </h1>
              <h2 className='flex justify-center text-black py-5 mt-10 tracking-tighter'>
              </h2>
              <div className='grid items-center justify-center'>
                <SignInButton>
                  <Button className='transition ease-in-out delay-150 hover:scale-105 duration-300 text-background shadow-sm rounded-full px-24 py-2 mt-3' variant={'default'}>Sign in with Clerk</Button>
                </SignInButton>
                <SignUpButton>
                  <Button className='transition ease-in-out delay-150 hover:scale-105 duration-300 bg-white border-2 border-foreground text-primary shadow-sm rounded-full px-24 py-2 mt-3' variant={'default'}>Sign up</Button>
                </SignUpButton>
              </div>
            </main>    
        )    
      }
    </div>   
  )
}

export default LandingPage