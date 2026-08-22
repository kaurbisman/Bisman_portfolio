"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Trophy } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { Achievement } from "@/lib/data";
import { fireCelebrationConfetti } from "@/lib/confetti";

interface AchievementsProps {
  achievements: Achievement[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="MILESTONES"
        title="Key Highlights"
        rightAction={
          <a
            href="#education"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00685f] dark:text-[#00bfa5] hover:underline"
          >
            <span>View full CV</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {achievements.slice(0, 3).map((ach, index) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
          >
            <GlassCard
              className="p-6 h-full flex flex-col justify-between group cursor-pointer hover:border-[#00685f]/50 transition-colors"
              onClick={fireCelebrationConfetti}
            >
              <div>
                {/* Year Chip in JetBrains Mono */}
                <span className="font-mono-label text-[11px] text-[#6d7a77] dark:text-slate-400 block mb-2">
                  {ach.date || "2024"}
                </span>

                <h3 className="text-lg font-heading font-bold text-[#0d1c2f] dark:text-[#f8f9ff] group-hover:text-[#00685f] dark:group-hover:text-[#00bfa5] transition-colors leading-snug">
                  {ach.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-[#3d4947] dark:text-[#94a3b8] leading-relaxed font-normal">
                  {ach.description}
                </p>
              </div>

              {ach.metricNumber && (
                <div className="mt-4 pt-3 border-t border-[#d5e3fd]/60 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-[#00685f] dark:text-[#00bfa5]">
                  <span>{ach.metricNumber}</span>
                  <Trophy className="w-3.5 h-3.5" />
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
