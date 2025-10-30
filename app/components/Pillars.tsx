"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function Pillars() {
  const pillars = [
    {
      name: "EAT",
      image: "/eat-pillar.webp",
    },
    {
      name: "MOVE",
      image: "/move-pillar.webp",
    },
    {
      name: "MIND",
      image: "/mind-pillar.webp",
    },
    {
      name: "SLEEP",
      image: "/sleep-pillar.webp",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % pillars.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [pillars.length]);

  const currentPillar = pillars[currentIndex];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.div key={currentIndex} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="absolute inset-0">
        <Image src={currentPillar.image} alt={`${currentPillar.name} Pillar`} fill className="object-cover" priority />
      </motion.div>

      <motion.h1
        key={`text-${currentIndex}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-white text-4xl font-medium absolute top-0 left-0 right-0 p-4 z-10"
      >
        {currentPillar.name}
      </motion.h1>
    </div>
  );
}
