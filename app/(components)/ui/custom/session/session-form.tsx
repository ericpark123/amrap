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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shadcn/select"

import { Button } from "../../shadcn/button";

/* Form field validation */
const formSchema = z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    description: z.string().optional(),
    dateTime: z.date(),
    skill: z.string({
      required_error: "Skill level is required",
    }),
  })


export function SessionForm() {

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: "",
        description: "",
        dateTime: new Date(),
        skill: "",  
      },
    })
  
  const postSession = async(values: z.infer<typeof formSchema>) => {
    const res = fetch("http://localhost:3000/api/sessions", {
      method: "POST",
      body: JSON.stringify(values),
      //@ts-ignore
      'content-type': 'application/json'
    })
  }
 
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    postSession(values)
    console.log("Success")
  }

  return (
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
              <div className="flex justify-end">
                <Button type="submit">Submit</Button>
              </div>
            <FormMessage />
          </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

