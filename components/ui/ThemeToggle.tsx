"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ThemeMode = "system" | "light" | "dark";

export const ThemeToggle: React.FC = () => {
  const [mode, setMode] = useState<ThemeMode>("system");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as ThemeMode | null;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateDOM = (effectiveDark: boolean) => {
      if (effectiveDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    if (stored === "light" || stored === "dark" || stored === "system") {
      setMode(stored);
      if (stored === "system") {
        updateDOM(mediaQuery.matches);
      } else {
        updateDOM(stored === "dark");
      }
    } else {
      setMode("system");
      updateDOM(mediaQuery.matches);
    }

    const handleSystemChange = (e: MediaQueryListEvent) => {
      const currentStored = localStorage.getItem("theme");
      if (!currentStored || currentStored === "system") {
        updateDOM(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  const cycleMode = () => {
    let nextMode: ThemeMode = "system";
    if (mode === "system") {
      nextMode = "light";
    } else if (mode === "light") {
      nextMode = "dark";
    } else {
      nextMode = "system";
    }

    setMode(nextMode);
    localStorage.setItem("theme", nextMode);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const isDark =
      nextMode === "dark" || (nextMode === "system" && mediaQuery.matches);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) return <div className="w-10 h-10" />;

  const getTitle = () => {
    if (mode === "system") return "Theme: System Default (Click to switch to Light)";
    if (mode === "light") return "Theme: Light Mode (Click to switch to Dark)";
    return "Theme: Dark Mode (Click to switch to System)";
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={cycleMode}
      aria-label="Toggle Theme Mode"
      title={getTitle()}
      className="p-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-center relative shadow-sm"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {mode === "system" ? (
            <Monitor className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          ) : mode === "dark" ? (
            <Moon className="w-5 h-5 text-indigo-500" />
          ) : (
            <Sun className="w-5 h-5 text-amber-500" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};
