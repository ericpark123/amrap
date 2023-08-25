"use client"

import { SessionDialog } from "@/app/(components)/ui/custom/session/session-dialog";
import * as React from "react"

export default function Page() {

  return (
    <div>
      <h1>
        <SessionDialog />
      </h1>
    </div>
  );
}