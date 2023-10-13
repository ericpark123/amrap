import { prisma } from '@/lib/db';

export default async function getSessions(id: any) {
  return await prisma.session.findMany({
    where: {
      location: id,
    },
  })
}