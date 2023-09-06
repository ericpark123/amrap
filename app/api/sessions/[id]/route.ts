// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'
// import { auth } from '@clerk/nextjs';

// const prisma = new PrismaClient()

// export async function GET(request: Request)  {
//   const { userId } = auth()
//   if (!userId) {
//     return new Response("Unauthorized access detected", {
//        status: 401
//        });
//   }

//   const sessions = await prisma.session.findUnique({
//     where: {
//         userId: userId
//     }
//   })
//   return NextResponse.json(sessions)
// }