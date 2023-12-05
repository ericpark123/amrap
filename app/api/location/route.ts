import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {

    // Validate user
    const { userId } = auth()
    if( !userId ){
      return new Response("Unauthorized", { status: 401 });
    }

    const {id} = await req.json()
    const location = await prisma.location.findUnique({
        where: {
            id: id
        },
        select: {
            name: true
        }
    })

    return new NextResponse(JSON.stringify(location), {status : 201})

}

export async function POST(req: Request) {
  
    // Validate user
    const { userId } = auth()
    if( !userId ){
      return new Response("Unauthorized", { status: 401 });
    }
    
    // Deconstruct values from request
    const {id, name, address} = await req.json()
  
    // Create new location or update existing location
    const location = await prisma.location.upsert({
        where: {
            id: id,
        },
        update: {

        },
        create: {
            id: id,
            name: name,
            address: address,
        },
    })
  
    return new NextResponse(JSON.stringify(location), {status : 201})
}