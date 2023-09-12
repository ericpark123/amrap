"use client"

import { Label } from "../../shadcn/label"
import { Input } from "../../shadcn/input"
import { parseAbsolute } from '@internationalized/date';
import { DateTimePicker } from "../date-time-picker/date-time-picker"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../../shadcn/form"
import { useForm } from "react-hook-form"
import { Textarea } from "../../shadcn/textarea"
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../shadcn/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shadcn/select"

import { Button } from "../../shadcn/button"
import { useToast } from "../../shadcn/use-toast"
import { useState } from "react"
import { Pencil } from "lucide-react";


const sessionformSchema = z.object({
    title: z.string({
      required_error: "Title is required",
    })
    .min(1, {
      message: "Title must be at least 1 character.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters."
    }),
    description: z.string({
      required_error: "Description is required",
    }).min(1, {
      message: "Description must be at least 1 character.",
    })
    .max(100, {
      message: "Description must not be longer than 30 characters."
    }),
    dateTime: z.coerce.date(),
    skill: z.string({
      required_error: "Skill level is required",
    })
    .min(1, {
      message: "Skill level must be chosen",
    })
  })

type SessionFormValues = z.infer<typeof sessionformSchema>

const defaultValues: Partial<SessionFormValues> = {
    title: "",
    description: "",
    dateTime: new Date(),
    skill: "",  
}

export function EditSessionDialog(session: any) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const sessionId = session.id
    

    const form = useForm<SessionFormValues>({
        resolver: zodResolver(sessionformSchema),
        defaultValues,
        mode: "onChange",
    })
    
    const updateSession = async(data: SessionFormValues) => {
        try {
            fetch(`/api/sessions/${sessionId}`, {
                method: "PUT",
                body: JSON.stringify(data),
                //@ts-ignore
                'content-type': 'application/json'
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(data: SessionFormValues) {
        updateSession(data)
        setOpen(false)
        router.refresh()
    }
    
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button size="xs" variant="ghost">
                <Pencil size={16} color="#151a29" />
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Session</DialogTitle>
            <DialogDescription>
              Edit your session here!
            </DialogDescription>
          </DialogHeader>
            <div className="grid items-center gap-4">
              <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="title" className="text-right">
                              Title
                        </FormLabel>
                        <FormControl>
                          <Input id="title" placeholder="What kind of work out?" {...field}  className="col-span-3" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="description" className="text-right">
                          Description
                      </FormLabel>
                      <FormControl>   
                        <Textarea id="description" placeholder="Provide some more details" {...field}  className="col-span-3 resize-none" />
                      </FormControl>
                      <FormMessage />        
                    </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateTime"
                    render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="date" className="text-right">
                          Date
                      </Label>
                      <DateTimePicker
                        onBlur={field.onBlur}
                        value={
                          !!field.value
                            ? parseAbsolute(field.value.toISOString(), "GMT")
                            : null
                        }
                        onChange={(date) => {
                          field.onChange(!!date ? date.toDate("GMT") : new Date());
                        }}
                        granularity="minute"
                        />
                      <FormControl>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="skill"
                    render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="skill level" className="text-right">
                          Skill Level
                      </FormLabel>
                      <FormControl> 
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a level"/>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />           
                    </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button 
                      type="submit" variant="outline" >
                        Save
                    </Button>   
                  </div>
                </form>
              </Form>
            </div>
      </DialogContent>     
    </Dialog>
  </div>    
  )
}

