"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/app/(components)/ui/button"
import { Label } from "@/app/(components)/ui/label"
import { Input } from "@/app/(components)/ui/input"
import { useAuth } from "@clerk/nextjs";
import { Calendar } from "@/app/(components)/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/app/(components)/ui/dialog"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/(components)/ui/popover"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/(components)/ui/select"


export default function Page() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  
  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null;
  }

  const [date, setDate] = React.useState<Date>()
  
  return (
    <div>
      <h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create Session</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Session</DialogTitle>
              <DialogDescription>
                Create a new session here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" placeholder="What kind of work out?" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input id="description" placeholder="Provide some more details" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skill level" className="text-right">
                  Skill Level
                </Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a level"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    className="flex w-auto flex-col space-y-2 p-2"
                  >
                    <Select
                      onValueChange={(value) =>
                        setDate(addDays(new Date(), parseInt(value)))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="0">Today</SelectItem>
                        <SelectItem value="1">Tomorrow</SelectItem>
                        <SelectItem value="3">In 3 days</SelectItem>
                        <SelectItem value="7">In a week</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="rounded-md border">
                      <Calendar mode="single" selected={date} onSelect={setDate} />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input id="time" placeholder="ex. 10:00 AM, 3:00 PM" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </h1>
      <div>
        Hello, {userId} your current active session is {sessionId}
      </div>
    </div>
  );
}