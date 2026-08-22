"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Clock,
  Search,
  X,
  User,
  ArrowRight,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { BlogPost } from "@/lib/data";

interface BlogProps {
  posts: BlogPost[];
}

export const Blog: React.FC<BlogProps> = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        badge="Scientific Insights"
        title="Research Blog & Technical Writings"
        subtitle="Articles and thoughts on computational genomics, open science workflows, and interdisciplinary biology."
      />

      {/* Filter Bar & Search */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search articles & tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <GlassCard
                className="p-6 sm:p-7 h-full flex flex-col justify-between group cursor-pointer"
                onClick={() => setActivePost(post)}
              >
                <div>
                  {/* Cover Image */}
                  <div className="relative w-full h-48 rounded-xl overflow-hidden mb-5 border border-slate-200 dark:border-slate-800 shadow-xs bg-slate-100 dark:bg-slate-800">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-black/60 border border-white/20 backdrop-blur-md text-[11px] font-semibold text-white">
                      {post.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> {post.publishedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </GlassCard>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full">
            <GlassCard className="p-12 text-center flex flex-col items-center">
              <BookOpen className="w-12 h-12 text-slate-400 opacity-50 mb-3" />
              <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-slate-50">No Articles Found</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-sm">
                No research articles match your search criteria. Try filtering by another category or clearing search terms.
              </p>
            </GlassCard>
          </div>
        )}
      </div>

      {/* Interactive Article Reader Modal */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-3xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[20px] p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-800">
                  {activePost.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {activePost.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-slate-50">
                {activePost.title}
              </h2>

              <div className="mt-2 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>By <strong>{activePost.author}</strong></span>
                <span>•</span>
                <span>{activePost.publishedDate}</span>
              </div>

              {/* Cover */}
              <div className="mt-6 w-full h-56 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs">
                <img
                  src={activePost.coverImage}
                  alt={activePost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Render Article Content */}
              <div className="mt-6 text-slate-700 dark:text-slate-300 space-y-4 text-sm sm:text-base leading-relaxed font-normal">
                {activePost.contentMarkdown.split("\n\n").map((paragraph, i) => {
                  if (paragraph.startsWith("# ")) {
                    return (
                      <h1 key={i} className="text-2xl font-heading font-bold text-slate-900 dark:text-slate-50 mt-6 mb-2">
                        {paragraph.replace("# ", "")}
                      </h1>
                    );
                  }
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={i} className="text-xl font-heading font-bold text-slate-900 dark:text-slate-50 mt-5 mb-2">
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("> ")) {
                    return (
                      <blockquote key={i} className="italic border-l-4 border-blue-600 dark:border-blue-500 pl-4 py-2 bg-blue-50/50 dark:bg-blue-950/20 text-slate-900 dark:text-slate-100 rounded-r-lg">
                        {paragraph.replace("> ", "")}
                      </blockquote>
                    );
                  }
                  if (paragraph.startsWith("```")) {
                    const code = paragraph.replace(/```[a-z]*/g, "").trim();
                    return (
                      <pre key={i} className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 font-mono text-xs overflow-x-auto">
                        <code>{code}</code>
                      </pre>
                    );
                  }
                  return <p key={i}>{paragraph}</p>;
                })}
              </div>

              {/* Article Footer */}
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {activePost.tags.map((t) => (
                    <span key={t} className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActivePost(null)}
                  className="px-6 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
