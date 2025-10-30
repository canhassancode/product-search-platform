"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
      className="flex justify-center items-center container mx-auto px-4"
    >
      <div className="flex items-center gap-6">
        <Image src="/logo-text.png" alt="Healf" width={150} height={150} className="cursor-pointer" />
      </div>
    </motion.div>
  );
}
