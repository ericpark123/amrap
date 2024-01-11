
import { Button } from "@/app/(components)/ui/shadcn/button"
import { prisma } from "@/lib/db"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

async function getSessions() {
  const response = await import("@/app/api/sessions/created/route")
  return await ((await response.GET()).json())
}

async function getLocation(id: any){
  try {
    const location = await prisma.location.findUnique({
      where: {
          id: id
      }
      })
    return location
  } catch (error) {
    console.log(error)
  }
}

export default async function MySessions() {
  const sessions = await getSessions()
 
  return (
    <main className="container relative">
      <div className="flex-1 space-y-4 p-8 pt-4">
        <div className="flex items-center justify-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">
            My Sessions
          </h1>
          <h1 className="absolute right-8">
          <Button variant={"outline"}>
            <Link href='/editsessions'>
              Edit
            </Link>
          </Button>
          </h1>
        </div>
      </div>
      <div dir="ltr" data-orientation="horizontal" className="space-y-4">
        <Suspense>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {sessions && sessions?.map(async (session: any) => (
            <div className="rounded-xl border bg-primary-foreground text-primary shadow cursor-pointer hover:my-rotate-y-180 duration-1000 preserve-3d" key={session.id}>
              <div className="backface-hidden px-10 py-10 flex flex-row items-center justify-between">
                  <li className="list-none" >
                    <h2 className="tracking-tight text-large font-bold">
                      {session.title}
                    </h2>
                    <p className="tracking-tight text-xs text-muted-foreground font-small">
                      {(await getLocation(session.locationId))?.name}
                    </p>       
                    <p className="tracking-tight text-xs text-muted-foreground font-small">
                      {new Date(session.date).toLocaleString()}
                    </p> 
                  </li>
              </div>
              <div className="absolute top-5 px-10 my-rotate-y-180 backface-hidden">
                <li className="list-none" >
                <div className="flex justify-start py-1 items-center">
                    <Image
                      src="/notepad.svg"
                      priority
                      height={0}
                      width={0}
                      style={{width:'20px', height: "auto" }}
                      alt="Skill level"
                    />
                    <p className="tracking-tight text-xs text-muted-foreground font-small px-2">
                       {session.description}
                    </p>       
                  </div>
                  <div className="flex justify-start py-1 items-center">
                    <Image
                      src="/difficulty.svg"
                      priority
                      height={0}
                      width={0}
                      style={{width:'20px', height: "auto" }}
                      alt="Skill level"
                    />
                    <p className="tracking-tight text-xs text-muted-foreground font-small px-2">
                       {session.skill}
                    </p>       
                  </div>
                  <div className="flex justify-start py-1 items-center">
                    <Image
                      src="/marker.svg"
                      priority
                      height={0}
                      width={0}
                      style={{width:'20px', height: "auto" }}
                      alt="Skill level"
                    />
                    <p className="tracking-tight text-xs text-muted-foreground font-small px-2">
                      {(await getLocation(session.locationId))?.address}
                    </p>       
                  </div>
                </li>
              </div>
            </div>
            
          ))}      
        </div>
        </Suspense>
      </div>
    </main>
  )
}