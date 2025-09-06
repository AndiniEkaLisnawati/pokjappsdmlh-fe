"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  mode?: "fullscreen" | "inline";
  message?: string;
  showSpinner?: boolean;
}

export default function LoadingScreen({
  mode = "fullscreen",
  message = "Loading...",
  showSpinner = true,
}: LoadingScreenProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "flex flex-col items-center justify-center",
          mode === "fullscreen"
            ? "fixed inset-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm"
            : "w-full p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm"
        )}
      >
        {showSpinner && (
          <motion.div
            className="w-12 h-12 mb-4 rounded-full border-4 border-indigo-500 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        )}

        <motion.p
          className="text-base font-semibold  dark:text-gray-300 bg-gradient-to-r from-indigo-500 via-blue-400 to-indigo-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {message}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
