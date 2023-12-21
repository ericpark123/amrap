"use client"

import { X } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../../shadcn/alert-dialog"
  import { Button } from "../../shadcn/button"
import { useRouter } from "next/navigation"
   
export function DeleteSessionDialog(session: any) {
  const router = useRouter()
  const sessionId = session.id

  const deleteSession = async () => {
    fetch(`/api/sessions/${sessionId}`, {
      method: "DELETE",
      //@ts-ignore
      'content-type': 'application/json'
    }).then((res) => {
      console.log(res)
      router.refresh()
    }).catch((error) => {
      console.log(error)
    })
  }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button size="xs" variant="ghost">
                <X size={16} color="#151a29" />
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Session</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              session and remove session data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className='text-background' onClick={deleteSession}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }