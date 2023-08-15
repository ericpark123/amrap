import Link from "next/link";
import { Button } from "../(components)/ui/button";
import Navbar from "../(components)/ui/navbar";

export default function Home() {
    return (
      <>
        <Navbar />
        <h1 className='text-2xl font-bold mb-5'>Home</h1>
      </>
    );
  }