import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'

// Get only user-created sessions 
export async function GET()  {

    // Validate user
    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized access detected", {
        status: 401
        })
    }
    
    // Return all sessions created by user
    const sessions = await prisma.session.findMany({
      where: { createdBy: userId }   
    })
    return NextResponse.json(sessions)
  }