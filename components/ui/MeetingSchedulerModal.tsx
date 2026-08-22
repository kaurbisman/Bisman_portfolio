"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Sparkles, CheckCircle2, User, Mail, MessageSquare } from "lucide-react";
import { fireCelebrationConfetti } from "@/lib/confetti";

interface MeetingSchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MeetingSchedulerModal: React.FC<MeetingSchedulerModalProps> = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState("Research Collaboration");
  const [duration, setDuration] = useState("30 min");
  const [preferredDate, setPreferredDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    fireCelebrationConfetti();
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-lg w-full glass-panel border border-white/20 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full glass-panel text-textSecondary hover:text-textPrimary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="p-2 rounded-xl bg-accentPrimary/10 text-accentPrimary">
                  <Calendar className="w-5 h-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-accentPrimary">
                  Academic & Research Sync
                </span>
              </div>

              <h3 className="text-2xl font-heading font-bold text-textPrimary tracking-tight">
                Schedule a Discussion
              </h3>
              <p className="mt-1 text-sm text-textSecondary">
                Connect directly with Bisman Kaur regarding research collaborations, lab queries, or academic discussions.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Topic selection */}
                <div>
                  <label className="block text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1.5">
                    Discussion Topic
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel border border-borderGlass text-textPrimary focus:outline-none focus:ring-2 focus:ring-accentPrimary text-sm"
                  >
                    <option value="Research Collaboration" className="dark:bg-gray-900">Research Collaboration</option>
                    <option value="PhD / Academic Inquiry" className="dark:bg-gray-900">PhD / Academic Inquiry</option>
                    <option value="One Health Hackathon" className="dark:bg-gray-900">One Health Hackathon Initiative</option>
                    <option value="Bioinformatics & Genomics" className="dark:bg-gray-900">Bioinformatics & Computational Pipelines</option>
                    <option value="General Academic Sync" className="dark:bg-gray-900">General Academic Sync</option>
                  </select>
                </div>

                {/* Duration & Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1.5">
                      Duration
                    </label>
                    <div className="flex gap-2">
                      {["15 min", "30 min", "45 min"].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDuration(d)}
                          className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                            duration === d
                              ? "bg-accentPrimary text-white border-accentPrimary shadow-sm"
                              : "glass-panel text-textSecondary border-borderGlass hover:text-textPrimary"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl glass-panel border border-borderGlass text-textPrimary text-xs focus:outline-none focus:ring-2 focus:ring-accentPrimary"
                    />
                  </div>
                </div>

                {/* Visitor Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-textSecondary absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Dr. Alex Rivera"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl glass-panel border border-borderGlass text-textPrimary text-sm focus:outline-none focus:ring-2 focus:ring-accentPrimary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">
                      Your Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-textSecondary absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="alex@univ.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl glass-panel border border-borderGlass text-textPrimary text-sm focus:outline-none focus:ring-2 focus:ring-accentPrimary"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">
                    Agenda / Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe what you'd like to discuss..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl glass-panel border border-borderGlass text-textPrimary text-sm focus:outline-none focus:ring-2 focus:ring-accentPrimary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-accentPrimary via-accentSecondary to-accentTertiary hover:shadow-glow transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Confirm Meeting Request
                </button>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30"
              >
                <CheckCircle2 className="w-10 h-10" />
              </motion.div>
              <h3 className="text-2xl font-heading font-bold text-textPrimary">Meeting Requested!</h3>
              <p className="mt-2 text-sm text-textSecondary max-w-sm">
                Thank you {name}. A calendar invite confirmation request has been sent for <span className="font-semibold text-accentPrimary">{topic}</span>.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
