"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
      className="flex justify-between items-center container mx-auto px-4 py-6"
    >
      <div className="flex items-center gap-6">
        <Image src="/logo.png" alt="Healf" width={60} height={60} className="rounded-2xl" />
      </div>
    </motion.div>
  );
}
