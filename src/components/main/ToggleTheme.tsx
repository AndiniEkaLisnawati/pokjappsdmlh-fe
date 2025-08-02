import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const userTheme = localStorage.getItem("theme");
    const activeDark =
      userTheme === "dark" || (!userTheme && systemPrefersDark);

    html.classList.toggle("dark", activeDark);
    setIsDark(activeDark);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const next = !isDark;
    html.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-xl rounded transition"
      aria-label="Toggle dark mode"
    >
      <div className="p-2 cursor-pointer text-slate-800 shadow-md bg-slate-50 dark:text-slate-50 dark:bg-teal-500 rounded-md">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDark ? "light" : "dark"}
            initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
            transition={{ duration: 0.25 }}
          >
            {isDark ? (
              <MdOutlineLightMode className="" />
            ) : (
              <MdOutlineDarkMode className="" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </button>
  );
};

export default ThemeToggle;
