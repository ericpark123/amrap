import { CompleteSessionDialog } from "@/app/(components)/ui/custom/session/complete-session-dialog"
import { DeleteSessionDialog } from "@/app/(components)/ui/custom/session/delete-session-dialog"
import { EditSessionDialog } from "@/app/(components)/ui/custom/session/edit-session-dialog"
import { Button } from "@/app/(components)/ui/shadcn/button"
import { prisma } from "@/lib/db"
import Link from "next/link"

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

export default async function EditSessions() {
  const sessions = await getSessions()
 
  return (
    <main className="container relative">
      <div className="flex-1 space-y-4 p-8 pt-4">
      <div className="flex items-center justify-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
            Edit Sessions
        </h2>
        <div className="absolute right-8">
            <Button variant={"outline"}>
                <Link href='/mysessions'>
                    Back
                </Link>
            </Button>
        </div>
        </div>
      </div>
      <div dir="ltr" data-orientation="horizontal" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {sessions?.map(async (session: any) => (
            <div className="rounded-xl border bg-primary-foreground text-background shadow" key={session.id}>
              <div className="flex justify-end px-2 pt-2 pb-1.5">
                <EditSessionDialog {...session}/>
                <CompleteSessionDialog {...session}/>
                <DeleteSessionDialog {...session}/>
              </div>
              <div className="px-10 pb-10 flex flex-row items-center justify-between">   
                <div className="flex items-center">
                  <li key={session.id} className="list-none" >
                    <h3 className="tracking-tight text-large font-bold">
                      {session.title}
                    </h3>
                    <p className="tracking-tight text-xs text-muted-foreground font-small">
                      {(await getLocation(session.locationId))?.name}
                    </p>  
                    <p className="tracking-tight text-xs text-muted-foreground font-small">
                      {new Date(session.date).toLocaleString()}
                    </p> 
                  </li>
                </div>
              </div>
            </div>
          ))}      
        </div>
      </div>
    </main>
  )
}