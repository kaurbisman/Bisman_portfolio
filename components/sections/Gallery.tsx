"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2, Calendar } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { GalleryImage } from "@/lib/data";
import { LightboxModal } from "../ui/LightboxModal";

interface GalleryProps {
  images: GalleryImage[];
}

const categories = [
  "All",
  "Lab Photography",
  "Conferences",
  "Poster Presentations",
  "Hackathons",
  "Campus",
  "Team Photos",
  "Experimental Work",
];

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const filteredImages = images.filter(
    (img) => selectedCategory === "All" || img.category === selectedCategory
  );

  return (
    <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Visual Portfolio"
        title="Research & Academic Life Gallery"
        subtitle="Visual documentation of laboratory work, conference presentations, hackathon defenses, and campus research moments."
      />

      {/* Category Tabs */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
          >
            <GlassCard
              className="p-3 h-full group cursor-pointer overflow-hidden"
              onClick={() => setLightboxImage(image)}
            >
              <div className="relative w-full h-60 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                {/* Top Category Tag */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-black/60 border border-white/20 backdrop-blur-md text-[11px] font-semibold text-white">
                  {image.category}
                </div>

                {/* Hover Zoom Icon */}
                <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/60 border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs sm:text-sm font-heading font-bold leading-tight line-clamp-2">
                    {image.caption}
                  </p>
                  {image.date && (
                    <span className="text-[10px] text-slate-300 flex items-center gap-1 mt-1 font-medium">
                      <Calendar className="w-3 h-3" /> {image.date}
                    </span>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </section>
  );
};
