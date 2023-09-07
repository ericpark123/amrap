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

  const sessions = await prisma.session.findMany({
    where: { userId: userId }
  })
  return NextResponse.json(sessions)
}

export async function DELETE(req: Request)  {
    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized access detected", {
         status: 401
         });
    }

    const id = req.url.split("sessions/")[1]
    const sessions = await prisma.session.delete({
        where: {
            id: id
        }
    })
    return NextResponse.json(sessions)
  }


export async function PUT(req: Request)  {
    const { userId } = auth()
    if (!userId) {
        return new Response("Unauthorized access detected", {
            status: 401
            });
    }
    
    const {title, description, dateTime, skill} = await req.json()
    const id = req.url.split("sessions/")[1]
    const sessions = await prisma.session.update({
        where: {
            id: id
        },
        data: {
            userId,    
            title: title,
            description: description,
            date: dateTime,
            skill: skill,
          }
    })
    return NextResponse.json(sessions)
}