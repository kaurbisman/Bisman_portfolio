"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  Building2,
  Award,
  BookOpen,
  ChevronDown,
  ChevronUp,
  User,
  Sparkles,
  FileText,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { EducationEntry } from "@/lib/data";

interface EducationProps {
  education: EducationEntry[];
}

export const Education: React.FC<EducationProps> = ({ education }) => {
  const [expandedId, setExpandedId] = useState<string | null>(education[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="education" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      <SectionHeading
        badge="ACADEMIC PATH"
        title="Education & Qualifications"
        subtitle="University degrees, competitive national entrance ranks, doctoral coursework, and thesis research."
      />

      <div className="mt-8 space-y-6">
        {education.map((item, index) => {
          const isExpanded = expandedId === item.id;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <GlassCard className="p-6 sm:p-7">
                {/* Header Row with Logo Frame */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    {/* Institution Logo Frame Format */}
                    <div className="w-14 h-14 rounded-xl p-1.5 bg-white dark:bg-[#112238] border-2 border-[#00685f]/30 dark:border-[#00bfa5]/40 shrink-0 shadow-sm overflow-hidden flex items-center justify-center">
                      <img
                        src={item.logo}
                        alt={item.institution}
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1 rounded-md bg-[#e6eeff] dark:bg-[#132238] text-[#00685f] dark:text-[#00bfa5] border border-[#d5e3fd] dark:border-slate-800">
                          <Calendar className="w-3.5 h-3.5" /> {item.startDate} – {item.endDate}
                        </span>
                        {item.rankHighlight && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> {item.rankHighlight}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0d1c2f] dark:text-[#f8f9ff]">
                        {item.degree}
                      </h3>

                      <p className="text-sm font-semibold text-[#4059aa] dark:text-[#8fa7fe] flex items-center gap-1.5 mt-1">
                        <Building2 className="w-4 h-4 text-[#00685f] dark:text-[#00bfa5]" /> {item.institution}
                      </p>
                    </div>
                  </div>

                  {/* Performance & Expand Button */}
                  <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-[#d5e3fd] dark:border-slate-800">
                    {item.cgpa && (
                      <div className="text-left md:text-right">
                        <span className="text-[10px] font-mono-label text-[#6d7a77] dark:text-slate-400 block uppercase">
                          Performance
                        </span>
                        <span className="text-sm font-bold text-[#0d1c2f] dark:text-[#f8f9ff]">{item.cgpa}</span>
                      </div>
                    )}

                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold bg-[#eff4ff] dark:bg-slate-800/80 text-[#0d1c2f] dark:text-[#f8f9ff] border border-[#d5e3fd] dark:border-slate-700 hover:bg-[#dde9ff] transition-colors cursor-pointer"
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? "Hide Details" : "Curriculum & Thesis"}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-[#00685f]" /> : <ChevronDown className="w-4 h-4 text-[#00685f]" />}
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-sm text-[#3d4947] dark:text-[#94a3b8] leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Expandable Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-6 border-t border-[#d5e3fd] dark:border-slate-800 space-y-6"
                    >
                      {/* Coursework Badges */}
                      {item.coursework && item.coursework.length > 0 && (
                        <div>
                          <h4 className="text-xs font-mono-label text-[#6d7a77] dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4 text-[#00685f] dark:text-[#00bfa5]" /> Key Coursework
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {item.coursework.map((course) => (
                              <span
                                key={course}
                                className="px-3 py-1 rounded-md text-xs font-medium bg-[#eff4ff] dark:bg-slate-800/60 text-[#0d1c2f] dark:text-slate-200 border border-[#d5e3fd] dark:border-slate-700"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Thesis & Supervisor Box */}
                      {item.thesisTitle && (
                        <div className="p-5 rounded-xl bg-[#e6eeff]/60 dark:bg-[#132238]/60 border border-[#d5e3fd] dark:border-slate-700">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="w-4 h-4 text-[#00685f] dark:text-[#00bfa5]" />
                            <span className="text-[11px] font-mono-label text-[#00685f] dark:text-[#00bfa5]">
                              Research Thesis / Project
                            </span>
                          </div>
                          <h5 className="font-heading font-bold text-base text-[#0d1c2f] dark:text-[#f8f9ff]">
                            {item.thesisTitle}
                          </h5>
                          {item.thesisDescription && (
                            <p className="mt-2 text-xs sm:text-sm text-[#3d4947] dark:text-[#94a3b8] leading-relaxed font-normal">
                              {item.thesisDescription}
                            </p>
                          )}
                          {item.supervisor && (
                            <div className="mt-3 text-xs font-medium text-[#3d4947] dark:text-[#94a3b8] flex items-center gap-1.5">
                              <User className="w-3.5 h-3.5 text-[#4059aa] dark:text-[#8fa7fe]" />
                              <span>Supervisor: <strong className="text-[#0d1c2f] dark:text-[#f8f9ff]">{item.supervisor}</strong></span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Awards List */}
                      {item.awards && item.awards.length > 0 && (
                        <div>
                          <h4 className="text-xs font-mono-label text-[#6d7a77] dark:text-slate-400 mb-2 flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-amber-500" /> Honors & Fellowships
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {item.awards.map((award) => (
                              <span
                                key={award}
                                className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 text-xs font-semibold flex items-center gap-1"
                              >
                                🏆 {award}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
