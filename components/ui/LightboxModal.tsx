"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Tag, ExternalLink } from "lucide-react";
import { GalleryImage } from "@/lib/data";

interface LightboxModalProps {
  image: GalleryImage | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ image, onClose }) => {
  if (!image) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-4xl w-full glass-panel border border-white/20 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-colors"
            aria-label="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Image Showcase */}
          <div className="relative flex-1 bg-black/60 flex items-center justify-center min-h-[300px] sm:min-h-[450px] overflow-hidden">
            <img
              src={image.url}
              alt={image.caption}
              className="max-h-[70vh] w-auto max-w-full object-contain shadow-2xl"
            />
          </div>

          {/* Caption & Category Metadata */}
          <div className="p-6 bg-bgBase/90 backdrop-blur-xl border-t border-borderGlass flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accentPrimary/10 text-accentPrimary text-xs font-semibold border border-accentPrimary/20">
                  <Tag className="w-3 h-3" /> {image.category}
                </span>
                {image.date && (
                  <span className="inline-flex items-center gap-1 text-xs text-textSecondary font-medium">
                    <Calendar className="w-3.5 h-3.5" /> {image.date}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-heading font-bold text-textPrimary">{image.caption}</h3>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-accentPrimary to-accentSecondary hover:shadow-glow transition-all"
            >
              Close Viewer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
