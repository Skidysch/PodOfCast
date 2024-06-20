"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        className="w-full"
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
