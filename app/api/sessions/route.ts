import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/db'

// Get all sessions
export async function GETALL()  {

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

// Get all user sessions
export async function GETUSER()  {

  // Validate user
  const { userId } = auth()
  if (!userId) {
    return new Response("Unauthorized access detected", {
      status: 401
      })
  }
  
  // Return all sessions with cooresponding userId
  const sessions = await prisma.user.findMany({
    where: { id: userId },
    select: {
      sessions: true
    }
  })
  return NextResponse.json(sessions)
}

// Get only user-created sessions 
export async function GETCREATED()  {

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
  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      sessions: {connect: { id: session.id }}
    }
  })

  return new NextResponse(JSON.stringify(session), {status : 201})
}
