import mongoose, { Model } from "mongoose"

const { DATABASE_URL } = process.env

export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch(err => console.log(err))
  console.log("Mongoose Connection Established")

  const SessionSchema = new mongoose.Schema({
    title: String,
    skill: String,
    description: String,
    date: Date,
    time: String,
    participants: [],
  })

  const Session = mongoose.models.Session || mongoose.model("Session", SessionSchema)

  return { conn, Session }
}