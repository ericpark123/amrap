"use client"

import { Label } from "../label"
import { Input } from "../input"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../form"
import { useForm } from "react-hook-form"
import { Textarea } from "../textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select"

import { DatePicker } from "./date-picker"
import { Button } from "../button"

/* Form field validation */
const formSchema = z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    description: z.string().optional(),
    skill: z.string({
      required_error: "Skill level is required",
    }),
    date: z.date({
      required_error: "Please select a date",
    }),
    time: z.string({
      required_error: "Time is required",
    }),
  })

export function SessionForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
          description: "",
          skill: "",
          date: new Date,
          time: "",
        },
      })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
    }

    return (
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="title" className="text-right">
                      Title
                </Label>
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
              <Label htmlFor="description" className="text-right">
                  Description
              </Label>
              <FormControl>   
                <Textarea id="description" placeholder="Provide some more details" {...field}  className="col-span-3 resize-none" />
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
              <Label htmlFor="skill level" className="text-right">
                  Skill Level
              </Label>
              <FormControl> 
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a level" {...field}/>
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
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
            <FormItem>
              <Label htmlFor="date" className="text-right">
                  Date
              </Label>
              <FormControl>
                <DatePicker />
              </FormControl>
              <FormMessage />
            </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
            <FormItem>
              <Label htmlFor="time" className="text-right">
                  Time
              </Label>
              <FormControl>
                <Input id="time" placeholder="ex. 10:00 AM, 3:00 PM" {...field} className="col-span-3" />
              </FormControl>
              <FormMessage />
            </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
}

