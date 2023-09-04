import { SessionDialog } from "@/app/(components)/ui/custom/session/session-dialog";
import * as React from "react"

async function getSessions() {
  const response = await import("@/app/api/sessions/route");
  return await ((await response.GET()).json())
}
export default async function Session() {
  const sessions = await getSessions()
  return (

    <div>
      <h1>
        <SessionDialog />
      </h1>
      <main>
        {JSON.stringify(sessions)}
      </main>
    </div>
  );
}