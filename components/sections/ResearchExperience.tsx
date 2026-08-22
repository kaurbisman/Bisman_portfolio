"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlaskConical,
  Building2,
  Calendar,
  User,
  Target,
  Workflow,
  CheckCircle2,
  TrendingUp,
  FileText,
  Presentation,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { ResearchExperience as ResearchExperienceType } from "@/lib/data";
import { GithubIcon } from "../ui/SocialIcons";

interface ResearchExperienceProps {
  experiences: ResearchExperienceType[];
}

export const ResearchExperience: React.FC<ResearchExperienceProps> = ({ experiences }) => {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="research-experience" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Lab Rotations & Positions"
        title="Research Experience"
        subtitle="Formal laboratory rotations, experimental position responsibilities, methodologies, and documented scientific impact."
      />

      <div className="mt-8 space-y-6">
        {experiences.map((exp, index) => {
          const isExpanded = expandedId === exp.id;
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <GlassCard className="p-7">
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-800">
                        <Calendar className="w-3.5 h-3.5" /> {exp.duration}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400">
                        <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Supervisor: <strong className="text-slate-900 dark:text-slate-100">{exp.supervisor}</strong>
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 dark:text-slate-50">
                      {exp.title}
                    </h3>

                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 mt-1">
                      <Building2 className="w-4 h-4" /> {exp.institution}
                    </p>
                  </div>

                  {/* Toggle Button */}
                  <button
                    onClick={() => toggleExpand(exp.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors self-start md:self-auto cursor-pointer"
                  >
                    <span>{isExpanded ? "Collapse Summary" : "View Methods & Results"}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Primary Objective Summary */}
                <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-1 text-[11px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                    <Target className="w-3.5 h-3.5" /> Research Objective
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {exp.objective}
                  </p>
                </div>

                {/* Expandable Deep Dive */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6"
                    >
                      {/* Methodology */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                          <Workflow className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Experimental & Computational Workflow
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                          {exp.methodology}
                        </p>
                      </div>

                      {/* Techniques Used Badges */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                          <FlaskConical className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Techniques Applied
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.techniquesUsed.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Results & Impact Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Key Findings & Output
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                            {exp.results}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-800/60">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider mb-1">
                            <TrendingUp className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Scientific Impact
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                            {exp.researchImpact}
                          </p>
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        {exp.githubUrl && (
                          <a
                            href={exp.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100 text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
                          >
                            <GithubIcon className="w-3.5 h-3.5" /> Code Repository
                          </a>
                        )}

                        {exp.posterUrl && (
                          <a
                            href={exp.posterUrl}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Research Poster
                          </a>
                        )}

                        {exp.presentationUrl && (
                          <a
                            href={exp.presentationUrl}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
                          >
                            <Presentation className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Slide Deck
                          </a>
                        )}

                        {exp.publications && exp.publications.length > 0 && (
                          <a
                            href="#publications"
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold"
                          >
                            <FileText className="w-3.5 h-3.5" /> Associated Manuscripts
                          </a>
                        )}
                      </div>
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
