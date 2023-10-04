import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

// Update user location
export async function PUT(req: Request)  {

  // Validate user
  const { userId } = auth()
  if (!userId) {
    return new Response("Unauthorized access detected", {
      status: 401
      })
  }
  
  // Update location
  const location = await req.json()
  try {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        location: location
      }
    })
  } catch (error) {
    console.log(error)
  }
  return NextResponse.json(JSON.stringify(req), {status : 201})
  }