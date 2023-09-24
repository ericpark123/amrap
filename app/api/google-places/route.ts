import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export async function GET(){
    const res=await fetch(
        BASE_URL + "/textsearch/json?query=gym"+
        "&key=" + GOOGLE_API_KEY,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
    );
    const product = await res.json();

    return NextResponse.json({ product });
}