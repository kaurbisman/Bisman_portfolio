"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Microscope,
  Trophy,
  Award,
  FileText,
  Zap,
  Sparkles,
} from "lucide-react";
import { TimelineItem, TimelineCategory } from "@/lib/data";

interface TimelineProps {
  items: TimelineItem[];
}

const colorMap: Record<
  string,
  {
    border: string;
    text: string;
    bgPill: string;
    borderPill: string;
    dot: string;
    glow: string;
  }
> = {
  teal: {
    border: "border-[#00685f] dark:border-[#00bfa5]",
    text: "text-[#00685f] dark:text-[#00bfa5]",
    bgPill: "bg-[#e6eeff] dark:bg-[#0d1c2f]",
    borderPill: "border-[#00685f]/30 dark:border-[#00bfa5]/40",
    dot: "bg-[#00685f] dark:bg-[#00bfa5]",
    glow: "shadow-[0_0_15px_rgba(0,191,165,0.25)]",
  },
  purple: {
    border: "border-purple-500",
    text: "text-purple-500 dark:text-purple-400",
    bgPill: "bg-purple-50 dark:bg-purple-950/50",
    borderPill: "border-purple-200 dark:border-purple-800/60",
    dot: "bg-purple-500",
    glow: "shadow-[0_0_15px_rgba(168,85,247,0.25)]",
  },
  amber: {
    border: "border-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    bgPill: "bg-amber-50 dark:bg-amber-950/50",
    borderPill: "border-amber-200 dark:border-amber-800/60",
    dot: "bg-amber-500",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.25)]",
  },
  emerald: {
    border: "border-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    bgPill: "bg-emerald-50 dark:bg-emerald-950/50",
    borderPill: "border-emerald-200 dark:border-emerald-800/60",
    dot: "bg-emerald-500",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.25)]",
  },
  blue: {
    border: "border-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    bgPill: "bg-blue-50 dark:bg-blue-950/50",
    borderPill: "border-blue-200 dark:border-blue-800/60",
    dot: "bg-blue-500",
    glow: "shadow-[0_0_15px_rgba(59,130,246,0.25)]",
  },
  rose: {
    border: "border-rose-500",
    text: "text-rose-600 dark:text-rose-400",
    bgPill: "bg-rose-50 dark:bg-rose-950/50",
    borderPill: "border-rose-200 dark:border-rose-800/60",
    dot: "bg-rose-500",
    glow: "shadow-[0_0_15px_rgba(244,63,94,0.25)]",
  },
};

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const getCategoryIcon = (cat: TimelineCategory, colorClass: string) => {
    switch (cat) {
      case "Education":
        return <BookOpen className={`w-5 h-5 ${colorClass}`} />;
      case "Research":
        return <Microscope className={`w-5 h-5 ${colorClass}`} />;
      case "Hackathons":
        return <Trophy className={`w-5 h-5 ${colorClass}`} />;
      case "Awards":
        return <Award className={`w-5 h-5 ${colorClass}`} />;
      case "Publications":
        return <FileText className={`w-5 h-5 ${colorClass}`} />;
      default:
        return <Zap className={`w-5 h-5 ${colorClass}`} />;
    }
  };

  return (
    <section id="timeline" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 relative">
      {/* Header Matching Reference Screenshot */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-3"
        >
          <div className="w-6 h-0.5 bg-[#00685f] dark:bg-[#00bfa5]" />
          <span className="font-mono-label text-xs font-bold text-[#00685f] dark:text-[#00bfa5] tracking-widest uppercase">
            MILESTONES
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.04 }}
          className="text-4xl sm:text-5xl font-heading font-extrabold text-[#0d1c2f] dark:text-white tracking-tight"
        >
          Journey
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="mt-3 text-base sm:text-lg text-[#3d4947] dark:text-slate-300 max-w-2xl leading-relaxed font-normal"
        >
          Key moments in my academic and professional journey — education, projects, competitions, and growth-defining experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12, duration: 0.5 }}
          className="mt-5 h-1 w-36 bg-gradient-to-r from-[#00685f] via-[#00bfa5] to-[#4059aa] rounded-full origin-left"
        />
      </div>

      {/* Timeline Container: Vertical line centered at x = 24px */}
      <div className="relative space-y-12 sm:space-y-14">
        {/* Central Vertical Line passing through exact center of 48px circle nodes (x = 24px) */}
        <div className="absolute left-6 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#00685f] via-[#4059aa] to-purple-600 opacity-40" />

        {items.map((item, index) => {
          const style = colorMap[item.color || "teal"] || colorMap["teal"];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative flex items-start group"
            >
              {/* Node Circle centered exactly at x = 24px (w-12 h-12 = 48px wide) */}
              <div
                className={`absolute left-0 top-0 w-12 h-12 rounded-full bg-white dark:bg-[#09121f] border-2 ${style.border} ${style.glow} flex items-center justify-center z-10 group-hover:scale-110 transition-all duration-300`}
              >
                {getCategoryIcon(item.category, style.text)}
              </div>

              {/* Right Content Block (offset pl-16 so line & circle are centered at x = 24px) */}
              <div className="pl-16 flex-1">
                {/* Date / Year in JetBrains Mono */}
                <span className={`font-mono-label text-xs ${style.text} font-bold tracking-widest block uppercase mb-1.5`}>
                  {item.year}
                </span>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0d1c2f] dark:text-white tracking-tight leading-snug group-hover:opacity-90 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm sm:text-base text-[#3d4947] dark:text-slate-300 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Bottom Dynamic Category Pill Badge */}
                <div
                  className={`mt-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full ${style.bgPill} border ${style.borderPill} ${style.text} text-[11px] font-mono font-bold uppercase tracking-wider`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                  <span>{item.category || "MILESTONE"}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
