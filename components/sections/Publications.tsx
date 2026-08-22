"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Download,
  Copy,
  Check,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { Publication, PublicationType } from "@/lib/data";

interface PublicationsProps {
  publications: Publication[];
}

const pubTypes: ("All" | PublicationType)[] = [
  "All",
  "Submitted Manuscript",
  "Preprint",
  "Journal Paper",
  "Conference Paper",
  "Book Chapter",
];

export const Publications: React.FC<PublicationsProps> = ({ publications }) => {
  const [selectedType, setSelectedType] = useState<"All" | PublicationType>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPubs = publications.filter(
    (pub) => selectedType === "All" || pub.type === selectedType
  );

  const handleCopyBibtex = (id: string, bibtex?: string) => {
    if (!bibtex) return;
    navigator.clipboard.writeText(bibtex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="publications" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Academic Index"
        title="Publications & Preprints"
        subtitle="Peer-reviewed manuscripts, bioRxiv preprints, conference proceedings, and submitted scientific literature."
      />

      {/* Filter Tabs */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {pubTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedType === type
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Publications List */}
      <div className="mt-8 space-y-6">
        {filteredPubs.length > 0 ? (
          filteredPubs.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <GlassCard className="p-7">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {pub.type}
                    </span>
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {pub.status}
                    </span>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {pub.year}
                    </span>
                  </div>

                  {pub.doi && (
                    <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
                      DOI: {pub.doi}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-slate-50 leading-snug hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {pub.title}
                </h3>

                {/* Author List with Bold Highlight */}
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                  {pub.authors.map((author, i) => (
                    <React.Fragment key={author}>
                      <span className={author.includes("Bisman Kaur") ? "font-bold text-slate-900 dark:text-slate-50 underline decoration-blue-500" : ""}>
                        {author}
                      </span>
                      {i < pub.authors.length - 1 ? ", " : ""}
                    </React.Fragment>
                  ))}
                </p>

                <p className="mt-1 text-xs font-semibold italic text-blue-700 dark:text-blue-300">
                  {pub.venue}
                </p>

                {/* Abstract Box */}
                <p className="mt-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-slate-100 font-semibold block mb-1">Abstract:</strong>
                  {pub.abstract}
                </p>

                {/* Highlights */}
                {pub.highlights && pub.highlights.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pub.highlights.map((h) => (
                      <span key={h} className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" /> {h}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> View DOI
                      </a>
                    )}
                    {pub.pdfUrl && (
                      <a
                        href={pub.pdfUrl}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> Download PDF
                      </a>
                    )}
                  </div>

                  {pub.bibtex && (
                    <button
                      onClick={() => handleCopyBibtex(pub.id, pub.bibtex)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      {copiedId === pub.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" /> BibTeX Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy BibTeX
                        </>
                      )}
                    </button>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))
        ) : (
          <GlassCard className="p-12 text-center flex flex-col items-center">
            <BookOpen className="w-12 h-12 text-slate-400 opacity-60 mb-3" />
            <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-slate-50">
              Publications Coming Soon
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md">
              No manuscripts match the selected filter at this moment. New preprints and peer-reviewed journal papers are currently in preparation.
            </p>
          </GlassCard>
        )}
      </div>
    </section>
  );
};
