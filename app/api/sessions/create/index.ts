import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { auth } from '@clerk/nextjs';

const prisma = new PrismaClient()
// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    const { userId } = auth();
 
    if(!userId){
      return new Response("Unauthorized", { status: 401 });
    }

    const { id, title, description, date, skill, createdAt } = req.body
    const session = await prisma.session.create({
        data: {
            id: id,
            userId: userId,
            title: title,
            description: description,
            date: date,
            skill: skill,
            createdAt: createdAt,
        },
  })
  return res.status(201).json(session)
}