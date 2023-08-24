"use client"

import { Button } from "../button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../dialog"

import { SessionForm } from "./session-form"

export function SessionDialog() {

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Session</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Session</DialogTitle>
            <DialogDescription>
              Create a new session here!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              <SessionForm />
            </div>
          </div>
        </DialogContent>     
      </Dialog>
    </div>    
  )
}