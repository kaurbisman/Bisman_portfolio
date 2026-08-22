"use client";

import React from "react";
import { motion } from "framer-motion";
import { FlaskConical, Cpu, Sparkles, Network } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { QuickFact, Profile } from "@/lib/data";

interface AboutProps {
  bio: string;
  quickFacts: QuickFact[];
  profile?: Profile;
}

export const About: React.FC<AboutProps> = ({ bio, quickFacts, profile }) => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      <SectionHeading
        title="Research Overview"
        subtitle="Investigating the intricate web of molecular mechanisms that govern cellular signaling. By combining quantitative proteomics with real-time imaging, the laboratory seeks to unveil how misrouted signals contribute to systemic pathology."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Card 1: Wide Top Card - Receptor Tyrosine Kinase Networks */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="lg:col-span-8 flex flex-col"
        >
          <GlassCard className="h-full flex flex-col justify-between p-7 bg-[#eff4ff] dark:bg-[#0e1b2e]">
            <div>
              <div className="w-9 h-9 rounded-lg bg-[#00685f]/10 text-[#00685f] dark:text-[#00bfa5] flex items-center justify-center mb-4">
                <Network className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-heading font-bold text-[#0d1c2f] dark:text-[#f8f9ff]">
                Receptor Tyrosine Kinase Networks
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-[#3d4947] dark:text-[#94a3b8] leading-relaxed font-normal">
                Mapping the spatiotemporal dynamics of RTK activation in response to environmental stress, utilizing CRISPR-Cas9 engineered cell lines to isolate specific downstream effector nodes.
              </p>
            </div>

            {/* Custom Bar Chart Graphic matching mockup */}
            <div className="mt-8 pt-4 border-t border-[#d5e3fd] dark:border-slate-800">
              <div className="flex items-end justify-between h-16 gap-3 max-w-md">
                <div className="w-full h-[25%] bg-[#8fa7fe]/40 dark:bg-[#8fa7fe]/20 rounded-xs" />
                <div className="w-full h-[60%] bg-[#8fa7fe] rounded-xs" />
                <div className="w-full h-[95%] bg-[#00685f] dark:bg-[#00bfa5] rounded-xs" />
                <div className="w-full h-[70%] bg-[#8fa7fe] rounded-xs" />
                <div className="w-full h-[35%] bg-[#8fa7fe]/40 dark:bg-[#8fa7fe]/20 rounded-xs" />
                <div className="w-full h-[85%] bg-[#008378] rounded-xs" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Card 2: Solid Teal Card - Metabolic Profiling */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="lg:col-span-4 flex flex-col"
        >
          <div className="h-full p-7 rounded-xl bg-[#00685f] text-white flex flex-col justify-between shadow-md">
            <div>
              <div className="w-9 h-9 rounded-lg bg-white/15 text-white flex items-center justify-center mb-4">
                <FlaskConical className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-heading font-bold text-white">
                Metabolic Profiling
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-emerald-100 leading-relaxed font-normal">
                Analyzing flux through central carbon metabolism to correlate signaling pathway aberrations with metabolic reprogramming events.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/20 text-xs font-semibold text-emerald-200">
              Active Wet-Lab Assays →
            </div>
          </div>
        </motion.div>

        {/* Card 3: Full Width Horizontal Card - Computational Bioinformatics */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="lg:col-span-12"
        >
          <GlassCard className="p-5 sm:p-6 bg-[#eff4ff] dark:bg-[#0e1b2e]">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Lab Image Thumbnail */}
              <div className="w-full sm:w-32 h-24 rounded-lg overflow-hidden shrink-0 border border-[#d5e3fd] dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=400&auto=format&fit=crop"
                  alt="Bioinformatics"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-7 h-7 rounded-md bg-[#b05e3d]/15 text-[#924628] dark:text-[#ffb59a] flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-[#0d1c2f] dark:text-[#f8f9ff]">
                    Computational Bioinformatics
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#3d4947] dark:text-[#94a3b8] leading-relaxed font-normal">
                  Developing custom Python pipelines to analyze large-scale scRNA-seq datasets, clustering heterogeneous cell populations to identify rare signaling phenotypes in malignant progression.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};
