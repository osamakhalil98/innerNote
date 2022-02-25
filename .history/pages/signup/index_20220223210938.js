import React from 'react'
import Image from "next/image";

export default function SignUp() {
  return (
    <div className="bg-indigo-800 min-h-screen flex flex-col justify-center items-center">
        <Image src={"/signup.svg"} height={250} width={250} />
    </div>
  )
}
