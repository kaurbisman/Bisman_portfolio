"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Microscope,
  Code,
  Terminal,
  Brain,
  Search,
  Dna,
  FlaskConical,
  Activity,
  TestTube,
  Box,
  GitCommit,
  Database,
  Cpu,
  Atom,
  PieChart,
  Sparkles,
  Layers,
  X,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { SkillCategory, SkillLevel } from "@/lib/data";

interface SkillsProps {
  categories: SkillCategory[];
}

// Dynamic Icon getter based on skill name or category
const getSkillIcon = (skillName: string, categoryName: string) => {
  const name = skillName.toLowerCase();

  if (name.includes("pcr") || name.includes("dna") || name.includes("rna")) return <Dna className="w-4 h-4 text-[#00685f] dark:text-[#00bfa5]" />;
  if (name.includes("microscopy") || name.includes("fluorescence")) return <Microscope className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
  if (name.includes("culture") || name.includes("flask")) return <FlaskConical className="w-4 h-4 text-teal-600 dark:text-teal-400" />;
  if (name.includes("blot") || name.includes("activity")) return <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />;
  if (name.includes("elisa") || name.includes("assay")) return <TestTube className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
  if (name.includes("python")) return <Code className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
  if (name.includes("r &") || name.includes("bioconductor")) return <PieChart className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
  if (name.includes("linux") || name.includes("bash") || name.includes("terminal")) return <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
  if (name.includes("alphafold") || name.includes("pymol") || name.includes("docker")) return <Box className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
  if (name.includes("seq") || name.includes("single-cell") || name.includes("seurat")) return <GitCommit className="w-4 h-4 text-[#00685f] dark:text-[#00bfa5]" />;
  if (name.includes("pytorch") || name.includes("tensorflow") || name.includes("scikit") || name.includes("ai")) return <Cpu className="w-4 h-4 text-indigo-600 dark:text-[#8fa7fe]" />;
  if (name.includes("react") || name.includes("next")) return <Atom className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />;
  if (name.includes("sql") || name.includes("database")) return <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;

  // Default fallback icons per category
  if (categoryName.toLowerCase().includes("lab")) return <FlaskConical className="w-4 h-4 text-[#00685f] dark:text-[#00bfa5]" />;
  if (categoryName.toLowerCase().includes("bioinfo")) return <Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />;
  if (categoryName.toLowerCase().includes("programming")) return <Code className="w-4 h-4 text-indigo-600 dark:text-[#8fa7fe]" />;
  return <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
};

const getCategoryIconHeader = (catName: string) => {
  const name = catName.toLowerCase();
  if (name.includes("lab")) return <Microscope className="w-5 h-5 text-[#00685f] dark:text-[#00bfa5]" />;
  if (name.includes("bioinfo")) return <Terminal className="w-5 h-5 text-[#00685f] dark:text-[#00bfa5]" />;
  if (name.includes("programming")) return <Code className="w-5 h-5 text-[#4059aa] dark:text-[#8fa7fe]" />;
  if (name.includes("ai")) return <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
  return <Layers className="w-5 h-5 text-[#00685f] dark:text-[#00bfa5]" />;
};

const getLevelBadgeStyles = (level: SkillLevel) => {
  switch (level) {
    case "Expert":
      return {
        badge: "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-500/40",
        dots: 4,
      };
    case "Advanced":
      return {
        badge: "bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-500/40",
        dots: 3,
      };
    case "Intermediate":
      return {
        badge: "bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-500/40",
        dots: 2,
      };
    case "Beginner":
    default:
      return {
        badge: "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700/40",
        dots: 1,
      };
  }
};

export const Skills: React.FC<SkillsProps> = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categoryNames = ["All", ...categories.map((c) => c.name)];
  const totalSkillsCount = categories.reduce((acc, c) => acc + c.skills.length, 0);

  return (
    <section id="skills" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      <SectionHeading
        badge="TECHNICAL MATRIX"
        title="Technical & Scientific Expertise"
        subtitle="Categorized proficiency across wet-lab techniques, computational genomics pipelines, software engineering, and biological AI models."
      />

      {/* Featured Core Tech Stack Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 p-4 sm:p-5 rounded-2xl bg-white/90 border border-[#d5e3fd] dark:bg-[#09121f]/95 dark:border-[#00685f]/50 backdrop-blur-xl shadow-md dark:shadow-lg flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00685f]/15 border border-[#00685f]/30 dark:bg-[#00685f]/30 dark:border-[#00bfa5]/40 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#00685f] dark:text-[#00bfa5]" />
          </div>
          <div>
            <h4 className="text-xs font-mono-label font-bold text-[#00685f] dark:text-[#00bfa5] uppercase tracking-wider">
              PRIMARY RESEARCH TECH STACK
            </h4>
            <p className="text-xs text-[#3d4947] dark:text-slate-300 mt-0.5">
              High-throughput bioinformatics, structural modelling & quantitative wet-lab assays
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {["Python & R", "AlphaFold 3D", "Single-Cell Multi-Omics", "Confocal Microscopy", "SEIR Outbreak Models"].map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-lg bg-[#eff4ff] border border-[#d5e3fd] text-[#00685f] font-mono text-[11px] font-medium dark:bg-[#112238] dark:border-[#00685f]/30 dark:text-slate-200 hover:border-[#00685f]/60 transition-colors"
            >
              • {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Filter Tabs & Search Bar Container */}
      <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
          {categoryNames.map((catName) => {
            const isSelected = selectedCategory === catName;
            const count =
              catName === "All"
                ? totalSkillsCount
                : categories.find((c) => c.name === catName)?.skills.length || 0;

            return (
              <button
                key={catName}
                onClick={() => setSelectedCategory(catName)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? "bg-[#00685f] text-white border-[#00bfa5]/60 shadow-md shadow-[#00685f]/20"
                    : "bg-white text-[#3d4947] border-[#d5e3fd] hover:border-[#00685f]/40 hover:text-[#0d1c2f] dark:bg-[#09121f]/90 dark:text-slate-300 dark:border-slate-800 dark:hover:text-white"
                }`}
              >
                <span>{catName}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md font-bold ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[#eff4ff] text-[#00685f] border border-[#00685f]/20 dark:bg-[#112238] dark:text-[#00bfa5] dark:border-[#00685f]/30"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search methods, tools & algorithms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-[#d5e3fd] text-[#0d1c2f] text-xs focus:outline-none focus:border-[#00685f] dark:bg-[#09121f] dark:border-slate-800 dark:text-slate-100 dark:focus:border-[#00bfa5] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Categorized Matrix Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories
          .filter((cat) => selectedCategory === "All" || cat.name === selectedCategory)
          .map((category, catIdx) => {
            const filteredSkills = category.skills.filter((s) =>
              s.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (filteredSkills.length === 0) return null;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: catIdx * 0.08 }}
                className="h-full"
              >
                <div className="p-6 sm:p-7 rounded-2xl bg-white/90 border border-[#d5e3fd] dark:bg-[#09121f] dark:border-slate-800 h-full flex flex-col justify-between hover:border-[#00685f]/50 transition-all duration-300 shadow-md shadow-slate-200/50 dark:shadow-xl group">
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#d5e3fd] dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#eff4ff] border border-[#d5e3fd] dark:bg-[#112238] dark:border-[#00685f]/40 flex items-center justify-center shadow-xs">
                          {getCategoryIconHeader(category.name)}
                        </div>
                        <div>
                          <h3 className="text-lg font-heading font-bold text-[#0d1c2f] dark:text-slate-50 tracking-tight">
                            {category.name}
                          </h3>
                          <span className="text-[11px] font-mono text-[#00685f] dark:text-[#00bfa5] font-semibold">
                            {filteredSkills.length} Verified {filteredSkills.length === 1 ? "Method" : "Methods"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Skill Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {filteredSkills.map((skill) => {
                        const levelStyles = getLevelBadgeStyles(skill.level);

                        return (
                          <div
                            key={skill.id}
                            className="p-3.5 rounded-xl bg-[#f4f7fc] border border-[#d5e3fd] dark:bg-[#112238]/80 dark:border-slate-800/90 hover:border-[#00685f]/50 transition-all duration-200 flex flex-col justify-between group/card"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="p-1 rounded-md bg-white border border-[#d5e3fd] dark:bg-[#09121f] dark:border-slate-800 shrink-0">
                                  {getSkillIcon(skill.name, category.name)}
                                </div>
                                <span className="font-semibold text-xs sm:text-sm text-[#0d1c2f] dark:text-slate-100 truncate">
                                  {skill.name}
                                </span>
                              </div>

                              {/* Level Badge */}
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border shrink-0 ${levelStyles.badge}`}
                              >
                                {skill.level}
                              </span>
                            </div>

                            {/* Minimalist Segmented Proficiency Indicator */}
                            <div className="mt-3 pt-2.5 border-t border-[#d5e3fd] dark:border-slate-800/80 flex items-center justify-between">
                              <span className="text-[10px] font-mono text-[#6d7a77] dark:text-slate-400 uppercase tracking-widest">
                                PROFICIENCY
                              </span>
                              <div className="flex items-center gap-1">
                                {[1, 2, 3, 4].map((dotIndex) => (
                                  <div
                                    key={dotIndex}
                                    className={`w-2.5 h-1 rounded-full transition-all ${
                                      dotIndex <= levelStyles.dots
                                        ? "bg-[#00685f] dark:bg-[#00bfa5] shadow-[0_0_8px_rgba(0,191,165,0.4)]"
                                        : "bg-slate-200 dark:bg-slate-800"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
    </section>
  );
};
