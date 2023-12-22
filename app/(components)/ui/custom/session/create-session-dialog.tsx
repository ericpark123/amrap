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
import { useState } from "react"
import { toast } from "../../shadcn/use-toast";

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
    }),
    location: z.string({
      required_error: "Location is required",
    })
  })

type SessionFormValues = z.infer<typeof sessionformSchema>

const defaultValues: Partial<SessionFormValues> = {
    title: "",
    description: "",
    dateTime: new Date(new Date().toLocaleString()),
    skill: "",
    location: ""
}

export function CreateSessionDialog(gymRef: any) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const form = useForm<SessionFormValues>({
    resolver: zodResolver(sessionformSchema),
    defaultValues,
    mode: "onChange",
  })
  
  const postSession = async(data: SessionFormValues) => {
    fetch('/api/sessions', {
      method: "POST",
      body: JSON.stringify(data),
      //@ts-ignore
      'content-type': 'application/json'
    }).then((res) => {
      console.log(res)
      router.refresh()
    }).catch((error) => {
      console.log(error)
    })
  }
   
  async function onSubmit(data: SessionFormValues) {
    data.location = gymRef.id
    postSession(data)
    toast({
      description: "Your session has been created"
    })
    setOpen(false)
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
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
                            ? parseAbsolute(field.value.toISOString(), "PST")
                            : null
                        }
                        onChange={(date) => {
                          field.onChange(!!date ? date.toDate("PST") : new Date());
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
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
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
                        Create
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

