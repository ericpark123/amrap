import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { auth } from '@clerk/nextjs'

// // Get one session
// export async function GET(req: Request)  {

//   // Validate user
//   const { userId } = auth()
//   if (!userId) {
//     return new Response("Unauthorized access detected", {
//        status: 401
//        });
//   }

//   const id = req.url.split("sessions/")[1]
//   // Return all sessions
//   const sessions = await prisma.session.findUnique({
//       where: {
//         id: id,
//       },
//     })
//   return NextResponse.json(sessions)
// }

// Remove session only if created by the user
export async function DELETE(req: Request)  {
  
  // Validate user
  const { userId } = auth()
  if (!userId) {
    return new Response("Unauthorized access detected", {
      status: 401
      })
  }

  const id = req.url.split("sessions/")[1]
  // Remove session
  try {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        sessions: {
          disconnect : {
            id: id
          }
        } 
      }
    })
    await prisma.session.delete({
      where: {
        id: id
      }
    })
  } catch (error) {
    console.log(error)
  }
  return NextResponse.json(JSON.stringify(req), {status : 201})
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
    await prisma.session.update({
      where: {
        id: id,
      },
      data: {   
        title: title,
        description: description,
        date: dateTime,
        skill: skill,
      }     
    })
  } catch (error) {
    console.log(error)
  }
  return new NextResponse(JSON.stringify(req), {status : 201})
}