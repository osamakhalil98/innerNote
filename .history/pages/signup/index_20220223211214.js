import React from 'react'
import Image from "next/image";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast, { Toaster, toaster } from "react-hot-toast";

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
      } = useForm();
  return (
    <div className="bg-indigo-800 min-h-screen flex flex-col justify-center items-center">
        <Image src={"/signup.svg"} height={250} width={250} />
    </div>

  )
}
