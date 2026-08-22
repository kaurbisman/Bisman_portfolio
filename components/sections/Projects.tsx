"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  FileText,
  HelpCircle,
  Target,
  Workflow,
  Database,
  Cpu,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { Project } from "@/lib/data";
import { GithubIcon } from "../ui/SocialIcons";

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Computational & Bench Science"
        title="Research Projects & Frameworks"
        subtitle="Interdisciplinary scientific initiatives combining computational genomics, epidemiological modeling, and experimental bench assays."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {projects.map((project, index) => {
          const technologies = project.technologies || [];
          const tags = project.tags || ["Research"];
          const imageSrc = project.heroImage || project.coverImage || "";

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <GlassCard className="p-6 sm:p-7 h-full flex flex-col justify-between group">
                <div>
                  {/* Hero Image */}
                  <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden mb-5 border border-slate-200 dark:border-slate-800 shadow-xs bg-slate-100 dark:bg-slate-800">
                    <img
                      src={imageSrc}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-semibold text-white">
                      <span className="px-3 py-1 rounded-md bg-black/60 border border-white/20 backdrop-blur-md text-[11px]">
                        {tags[0] || "Research"}
                      </span>
                      {project.subtitle && (
                        <span className="text-[11px] text-slate-200 font-medium">{project.subtitle}</span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Brief description */}
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {project.description}
                  </p>

                  {/* Research Problem Summary Box */}
                  {project.researchProblem && (
                    <div className="mt-4 p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 text-xs text-slate-700 dark:text-slate-300">
                      <strong className="text-amber-800 dark:text-amber-300 font-bold block mb-0.5">Core Problem Addressed:</strong>
                      {project.researchProblem}
                    </div>
                  )}

                  {/* Tech Chips */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {technologies.length > 5 && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500">
                        +{technologies.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-xs transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Project Dossier
                  </button>

                  <div className="flex items-center gap-2">
                    {project.links?.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors border border-slate-200 dark:border-slate-700"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.links?.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors border border-slate-200 dark:border-slate-700"
                        title="Live Demo / Interactive App"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Expandable Deep-Dive Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-3xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[20px] p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-800">
                  Detailed Project Dossier
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-slate-50">
                {selectedProject.title}
              </h3>
              {selectedProject.subtitle && (
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                  {selectedProject.subtitle}
                </p>
              )}

              {/* Cover Image */}
              <div className="mt-6 w-full h-56 rounded-xl overflow-hidden shadow-xs border border-slate-200 dark:border-slate-800">
                <img
                  src={selectedProject.heroImage || selectedProject.coverImage || ""}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-6 space-y-6">
                {/* Motivation & Research Problem */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProject.researchProblem && (
                    <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60">
                      <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <HelpCircle className="w-4 h-4" /> Research Problem
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                        {selectedProject.researchProblem}
                      </p>
                    </div>
                  )}

                  {selectedProject.motivation && (
                    <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-800/60">
                      <h4 className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Motivation
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                        {selectedProject.motivation}
                      </p>
                    </div>
                  )}
                </div>

                {/* Key Objectives */}
                {selectedProject.objectives && selectedProject.objectives.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                      <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Core Objectives
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.objectives.map((obj, i) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border border-blue-200 dark:border-blue-800">
                            {i + 1}
                          </span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Workflow Steps */}
                {selectedProject.workflow && selectedProject.workflow.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                      <Workflow className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Workflow Architecture
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProject.workflow.map((step, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs font-medium text-slate-800 dark:text-slate-200">
                          <ChevronRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies & Datasets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Technologies & Tools
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.technologies.map((t) => (
                          <span key={t} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProject.datasets && selectedProject.datasets.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Key Datasets
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.datasets.map((d) => (
                          <span key={d} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Results & Key Output */}
                {selectedProject.results && (
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60">
                    <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">
                      Key Outcomes & Impact
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                      {selectedProject.results}
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer Links */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  {selectedProject.links?.repo && (
                    <a
                      href={selectedProject.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Source Code
                    </a>
                  )}
                  {selectedProject.links?.paper && (
                    <a
                      href={selectedProject.links.paper}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Paper / Manuscript
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
