"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { handleCVDownload } from "@/lib/download";

interface NavbarProps {
  resumeUrl?: string;
  photoUrl?: string;
}

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Journey", href: "#timeline" },
  { label: "Skills", href: "#skills" },
];

export const Navbar: React.FC<NavbarProps> = ({
  resumeUrl = "/resume_bisman_kaur.pdf",
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.substring(1));
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/80 dark:bg-[#09121f]/80 backdrop-blur-xl border-b border-[#d5e3fd]/80 dark:border-slate-800/80 shadow-md"
          : "py-4 bg-white/50 dark:bg-[#09121f]/50 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo: Bisman Kaur */}
        <a href="#hero" className="flex items-center gap-1.5 group shrink-0">
          <span className="font-heading font-extrabold text-xl text-[#00685f] dark:text-[#00bfa5] tracking-tight group-hover:scale-105 transition-transform">
            Bisman
          </span>
          <span className="font-heading font-bold text-xl text-[#0d1c2f] dark:text-[#f8f9ff] tracking-tight">
            Kaur
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const id = item.href.substring(1);
            const isActive = activeSection === id;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-semibold transition-colors relative py-1 ${
                  isActive
                    ? "text-[#00685f] dark:text-[#00bfa5]"
                    : "text-[#3d4947] dark:text-slate-300 hover:text-[#00685f] dark:hover:text-[#00bfa5]"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00685f] dark:bg-[#00bfa5] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <ThemeToggle />
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-[#09121f]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg"
          >
            <div className="p-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-[#0d1c2f] dark:text-[#f8f9ff] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <hr className="border-slate-200 dark:border-slate-800 my-1" />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleCVDownload(resumeUrl);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-semibold text-white bg-[#00685f] hover:bg-[#005049]"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
