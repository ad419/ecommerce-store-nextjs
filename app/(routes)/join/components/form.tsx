"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
const Join = () => {
  const onSignInGoogle = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="z-[999] absolute w-full flex items-center justify-center">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white bg-opacity-10 p-8 shadow-md rounded-lg w-96 border-white border-2 border-opacity-20 backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 text-slate-500 opacity-60 text-center">
            Join to access all features!
          </h2>

          <button
            type="submit"
            onClick={onSignInGoogle}
            className="w-full bg-white text-black p-2 rounded-md mt-2"
          >
            <FcGoogle className="inline-block mr-2" /> Sign in with Google
          </button>
          <br />
          <br />
          <p className="text-muted text-[12px] text-gray-800 opacity-50">
            Note: We don't store any of your data, we only use it to
            authenticate you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Join;
