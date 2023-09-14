import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'

// Get all participants in a session
export async function GET(req: Request)  {

  // Validate user
  const { userId } = auth()
  if (!userId) {
    return new Response("Unauthorized access detected", {
       status: 401
       });
  }

  const id = req.url.split("sessions/")[1]
  const sessionId = id.split("/participants")[0]
  // Return all sessions
  const users = await prisma.session.findMany({
      where: {
        id: sessionId,
      },
      select: {
        participants: true
      }
    })
  return NextResponse.json(users)
}