import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { auth } from '@clerk/nextjs';

const prisma = new PrismaClient()

export async function GET()  {
  const { userId } = auth()
  if (!userId) {
    return new Response("Unauthorized access detected", {
       status: 401
       });
  }
  const sessions = await prisma.session.findMany()
  return NextResponse.json(sessions)
}

export async function POST(req: Request) {
  
  const { userId } = auth()
  if( !userId ){
    return new Response("Unauthorized", { status: 401 });
  }
  
  const {title, description, dateTime, skill} = await req.json()
  const session = await prisma.session.create({
      data: {
        userId,    
        title: title,
        description: description,
        date: dateTime,
        skill: skill,
      }
  })

  return new NextResponse(JSON.stringify(session), {status : 201})
}
