import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'

export async function PUT(req: Request)  {

    // Validate user
    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized access detected", {
          status: 401
          })
    }
    
    // Complete session
    const id = req.url.split("sessions/")[1]
    const sessionId = id.split("/complete")[0]
    try {
        await prisma.session.update({
          where: {
              id: sessionId
          },
          data: {
            completed: true
          },
          })
      } catch (error) {
        console.log(error)
      }
    return new NextResponse(JSON.stringify(req), {status : 201})
  }
