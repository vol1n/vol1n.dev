"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const interpolateColor = (factor: number, color1: number[], color2: number[]) => {
  return `hsl(${color1[0] + factor * (color2[0] - color1[0])}, 
               ${color1[1] + factor * (color2[1] - color1[1])}%, 
               ${color1[2] + factor * (color2[2] - color1[2])}%)`;
};

export default function ParticleBackground() {
  const [particles, setParticles] = useState<{ x: number; y: number; duration: number, color: string }[]>([]);

  useEffect(() => {
    const numParticles = 20; // Adjust for more/less particles
    const color1 = [217, 91, 60]; 
    const color2 = [267, 85, 65]; 
    const newParticles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      duration: 4 + Math.random() * 6,
      color: interpolateColor(Math.random(), color1, color2),
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden ">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(240, 88%, 62%) 10%, rgba(0,0,0,0) 70%)",
          opacity: 0.2, // Adjust for more/less glow
        }}
      />
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full shadow-xl"
          style={{backgroundColor: p.color}}
          initial={{
            opacity: 0,
            x: p.x,
            y: p.y,
            boxShadow: `0px 0px 5px ${p.color}`,
          }}
          animate={{
            x: [p.x, Math.random() * window.innerWidth],
            y: [p.y, Math.random() * window.innerHeight],
            opacity: [0, 0.8, 0], // Smooth fade in and out
            boxShadow: [`0px 0px 5px ${p.color}`, `0px 0px 15px ${p.color}`, `0px 0px 5px ${p.color}`], // Pulsing glow effect
          }}
          transition={{
            duration: p.duration, // Randomized speed per particle
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}