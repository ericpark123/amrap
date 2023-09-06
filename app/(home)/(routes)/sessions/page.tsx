import { SessionDialog } from "@/app/(components)/ui/custom/session/session-dialog";
import * as React from "react"

async function getSessions() {
  const response = await import("@/app/api/sessions/route");
  return await ((await response.GET()).json())
}
export default async function Session() {
  const sessions = await getSessions()
  
  return (
    <main className="container relative">
      <div className="flex-1 space-y-4 p-8 pt-4">
        <div className="flex items-center justify-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Session Feed 
          </h2>
        </div>
      </div>
      <div dir="ltr" data-orientation="horizontal" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {sessions?.map((session: any) => ( 
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between">
              <div className="flex items-center">
                <ul>
                  <li>
                    <h3 className="tracking-tight text-sm font-medium">
                      {session.title}
                    </h3>
                  </li>
                  <li>
                    <p className="tracking-tight text-xs text-muted-foreground font-small">
                      {session.description}
                    </p> 
                  </li>
                  <li>
                  <p className="tracking-tight text-xs text-muted-foreground font-small">
                      {session.skill}
                    </p> 
                  </li>
                  <li>
                    <p className="tracking-tight text-xs text-muted-foreground font-small">
                      {new Date(session.date).toLocaleString()}
                    </p> 
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}      
        </div>
      </div>
      <div className="flex items-center justify-center mt-12">
        <SessionDialog />
      </div>
      </main>
      
  );
}