"use client";

import React from 'react';
import Link from "next/link";
import { motion } from "motion/react";

export function MainLink({ href, text }: { href: string; text: string }) {
  // return (
  //   <Link 
  //     href={href} 
  //     target="_blank" 
  //     rel="noopener noreferrer" 
  //     className="text-xl text-gray-700 transition duration-300 hover:text-white hover:scale-105"
  //   >
  //     {text}
  //   </Link>
  // );
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <motion.div
        whileHover={{
          scale: 1.1, // Slightly enlarges the button
          textShadow: "0px 0px 8px rgba(255,255,255,0.8)", // Subtle white glow
          color: "#ffffff",
        }}
        transition={{ duration: 0.3 }}
        className="text-xl text-white text-gray-700 cursor-pointer"
      >
        {text}
      </motion.div>
    </Link>
  );
}