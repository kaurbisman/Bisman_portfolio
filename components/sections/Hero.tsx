"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  FlaskConical,
  Sparkles,
} from "lucide-react";
import { Profile } from "@/lib/data";
import { fireCelebrationConfetti } from "@/lib/confetti";
import { MeetingSchedulerModal } from "../ui/MeetingSchedulerModal";
import { handleCVDownload } from "@/lib/download";

interface HeroProps {
  profile: Profile;
}

const flippingPhrases = [
  "Computational Genomics",
  "Bioinformatic Networks",
  "Single-Cell Multi-Omics",
  "Structural Proteomics",
  "Genome Algorithms",
  "Machine Learning Models",
];

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % flippingPhrases.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleResumeClick = () => {
    handleCVDownload(profile.resumeFileUrl);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-36 sm:pt-40 lg:pt-44 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column */}
        <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e6eeff] dark:bg-[#132238] border border-[#d5e3fd] dark:border-slate-800 mb-6 cursor-pointer hover:border-[#00685f] hover:scale-105 transition-all shadow-xs"
            onClick={fireCelebrationConfetti}
          >
            <div className="w-5 h-5 rounded-full bg-[#00685f]/15 text-[#00685f] dark:text-[#00bfa5] flex items-center justify-center">
              <FlaskConical className="w-3 h-3" />
            </div>
            <span className="font-mono-label text-[11px] text-[#00685f] dark:text-[#00bfa5]">
              Integrated PhD Candidate
            </span>
          </motion.div>

          {/* Prominent Name Heading with Animated Hover Effect */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="mb-5 group cursor-pointer inline-block text-left"
            onClick={fireCelebrationConfetti}
          >
            <div className="relative inline-flex items-center gap-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-[#0d1c2f] dark:text-[#f8f9ff] group-hover:text-[#00685f] dark:group-hover:text-[#00bfa5] transition-colors duration-300">
                {profile.name}
              </h2>
              <Sparkles className="w-6 h-6 text-[#00685f] dark:text-[#00bfa5] opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300 shrink-0" />
            </div>

            {/* Glowing Accent Sub-line on Hover */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs sm:text-sm font-mono-label text-[#4059aa] dark:text-[#8fa7fe] font-bold tracking-wider">
                Biological Sciences — IISER Pune
              </span>
              <div className="h-0.5 w-0 group-hover:w-16 bg-[#00685f] dark:bg-[#00bfa5] transition-all duration-400 rounded-full" />
            </div>
          </motion.div>

          {/* Main Headline with Computational Biology Flipping Text */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#0d1c2f] dark:text-[#f8f9ff] tracking-tight leading-[1.15]"
          >
            Decoding{" "}
            <span className="inline-inline text-[#00685f] dark:text-[#00bfa5] relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={flippingPhrases[phraseIndex]}
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {flippingPhrases[phraseIndex]}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            for Biological Discovery
          </motion.h1>

          {/* Subtitle / Tagline Focused explicitly on Computational Biology */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="mt-4 text-sm sm:text-base text-[#3d4947] dark:text-[#94a3b8] max-w-2xl leading-relaxed font-normal"
          >
            Integrated PhD Scholar at IISER Pune bridging computational biology, bioinformatics algorithms, and high-throughput genomic data analysis. My research leverages scalable Python & R pipelines, structural modeling, and machine learning to decode cellular networks and disease mechanisms.
          </motion.p>

          {/* 3 Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16 }}
            className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3"
          >
            <a
              href="#about"
              className="px-5 py-2.5 rounded-md text-xs font-semibold text-white bg-[#00685f] hover:bg-[#005049] dark:bg-[#008378] dark:hover:bg-[#00685f] shadow-xs transition-colors cursor-pointer"
            >
              Explore Research
            </a>

            <button
              onClick={handleResumeClick}
              className="flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-semibold text-white bg-[#4059aa] hover:bg-[#264191] shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </button>

            <button
              onClick={() => setMeetingModalOpen(true)}
              className="px-5 py-2.5 rounded-md text-xs font-semibold text-[#0d1c2f] dark:text-slate-200 bg-[#eff4ff] dark:bg-slate-800/80 border border-[#d5e3fd] dark:border-slate-700 hover:bg-[#dde9ff] transition-colors cursor-pointer"
            >
              View Curriculum Vitae
            </button>
          </motion.div>
        </div>

        {/* Right Photo Column with Clean Circular Picture Frame */}
        <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96"
          >
            {/* Circular Ambient Backlight */}
            <div className="absolute inset-0 rounded-full bg-[#00685f]/20 dark:bg-[#00bfa5]/20 blur-2xl pointer-events-none" />

            {/* Clean Circular Photo Frame Container */}
            <div className="relative w-full h-full rounded-full p-2.5 bg-white dark:bg-[#112238] border-2 border-[#00685f]/40 dark:border-[#00bfa5]/40 shadow-2xl overflow-hidden group transition-all duration-300">
              <img
                src={profile.profilePhoto}
                alt={profile.name}
                className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Meeting Scheduler Modal */}
      <MeetingSchedulerModal isOpen={meetingModalOpen} onClose={() => setMeetingModalOpen(false)} />
    </section>
  );
};
