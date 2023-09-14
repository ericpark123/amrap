import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

// Join session as participant
export async function PUT(req: Request)  {

  // Validate user
  const { userId } = auth()
  if (!userId) {
    return new Response("Unauthorized access detected", {
      status: 401
      })
  }
  
  // Join session
  const id = req.url.split("sessions/")[1]
  const sessionId = id.split("/join")[0]
  try {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        sessions: {
          connect: { 
            id: sessionId
          }
        }
      }
    })
    await prisma.session.update({
      where: {
        id: sessionId
      },
      data: {
        participants: {connect: { id: userId }}
      }
    })
  } catch (error) {
    console.log(error)
  }
  return NextResponse.json(JSON.stringify(req), {status : 201})
  }