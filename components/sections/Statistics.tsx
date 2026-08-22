"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Microscope, Cpu, FileText, Share2 } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { StatCounter } from "../ui/StatCounter";
import { StatMetric } from "@/lib/data";

interface StatisticsProps {
  metrics: StatMetric[];
}

export const Statistics: React.FC<StatisticsProps> = ({ metrics }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Trophy":
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case "Award":
        return <Award className="w-5 h-5 text-indigo-500" />;
      case "Microscope":
        return <Microscope className="w-5 h-5 text-blue-500" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-indigo-500" />;
      case "FileText":
        return <FileText className="w-5 h-5 text-emerald-500" />;
      case "Share2":
      default:
        return <Share2 className="w-5 h-5 text-rose-500" />;
    }
  };

  return (
    <section id="statistics" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Key Impact"
        title="Research Metrics & Accomplishments"
        subtitle="Quantitative overview of national competition ranks, publications, lab rotations, and technical repositories."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
        {metrics.map((metric, idx) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <GlassCard className="p-5 text-center flex flex-col items-center justify-between h-full">
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs mb-3">
                {getIcon(metric.icon)}
              </div>

              <div className="text-3xl font-heading font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
                <StatCounter value={metric.value} suffix={metric.suffix} />
              </div>

              <span className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                {metric.label}
              </span>

              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 leading-tight hidden sm:block">
                {metric.description}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
