"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink, ShieldCheck } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { Certification } from "@/lib/data";

interface CertificationsProps {
  certifications: Certification[];
}

export const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  return (
    <section id="certifications" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Verified Credentials"
        title="Certifications & Competitive Qualifications"
        subtitle="Verified credentials from national examination boards, universities, and technical certification authorities."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <GlassCard className="p-6 h-full flex flex-col justify-between group">
              <div>
                {/* Logo & Date */}
                <div className="flex items-center justify-between mb-4">
                  {cert.logo ? (
                    <div className="w-11 h-11 rounded-xl p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0 shadow-xs overflow-hidden">
                      <img
                        src={cert.logo}
                        alt={cert.issuer}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                  )}

                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    <Calendar className="w-3.5 h-3.5" /> {cert.date}
                  </span>
                </div>

                {/* Title & Issuer */}
                <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cert.title}
                </h3>

                <p className="mt-1 text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" /> {cert.issuer}
                </p>

                {/* Credential ID */}
                {cert.credentialId && (
                  <div className="mt-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-900/60 text-[11px] font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                    ID: <strong className="text-slate-900 dark:text-slate-100">{cert.credentialId}</strong>
                  </div>
                )}

                {/* Skills Gained */}
                {cert.skillsGained && cert.skillsGained.length > 0 && (
                  <div className="mt-4">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                      Competencies Verified
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsGained.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Verify Link */}
              {cert.verifyLink && (
                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <a
                    href={cert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
