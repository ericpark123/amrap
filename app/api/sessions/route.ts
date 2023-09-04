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

export async function POST(request: Request) {

  const { userId } = auth()

  if(!userId){
      return new Response("Unauthorized", { status: 401 });
  }

  const json = await request.json()
  const sessions = await prisma.session.create({
      data: json
  })

  return new NextResponse(JSON.stringify(sessions), {status : 201})
}
