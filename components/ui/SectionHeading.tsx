"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ badge, title, subtitle, rightAction }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
      <div>
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono-label inline-block text-[11px] font-bold text-[#00685f] dark:text-[#00bfa5] tracking-widest uppercase mb-2"
          >
            {badge}
          </motion.span>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.04 }}
          className="text-3xl sm:text-4xl font-heading font-extrabold text-[#0d1c2f] dark:text-[#f8f9ff] tracking-tight leading-tight"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-2 text-sm sm:text-base text-[#3d4947] dark:text-[#94a3b8] leading-relaxed max-w-3xl font-normal"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {rightAction && (
        <div className="shrink-0 mb-1">
          {rightAction}
        </div>
      )}
    </div>
  );
};
