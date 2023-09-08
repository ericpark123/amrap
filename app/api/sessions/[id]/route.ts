import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { auth } from '@clerk/nextjs';

const prisma = new PrismaClient()

// Remove session only if created by the user
export async function DELETE(req: Request)  {
  
  // Validate user
  const { userId } = auth()
  if (!userId) {
    return new Response("Unauthorized access detected", {
      status: 401
      })
  }

  // Remove session
  const id = req.url.split("sessions/")[1]

  const session = await prisma.session.delete({
    where: {
      id: id,
      createdBy: userId
    }
  })

  return NextResponse.json(session)
}

// Update session only if created by the user
export async function PUT(req: Request)  {

    // Validate user
    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized access detected", {
          status: 401
          })
    }
    
    // Update session
    const {title, description, dateTime, skill} = await req.json()
    const id = req.url.split("sessions/")[1]
    const sessions = await prisma.session.update({
        where: {
            id: id,
            createdBy: userId
        },
        data: {   
            title: title,
            description: description,
            date: dateTime,
            skill: skill,
          }
    })
    return NextResponse.json(sessions)
}