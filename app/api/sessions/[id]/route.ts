import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs';


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

  try {
    const session = await prisma.session.delete({
      where: {
        id: id,
        createdBy: userId
      }
    })
    return NextResponse.json(session)
  } catch (error) {
    console.log("Cannot update session")
  } 
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
    try {
      const session = await prisma.session.update({
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
      return NextResponse.json(session)
    } catch (error) {
      console.log("Cannot update session")
    }
}

// Join session as participant
export async function JOIN(req: Request)  {

  // Validate user
  const { userId } = auth()
  if (!userId) {
    return new Response("Unauthorized access detected", {
        status: 401
        })
  }
  
  // Join session
  const id = req.url.split("sessions/")[1]
  try {
    const session = await prisma.session.update({
      where: {
        id: id,
      },
      data: {   
        participants: {connect: { id: userId }}
      }     
    })
    return NextResponse.json(session)
  } catch (error) {
    console.log("Cannot join session")
  }
  
}