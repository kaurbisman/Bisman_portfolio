"use client";

import React, { useState, useEffect } from "react";
import { DataStore } from "@/lib/store";
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
  ContactMessage,
} from "@/lib/data";
import {
  User,
  GraduationCap,
  Sparkles,
  Layers,
  Award,
  Trophy,
  Image as ImageIcon,
  Mail,
  FileText,
  Save,
  Trash2,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Upload,
  BookOpen,
  FlaskConical,
  LogOut,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Shield,
  Eye,
  ExternalLink,
  RotateCw,
  ZoomIn,
  Sliders,
  Check,
  X,
  Globe,
  Loader2,
  Compass,
} from "lucide-react";
import { supabase, isSupabaseConfigured, uploadImageToSupabase } from "@/lib/supabase";
import { handleCVDownload } from "@/lib/download";
import Link from "next/link";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  aspectRatio?: string;
  recommendedDim?: string;
}

const moveArrayItem = <T,>(arr: T[], index: number, direction: "up" | "down"): T[] => {
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= arr.length) return arr;
  const copy = [...arr];
  const temp = copy[index];
  copy[index] = copy[targetIndex];
  copy[targetIndex] = temp;
  return copy;
};

interface ReorderControlsProps {
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const ReorderControls: React.FC<ReorderControlsProps> = ({
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) => (
  <div className="flex items-center gap-0.5 bg-[#112238] border border-slate-700/80 p-0.5 rounded-lg shadow-xs">
    <button
      type="button"
      disabled={isFirst}
      onClick={onMoveUp}
      className="p-1 text-slate-300 hover:text-[#00bfa5] disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-colors"
      title="Move Up (Rearrange Order)"
    >
      <ChevronUp className="w-3.5 h-3.5" />
    </button>
    <div className="w-px h-3 bg-slate-700/60" />
    <button
      type="button"
      disabled={isLast}
      onClick={onMoveDown}
      className="p-1 text-slate-300 hover:text-[#00bfa5] disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-colors"
      title="Move Down (Rearrange Order)"
    >
      <ChevronDown className="w-3.5 h-3.5" />
    </button>
  </div>
);

const compressImage = (dataUrl: string, maxDim = 800, quality = 0.75): Promise<string> => {
  return new Promise((resolve) => {
    if (!dataUrl || !dataUrl.startsWith("data:image")) {
      resolve(dataUrl);
      return;
    }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = dataUrl;
    img.onload = () => {
      let w = img.width;
      let h = img.height;
      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      } else {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
  });
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  aspectRatio = "1:1 Square Logo",
  recommendedDim = "200×200 px",
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImageToSupabase(file, "images").then((publicUrl) => {
        if (publicUrl) {
          onChange(publicUrl);
          setRotation(0);
          setZoom(1);
          setPosition({ x: 0, y: 0 });
          return;
        }
        const reader = new FileReader();
        reader.onloadend = async () => {
          if (typeof reader.result === "string") {
            const compressed = await compressImage(reader.result, 800, 0.75);
            onChange(compressed);
            setRotation(0);
            setZoom(1);
            setPosition({ x: 0, y: 0 });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const applyAdjustments = () => {
    if (!value) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = value;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const angle = (rotation * Math.PI) / 180;
      const isRotatedQuarter = rotation === 90 || rotation === 270;

      const srcW = img.width;
      const srcH = img.height;

      const canvasW = isRotatedQuarter ? srcH : srcW;
      const canvasH = isRotatedQuarter ? srcW : srcH;

      canvas.width = canvasW;
      canvas.height = canvasH;

      ctx.translate(canvasW / 2 + position.x, canvasH / 2 + position.y);
      ctx.rotate(angle);
      ctx.scale(zoom, zoom);
      ctx.drawImage(img, -srcW / 2, -srcH / 2);

      canvas.toBlob((blob) => {
        if (blob) {
          uploadImageToSupabase(blob, "edited").then((publicUrl) => {
            if (publicUrl) {
              onChange(publicUrl);
              setIsModalOpen(false);
              return;
            }
            try {
              const editedUrl = canvas.toDataURL("image/jpeg", 0.75);
              onChange(editedUrl);
            } catch (e) {
              console.warn("Canvas export fallback:", e);
            }
            setIsModalOpen(false);
          });
        } else {
          try {
            const editedUrl = canvas.toDataURL("image/jpeg", 0.75);
            onChange(editedUrl);
          } catch (e) {}
          setIsModalOpen(false);
        }
      }, "image/jpeg", 0.85);
    };
  };

  return (
    <div className="space-y-2 p-4 rounded-xl bg-[#112238]/90 border border-[#00685f]/30 dark:border-slate-800">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <label className="block text-xs font-mono-label font-bold text-[#00bfa5] uppercase tracking-wider">
            {label}
          </label>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-md">
            Target Ratio: {aspectRatio} ({recommendedDim})
          </span>
        </div>
        {value && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#8fa7fe] hover:text-white bg-[#4059aa]/30 border border-[#4059aa]/60 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" /> Adjust & Crop Frame
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {value ? (
          <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#00685f]/40 bg-[#09121f] shrink-0 relative group">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              style={{
                transform: `rotate(${rotation}deg) scale(${zoom})`,
                transition: "transform 0.2s ease",
              }}
            />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-700 bg-[#09121f] shrink-0 flex items-center justify-center text-slate-500 text-[10px] text-center p-1 font-medium">
            No Image
          </div>
        )}

        <div className="flex-1 w-full space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image URL or Base64 string..."
            className="w-full px-3.5 py-2 rounded-xl bg-[#09121f] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#00bfa5]"
          />
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#00bfa5] bg-[#00685f]/20 border border-[#00685f]/60 hover:bg-[#00685f]/40 transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" /> Upload File from Device
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 bg-rose-950/40 border border-rose-800/60 cursor-pointer"
                title="Remove Image"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Adjuster Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#09121f] border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#00bfa5]" /> Image Adjuster ({label})
              </h4>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="w-full h-64 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center relative select-none cursor-grab active:cursor-grabbing group"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div className="absolute inset-0 border-2 border-dashed border-[#00bfa5]/40 pointer-events-none z-10 flex flex-col items-center justify-between p-3">
                <span className="text-[10px] text-emerald-400 font-bold bg-[#09121f]/90 px-3 py-1 rounded-full border border-emerald-500/40 shadow-sm">
                  Standard Ratio: {aspectRatio} ({recommendedDim})
                </span>
                <span className="text-[10px] text-[#00bfa5] font-semibold bg-[#09121f]/90 px-3 py-1 rounded-full border border-[#00bfa5]/40 shadow-sm">
                  ✋ Click & Drag Image to Reposition
                </span>
              </div>

              <img
                src={value}
                alt="Adjust Preview"
                draggable={false}
                className="max-w-full max-h-full object-contain pointer-events-none transition-transform duration-75"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${zoom})`,
                }}
              />
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <RotateCw className="w-4 h-4 text-[#00bfa5]" /> Rotate Image:
                </span>
                <button
                  type="button"
                  onClick={() => setRotation((prev) => (prev + 90) % 360)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#112238] border border-slate-700 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-colors"
                >
                  Rotate 90° ({rotation}°)
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1">
                    <ZoomIn className="w-4 h-4 text-[#8fa7fe]" /> Zoom Scale:
                  </span>
                  <span>{zoom.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00685f]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setRotation(0);
                  setZoom(1);
                  setPosition({ x: 0, y: 0 });
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800"
              >
                Reset Frame
              </button>
              <button
                type="button"
                onClick={applyAdjustments}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#00685f] hover:bg-[#005049] transition-colors"
              >
                <Check className="w-4 h-4" /> Apply & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PdfUploader: React.FC<ImageUploaderProps> = ({ label, value, onChange }) => {
  const pdfInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      uploadImageToSupabase(file, "documents").then((publicUrl) => {
        if (publicUrl) {
          onChange(publicUrl);
          setIsUploading(false);
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            onChange(reader.result);
          }
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="space-y-2 p-4 rounded-xl bg-[#112238]/90 border border-[#4059aa]/40">
      <label className="block text-xs font-mono-label font-bold text-[#8fa7fe] uppercase tracking-wider">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="w-12 h-12 rounded-xl border border-[#4059aa]/60 bg-[#4059aa]/20 shrink-0 flex items-center justify-center text-[#8fa7fe] font-bold text-xs font-mono">
          PDF
        </div>

        <div className="flex-1 w-full space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="CV / Resume PDF URL or file link..."
            className="w-full px-3.5 py-2 rounded-xl bg-[#09121f] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#8fa7fe]"
          />
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="file"
              ref={pdfInputRef}
              accept="application/pdf"
              onChange={handlePdfFileChange}
              className="hidden"
            />
            <button
              type="button"
              disabled={isUploading}
              onClick={() => pdfInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#8fa7fe] bg-[#4059aa]/30 border border-[#4059aa]/60 hover:bg-[#4059aa]/50 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" /> {isUploading ? "Uploading PDF..." : "Upload CV / Resume (PDF)"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => handleCVDownload(value)}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-200 hover:text-white px-2.5 py-1 bg-slate-800 rounded-lg border border-slate-700 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3 h-3" /> View / Download PDF
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SaveButtonProps {
  onSave: () => void | Promise<void>;
  label?: string;
  className?: string;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  onSave,
  label = "Save Changes",
  className = "",
}) => {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const handleClick = async () => {
    if (status !== "idle") return;
    setStatus("saving");

    try {
      await Promise.resolve(onSave());
      await new Promise((resolve) => setTimeout(resolve, 550));
      setStatus("saved");
      setTimeout(() => {
        setStatus("idle");
      }, 2200);
    } catch (e) {
      console.error("Save error:", e);
      setStatus("idle");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status === "saving"}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 transform active:scale-95 cursor-pointer ${
        status === "saved"
          ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/40"
          : status === "saving"
          ? "bg-[#00685f] text-white opacity-95 cursor-wait ring-2 ring-[#00bfa5]/40"
          : "bg-[#00685f] hover:bg-[#005049] text-white shadow-xs"
      } ${className}`}
    >
      {status === "saving" && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {status === "saved" && <Check className="w-4 h-4 text-emerald-100 shrink-0 animate-bounce" />}
      {status === "idle" && <Save className="w-4 h-4 shrink-0" />}
      <span>
        {status === "saving" ? "Saving..." : status === "saved" ? "Saved Successfully!" : label}
      </span>
    </button>
  );
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [saveNotification, setSaveNotification] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  // State Management
  const [profile, setProfile] = useState<Profile>(DataStore.getProfile());
  const [education, setEducation] = useState<EducationEntry[]>(DataStore.getEducation());
  const [researchExp, setResearchExp] = useState<ResearchExperience[]>(DataStore.getResearchExperience());
  const [skills, setSkills] = useState<SkillCategory[]>(DataStore.getSkills());
  const [projects, setProjects] = useState<Project[]>(DataStore.getProjects());
  const [publications, setPublications] = useState<Publication[]>(DataStore.getPublications());
  const [timeline, setTimeline] = useState<TimelineItem[]>(DataStore.getTimeline());
  const [certifications, setCertifications] = useState<Certification[]>(DataStore.getCertifications());
  const [achievements, setAchievements] = useState<Achievement[]>(DataStore.getAchievements());
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(DataStore.getBlogPosts());
  const [gallery, setGallery] = useState<GalleryImage[]>(DataStore.getGallery());
  const [messages, setMessages] = useState<ContactMessage[]>(DataStore.getMessages());

  useEffect(() => {
    document.documentElement.classList.add("dark");
    const auth = localStorage.getItem("bisman_admin_authenticated");
    if (auth === "true") setIsAuthenticated(true);

    DataStore.syncFromSupabase().then(() => {
      setProfile(DataStore.getProfile());
      setEducation(DataStore.getEducation());
      setResearchExp(DataStore.getResearchExperience());
      setSkills(DataStore.getSkills());
      setProjects(DataStore.getProjects());
      setPublications(DataStore.getPublications());
      setTimeline(DataStore.getTimeline());
      setCertifications(DataStore.getCertifications());
      setAchievements(DataStore.getAchievements());
      setBlogPosts(DataStore.getBlogPosts());
      setGallery(DataStore.getGallery());
      setMessages(DataStore.getMessages());
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSupabaseConfigured && supabase && email.trim()) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (!error && data?.user) {
          localStorage.setItem("bisman_admin_authenticated", "true");
          setIsAuthenticated(true);
          return;
        }
      } catch (err: any) {}
    }

    const envEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "kaurbisman2005@gmail.com";
    const envPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    const isEmailMatched = email.trim().toLowerCase() === envEmail.toLowerCase();
    const isPasswordMatched = envPassword ? password === envPassword : password.trim().length >= 4;

    if (isEmailMatched && isPasswordMatched) {
      localStorage.setItem("bisman_admin_authenticated", "true");
      setIsAuthenticated(true);
    } else {
      alert("Invalid email or password. Please verify your credentials.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("bisman_admin_authenticated");
    setIsAuthenticated(false);
  };

  const triggerSavedNotice = () => {
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3000);
  };

  // Save Handlers
  const saveProfile = () => { DataStore.saveProfile(profile); triggerSavedNotice(); };
  const saveEducation = () => { DataStore.saveEducation(education); triggerSavedNotice(); };
  const saveResearchExp = () => { DataStore.saveResearchExperience(researchExp); triggerSavedNotice(); };
  const saveSkills = () => { DataStore.saveSkills(skills); triggerSavedNotice(); };
  const saveProjects = () => { DataStore.saveProjects(projects); triggerSavedNotice(); };
  const savePublications = () => { DataStore.savePublications(publications); triggerSavedNotice(); };
  const saveTimeline = () => { DataStore.saveTimeline(timeline); triggerSavedNotice(); };
  const saveCertifications = () => { DataStore.saveCertifications(certifications); triggerSavedNotice(); };
  const saveAchievements = () => { DataStore.saveAchievements(achievements); triggerSavedNotice(); };
  const saveBlogPosts = () => { DataStore.saveBlogPosts(blogPosts); triggerSavedNotice(); };
  const saveGallery = () => { DataStore.saveGallery(gallery); triggerSavedNotice(); };

  // Helper Adders
  const addEducationEntry = () => {
    setEducation([
      ...education,
      {
        id: "edu-" + Date.now(),
        degree: "Degree Title",
        institution: "Institution Name",
        logo: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=200",
        startDate: "2024",
        endDate: "Present",
        description: "Program description.",
        coursework: ["Computational Biology"],
        order: education.length + 1,
      },
    ]);
  };

  const addProjectEntry = () => {
    setProjects([
      ...projects,
      {
        id: "proj-" + Date.now(),
        title: "New Research Project",
        subtitle: "Computational Biology Focus",
        description: "Short project summary.",
        coverImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800",
        heroImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800",
        researchProblem: "Core research challenge addressed...",
        motivation: "Why this research matters...",
        objectives: ["Objective 1", "Objective 2"],
        workflow: ["Step 1", "Step 2"],
        technologies: ["Python", "R", "Seurat"],
        datasets: ["GEO Datasets"],
        results: "Project outcome summary...",
        tags: ["Computational Biology", "Genomics"],
        links: { repo: "#", demo: "#" },
        order: projects.length + 1,
      },
    ]);
  };

  const addTimelineEntry = () => {
    setTimeline([
      ...timeline,
      {
        id: "tl-" + Date.now(),
        year: "AUGUST 2024",
        title: "Academic Milestone",
        institution: "IISER Pune",
        description: "Milestone description...",
        category: "Education",
        badgeText: "Honors",
        order: timeline.length + 1,
      },
    ]);
  };

  const addSkillCategory = () => {
    const newCatName = "New Skill Category";
    setSkills([
      ...skills,
      {
        id: "cat-" + Date.now(),
        name: newCatName,
        order: skills.length + 1,
        skills: [
          {
            id: "sk-" + Date.now(),
            name: "New Skill Name",
            icon: "Cpu",
            level: "Intermediate",
            stars: 2,
            category: newCatName,
          },
        ],
      },
    ]);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#09121f]">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#112238] border border-[#00685f]/40 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#00685f] mx-auto flex items-center justify-center text-white shadow-md mb-3">
              <Shield className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-white">Bisman's Admin CMS</h2>
            <p className="text-xs text-[#00bfa5] font-mono-label">Synthesized Precision Control Center</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono-label font-bold text-slate-300 uppercase tracking-wider mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#09121f] border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-[#00bfa5]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-label font-bold text-slate-300 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#09121f] border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-[#00bfa5]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-[#00685f] hover:bg-[#005049] transition-colors shadow-sm cursor-pointer"
            >
              Authenticate & Unlock CMS
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs font-semibold text-slate-400 hover:text-[#00bfa5] transition-colors inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Active navigation sidebar tabs aligned with website structure
  const activeTabs = [
    { id: "profile", label: "Hero & Profile", icon: User },
    { id: "projects", label: "Projects & Dossiers", icon: Sparkles },
    { id: "education", label: "Education & Logos", icon: GraduationCap },
    { id: "timeline", label: "Journey & Milestones", icon: Compass },
    { id: "skills", label: "Skills & Matrix", icon: Layers },
    { id: "contact_cms", label: "Contact & Social Links", icon: Globe },
    { id: "messages", label: `Messages (${messages.length})`, icon: Mail },
  ];

  const archivedTabs = [
    { id: "research", label: "Research Positions", icon: FlaskConical },
    { id: "publications", label: "Publications & Preprints", icon: BookOpen },
    { id: "achievements", label: "Achievements & Ranks", icon: Trophy },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "blog", label: "Research Blog", icon: FileText },
    { id: "gallery", label: "Gallery Photos", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-[#09121f] text-slate-100 p-4 sm:p-6 lg:p-8">
      {/* Top Admin Header Bar */}
      <div className="sticky top-0 z-50 bg-[#09121f]/95 backdrop-blur-xl pb-4 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-[#00685f]/30 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00685f] flex items-center justify-center font-heading font-bold text-white shadow-sm shrink-0">
              BK
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-slate-50">Content Management System</h1>
              <span className="text-xs text-[#00bfa5] font-mono-label">Bisman Kaur • Academic & Research Portfolio</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search CMS items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#112238] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#00bfa5]"
              />
            </div>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#00685f] hover:bg-[#005049] border border-[#00bfa5]/40 shadow-sm transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>View Live Site</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </Link>

            {saveNotification && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800 text-xs font-semibold animate-pulse">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saved to Storage
              </span>
            )}

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl bg-[#112238] border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {messages.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {messages.length}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#112238] border border-slate-700 rounded-2xl p-4 shadow-2xl z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-3">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Inquiries Notifications</h4>
                    <span className="text-[10px] text-slate-400">{messages.length} messages</span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {messages.length > 0 ? (
                      messages.slice(0, 4).map((m) => (
                        <div key={m.id} className="p-2.5 rounded-xl bg-[#09121f] border border-slate-800 text-xs">
                          <div className="font-semibold text-[#00bfa5]">{m.name}</div>
                          <div className="text-[11px] text-slate-300 truncate">{m.subject || m.message}</div>
                          <div className="text-[10px] text-slate-500 mt-1">{m.submittedAt}</div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 text-center py-4">No unread notifications.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-950/40 text-rose-300 border border-rose-800/60 hover:bg-rose-900/50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 mt-8 items-start">
        {/* Collapsible Side Navbar */}
        <div
          className={`sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-1 transition-all duration-300 shrink-0 ${
            isSidebarCollapsed ? "lg:w-16" : "lg:w-64"
          } space-y-1.5`}
        >
          <div className="flex items-center justify-between px-3 py-2 text-xs font-mono-label text-[#00bfa5] uppercase tracking-wider mb-1">
            {!isSidebarCollapsed && <span>ACTIVE SECTIONS</span>}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1 rounded bg-[#112238] text-slate-400 hover:text-white cursor-pointer"
            >
              {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {activeTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                title={isSidebarCollapsed ? tab.label : undefined}
                className={`w-full flex items-center ${
                  isSidebarCollapsed ? "justify-center px-2" : "justify-start px-4"
                } py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#00685f] text-white shadow-sm"
                    : "bg-[#112238]/60 text-slate-300 border border-slate-800 hover:text-white hover:bg-[#112238]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!isSidebarCollapsed && <span className="ml-3 truncate">{tab.label}</span>}
              </button>
            );
          })}

          {!isSidebarCollapsed && (
            <div className="px-3 pt-4 pb-1 text-[11px] font-mono-label text-slate-500 uppercase tracking-wider">
              OTHER DATA ARCHIVES
            </div>
          )}

          {archivedTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                title={isSidebarCollapsed ? tab.label : undefined}
                className={`w-full flex items-center ${
                  isSidebarCollapsed ? "justify-center px-2" : "justify-start px-4"
                } py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#4059aa] text-white shadow-sm"
                    : "bg-[#112238]/30 text-slate-400 border border-slate-800/80 hover:text-slate-200 hover:bg-[#112238]/60"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!isSidebarCollapsed && <span className="ml-3 truncate">{tab.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Active Tab Content Panel */}
        <div className="flex-1 bg-[#112238]/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl overflow-x-hidden w-full">
          {/* TAB 1: HERO & PROFILE */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-heading font-bold text-slate-50">Hero & Profile Settings</h3>
                  <p className="text-xs text-slate-400">Manage name, photo frame, CV download, and computational biology text-flipping phrases.</p>
                </div>
                <SaveButton onSave={saveProfile} label="Save Profile" />
              </div>

              {/* Profile Photo Uploader */}
              <ImageUploader
                label="Profile Photo (Circular Frame)"
                value={profile.profilePhoto}
                onChange={(url) => setProfile({ ...profile, profilePhoto: url })}
                aspectRatio="1:1 Perfect Circle"
                recommendedDim="400×400 px"
              />

              {/* CV / Resume PDF Uploader */}
              <PdfUploader
                label="Curriculum Vitae / Academic Resume (PDF)"
                value={profile.resumeFileUrl || ""}
                onChange={(url) => setProfile({ ...profile, resumeFileUrl: url })}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-label text-slate-400 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#09121f] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#00bfa5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-label text-slate-400 uppercase mb-1">Subline Tag (Below Name)</label>
                  <input
                    type="text"
                    value="Biological Sciences — IISER Pune"
                    disabled
                    className="w-full px-3.5 py-2 rounded-xl bg-[#09121f]/50 border border-slate-800 text-slate-400 text-xs cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Dynamic Flipping Phrases Manager with Reorder Controls */}
              <div className="space-y-3 p-4 rounded-xl bg-[#09121f] border border-[#00685f]/30">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-mono-label font-bold text-[#00bfa5] uppercase tracking-wider">
                      Computational Biology Flipping Phrases ({(profile.typingInterests || []).length})
                    </label>
                    <p className="text-[11px] text-slate-400">Phrases that cycle dynamically in the Hero headline. Use ▲ ▼ arrows to reorder.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const currentInterests = Array.isArray(profile.typingInterests) ? profile.typingInterests : [];
                      setProfile({
                        ...profile,
                        typingInterests: [...currentInterests, "New Bioinformatic Phrase"],
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#00bfa5] bg-[#00685f]/20 border border-[#00685f]/60 hover:bg-[#00685f]/40 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Phrase
                  </button>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  {(profile.typingInterests || []).map((interest, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-6 text-center text-xs font-mono font-bold text-[#00bfa5]">{idx + 1}.</span>
                      <input
                        type="text"
                        value={interest}
                        onChange={(e) => {
                          const updated = [...(profile.typingInterests || [])];
                          updated[idx] = e.target.value;
                          setProfile({ ...profile, typingInterests: updated });
                        }}
                        className="flex-1 px-3 py-2 rounded-xl bg-[#112238] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#00bfa5]"
                      />
                      <ReorderControls
                        onMoveUp={() => {
                          const updated = moveArrayItem(profile.typingInterests || [], idx, "up");
                          setProfile({ ...profile, typingInterests: updated });
                        }}
                        onMoveDown={() => {
                          const updated = moveArrayItem(profile.typingInterests || [], idx, "down");
                          setProfile({ ...profile, typingInterests: updated });
                        }}
                        isFirst={idx === 0}
                        isLast={idx === (profile.typingInterests || []).length - 1}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (profile.typingInterests || []).filter((_, i) => i !== idx);
                          setProfile({ ...profile, typingInterests: updated });
                        }}
                        className="p-2 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-950/40 cursor-pointer"
                        title="Remove Phrase"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-label text-slate-400 uppercase mb-1">Hero Introduction Paragraph</label>
                <textarea
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#09121f] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#00bfa5] leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-heading font-bold text-slate-50">Projects & Research Dossiers</h3>
                  <p className="text-xs text-slate-400">Manage research project cards, cover images, methodologies, and framework dossiers. Use ▲ ▼ to reorder items.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={addProjectEntry} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#112238] text-slate-200 border border-slate-700 hover:bg-slate-800 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Add Project
                  </button>
                  <SaveButton onSave={saveProjects} label="Save Projects" />
                </div>
              </div>

              <div className="space-y-6">
                {projects.filter(p => !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase())).map((proj, idx) => (
                  <div key={proj.id} className="p-5 rounded-xl bg-[#09121f] border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono-label font-bold text-[#00bfa5] uppercase">Project #{idx + 1}</span>
                        <ReorderControls
                          onMoveUp={() => setProjects(moveArrayItem(projects, idx, "up"))}
                          onMoveDown={() => setProjects(moveArrayItem(projects, idx, "down"))}
                          isFirst={idx === 0}
                          isLast={idx === projects.length - 1}
                        />
                      </div>
                      <button onClick={() => setProjects(projects.filter((p) => p.id !== proj.id))} className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <ImageUploader
                      label="Project Cover Image"
                      value={proj.coverImage || proj.heroImage || ""}
                      onChange={(url) => { const u = [...projects]; u[idx].coverImage = url; u[idx].heroImage = url; setProjects(u); }}
                      aspectRatio="16:9 Landscape"
                      recommendedDim="1200×675 px"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" placeholder="Project Title" value={proj.title} onChange={(e) => { const u = [...projects]; u[idx].title = e.target.value; setProjects(u); }} className="px-3.5 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs" />
                      <input type="text" placeholder="Subtitle / Focus" value={proj.subtitle || ""} onChange={(e) => { const u = [...projects]; u[idx].subtitle = e.target.value; setProjects(u); }} className="px-3.5 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs" />
                    </div>

                    <textarea rows={2} placeholder="Description..." value={proj.description} onChange={(e) => { const u = [...projects]; u[idx].description = e.target.value; setProjects(u); }} className="w-full px-3.5 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs" />
                    <textarea rows={2} placeholder="Core Research Problem..." value={proj.researchProblem || ""} onChange={(e) => { const u = [...projects]; u[idx].researchProblem = e.target.value; setProjects(u); }} className="w-full px-3.5 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EDUCATION */}
          {activeTab === "education" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-heading font-bold text-slate-50">Education & Qualifications</h3>
                  <p className="text-xs text-slate-400">Manage university degrees, institution logo frames, CGPA, and thesis topics. Use ▲ ▼ to reorder items.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={addEducationEntry} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#112238] text-slate-200 border border-slate-700 hover:bg-slate-800 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Add Degree
                  </button>
                  <SaveButton onSave={saveEducation} label="Save Education" />
                </div>
              </div>

              <div className="space-y-6">
                {education.filter(e => !searchQuery || e.degree.toLowerCase().includes(searchQuery.toLowerCase()) || e.institution.toLowerCase().includes(searchQuery.toLowerCase())).map((item, idx) => (
                  <div key={item.id} className="p-5 rounded-xl bg-[#09121f] border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono-label font-bold text-[#00bfa5] uppercase">Degree Entry #{idx + 1}</span>
                        <ReorderControls
                          onMoveUp={() => setEducation(moveArrayItem(education, idx, "up"))}
                          onMoveDown={() => setEducation(moveArrayItem(education, idx, "down"))}
                          isFirst={idx === 0}
                          isLast={idx === education.length - 1}
                        />
                      </div>
                      <button onClick={() => setEducation(education.filter((e) => e.id !== item.id))} className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <ImageUploader
                      label="Institution Logo Frame"
                      value={item.logo || "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=200"}
                      onChange={(url) => {
                        const updated = [...education];
                        updated[idx].logo = url;
                        setEducation(updated);
                      }}
                      aspectRatio="1:1 Square Logo"
                      recommendedDim="200×200 px"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" placeholder="Degree Title" value={item.degree} onChange={(e) => { const u = [...education]; u[idx].degree = e.target.value; setEducation(u); }} className="px-3.5 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs" />
                      <input type="text" placeholder="Institution Name" value={item.institution} onChange={(e) => { const u = [...education]; u[idx].institution = e.target.value; setEducation(u); }} className="px-3.5 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input type="text" placeholder="Start Date" value={item.startDate} onChange={(e) => { const u = [...education]; u[idx].startDate = e.target.value; setEducation(u); }} className="px-3.5 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs" />
                      <input type="text" placeholder="End Date" value={item.endDate} onChange={(e) => { const u = [...education]; u[idx].endDate = e.target.value; setEducation(u); }} className="px-3.5 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs" />
                      <input type="text" placeholder="Rank Highlight (e.g. AIR 38)" value={item.rankHighlight || ""} onChange={(e) => { const u = [...education]; u[idx].rankHighlight = e.target.value; setEducation(u); }} className="px-3.5 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs" />
                    </div>

                    <textarea rows={2} placeholder="Description..." value={item.description} onChange={(e) => { const u = [...education]; u[idx].description = e.target.value; setEducation(u); }} className="w-full px-3.5 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: JOURNEY / TIMELINE */}
          {activeTab === "timeline" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-heading font-bold text-slate-50">Journey & Milestone Timeline</h3>
                  <p className="text-xs text-slate-400">Manage chronological journey milestones matching the reference screenshot layout. Use ▲ ▼ to reorder items.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={addTimelineEntry} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#112238] text-slate-200 border border-slate-700 hover:bg-slate-800 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Add Milestone
                  </button>
                  <SaveButton onSave={saveTimeline} label="Save Journey" />
                </div>
              </div>

              <div className="space-y-4">
                {timeline.filter(t => !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase())).map((item, idx) => (
                  <div key={item.id} className="p-5 rounded-xl bg-[#09121f] border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono-label font-bold text-[#00bfa5] uppercase">Milestone #{idx + 1}</span>
                        <ReorderControls
                          onMoveUp={() => setTimeline(moveArrayItem(timeline, idx, "up"))}
                          onMoveDown={() => setTimeline(moveArrayItem(timeline, idx, "down"))}
                          isFirst={idx === 0}
                          isLast={idx === timeline.length - 1}
                        />
                      </div>
                      <button onClick={() => setTimeline(timeline.filter((t) => t.id !== item.id))} className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono-label text-slate-400 mb-1">Date (e.g. MAY 2020)</label>
                        <input type="text" placeholder="e.g. MAY 2020" value={item.year} onChange={(e) => { const u = [...timeline]; u[idx].year = e.target.value; setTimeline(u); }} className="w-full px-3.5 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs font-mono" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono-label text-slate-400 mb-1">Milestone Title</label>
                        <input type="text" placeholder="Milestone Title" value={item.title} onChange={(e) => { const u = [...timeline]; u[idx].title = e.target.value; setTimeline(u); }} className="w-full px-3.5 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs font-bold" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono-label text-slate-400 mb-1">Category Tag</label>
                        <select value={item.category} onChange={(e) => { const u = [...timeline]; u[idx].category = e.target.value as any; setTimeline(u); }} className="w-full px-3.5 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs font-semibold text-[#00bfa5]">
                          <option value="Education">Education</option>
                          <option value="Research">Research</option>
                          <option value="Hackathons">Hackathons</option>
                          <option value="Awards">Awards</option>
                          <option value="Publications">Publications</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono-label text-slate-400 mb-1">Icon Color Theme</label>
                        <select value={item.color || "teal"} onChange={(e) => { const u = [...timeline]; u[idx].color = e.target.value; setTimeline(u); }} className="w-full px-3.5 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs font-semibold text-[#00bfa5]">
                          <option value="teal">Teal / Cyan</option>
                          <option value="purple">Purple / Violet</option>
                          <option value="amber">Amber / Orange</option>
                          <option value="emerald">Emerald / Green</option>
                          <option value="blue">Blue / Indigo</option>
                          <option value="rose">Rose / Pink</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-label text-slate-400 mb-1">Institution / Organization</label>
                      <input type="text" placeholder="Institution" value={item.institution} onChange={(e) => { const u = [...timeline]; u[idx].institution = e.target.value; setTimeline(u); }} className="w-full px-3.5 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs" />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono-label text-slate-400 mb-1">Milestone Description</label>
                      <textarea rows={3} placeholder="Description..." value={item.description} onChange={(e) => { const u = [...timeline]; u[idx].description = e.target.value; setTimeline(u); }} className="w-full px-3.5 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs leading-relaxed" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SKILLS */}
          {activeTab === "skills" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-heading font-bold text-slate-50">Skills & Matrix</h3>
                  <p className="text-xs text-slate-400">Manage skill categories and individual skill items. Use ▲ ▼ to reorder categories and items.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={addSkillCategory} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#112238] text-slate-200 border border-slate-700 hover:bg-slate-800 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Add Category
                  </button>
                  <SaveButton onSave={saveSkills} label="Save Skills" />
                </div>
              </div>

              <div className="space-y-6">
                {skills.map((cat, cIdx) => (
                  <div key={cat.id} className="p-5 rounded-xl bg-[#09121f] border border-slate-800 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
                        <span className="text-xs font-mono-label font-bold text-[#00bfa5] uppercase shrink-0">Category #{cIdx + 1}:</span>
                        <input
                          type="text"
                          value={cat.name}
                          onChange={(e) => {
                            const u = [...skills];
                            u[cIdx].name = e.target.value;
                            setSkills(u);
                          }}
                          className="bg-[#112238] px-3 py-1.5 rounded-lg text-xs font-bold text-slate-100 border border-slate-700 focus:outline-none focus:border-[#00bfa5] w-full sm:w-72"
                        />
                        <ReorderControls
                          onMoveUp={() => setSkills(moveArrayItem(skills, cIdx, "up"))}
                          onMoveDown={() => setSkills(moveArrayItem(skills, cIdx, "down"))}
                          isFirst={cIdx === 0}
                          isLast={cIdx === skills.length - 1}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {cat.skills.filter(s => !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase())).map((s, sIdx) => (
                        <div key={s.id} className="p-3 rounded-lg bg-[#112238] border border-slate-700 flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={s.name}
                            onChange={(e) => {
                              const u = [...skills];
                              u[cIdx].skills[sIdx].name = e.target.value;
                              setSkills(u);
                            }}
                            className="bg-transparent text-xs font-semibold text-slate-100 focus:outline-none flex-1"
                          />
                          <select
                            value={s.level}
                            onChange={(e) => {
                              const newLevel = e.target.value as any;
                              const levelStars: Record<string, number> = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };
                              const u = [...skills];
                              u[cIdx].skills[sIdx].level = newLevel;
                              u[cIdx].skills[sIdx].stars = levelStars[newLevel] || 2;
                              setSkills(u);
                            }}
                            className="bg-[#09121f] text-[11px] font-semibold text-[#00bfa5] border border-slate-700 rounded px-2 py-1"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </select>
                          <ReorderControls
                            onMoveUp={() => {
                              const u = [...skills];
                              u[cIdx].skills = moveArrayItem(u[cIdx].skills, sIdx, "up");
                              setSkills(u);
                            }}
                            onMoveDown={() => {
                              const u = [...skills];
                              u[cIdx].skills = moveArrayItem(u[cIdx].skills, sIdx, "down");
                              setSkills(u);
                            }}
                            isFirst={sIdx === 0}
                            isLast={sIdx === cat.skills.length - 1}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT & SOCIALS */}
          {activeTab === "contact_cms" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-heading font-bold text-slate-50">Contact Details & Social Profiles</h3>
                  <p className="text-xs text-slate-400">Control primary email, campus location, and social media profile links.</p>
                </div>
                <SaveButton onSave={saveProfile} label="Save Details" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono-label text-slate-400 uppercase mb-1">Primary Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#09121f] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#00bfa5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-label text-slate-400 uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#09121f] border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-[#00bfa5]"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#00bfa5] uppercase tracking-wider">Social Links ({(profile.socialLinks || []).length})</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const currentLinks = Array.isArray(profile.socialLinks) ? profile.socialLinks : [];
                      setProfile({
                        ...profile,
                        socialLinks: [
                          ...currentLinks,
                          { platform: "New Profile", url: "https://", icon: "Globe", badge: "Profile" },
                        ],
                      });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#00bfa5] bg-[#00685f]/20 border border-[#00685f]/60 hover:bg-[#00685f]/40 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Social Link
                  </button>
                </div>

                <div className="space-y-3">
                  {(profile.socialLinks || []).map((link, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#09121f] border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono-label text-slate-300">Link #{idx + 1}: {link.platform}</span>
                        <ReorderControls
                          onMoveUp={() => {
                            const updated = moveArrayItem(profile.socialLinks || [], idx, "up");
                            setProfile({ ...profile, socialLinks: updated });
                          }}
                          onMoveDown={() => {
                            const updated = moveArrayItem(profile.socialLinks || [], idx, "down");
                            setProfile({ ...profile, socialLinks: updated });
                          }}
                          isFirst={idx === 0}
                          isLast={idx === (profile.socialLinks || []).length - 1}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Platform"
                          value={link.platform}
                          onChange={(e) => {
                            const updated = [...(profile.socialLinks || [])];
                            updated[idx] = { ...updated[idx], platform: e.target.value };
                            setProfile({ ...profile, socialLinks: updated });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#112238] border border-slate-700 text-slate-100 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="URL"
                          value={link.url}
                          onChange={(e) => {
                            const updated = [...(profile.socialLinks || [])];
                            updated[idx] = { ...updated[idx], url: e.target.value };
                            setProfile({ ...profile, socialLinks: updated });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#112238] border border-slate-700 text-slate-100 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Badge Tag"
                          value={link.badge || ""}
                          onChange={(e) => {
                            const updated = [...(profile.socialLinks || [])];
                            updated[idx] = { ...updated[idx], badge: e.target.value };
                            setProfile({ ...profile, socialLinks: updated });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#112238] border border-slate-700 text-slate-100 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: MESSAGES INBOX */}
          {activeTab === "messages" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-heading font-bold text-slate-50">Inquiries Inbox ({messages.length})</h3>
              </div>

              <div className="space-y-4">
                {messages.length > 0 ? (
                  messages.filter(m => !searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.message.toLowerCase().includes(searchQuery.toLowerCase())).map((msg) => (
                    <div key={msg.id} className="p-5 rounded-xl bg-[#09121f] border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-[#00bfa5]">{msg.name} ({msg.email})</span>
                        <span className="text-slate-500">{msg.submittedAt}</span>
                      </div>
                      {msg.subject && <h4 className="text-sm font-bold text-slate-100">{msg.subject}</h4>}
                      <p className="text-xs text-slate-300 bg-[#112238] p-3 rounded-lg border border-slate-700">{msg.message}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400 text-center py-8">No contact messages received yet.</p>
                )}
              </div>
            </div>
          )}

          {/* ARCHIVED DATA TABS (RESEARCH, PUBLICATIONS, ACHIEVEMENTS, CERTIFICATIONS, BLOG, GALLERY) */}
          {activeTab === "research" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-heading font-bold text-slate-50">Research Positions & Rotations</h3>
                <SaveButton onSave={saveResearchExp} label="Save Research" />
              </div>
              <div className="space-y-4">
                {researchExp.map((exp, idx) => (
                  <div key={exp.id} className="p-4 rounded-xl bg-[#09121f] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-label text-slate-400">Position #{idx + 1}</span>
                      <ReorderControls
                        onMoveUp={() => setResearchExp(moveArrayItem(researchExp, idx, "up"))}
                        onMoveDown={() => setResearchExp(moveArrayItem(researchExp, idx, "down"))}
                        isFirst={idx === 0}
                        isLast={idx === researchExp.length - 1}
                      />
                    </div>
                    <input type="text" value={exp.title} onChange={(e) => { const u = [...researchExp]; u[idx].title = e.target.value; setResearchExp(u); }} className="w-full px-3 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs font-bold" />
                    <textarea rows={2} value={exp.objective} onChange={(e) => { const u = [...researchExp]; u[idx].objective = e.target.value; setResearchExp(u); }} className="w-full px-3 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "publications" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-heading font-bold text-slate-50">Publications & Preprints</h3>
                <SaveButton onSave={savePublications} label="Save Publications" />
              </div>
              <div className="space-y-4">
                {publications.map((pub, idx) => (
                  <div key={pub.id} className="p-4 rounded-xl bg-[#09121f] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-label text-slate-400">Publication #{idx + 1}</span>
                      <ReorderControls
                        onMoveUp={() => setPublications(moveArrayItem(publications, idx, "up"))}
                        onMoveDown={() => setPublications(moveArrayItem(publications, idx, "down"))}
                        isFirst={idx === 0}
                        isLast={idx === publications.length - 1}
                      />
                    </div>
                    <input type="text" value={pub.title} onChange={(e) => { const u = [...publications]; u[idx].title = e.target.value; setPublications(u); }} className="w-full px-3 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs font-bold" />
                    <textarea rows={2} value={pub.abstract} onChange={(e) => { const u = [...publications]; u[idx].abstract = e.target.value; setPublications(u); }} className="w-full px-3 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-heading font-bold text-slate-50">Achievements & Ranks</h3>
                <SaveButton onSave={saveAchievements} label="Save Achievements" />
              </div>
              <div className="space-y-4">
                {achievements.map((ach, idx) => (
                  <div key={ach.id} className="p-4 rounded-xl bg-[#09121f] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-label text-slate-400">Honor #{idx + 1}</span>
                      <ReorderControls
                        onMoveUp={() => setAchievements(moveArrayItem(achievements, idx, "up"))}
                        onMoveDown={() => setAchievements(moveArrayItem(achievements, idx, "down"))}
                        isFirst={idx === 0}
                        isLast={idx === achievements.length - 1}
                      />
                    </div>
                    <input type="text" value={ach.title} onChange={(e) => { const u = [...achievements]; u[idx].title = e.target.value; setAchievements(u); }} className="w-full px-3 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs font-bold" />
                    <textarea rows={2} value={ach.description} onChange={(e) => { const u = [...achievements]; u[idx].description = e.target.value; setAchievements(u); }} className="w-full px-3 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "certifications" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-heading font-bold text-slate-50">Certifications</h3>
                <SaveButton onSave={saveCertifications} label="Save Certifications" />
              </div>
              <div className="space-y-4">
                {certifications.map((cert, idx) => (
                  <div key={cert.id} className="p-4 rounded-xl bg-[#09121f] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-label text-slate-400">Certificate #{idx + 1}</span>
                      <ReorderControls
                        onMoveUp={() => setCertifications(moveArrayItem(certifications, idx, "up"))}
                        onMoveDown={() => setCertifications(moveArrayItem(certifications, idx, "down"))}
                        isFirst={idx === 0}
                        isLast={idx === certifications.length - 1}
                      />
                    </div>
                    <input type="text" value={cert.title} onChange={(e) => { const u = [...certifications]; u[idx].title = e.target.value; setCertifications(u); }} className="w-full px-3 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs font-bold" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "blog" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-heading font-bold text-slate-50">Research Blog Articles</h3>
                <SaveButton onSave={saveBlogPosts} label="Save Blog" />
              </div>
              <div className="space-y-4">
                {blogPosts.map((post, idx) => (
                  <div key={post.id} className="p-4 rounded-xl bg-[#09121f] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-label text-slate-400">Article #{idx + 1}</span>
                      <ReorderControls
                        onMoveUp={() => setBlogPosts(moveArrayItem(blogPosts, idx, "up"))}
                        onMoveDown={() => setBlogPosts(moveArrayItem(blogPosts, idx, "down"))}
                        isFirst={idx === 0}
                        isLast={idx === blogPosts.length - 1}
                      />
                    </div>
                    <input type="text" value={post.title} onChange={(e) => { const u = [...blogPosts]; u[idx].title = e.target.value; setBlogPosts(u); }} className="w-full px-3 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs font-bold" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-heading font-bold text-slate-50">Gallery Photography</h3>
                <SaveButton onSave={saveGallery} label="Save Gallery" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gallery.map((img, idx) => (
                  <div key={img.id} className="p-4 rounded-xl bg-[#09121f] border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-label text-slate-400">Photo #{idx + 1}</span>
                      <ReorderControls
                        onMoveUp={() => setGallery(moveArrayItem(gallery, idx, "up"))}
                        onMoveDown={() => setGallery(moveArrayItem(gallery, idx, "down"))}
                        isFirst={idx === 0}
                        isLast={idx === gallery.length - 1}
                      />
                    </div>
                    <input type="text" value={img.caption} onChange={(e) => { const u = [...gallery]; u[idx].caption = e.target.value; setGallery(u); }} className="w-full px-3 py-2 rounded-lg bg-[#112238] border border-slate-700 text-xs" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
