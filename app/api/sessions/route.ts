import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/db'

// Get all sessions
export async function GET()  {

  // Validate user
  const { userId } = auth()
  if (!userId) {
    return new Response("Unauthorized access detected", {
       status: 401
       });
  }

  // Return all sessions
  const sessions = await prisma.session.findMany()
  return NextResponse.json(sessions)
}

// Create a single session
export async function POST(req: Request) {
  
  // Validate user
  const { userId } = auth()
  if( !userId ){
    return new Response("Unauthorized", { status: 401 });
  }
  
  // Deconstruct values from request
  const {title, description, dateTime, skill} = await req.json()
  
  // Create new session and add User as a participant
  const session = await prisma.session.create({
      data: {    
        title: title,
        description: description,
        date: dateTime,
        skill: skill,
        createdBy: userId,
        participants: {connect: { id: userId }}
      }
  })

  // Update User sessions with Session
  try {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        sessions: {connect: { id: session.id }}
      }
    })
  } catch (error) {
    console.log(error)
  } 

  return new NextResponse(JSON.stringify(session), {status : 201})
}
