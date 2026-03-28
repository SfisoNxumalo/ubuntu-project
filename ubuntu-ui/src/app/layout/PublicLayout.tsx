import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

type Props = {
  children: ReactNode;
};

export default function PublicLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-background text-textPrimary">
      
      {/* Glow background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary opacity-20 blur-[120px] rounded-full" />
      </div>

      {/* Public Navbar */}
      <Navbar />

      {/* Page content */}
      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-4 md:px-8 py-8"
      >
        {children}
      </motion.main>
    </div>
  );
}