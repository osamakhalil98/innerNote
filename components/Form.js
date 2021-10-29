import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import toast, { Toaster, toaster } from "react-hot-toast";
export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();

  const create = async (data) => {
    const noteData = await fetch(`https://inner-note.vercel.app/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(noteData);
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
    <section>
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form pb-8 pt-4 px-4 rounded-xl bg-gray-800 h-auto mx-w-sm shadow-1xl w-96 text-gray-100 mb-4"
      >
        <div className="mt-2 max-w-md">
          <div className="grid grid-cols-1 gap-6">
            <label htmlFor="name" className="sr-only">
              Full name (optional)
            </label>
            <label className="block">
              <input
                {...register("name", { required: false })}
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                className={`mt-1
                    block
                    w-80
                    mx-auto
                    rounded-md
                    bg-gray-700
                    border-transparent
                    focus:border-gray-500  focus:ring-0 ${
                      errors.name
                        ? "focus:ring-red-500 border-red-500"
                        : "focus:ring-blue-500 focus:border-blue-500"
                    }`}
                placeholder="Full name (optional)"
              />
            </label>
            <label htmlFor="email" className="sr-only">
              Email (optional)
            </label>
            <label className="block">
              <input
                {...register("email", { required: false })}
                type="email"
                name="email"
                id="email"
                className={`mt-1
                    block
                    w-80
                    mx-auto
                    rounded-md
                    bg-gray-700
                    border-transparent
                    focus:border-gray-500  focus:ring-0 ${
                      errors.email
                        ? "focus:ring-red-500 border-red-500"
                        : "focus:ring-blue-500 focus:border-blue-500"
                    }`}
                placeholder="Email (optional)"
              />
            </label>
            <label htmlFor="noteName" className="sr-only">
              Name of the InnerNote
            </label>
            <label className="block">
              <input
                type="text"
                name="noteName"
                id="noteName"
                {...register("noteName", { required: true })}
                className={`mt-1
                    block
                    w-80
                    mx-auto
                    rounded-md
                    bg-gray-700
                    border-transparent
                    focus:border-gray-500  focus:ring-0 ${
                      errors.noteName
                        ? "focus:ring-red-500 border-red-500"
                        : "focus:ring-blue-500 focus:border-blue-500"
                    }`}
                placeholder="Name of the InnerNote"
              />
            </label>
            <label htmlFor="phone" className="sr-only">
              type of the innernote
            </label>
            <label className="block">
              <select
                name="noteType"
                id="noteType"
                {...register("noteType", { required: true })}
                defaultValue="THOUGHT"
                className="
                    block
                    w-80
                    mx-auto
                    rounded-md
                    bg-gray-700
                    border-transparent
                    focus:border-gray-500  focus:ring-0
                  "
              >
                <option>THOUGHT</option>
                <option>CONFESSION</option>
                <option>IDEA</option>
                <option>DREAM</option>
              </select>
            </label>
            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <label className="block">
              <textarea
                id="message"
                name="message"
                defaultValue=""
                {...register("message", { required: true })}
                className={`mt-1
                    mb-1
                    block
                    w-80
                    mx-auto
                    rounded-md
                    bg-gray-700
                    border-transparent
                    focus:border-gray-500  focus:ring-0
                    ${
                      errors.message
                        ? "focus:ring-red-500 border-red-500"
                        : "focus:ring-blue-500 focus:border-blue-500"
                    }
                  `}
                rows="8"
                placeholder="Message"
              ></textarea>
            </label>
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
                className="w-80 justify-center py-3 px-6 border border-transparent shadow-sm text-base font-bold rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </motion.button>
            </label>
            <div className="block">
              <div className="mt-2">
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="
                          rounded
                          border-gray-300
                          text-indigo-600
                          shadow-sm
                          focus:border-indigo-300
                          focus:ring
                          focus:ring-offset-0
                          focus:ring-indigo-200
                          focus:ring-opacity-50
                        "
                    />
                    <span className="ml-2 text-sm">
                      Share InnerNote in incognito
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
