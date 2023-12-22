"use client"

import { UserPlus2 } from "lucide-react"
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

export function JoinSessionDialog(session: any) {
    const sessionId = session.id
    const router = useRouter()

    const joinSession = async() => {
        fetch(`/api/sessions/${sessionId}/join`, {
            method: "PUT",
            //@ts-ignore
            headers: {
                'Content-Type': 'application/json'
            }     
        }).then((res) => {
            console.log(res)
            toast({
                description: "You have joined the session"
            })
            router.refresh()
        }).catch((error) => {
            console.log(error)
        })
    }

    // const participants = async() => {
    //     return await prisma.user.findMany({
    //         where: {
    //           sessions: {
    //             some: {
    //                 id: sessionId
    //             }
    //           }
    //         }
    //     })
    // }

    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button size="xs" variant="ghost">
                <UserPlus2 size={16} color="#151a29" />
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Join Session</AlertDialogTitle>
            <AlertDialogDescription>
                {/* Current participants: {participants?.map((participant: any) => (
                    <div></div>
                ))} */}
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={joinSession}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>
    )
}