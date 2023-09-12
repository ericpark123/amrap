import { CreateSessionDialog } from "@/app/(components)/ui/custom/session/create-session-dialog"
import { DeleteSession } from "@/app/(components)/ui/custom/session/delete-session-dialog"
import { EditSessionDialog } from "@/app/(components)/ui/custom/session/edit-session-dialog"
import { Button } from "@/app/(components)/ui/shadcn/button"
import { Pencil, X } from "lucide-react"

async function getSessions() {
    const response = await import("@/app/api/sessions/route")
    return await ((await response.GETCREATED()).json())
  }

export default async function MySessions() {
  const sessions = await getSessions()

  return (
    <main className="container relative">
      <div className="flex-1 space-y-4 p-8 pt-4">
        <div className="flex items-center justify-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            My Sessions
          </h2>
        </div>
      </div>
      <div dir="ltr" data-orientation="horizontal" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {sessions?.map((session: any) => (
            <div className="rounded-xl border bg-card text-card-foreground shadow" key={session.id}>
              <div className="flex justify-end px-2 py-2">
                <EditSessionDialog {...session}/>
                <DeleteSession {...session}/>
              </div>
              <div className="px-8 pb-8 flex flex-row items-center justify-between">   
                <div className="flex items-center">
                  <li key={session.id} className="list-none" >
                    <h3 className="tracking-tight text-large font-bold">
                      {session.title}
                    </h3>
                    <p className="tracking-tight text-xs text-muted-foreground font-small">
                      {session.description}
                    </p> 
                    <p className="tracking-tight text-xs text-muted-foreground font-small">
                      {session.skill}
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
      <div className="flex items-center justify-center mt-12">
        <CreateSessionDialog />
      </div>  
    </main>
  )
}