"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/main");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 box-border relative">
      {/* Top-left website name */}
      <div className="absolute top-5 left-5 text-black text-3xl font-bold">
        SNIPSTACK
      </div>

      {/* Middle-left logo with animation */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: -20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-[400px] mb-12"
        />

      {/* Button Section */}
      <div className="flex flex-col items-center">
        <button
          className="px-6 py-3 text-lg bg-black text-white rounded-lg hover:bg-neutral-800 transition duration-300"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
      </motion.div>
    </div>
  );
}
