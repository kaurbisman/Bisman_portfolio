"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  hoverEffect = true,
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        "liquid-glass-card rounded-xl p-6 relative overflow-hidden transition-all duration-300",
        hoverEffect && "glass-card-hover cursor-pointer",
        className
      )}
    >
      {/* Top Glossy Liquid Glass Reflection Effect */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00685f]/30 dark:via-[#00bfa5]/40 to-transparent opacity-60 pointer-events-none" />

      {children}
    </motion.div>
  );
};
