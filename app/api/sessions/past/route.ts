import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'

// Get all user sessions
export async function GET()  {

    // Validate user
    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized access detected", {
        status: 401
        })
    }
    
    // Return all sessions with cooresponding userId
    const sessions = await prisma.session.findMany({
      where: {
        completed: true,
        participants: {
          some: {
            id: userId
          }
        }  
      }
    })
    return NextResponse.json(sessions)
  }