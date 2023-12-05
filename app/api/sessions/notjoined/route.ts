import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'

export async function GET(id: any)  {

    // Validate user
    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized access detected", {
        status: 401
        })
    }

    // Return all sessions not created by user
    const sessions = await prisma.session.findMany({
      where: {
        locationId: id,
        NOT: {
          participants: {
            some: {
              id: userId,
            }
          }
        }
      }     
    })
    return NextResponse.json(sessions)
  }