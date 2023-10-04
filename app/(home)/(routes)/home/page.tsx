async function getSessions() {
    const response = await import("@/app/api/sessions/all/route")
    return await ((await response.GET()).json())
}

export default async function Home() {
  const sessions = await getSessions()
  
  return (
    <main className="container relative">
        <div dir="ltr" data-orientation="horizontal" className="space-y-4">
          <div className="flex-1 space-y-4 p-8 pt-4">
            <div className="flex items-center justify-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight">
                Session Feed 
              </h2>
            </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {sessions?.map((session: any) => ( 
                  <div className="rounded-xl border bg-primary-foreground text-background shadow" key={session.id}>
                    <div className="px-10 py-10 flex flex-row items-center justify-between">   
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
      </div>
    </main>   
  )
}