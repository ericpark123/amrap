"use client"

import { Check } from "lucide-react"
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
import { toast } from "../../shadcn/use-toast"
   
export function CompleteSessionDialog(session: any) {
  const router = useRouter()
  const sessionId = session.id

  const completeSession = async () => {
    fetch(`/api/sessions/${sessionId}/complete`, {
      method: "PUT",
      //@ts-ignore
      'content-type': 'application/json'
    }).then((res) => {
      console.log(res)
      toast({
        description: "Your session has been marked as complete"
      })
      router.refresh()
    }).catch((error) => {
      console.log(error)
    })
  }


    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button size="xs" variant="ghost">
                <Check size={16} color="#151a29" />
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete Session</AlertDialogTitle>
            <AlertDialogDescription>
              By pressing &apos;Confirm&apos; your session will be marked as complete.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className='text-background' onClick={completeSession}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }