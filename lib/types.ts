import { Date } from "mongoose"

export interface ResponseFuncs {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
  }
  
  export interface Session {
    _id?: number
    title: string
    skill: string
    description: string
    date: Date
    time: string
    participants: string[]
  }