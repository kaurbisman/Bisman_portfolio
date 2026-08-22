"use client";

import React, { useEffect, useState } from "react";
import { DataStore } from "@/lib/store";
import {
  Profile,
  EducationEntry,
  SkillCategory,
  Project,
  TimelineItem,
} from "@/lib/data";

import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Timeline } from "@/components/sections/Timeline";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [education, setEducation] = useState<EducationEntry[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);

  useEffect(() => {
    const loadData = () => {
      setProfile(DataStore.getProfile());
      setEducation(DataStore.getEducation());
      setSkills(DataStore.getSkills());
      setProjects(DataStore.getProjects());
      setTimelineItems(DataStore.getTimeline());
    };

    loadData();

    DataStore.syncFromSupabase().then(() => {
      loadData();
    });
  }, []);

  if (!profile) return null;

  return (
    <div className="relative min-h-screen">
      {/* Top Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Liquid Ambient Background Blobs */}
      <LiquidBackground />

      {/* Sticky Tab Navbar */}
      <Navbar resumeUrl={profile.resumeFileUrl} />

      {/* Main Page Content Sections */}
      <main className="relative z-10 space-y-4 sm:space-y-8">
        <Hero profile={profile} />
        <Projects projects={projects} />
        <Education education={education} />
        <Timeline items={timelineItems} />
        <Skills categories={skills} />
        <Contact profile={profile} location={profile.location} />
      </main>

      {/* Footer */}
      <Footer name={profile.name} title={profile.title} resumeUrl={profile.resumeFileUrl} socialLinks={profile.socialLinks} />
    </div>
  );
}
