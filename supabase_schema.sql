-- ========================================================
-- BISMAN KAUR PORTFOLIO - SUPABASE DATABASE SCHEMA
-- Execute this SQL script in your Supabase SQL Editor
-- (Project -> SQL Editor -> New Query -> Run)
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILE & ETHOS TABLE
CREATE TABLE IF NOT EXISTS public.profile (
  id TEXT PRIMARY KEY DEFAULT 'primary_profile',
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  typing_interests JSONB DEFAULT '[]'::jsonb,
  tagline TEXT,
  bio TEXT,
  institution TEXT,
  location TEXT,
  profile_photo TEXT,
  email TEXT,
  github TEXT,
  scholar TEXT,
  linkedin TEXT,
  cv_url TEXT,
  current_research TEXT,
  research_philosophy TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
  id TEXT PRIMARY KEY,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  logo TEXT,
  start_date TEXT,
  end_date TEXT,
  description TEXT,
  coursework JSONB DEFAULT '[]'::jsonb,
  cgpa TEXT,
  thesis_title TEXT,
  supervisor TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. RESEARCH POSITIONS / EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.research_experiences (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  institution TEXT NOT NULL,
  supervisor TEXT,
  duration TEXT,
  objective TEXT,
  methodology TEXT,
  techniques_used JSONB DEFAULT '[]'::jsonb,
  results TEXT,
  research_impact TEXT,
  presentation TEXT,
  manuscript TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 4. PROJECTS & DOSSIERS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  cover_image TEXT,
  hero_image TEXT,
  research_problem TEXT,
  motivation TEXT,
  objectives JSONB DEFAULT '[]'::jsonb,
  workflow JSONB DEFAULT '[]'::jsonb,
  technologies JSONB DEFAULT '[]'::jsonb,
  datasets JSONB DEFAULT '[]'::jsonb,
  results TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  links JSONB DEFAULT '{}'::jsonb,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 5. PUBLICATIONS & PREPRINTS TABLE
CREATE TABLE IF NOT EXISTS public.publications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  authors JSONB DEFAULT '[]'::jsonb,
  venue TEXT NOT NULL,
  year TEXT,
  doi TEXT,
  type TEXT,
  status TEXT,
  abstract TEXT,
  pdf_url TEXT,
  bibtex TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 6. SKILLS & COMPETENCIES TABLE
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  skills JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 7. ACADEMIC TIMELINE TABLE
CREATE TABLE IF NOT EXISTS public.timeline (
  id TEXT PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  institution TEXT,
  description TEXT,
  category TEXT,
  badge_text TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 8. ACHIEVEMENTS & RANKS TABLE
CREATE TABLE IF NOT EXISTS public.achievements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  level TEXT,
  result TEXT,
  metric_number TEXT,
  metric_subtext TEXT,
  description TEXT,
  date TEXT,
  logo TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 9. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.certifications (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  logo TEXT,
  date TEXT,
  credential_id TEXT,
  verify_link TEXT,
  skills_gained JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 10. RESEARCH BLOG ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content_markdown TEXT,
  published_date TEXT,
  read_time TEXT,
  category TEXT,
  cover_image TEXT,
  author TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 11. GALLERY PHOTOGRAPHY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  caption TEXT,
  category TEXT,
  date TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 12. MESSAGES & INQUIRIES INBOX TABLE
CREATE TABLE IF NOT EXISTS public.messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ========================================================
-- ENABLE ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access on all public portfolio content
CREATE POLICY "Public Read Access on Profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Research Experiences" ON public.research_experiences FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Publications" ON public.publications FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Timeline" ON public.timeline FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Certifications" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Blog" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Public Read Access on Gallery" ON public.gallery FOR SELECT USING (true);

-- Allow Public Insert Access on Messages (Contact Form)
CREATE POLICY "Public Insert Access on Messages" ON public.messages FOR INSERT WITH CHECK (true);

-- Allow Full Access for Authenticated Users / Admin CMS
CREATE POLICY "Full Access on Profile" ON public.profile FOR ALL USING (true);
CREATE POLICY "Full Access on Education" ON public.education FOR ALL USING (true);
CREATE POLICY "Full Access on Research Experiences" ON public.research_experiences FOR ALL USING (true);
CREATE POLICY "Full Access on Projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Full Access on Publications" ON public.publications FOR ALL USING (true);
CREATE POLICY "Full Access on Skills" ON public.skills FOR ALL USING (true);
CREATE POLICY "Full Access on Timeline" ON public.timeline FOR ALL USING (true);
CREATE POLICY "Full Access on Achievements" ON public.achievements FOR ALL USING (true);
CREATE POLICY "Full Access on Certifications" ON public.certifications FOR ALL USING (true);
CREATE POLICY "Full Access on Blog" ON public.blog_posts FOR ALL USING (true);
CREATE POLICY "Full Access on Gallery" ON public.gallery FOR ALL USING (true);
CREATE POLICY "Full Access on Messages" ON public.messages FOR ALL USING (true);

-- ========================================================
-- CREATING SUPABASE STORAGE BUCKET FOR PORTFOLIO MEDIA
-- ========================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public Storage Access Policies for 'portfolio-media'
CREATE POLICY "Public Read Access for Portfolio Media"
ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-media');

CREATE POLICY "Public Upload Access for Portfolio Media"
ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-media');

CREATE POLICY "Public Update Access for Portfolio Media"
ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio-media');

CREATE POLICY "Public Delete Access for Portfolio Media"
ON storage.objects FOR DELETE USING (bucket_id = 'portfolio-media');
