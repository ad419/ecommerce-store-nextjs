"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
const Join = () => {
  const [isRegistering, setIsRegistering] = useState(true);

  const toggleForm = () => {
    setIsRegistering((prevIsRegistering) => !prevIsRegistering);
  };

  const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email or password" }),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 characters" })
      .max(100) // include uppercase, lowercase, number, and symbol
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,100}$/, {
        message:
          "Password must include uppercase, lowercase, number, and symbol",
      }),
  });
  type ValidationSchema = z.infer<typeof registerSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
      callbackUrl: "/",
    });
  };

  const onSignInGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="z-[999] absolute w-full flex items-center justify-center">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white bg-opacity-10 p-8 shadow-md rounded-lg w-96 border-white border-2 border-opacity-20 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 text-slate-500 opacity-60">
            {isRegistering ? "Register" : "Login"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className="w-full mt-1 p-2 border rounded-md 
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                bg-white bg-opacity-10
                "
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-xs italic text-red-500 mt-2">
                  {" "}
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-400">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: true })}
                className="w-full mt-1 p-2 border rounded-md
                focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                bg-white bg-opacity-10
                "
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-xs italic text-red-500 mt-2">
                  {" "}
                  {errors.password?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-white p-2 rounded-md
              bg-gradient-to-r from-[#623252] to-[#0f4396]
              "
            >
              {isRegistering ? "Register" : "Login"}
            </button>
            {/*
              sign in with google
            */}

            <button
              type="submit"
              onClick={onSignInGoogle}
              className="w-full bg-white text-black p-2 rounded-md mt-2"
            >
              <FcGoogle className="inline-block mr-2" /> Sign in with Google
            </button>
          </form>
          <p className="mt-4 text-gray-400">
            {isRegistering
              ? "Already have an account?"
              : "Don't have an account?"}
            <span
              className="text-blue-500 cursor-pointer ml-1"
              onClick={toggleForm}
            >
              {isRegistering ? "Login" : "Register"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Join;
