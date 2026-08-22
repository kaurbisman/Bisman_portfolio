import {
  Profile,
  QuickFact,
  EducationEntry,
  SkillCategory,
  ResearchExperience,
  Project,
  Publication,
  Certification,
  Achievement,
  GalleryImage,
  BlogPost,
  TimelineItem,
  StatMetric,
  ContactMessage,
  initialProfile,
  initialQuickFacts,
  initialEducation,
  initialSkillCategories,
  initialResearchExperience,
  initialProjects,
  initialPublications,
  initialCertifications,
  initialAchievements,
  initialGallery,
  initialBlogPosts,
  initialTimeline,
  initialStatMetrics,
  initialMessages,
} from "./data";
import { supabase, isSupabaseConfigured } from "./supabase";

const STORAGE_KEYS = {
  PROFILE: "bisman_portfolio_profile",
  QUICK_FACTS: "bisman_portfolio_quick_facts",
  EDUCATION: "bisman_portfolio_education",
  SKILLS: "bisman_portfolio_skills",
  RESEARCH_EXP: "bisman_portfolio_research_exp",
  PROJECTS: "bisman_portfolio_projects",
  PUBLICATIONS: "bisman_portfolio_publications",
  CERTIFICATIONS: "bisman_portfolio_certifications",
  ACHIEVEMENTS: "bisman_portfolio_achievements",
  GALLERY: "bisman_portfolio_gallery",
  BLOG: "bisman_portfolio_blog",
  TIMELINE: "bisman_portfolio_timeline_v3",
  METRICS: "bisman_portfolio_metrics",
  MESSAGES: "bisman_portfolio_messages",
};

export function getStoredData<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error("Failed to load local storage item:", e);
    return fallback;
  }
}

export function setStoredData<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e: any) {
    if (e?.name === "QuotaExceededError" || e?.code === 22 || e?.number === -2147024882) {
      console.warn("LocalStorage quota exceeded for key:", key, e);
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (innerErr) {
        if (typeof window !== "undefined") {
          alert("Browser storage limit reached! The image file uploaded is large. Please use a smaller image or image URL.");
        }
      }
    } else {
      console.error("Failed to set local storage item:", e);
    }
  }
}

export const DataStore = {
  getProfile: (): Profile => {
    const stored = getStoredData<Partial<Profile>>(STORAGE_KEYS.PROFILE, initialProfile);
    return { ...initialProfile, ...stored };
  },
  saveProfile: (profile: Profile) => {
    setStoredData(STORAGE_KEYS.PROFILE, profile);
    if (isSupabaseConfigured && supabase) {
      const githubLink = profile.socialLinks?.find((s) => s.platform.toLowerCase() === "github")?.url || "";
      const scholarLink = profile.socialLinks?.find((s) => s.platform.toLowerCase().includes("scholar"))?.url || "";
      const linkedinLink = profile.socialLinks?.find((s) => s.platform.toLowerCase() === "linkedin")?.url || "";

      supabase
        .from("profile")
        .upsert({
          id: "primary_profile",
          name: profile.name,
          title: profile.title,
          typing_interests: profile.typingInterests,
          tagline: profile.tagline,
          bio: profile.bio,
          institution: profile.institution,
          location: profile.location,
          profile_photo: profile.profilePhoto,
          email: profile.email,
          github: githubLink,
          scholar: scholarLink,
          linkedin: linkedinLink,
          cv_url: profile.resumeFileUrl || "",
          current_research: profile.currentResearch,
          research_philosophy: profile.researchPhilosophy,
          updated_at: new Date().toISOString(),
        })
        .then(({ error }) => {
          if (error) console.error("Supabase Profile Sync Error:", error);
          else console.log("✅ Profile synced to Supabase");
        });
    }
  },

  getQuickFacts: (): QuickFact[] => getStoredData(STORAGE_KEYS.QUICK_FACTS, initialQuickFacts),
  saveQuickFacts: (facts: QuickFact[]) => setStoredData(STORAGE_KEYS.QUICK_FACTS, facts),

  getEducation: (): EducationEntry[] => getStoredData(STORAGE_KEYS.EDUCATION, initialEducation),
  saveEducation: (edu: EducationEntry[]) => {
    setStoredData(STORAGE_KEYS.EDUCATION, edu);
    if (isSupabaseConfigured && supabase) {
      const dbRows = edu.map((item, idx) => ({
        id: item.id,
        degree: item.degree,
        institution: item.institution,
        logo: item.logo,
        start_date: item.startDate,
        end_date: item.endDate,
        description: item.description,
        coursework: item.coursework,
        cgpa: item.cgpa,
        thesis_title: item.thesisTitle,
        supervisor: item.supervisor,
        sort_order: idx,
      }));
      supabase.from("education").upsert(dbRows).then(({ error }) => {
        if (error) console.error("Supabase Education Sync Error:", error);
        else console.log("✅ Education synced to Supabase");
      });
    }
  },

  getSkills: (): SkillCategory[] => getStoredData(STORAGE_KEYS.SKILLS, initialSkillCategories),
  saveSkills: (skills: SkillCategory[]) => {
    setStoredData(STORAGE_KEYS.SKILLS, skills);
    if (isSupabaseConfigured && supabase) {
      const dbRows = skills.map((item, idx) => ({
        id: item.id,
        name: item.name,
        skills: item.skills,
        sort_order: idx,
      }));
      supabase.from("skills").upsert(dbRows).then(({ error }) => {
        if (error) console.error("Supabase Skills Sync Error:", error);
        else console.log("✅ Skills synced to Supabase");
      });
    }
  },

  getResearchExperience: (): ResearchExperience[] => getStoredData(STORAGE_KEYS.RESEARCH_EXP, initialResearchExperience),
  saveResearchExperience: (exp: ResearchExperience[]) => {
    setStoredData(STORAGE_KEYS.RESEARCH_EXP, exp);
    if (isSupabaseConfigured && supabase) {
      const dbRows = exp.map((item, idx) => ({
        id: item.id,
        title: item.title,
        institution: item.institution,
        supervisor: item.supervisor,
        duration: item.duration,
        objective: item.objective,
        methodology: item.methodology,
        techniques_used: item.techniquesUsed,
        results: item.results,
        research_impact: item.researchImpact,
        sort_order: idx,
      }));
      supabase.from("research_experiences").upsert(dbRows).then(({ error }) => {
        if (error) console.error("Supabase Research Sync Error:", error);
        else console.log("✅ Research Experience synced to Supabase");
      });
    }
  },

  getProjects: (): Project[] => getStoredData(STORAGE_KEYS.PROJECTS, initialProjects),
  saveProjects: (projects: Project[]) => {
    setStoredData(STORAGE_KEYS.PROJECTS, projects);
    if (isSupabaseConfigured && supabase) {
      const dbRows = projects.map((item, idx) => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        cover_image: item.coverImage,
        hero_image: item.heroImage,
        research_problem: item.researchProblem,
        motivation: item.motivation,
        objectives: item.objectives,
        workflow: item.workflow,
        technologies: item.technologies,
        datasets: item.datasets,
        results: item.results,
        tags: item.tags,
        links: item.links,
        sort_order: idx,
      }));
      supabase.from("projects").upsert(dbRows).then(({ error }) => {
        if (error) console.error("Supabase Projects Sync Error:", error);
        else console.log("✅ Projects synced to Supabase");
      });
    }
  },

  getPublications: (): Publication[] => getStoredData(STORAGE_KEYS.PUBLICATIONS, initialPublications),
  savePublications: (pubs: Publication[]) => {
    setStoredData(STORAGE_KEYS.PUBLICATIONS, pubs);
    if (isSupabaseConfigured && supabase) {
      const dbRows = pubs.map((item, idx) => ({
        id: item.id,
        title: item.title,
        authors: item.authors,
        venue: item.venue,
        year: item.year,
        doi: item.doi,
        type: item.type,
        status: item.status,
        abstract: item.abstract,
        pdf_url: item.pdfUrl,
        bibtex: item.bibtex,
        sort_order: idx,
      }));
      supabase.from("publications").upsert(dbRows).then(({ error }) => {
        if (error) console.error("Supabase Publications Sync Error:", error);
        else console.log("✅ Publications synced to Supabase");
      });
    }
  },

  getCertifications: (): Certification[] => getStoredData(STORAGE_KEYS.CERTIFICATIONS, initialCertifications),
  saveCertifications: (certs: Certification[]) => {
    setStoredData(STORAGE_KEYS.CERTIFICATIONS, certs);
    if (isSupabaseConfigured && supabase) {
      const dbRows = certs.map((item, idx) => ({
        id: item.id,
        title: item.title,
        issuer: item.issuer,
        logo: item.logo,
        date: item.date,
        credential_id: item.credentialId,
        verify_link: item.verifyLink,
        skills_gained: item.skillsGained,
        sort_order: idx,
      }));
      supabase.from("certifications").upsert(dbRows).then(({ error }) => {
        if (error) console.error("Supabase Certifications Sync Error:", error);
        else console.log("✅ Certifications synced to Supabase");
      });
    }
  },

  getAchievements: (): Achievement[] => getStoredData(STORAGE_KEYS.ACHIEVEMENTS, initialAchievements),
  saveAchievements: (achievements: Achievement[]) => {
    setStoredData(STORAGE_KEYS.ACHIEVEMENTS, achievements);
    if (isSupabaseConfigured && supabase) {
      const dbRows = achievements.map((item, idx) => ({
        id: item.id,
        title: item.title,
        level: item.level,
        result: item.result,
        metric_number: item.metricNumber,
        metric_subtext: item.metricSubtext,
        description: item.description,
        date: item.date,
        logo: item.logo,
        sort_order: idx,
      }));
      supabase.from("achievements").upsert(dbRows).then(({ error }) => {
        if (error) console.error("Supabase Achievements Sync Error:", error);
        else console.log("✅ Achievements synced to Supabase");
      });
    }
  },

  getGallery: (): GalleryImage[] => getStoredData(STORAGE_KEYS.GALLERY, initialGallery),
  saveGallery: (gallery: GalleryImage[]) => {
    setStoredData(STORAGE_KEYS.GALLERY, gallery);
    if (isSupabaseConfigured && supabase) {
      const dbRows = gallery.map((item, idx) => ({
        id: item.id,
        url: item.url,
        caption: item.caption,
        category: item.category,
        date: item.date,
        sort_order: idx,
      }));
      supabase.from("gallery").upsert(dbRows).then(({ error }) => {
        if (error) console.error("Supabase Gallery Sync Error:", error);
        else console.log("✅ Gallery synced to Supabase");
      });
    }
  },

  getBlogPosts: (): BlogPost[] => getStoredData(STORAGE_KEYS.BLOG, initialBlogPosts),
  saveBlogPosts: (posts: BlogPost[]) => {
    setStoredData(STORAGE_KEYS.BLOG, posts);
    if (isSupabaseConfigured && supabase) {
      const dbRows = posts.map((item, idx) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        content_markdown: item.contentMarkdown,
        published_date: item.publishedDate,
        read_time: item.readTime,
        category: item.category,
        cover_image: item.coverImage,
        author: item.author,
        tags: item.tags,
        sort_order: idx,
      }));
      supabase.from("blog_posts").upsert(dbRows).then(({ error }) => {
        if (error) console.error("Supabase Blog Sync Error:", error);
        else console.log("✅ Blog Posts synced to Supabase");
      });
    }
  },

  getTimeline: (): TimelineItem[] => getStoredData(STORAGE_KEYS.TIMELINE, initialTimeline),
  saveTimeline: (items: TimelineItem[]) => {
    setStoredData(STORAGE_KEYS.TIMELINE, items);
    if (isSupabaseConfigured && supabase) {
      const dbRows = items.map((item, idx) => ({
        id: item.id,
        year: item.year,
        title: item.title,
        institution: item.institution,
        description: item.description,
        category: item.category,
        badge_text: item.badgeText,
        color: item.color,
        sort_order: idx,
      }));
      supabase.from("timeline").upsert(dbRows).then(({ error }) => {
        if (error) console.error("Supabase Timeline Sync Error:", error);
        else console.log("✅ Timeline synced to Supabase");
      });
    }
  },

  getStatMetrics: (): StatMetric[] => getStoredData(STORAGE_KEYS.METRICS, initialStatMetrics),
  saveStatMetrics: (metrics: StatMetric[]) => setStoredData(STORAGE_KEYS.METRICS, metrics),

  getMessages: (): ContactMessage[] => getStoredData(STORAGE_KEYS.MESSAGES, initialMessages),
  saveMessages: (messages: ContactMessage[]) => setStoredData(STORAGE_KEYS.MESSAGES, messages),

  addMessage: (msg: Omit<ContactMessage, "id" | "submittedAt" | "read">) => {
    const messages = DataStore.getMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: "msg-" + Date.now(),
      submittedAt: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
      read: false,
    };
    DataStore.saveMessages([newMsg, ...messages]);

    if (isSupabaseConfigured && supabase) {
      supabase
        .from("messages")
        .insert([
          {
            id: newMsg.id,
            name: newMsg.name,
            email: newMsg.email,
            subject: newMsg.subject || "",
            message: newMsg.message,
            submitted_at: new Date().toISOString(),
          },
        ])
        .then(({ error }) => {
          if (error) console.error("Supabase Message Insert Error:", error);
          else console.log("✅ Message delivered to Supabase Inbox");
        });
    }

    return newMsg;
  },

  /**
   * Fetch all latest content from Supabase tables asynchronously and update local state
   */
  syncFromSupabase: async (): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) return false;
    try {
      // 1. Profile
      const { data: p } = await supabase.from("profile").select("*").eq("id", "primary_profile").single();
      if (p) {
        const currentProfile = DataStore.getProfile();
        DataStore.saveProfile({
          ...currentProfile,
          name: p.name || currentProfile.name,
          title: p.title || currentProfile.title,
          typingInterests: p.typing_interests || currentProfile.typingInterests,
          tagline: p.tagline || currentProfile.tagline,
          bio: p.bio || currentProfile.bio,
          institution: p.institution || currentProfile.institution,
          location: p.location || currentProfile.location,
          profilePhoto: p.profile_photo || currentProfile.profilePhoto,
          email: p.email || currentProfile.email,
          currentResearch: p.current_research || currentProfile.currentResearch,
          researchPhilosophy: p.research_philosophy || currentProfile.researchPhilosophy,
        });
      }

      // 2. Education
      const { data: edu } = await supabase.from("education").select("*").order("sort_order", { ascending: true });
      if (edu && edu.length > 0) {
        DataStore.saveEducation(
          edu.map((e) => ({
            id: e.id,
            degree: e.degree,
            institution: e.institution,
            logo: e.logo,
            startDate: e.start_date,
            endDate: e.end_date,
            description: e.description,
            coursework: e.coursework || [],
            cgpa: e.cgpa,
            thesisTitle: e.thesis_title,
            supervisor: e.supervisor,
            order: e.sort_order,
          }))
        );
      }

      // 3. Research Experiences
      const { data: exp } = await supabase.from("research_experiences").select("*").order("sort_order", { ascending: true });
      if (exp && exp.length > 0) {
        DataStore.saveResearchExperience(
          exp.map((r) => ({
            id: r.id,
            title: r.title,
            institution: r.institution,
            supervisor: r.supervisor,
            duration: r.duration,
            objective: r.objective,
            methodology: r.methodology,
            techniquesUsed: r.techniques_used || [],
            results: r.results,
            researchImpact: r.research_impact,
            order: r.sort_order,
          }))
        );
      }

      // 4. Projects
      const { data: proj } = await supabase.from("projects").select("*").order("sort_order", { ascending: true });
      if (proj && proj.length > 0) {
        DataStore.saveProjects(
          proj.map((pr) => ({
            id: pr.id,
            title: pr.title,
            subtitle: pr.subtitle,
            description: pr.description,
            coverImage: pr.cover_image,
            heroImage: pr.hero_image,
            researchProblem: pr.research_problem,
            motivation: pr.motivation,
            objectives: pr.objectives || [],
            workflow: pr.workflow || [],
            technologies: pr.technologies || [],
            datasets: pr.datasets || [],
            results: pr.results,
            tags: pr.tags || [],
            links: pr.links || {},
            order: pr.sort_order,
          }))
        );
      }

      // 5. Publications
      const { data: pub } = await supabase.from("publications").select("*").order("sort_order", { ascending: true });
      if (pub && pub.length > 0) {
        DataStore.savePublications(
          pub.map((pb) => ({
            id: pb.id,
            title: pb.title,
            authors: pb.authors || [],
            venue: pb.venue,
            year: pb.year,
            doi: pb.doi,
            type: pb.type,
            status: pb.status,
            abstract: pb.abstract,
            pdfUrl: pb.pdf_url,
            bibtex: pb.bibtex,
            order: pb.sort_order,
          }))
        );
      }

      // 6. Messages
      const { data: msgs } = await supabase.from("messages").select("*").order("submitted_at", { ascending: false });
      if (msgs && msgs.length > 0) {
        DataStore.saveMessages(
          msgs.map((m) => ({
            id: m.id,
            name: m.name,
            email: m.email,
            subject: m.subject,
            message: m.message,
            submittedAt: new Date(m.submitted_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
            read: false,
          }))
        );
      }

      console.log("⚡ Successfully synced all latest content from Supabase!");
      return true;
    } catch (e) {
      console.warn("Supabase fetch error:", e);
      return false;
    }
  },

  /**
   * Push all initial seed data into Supabase
   */
  syncAllToSupabase: async (): Promise<boolean> => {
    if (!isSupabaseConfigured || !supabase) return false;
    try {
      DataStore.saveProfile(DataStore.getProfile());
      DataStore.saveEducation(DataStore.getEducation());
      DataStore.saveResearchExperience(DataStore.getResearchExperience());
      DataStore.saveProjects(DataStore.getProjects());
      DataStore.savePublications(DataStore.getPublications());
      DataStore.saveSkills(DataStore.getSkills());
      DataStore.saveTimeline(DataStore.getTimeline());
      DataStore.saveAchievements(DataStore.getAchievements());
      DataStore.saveCertifications(DataStore.getCertifications());
      DataStore.saveBlogPosts(DataStore.getBlogPosts());
      DataStore.saveGallery(DataStore.getGallery());
      return true;
    } catch (e) {
      console.error("Failed to push all data to Supabase:", e);
      return false;
    }
  },

  exportAllData: () => {
    return JSON.stringify(
      {
        profile: DataStore.getProfile(),
        quickFacts: DataStore.getQuickFacts(),
        education: DataStore.getEducation(),
        skills: DataStore.getSkills(),
        researchExperience: DataStore.getResearchExperience(),
        projects: DataStore.getProjects(),
        publications: DataStore.getPublications(),
        certifications: DataStore.getCertifications(),
        achievements: DataStore.getAchievements(),
        gallery: DataStore.getGallery(),
        blogPosts: DataStore.getBlogPosts(),
        timeline: DataStore.getTimeline(),
        statMetrics: DataStore.getStatMetrics(),
        messages: DataStore.getMessages(),
      },
      null,
      2
    );
  },

  importAllData: (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.profile) DataStore.saveProfile(data.profile);
      if (data.quickFacts) DataStore.saveQuickFacts(data.quickFacts);
      if (data.education) DataStore.saveEducation(data.education);
      if (data.skills) DataStore.saveSkills(data.skills);
      if (data.researchExperience) DataStore.saveResearchExperience(data.researchExperience);
      if (data.projects) DataStore.saveProjects(data.projects);
      if (data.publications) DataStore.savePublications(data.publications);
      if (data.certifications) DataStore.saveCertifications(data.certifications);
      if (data.achievements) DataStore.saveAchievements(data.achievements);
      if (data.gallery) DataStore.saveGallery(data.gallery);
      if (data.blogPosts) DataStore.saveBlogPosts(data.blogPosts);
      if (data.timeline) DataStore.saveTimeline(data.timeline);
      if (data.statMetrics) DataStore.saveStatMetrics(data.statMetrics);
      if (data.messages) DataStore.saveMessages(data.messages);
      return true;
    } catch (e) {
      console.error("Failed to import data:", e);
      return false;
    }
  },
};
