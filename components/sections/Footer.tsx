"use client";

import React from "react";
import {
  Mail,
  MapPin,
  ArrowUp,
  ExternalLink,
  FileText,
} from "lucide-react";
import { SocialLink } from "@/lib/data";
import { SocialIcon } from "../ui/SocialIcons";
import { handleCVDownload } from "@/lib/download";

interface FooterProps {
  name: string;
  title: string;
  resumeUrl?: string;
  socialLinks?: SocialLink[];
}

export const Footer: React.FC<FooterProps> = ({
  name,
  title,
  resumeUrl = "/resume_bisman_kaur.pdf",
  socialLinks = [],
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Journey", href: "#timeline" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative border-t border-[#d5e3fd] dark:border-slate-800/80 bg-[#eff4ff]/80 dark:bg-[#09121f] text-[#0d1c2f] dark:text-slate-100 z-10 pt-16 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden backdrop-blur-md">
      {/* Top Ambient Glow Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#00685f]/40 dark:via-[#00bfa5]/50 to-transparent" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Column 1: Identity & Academic Summary (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00685f] border border-[#00bfa5]/40 flex items-center justify-center font-heading font-bold text-white shadow-md">
                BK
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-[#0d1c2f] dark:text-slate-50 tracking-tight">
                  {name}
                </h3>
                <p className="text-xs text-[#00685f] dark:text-[#00bfa5] font-mono-label font-bold">
                  Integrated PhD Scholar • IISER Pune
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#3d4947] dark:text-slate-300 leading-relaxed max-w-md font-normal">
              Bridging quantitative biology, single-cell genomics, structural modeling, and computational disease discovery for healthcare innovation.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-[#3d4947] dark:text-slate-400 bg-white dark:bg-[#112238] border border-[#d5e3fd] dark:border-slate-800 px-3 py-1.5 rounded-lg shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-[#00685f] dark:text-[#00bfa5]" />
                <span>IISER Pune, Maharashtra, India</span>
              </div>

              <a
                href="mailto:kaurbisman2005@gmail.com"
                className="flex items-center gap-1.5 text-xs text-[#00685f] dark:text-[#00bfa5] hover:text-[#005049] dark:hover:text-white bg-[#00685f]/10 dark:bg-[#00685f]/20 border border-[#00685f]/30 dark:border-[#00685f]/60 hover:bg-[#00685f]/20 dark:hover:bg-[#00685f]/40 px-3 py-1.5 rounded-lg transition-colors font-medium"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>kaurbisman2005@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation & Actions (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono-label font-bold text-[#00685f] dark:text-[#00bfa5] uppercase tracking-wider">
              QUICK NAVIGATION
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs font-medium text-[#3d4947] dark:text-slate-300">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#00685f] dark:hover:text-[#00bfa5] transition-colors flex items-center gap-1.5 py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00685f] dark:bg-[#00bfa5]" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleCVDownload(resumeUrl)}
                className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#00685f] dark:bg-[#4059aa]/30 border border-[#00685f] dark:border-[#4059aa]/60 hover:bg-[#005049] dark:hover:bg-[#4059aa]/50 transition-colors w-full cursor-pointer shadow-xs"
              >
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-100 dark:text-[#8fa7fe]" /> Download Curriculum Vitae
                </span>
                <ExternalLink className="w-3 h-3 text-emerald-100 dark:text-[#8fa7fe]" />
              </button>
            </div>
          </div>

          {/* Column 3: Academic & Scholarly Profiles (4 Cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono-label font-bold text-[#00685f] dark:text-[#00bfa5] uppercase tracking-wider">
              SCHOLARLY & RESEARCH NETWORKS
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(socialLinks.length > 0
                ? socialLinks
                : [
                  { platform: "Google Scholar", url: "https://scholar.google.com", icon: "GraduationCap" },
                  { platform: "ORCID", url: "https://orcid.org", icon: "Fingerprint" },
                  { platform: "GitHub", url: "https://github.com", icon: "Github" },
                  { platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
                  { platform: "ResearchGate", url: "https://researchgate.net", icon: "Globe" },
                  { platform: "NCBI / PubMed", url: "https://ncbi.nlm.nih.gov", icon: "BookOpen" },
                ]
              ).map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/90 border border-[#d5e3fd] dark:bg-[#112238]/70 dark:border-slate-800 hover:border-[#00685f]/50 hover:bg-[#eff4ff] dark:hover:bg-[#112238] text-xs font-medium text-[#0d1c2f] dark:text-slate-200 transition-all group shadow-xs"
                >
                  <SocialIcon name={link.icon || link.platform} className="w-3.5 h-3.5 text-[#00685f] dark:text-[#00bfa5] shrink-0" />
                  <span className="truncate group-hover:text-[#00685f] dark:group-hover:text-white">{link.platform}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back-to-Top Bar */}
        <div className="pt-8 border-t border-[#d5e3fd] dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#3d4947] dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {name}.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#6d7a77] dark:text-slate-400 font-mono-label">IISER Pune Biological Sciences Division</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-[#6d7a77] dark:text-slate-400">
              Built for Computational Biology Research
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#112238] border border-[#d5e3fd] dark:border-slate-700 text-xs font-semibold text-[#0d1c2f] dark:text-slate-300 hover:text-[#00685f] dark:hover:text-white hover:border-[#00685f] dark:hover:border-[#00bfa5] transition-all cursor-pointer shadow-xs"
              title="Scroll to Top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#00685f] dark:text-[#00bfa5]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
