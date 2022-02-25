import React from 'react'
import Image from "next/image";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast, { Toaster, toaster } from "react-hot-toast";
import Link from "next/link"

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
      } = useForm();

      const create = async (data) => {
        //console.log(data);
        await fetch(`/api/createuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });
      };
    
      const onSubmit = async (data) => {
        try {
          toast.promise(
            create(data),
            {
              loading: "Working on it",
              success: "Note added successfully!",
              error: "Sorry, try again!",
            },
            {
              duration: 3000,
            }
          );
        } catch (error) {
          toast.error(error);
        }
      };
    
  return (
      <>
    <div className="bg-indigo-800 min-h-screen flex flex-col justify-center items-center">
      <div className='mt-3'>  <Image src={"/signup.svg"} height={250} width={250} /></div> 
    <h1 className='text-indigo-400 md:text-8xl mb-3 md:w-84 text-center'>Sign up to create and discover innerNotes!</h1>
    <section className='mb-3 mt-2' >
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form pb-8 pt-4 px-4 rounded-xl bg-indigo-600 h-auto mx-w-sm shadow-1xl sm:w-96 text-gray-700 mb-4"
      >
        <div className="mt-2 max-w-md">
          <div className="grid grid-cols-1 gap-6">
            <label htmlFor="name" className="sr-only">
               Name 
            </label>
            <label className="block">
              <input
                {...register("name", { required: true })}
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                className={`mt-1
                block
                sm:w-80
                mx-auto
                w-60
                rounded-md
                    rounded-md
                    bg-indigo-200
                    border-transparent
                    focus:border-gray-500  focus:ring-0 ${
                      errors.name
                        ? "focus:ring-red-500 border-red-500"
                        : "focus:ring-blue-500 focus:border-blue-500"
                    }`}
                placeholder="UserName"
              />
            </label>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <label className="block">
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                id="email"
                className={`mt-1
                    block
                    sm:w-80
                    w-60
                    mx-auto
                    rounded-md
                    bg-indigo-200
                    border-transparent
                    focus:border-gray-500  focus:ring-0 ${
                      errors.email
                        ? "focus:ring-red-500 border-red-500"
                        : "focus:ring-blue-500 focus:border-blue-500"
                    }`}
                placeholder="Email"
              />
            </label>
            <label htmlFor="password" className="sr-only">
              password
            </label>
            <label className="block">
              <input
                type="text"
                name="password"
                id="password"
                {...register("noteName", { required: true })}
                className={`mt-1
                    block
                    sm:w-80
                    w-60
                    mx-auto
                    rounded-md
                    bg-indigo-200
                    border-transparent
                    focus:border-gray-500  focus:ring-0 ${
                      errors.noteName
                        ? "focus:ring-red-500 border-red-500"
                        : "focus:ring-blue-500 focus:border-blue-500"
                    }`}
                placeholder="Password"
              />
            </label>
             <div className="block">
              <div className="mt-2 ml-2 text-center">
                <div>
                  <label className="inline-flex items-center text-center">
                    <input
                      type="checkbox"
                      className="
                          rounded
                          border-gray-300
                          text-green-600
                          shadow-sm
                          focus:border-indigo-300
                          focus:ring
                          focus:ring-offset-0
                          focus:ring-indigo-200
                          focus:ring-opacity-50
                        "
                    />
                    <span className="ml-2 text-sm text-white">
                      I will be a good member :)
                    </span>
                  </label>
                </div>
              </div>
              </div>
            <label className="block">
              <motion.button
                //disabled={isSubmitted}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                whileTap={{
                  scale: 0.9,
                  transition: { duration: 0.2 },
                }}
                type="submit"
                className="sm:w-80 flex justify-center sm:w-80
                w-60
                mx-auto py-3 px-6 border border-transparent shadow-sm text-base font-bold rounded-md text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </motion.button>
            </label>
            
          </div>
        </div>
      </form>
    </section>
    <span className="mb-3 text-indigo-100 cursor-pointer hover:underline">
            <Link href="/">
              <a>← Back to homepage</a>
            </Link>
          </span>
    </div>
    </>
  )
}
