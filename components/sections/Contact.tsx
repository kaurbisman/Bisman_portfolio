"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Sparkles,
  Share2,
  ExternalLink,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { SocialIcon } from "../ui/SocialIcons";
import { DataStore } from "@/lib/store";
import { fireCelebrationConfetti } from "@/lib/confetti";
import { MeetingSchedulerModal } from "../ui/MeetingSchedulerModal";
import { Profile } from "@/lib/data";

interface ContactProps {
  profile?: Profile;
  location?: string;
}

export const Contact: React.FC<ContactProps> = ({ profile, location }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);

  const emailAddress = profile?.email || "kaurbisman2005@gmail.com";
  const campusLocation = profile?.location || location || "IISER Pune, Pashan, Pune, Maharashtra";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    DataStore.addMessage(formData);
    setSubmitted(true);
    fireCelebrationConfetti();
    setFormData({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Inquiries & Syncs"
        title="Get in Touch & Collaborate"
        subtitle="Open for academic research collaborations, joint publications, lab queries, or doctoral research discussions."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        {/* Left Column: Direct Contact & Campus Map Info */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Quick Copy Email Card */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center shrink-0">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-slate-50">Direct Email</h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Primary Academic Inbox</span>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                title="Copy Email Address"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <p className="text-xs sm:text-sm font-mono text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 select-all">
              {emailAddress}
            </p>
            {copiedEmail && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2 block">
                ✓ Email copied to clipboard!
              </span>
            )}
          </GlassCard>

          {/* Meeting Scheduler CTA Card */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-center shrink-0">
                <Calendar className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-slate-50">Schedule a Sync</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">15-30 min Academic Discussion</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 font-normal">
              Book a virtual call to discuss joint research projects, hackathon initiatives, or computational workflows.
            </p>
            <button
              onClick={() => setMeetingModalOpen(true)}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Open Calendar Scheduler
            </button>
          </GlassCard>

          {/* Campus Location Card */}
          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center shrink-0">
                <MapPin className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-slate-50">Institution Location</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Main Campus</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-normal">
              {campusLocation}
            </p>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(campusLocation)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 transition-colors"
            >
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>View Location on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </GlassCard>

          {/* Academic & Social Profiles Card */}
          {((profile?.socialLinks && profile.socialLinks.length > 0) ? profile.socialLinks : []).length > 0 && (
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center shrink-0">
                  <Share2 className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-slate-50">Academic & Social Profiles</h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Connect Across Research Networks</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(profile?.socialLinks || []).map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-all flex items-center gap-2.5 group"
                  >
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 shrink-0">
                      <SocialIcon name={link.icon || link.platform} className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {link.platform}
                      </span>
                      {link.badge && (
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-medium">
                          {link.badge}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </GlassCard>
          )}
        </div>

        {/* Right Column: Research Inquiry Form */}
        <div className="lg:col-span-7">
          <GlassCard className="p-7 sm:p-8 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-slate-50">
                Send a Research Message
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 font-normal">
                Fill out the form below to reach out directly regarding research inquiries.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="my-12 p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 text-center flex flex-col items-center"
                >
                  <CheckCircle2 className="w-14 h-14 text-emerald-600 dark:text-emerald-400 mb-3" />
                  <h4 className="text-2xl font-heading font-bold text-slate-900 dark:text-slate-50">Message Sent Successfully!</h4>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md">
                    Thank you for reaching out. Your message has been routed to Bisman Kaur's primary inbox.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Prof. Evelyn Reed"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="evelyn.reed@stanford.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      placeholder="Inquiry regarding Multi-Omics Research Collaboration"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Research Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Write your research query, collaboration proposal, or academic message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> Send Research Message
                  </button>

                  {/* Fast-Fill Collaboration Topic Chips */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Quick Select Topic (Click to Auto-fill Subject):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "🔬 Multi-Omics Research Collaboration",
                        "📊 Single-cell & RNA-seq Workflows",
                        "🤝 Hackathon & One Health Initiative",
                        "🎓 Academic & Doctoral Discussion",
                      ].map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setFormData({ ...formData, subject: topic })}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-left cursor-pointer"
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Response SLA Footer Badge */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>Typically responds within <strong>24-48 hours</strong></span>
              </div>
              <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 shrink-0">
                Direct Academic Inbox ⚡
              </span>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Meeting Scheduler Modal */}
      <MeetingSchedulerModal isOpen={meetingModalOpen} onClose={() => setMeetingModalOpen(false)} />
    </section>
  );
};
