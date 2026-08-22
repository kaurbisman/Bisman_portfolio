export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  badge?: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  profilePhoto: string;
  resumeFileUrl: string;
  location: string;
  institution: string;
  email: string;
  typingInterests: string[];
  socialLinks: SocialLink[];
  currentResearch: string;
  researchPhilosophy: string;
}

export interface QuickFact {
  label: string;
  value: string;
  icon?: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  logo?: string;
  startDate: string;
  endDate: string;
  cgpa?: string;
  rankHighlight?: string;
  description: string;
  coursework?: string[];
  thesisTitle?: string;
  thesisDescription?: string;
  supervisor?: string;
  awards?: string[];
  order: number;
}

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface Skill {
  id: string;
  name: string;
  icon: string;
  level: SkillLevel;
  stars: number; // 1 to 4 stars
  category: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  order: number;
  skills: Skill[];
}

export interface ResearchExperience {
  id: string;
  title: string;
  institution: string;
  logo?: string;
  duration: string;
  supervisor: string;
  objective: string;
  methodology: string;
  techniquesUsed: string[];
  results: string;
  researchImpact: string;
  publications?: { title: string; link: string }[];
  githubUrl?: string;
  posterUrl?: string;
  presentationUrl?: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  coverImage?: string;
  heroImage?: string;
  researchProblem?: string;
  motivation?: string;
  objectives?: string[];
  methodology?: string;
  workflow?: string[];
  technologies?: string[];
  datasets?: string[];
  results?: string;
  challenges?: string;
  futureScope?: string;
  tags: string[];
  links: { repo?: string; demo?: string; paper?: string; presentation?: string };
  order: number;
}

export type PublicationType =
  | "Journal Paper"
  | "Conference Paper"
  | "Preprint"
  | "Submitted Manuscript"
  | "Book Chapter";

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: string;
  type: PublicationType;
  doi?: string;
  pdfUrl?: string;
  bibtex?: string;
  abstract: string;
  status: "Published" | "Accepted" | "Under Review" | "In Prep";
  highlights?: string[];
  order: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  logo?: string;
  date: string;
  credentialId?: string;
  verifyLink?: string;
  skillsGained?: string[];
  order: number;
}

export interface Achievement {
  id: string;
  title: string;
  result?: string;
  metricNumber?: string; // e.g. "AIR 38", "Top 1%", "1st Rank"
  metricSubtext?: string; // e.g. "among 18,000 candidates"
  level: "Regional" | "National" | "Institutional" | "International";
  institution?: string;
  logo?: string;
  description: string;
  date: string;
  order: number;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category:
  | "Lab Photography"
  | "Conferences"
  | "Poster Presentations"
  | "Hackathons"
  | "Campus"
  | "Team Photos"
  | "Experimental Work"
  | string;
  date?: string;
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentMarkdown: string;
  category: string;
  tags: string[];
  readTime: string;
  publishedDate: string;
  coverImage: string;
  author: string;
  order?: number;
}

export type TimelineCategory =
  | "Education"
  | "Research"
  | "Hackathons"
  | "Awards"
  | "Publications"
  | "Conferences"
  | "Internships";

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  institution: string;
  category: TimelineCategory;
  description: string;
  badgeText: string;
  color?: string; // e.g. "teal" | "purple" | "amber" | "blue" | "emerald" | "rose"
  link?: string;
  highlights?: string[];
  order?: number;
}

export interface StatMetric {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  description: string;
  icon: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  read: boolean;
}

// ----------------------------------------------------
// INITIAL SEED DATA FOR BISMAN KAUR (PRODUCTION-READY)
// ----------------------------------------------------

export const initialProfile: Profile = {
  name: "Bisman Kaur",
  title: "IPhD Scholar in Biological Sciences",
  institution: "IISER Pune",
  email: "kaurbisman2005@gmail.com",
  tagline: "Bridging quantitative biology, multi-omics systems, and computational discovery for healthcare precision.",
  bio: "Bisman Kaur is an Integrated PhD (IPhD) scholar in Biological Sciences at the Indian Institute of Science Education and Research (IISER), Pune. With a foundational background in Biomedical Science from the University of Delhi, she combines rigorous wet-lab techniques with high-throughput bioinformatic analytical tools. Having achieved All India Rank 38 in the national IIT JAM examination and qualified JGEEBILS, Bisman represents a new generation of interdisciplinary researchers striving to decipher complex biological phenomena in genomics, cell stress pathways, and zoonotic pathogen networks.",
  currentResearch: "Deciphering cellular stress response networks and developing computational pipelines for integrating multi-omics datasets (RNA-seq, single-cell transcriptomics) in disease models.",
  researchPhilosophy: "Scientific discovery thrives at the confluence of open computational tools, rigorous experimental control, and scalable interdisciplinary collaboration.",
  profilePhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  resumeFileUrl: "/resume_bisman_kaur.pdf",
  location: "Indian Institute of Science Education and Research (IISER), Pune, Maharashtra, India",
  typingInterests: [
    "Computational Biology",
    "Systems Biology",
    "Drug Discovery & Genomics",
    "Cancer Biology & Biomarkers",
    "Bioinformatics & RNA-seq",
    "Precision Medicine",
    "AI & Machine Learning in Healthcare",
  ],
  socialLinks: [
    { platform: "Email", url: "mailto:kaurbisman2005@gmail.com", icon: "Mail", badge: "Direct Contact" },
    { platform: "Google Scholar", url: "https://scholar.google.com", icon: "GraduationCap", badge: "Citations" },
    { platform: "ORCID", url: "https://orcid.org/0009-0000-0000-0000", icon: "Fingerprint", badge: "0009-0000-0000-0000" },
    { platform: "GitHub", url: "https://github.com/kaurbisman/Bisman_portfolio", icon: "Github", badge: "Code Repositories" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/bisman-kaur", icon: "Linkedin", badge: "Professional Network" },
    { platform: "ResearchGate", url: "https://researchgate.net", icon: "Globe", badge: "Research Profile" },
    { platform: "Twitter / X", url: "https://x.com", icon: "Twitter", badge: "Academic Updates" },
    { platform: "NCBI / PubMed", url: "https://ncbi.nlm.nih.gov", icon: "BookOpen", badge: "Publications Index" },
    { platform: "Web of Science", url: "https://webofscience.com", icon: "Globe", badge: "Peer Reviews" },
  ],
};

export const initialQuickFacts: QuickFact[] = [
  { label: "Current Program", value: "Integrated PhD (Biological Sciences)", icon: "Microscope" },
  { label: "Institution", value: "IISER Pune", icon: "Building2" },
  { label: "Bachelor's Degree", value: "B.Sc. (Hons.) Biomedical Science (DU)", icon: "BookOpen" },
  { label: "IIT JAM Rank", value: "AIR 38 (All India Rank)", icon: "Trophy" },
  { label: "JGEEBILS Status", value: "Qualified Nationwide", icon: "Award" },
  { label: "Hackathon Distinction", value: "1st Rank Regional / Grand Finalist", icon: "Target" },
];

export const initialEducation: EducationEntry[] = [
  {
    id: "edu-1",
    degree: "Integrated PhD (IPhD) in Biological Sciences",
    institution: "Indian Institute of Science Education and Research (IISER), Pune",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=200&auto=format&fit=crop",
    startDate: "2024",
    endDate: "Present",
    cgpa: "Completed Advanced Rotations",
    rankHighlight: "National Merit Selection",
    description: "Pursuing rigorous doctoral-level coursework and research rotations across molecular biology, advanced cell biology, biophysics, and computational biology labs.",
    coursework: [
      "Advanced Molecular Biology",
      "Structural Biology & Biophysics",
      "Quantitative Biology",
      "Genomics & Proteomics",
      "Cell Dynamics & Signalling",
      "Biostatistics",
    ],
    thesisTitle: "Multi-Omic Profiling of Cellular Stress Signaling Pathways",
    thesisDescription: "Investigating the crosstalk between epigenetic modifiers and metabolic stress response mechanisms using transcriptomic pipelines and fluorescence microscopy.",
    supervisor: "Faculty Advisory Committee — IISER Pune",
    awards: ["IISER Institutional Fellowship", "IIT JAM AIR 38 Selection"],
    order: 1,
  },
  {
    id: "edu-2",
    degree: "B.Sc. (Hons.) Biomedical Science",
    institution: "Bhaskaracharya College of Applied Sciences, University of Delhi",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=200&auto=format&fit=crop",
    startDate: "2021",
    endDate: "2024",
    cgpa: "First Class Distinction (Top 1%)",
    rankHighlight: "College Top Ranker",
    description: "Completed undergraduate degree with focus on Human Physiology, Biochemistry, Molecular Genetics, Medicinal Chemistry, and Immunology.",
    coursework: [
      "Human Pathology & Physiology",
      "Medical Biochemistry",
      "Molecular Genetics",
      "Pharmacology & Toxicology",
      "Immunology & Serology",
      "Recombinant DNA Technology",
    ],
    thesisTitle: "Biochemical Characterization of Enzymatic Activity Under Oxidative Stress",
    thesisDescription: "Evaluated reactive oxygen species (ROS) levels and antioxidant enzyme kinetics using spectrophotometric microplate assays and cellular staining.",
    supervisor: "Department of Biomedical Science, DU",
    awards: ["Academic Merit Certificate", "Best Poster Presentation Award"],
    order: 2,
  },
];

export const initialSkillCategories: SkillCategory[] = [
  {
    id: "cat-1",
    name: "Laboratory Skills",
    order: 1,
    skills: [
      { id: "s-1", name: "PCR & qPCR", icon: "Dna", level: "Expert", stars: 4, category: "Laboratory Skills" },
      { id: "s-2", name: "Cell Culture", icon: "FlaskConical", level: "Advanced", stars: 3, category: "Laboratory Skills" },
      { id: "s-3", name: "Western Blot", icon: "Activity", level: "Advanced", stars: 3, category: "Laboratory Skills" },
      { id: "s-4", name: "ELISA & Immunoassays", icon: "TestTube", level: "Advanced", stars: 3, category: "Laboratory Skills" },
      { id: "s-5", name: "Microscopy & Fluorescence", icon: "Microscope", level: "Expert", stars: 4, category: "Laboratory Skills" },
      { id: "s-6", name: "Flow Cytometry", icon: "Layers", level: "Intermediate", stars: 2, category: "Laboratory Skills" },
      { id: "s-7", name: "DNA Extraction", icon: "Dna", level: "Expert", stars: 4, category: "Laboratory Skills" },
      { id: "s-8", name: "RNA Extraction", icon: "FileCode", level: "Expert", stars: 4, category: "Laboratory Skills" },
    ],
  },
  {
    id: "cat-2",
    name: "Bioinformatics",
    order: 2,
    skills: [
      { id: "s-9", name: "Python for Biology", icon: "Code", level: "Expert", stars: 4, category: "Bioinformatics" },
      { id: "s-10", name: "R & Bioconductor", icon: "BarChart2", level: "Expert", stars: 4, category: "Bioinformatics" },
      { id: "s-11", name: "Linux & Bash Shell", icon: "Terminal", level: "Advanced", stars: 3, category: "Bioinformatics" },
      { id: "s-12", name: "BLAST & Sequence Search", icon: "Search", level: "Expert", stars: 4, category: "Bioinformatics" },
      { id: "s-13", name: "AlphaFold 3D Modelling", icon: "Box", level: "Advanced", stars: 3, category: "Bioinformatics" },
      { id: "s-14", name: "PyMOL Visualization", icon: "Eye", level: "Expert", stars: 4, category: "Bioinformatics" },
      { id: "s-15", name: "Galaxy Platform", icon: "Globe", level: "Advanced", stars: 3, category: "Bioinformatics" },
      { id: "s-16", name: "RNA-seq Pipeline", icon: "GitCommit", level: "Advanced", stars: 3, category: "Bioinformatics" },
      { id: "s-17", name: "Single-cell Analysis (Seurat)", icon: "Grid", level: "Intermediate", stars: 2, category: "Bioinformatics" },
      { id: "s-18", name: "Bioconductor", icon: "Database", level: "Advanced", stars: 3, category: "Bioinformatics" },
      { id: "s-19", name: "GATK Variant Discovery", icon: "Cpu", level: "Intermediate", stars: 2, category: "Bioinformatics" },
      { id: "s-20", name: "Nextflow", icon: "Workflow", level: "Intermediate", stars: 2, category: "Bioinformatics" },
      { id: "s-21", name: "Snakemake", icon: "GitBranch", level: "Intermediate", stars: 2, category: "Bioinformatics" },
    ],
  },
  {
    id: "cat-3",
    name: "Programming & Tools",
    order: 3,
    skills: [
      { id: "s-22", name: "Python", icon: "Code", level: "Expert", stars: 4, category: "Programming" },
      { id: "s-23", name: "TypeScript", icon: "FileCode", level: "Advanced", stars: 3, category: "Programming" },
      { id: "s-24", name: "React", icon: "Atom", level: "Advanced", stars: 3, category: "Programming" },
      { id: "s-25", name: "Next.js", icon: "Layout", level: "Advanced", stars: 3, category: "Programming" },
      { id: "s-26", name: "Node.js", icon: "Server", level: "Intermediate", stars: 2, category: "Programming" },
      { id: "s-27", name: "SQL & Relational DBs", icon: "Database", level: "Advanced", stars: 3, category: "Programming" },
      { id: "s-28", name: "Git & Version Control", icon: "GitBranch", level: "Expert", stars: 4, category: "Programming" },
      { id: "s-29", name: "Docker Containerization", icon: "Box", level: "Intermediate", stars: 2, category: "Programming" },
    ],
  },
  {
    id: "cat-4",
    name: "AI & Machine Learning",
    order: 4,
    skills: [
      { id: "s-30", name: "Scikit-learn", icon: "Cpu", level: "Advanced", stars: 3, category: "AI & Machine Learning" },
      { id: "s-31", name: "TensorFlow", icon: "Brain", level: "Intermediate", stars: 2, category: "AI & Machine Learning" },
      { id: "s-32", name: "PyTorch", icon: "Flame", level: "Intermediate", stars: 2, category: "AI & Machine Learning" },
      { id: "s-33", name: "Data Visualization (ggplot2/Seaborn)", icon: "PieChart", level: "Expert", stars: 4, category: "AI & Machine Learning" },
      { id: "s-34", name: "LLMs & Bio-AI Models", icon: "Sparkles", level: "Advanced", stars: 3, category: "AI & Machine Learning" },
    ],
  },
];

export const initialResearchExperience: ResearchExperience[] = [
  {
    id: "exp-1",
    title: "Graduate Researcher — Laboratory Rotation",
    institution: "IISER Pune — Department of Biological Sciences",
    duration: "Aug 2024 – Present",
    supervisor: "Dr. Faculty Research Advisor, IISER Pune",
    objective: "To model high-throughput cellular response under environmental stress conditions and integrate RNA-seq transcriptomic datasets.",
    methodology: "Utilized differential gene expression pipelines (DESeq2), protein-protein interaction networks (STRING), and confocal immunofluorescence imaging to trace signaling cascades.",
    techniquesUsed: [
      "RNA-seq Analysis",
      "Confocal Microscopy",
      "DESeq2 & R",
      "Cell Culture Maintenance",
      "Western Blotting",
      "Quantitative PCR",
    ],
    results: "Identified 14 candidate genes downregulated during acute cellular stress, revealing novel regulatory nodes in homeostatic preservation.",
    researchImpact: "Contributes to understanding early biomarker signatures in stress-induced cellular degeneration.",
    publications: [
      { title: "Transcriptomic Profiling of Cellular Stress (In Prep)", link: "#publications" }
    ],
    githubUrl: "https://github.com",
    posterUrl: "#",
    presentationUrl: "#",
    order: 1,
  },
  {
    id: "exp-2",
    title: "Undergraduate Honors Researcher",
    institution: "Bhaskaracharya College of Applied Sciences, University of Delhi",
    duration: "Aug 2023 – May 2024",
    supervisor: "Prof. Senior Faculty, Department of Biomedical Science",
    objective: "Quantify oxidative stress biomarkers and metabolic rate changes in biological assay samples.",
    methodology: "Performed microplate spectrophotometric assays, enzyme inhibition kinetics, DNA extraction, and agarose gel electrophoresis.",
    techniquesUsed: [
      "Spectrophotometry",
      "Enzyme Kinetics",
      "Agarose Gel Electrophoresis",
      "Assay Optimization",
      "Statistical Analysis (Prism/R)",
    ],
    results: "Established linear assay calibration range for enzymatic antioxidant activity with high reproducibility (R² > 0.98).",
    researchImpact: "Provided standard operating protocols for undergraduate biochemistry laboratory modules.",
    githubUrl: "https://github.com",
    posterUrl: "#",
    order: 2,
  },
];

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "One Health Zoonotic Pathogen Surveillance Framework",
    subtitle: "Interdisciplinary Regional Outbreak Detection & Epidemiological Modeling",
    description: "Designed a comprehensive multi-layered data integration model connecting wildlife reservoir data, environmental vectors, and local hospital admission trends.",
    coverImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
    researchProblem: "Fragmented surveillance between human medical records and veterinary zoonotic tracking leads to delayed response times during pathogen spillovers.",
    motivation: "The COVID-19 pandemic and emerging zoonoses underscore the vital need for a unified 'One Health' early-warning framework.",
    objectives: [
      "Aggregate heterogenous data streams (climatic, host density, genomic sequences).",
      "Build dynamic geospatial risk mapping for regional health authorities.",
      "Formulate rapid response protocols for regional health centers.",
    ],
    methodology: "Created automated Python data ingestion scripts, applied epidemiological compartmental models (SEIR), and built interactive visualization dashboards.",
    workflow: [
      "Data Aggregation & Cleaning",
      "Geospatial Clustering & SEIR Modeling",
      "Risk Score Calculation",
      "Dashboard Generation & Alert Notification",
    ],
    technologies: ["Python", "Pandas", "Geopandas", "R", "SEIR Modeling", "Streamlit", "Git"],
    datasets: ["NCBI Virus Database", "Global Land Cover", "Regional Livestock Records"],
    results: "Achieved regional 1st Rank and National Grand Finalist spot in the National One Health Hackathon.",
    challenges: "Handling sparse surveillance data in rural corridors and standardizing non-uniform diagnostic formats.",
    futureScope: "Integrating real-time nanopore sequencing inputs and satellite micro-climate monitoring feeds.",
    tags: ["One Health", "Epidemiology", "Zoonotics", "Python", "Geospatial"],
    links: { repo: "https://github.com", paper: "#publications", demo: "#", presentation: "#" },
    order: 1,
  },
  {
    id: "proj-2",
    title: "Biomarker Expression & Stress Response Profiling",
    subtitle: "Cellular Enzymatic Kinetics & Differential Marker Identification",
    description: "Investigated specific biochemical markers in cellular stress models to understand metabolic adaptation and homeostasis.",
    coverImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop",
    researchProblem: "Understanding early biochemical events prior to morphological cell damage remains challenging in stress models.",
    motivation: "Identifying early biomarker shifts is crucial for early clinical intervention in degenerative diseases.",
    objectives: [
      "Measure ROS generation rates across time points.",
      "Profile antioxidant enzyme expression kinetics.",
      "Correlate enzymatic inhibition with cell viability scores.",
    ],
    methodology: "Utilized spectrophotometric microplate assays, fluorescence staining, and quantitative Western Blot densitometry.",
    workflow: [
      "Cellular Stress Induction",
      "Sample Lysate Extraction",
      "Spectrophotometric Assay",
      "Densitometry & Statistical Plotting",
    ],
    technologies: ["Spectrophotometry", "GraphPad Prism", "R", "ImageJ", "Western Blot"],
    datasets: ["In-house Experimental Microplate Assays"],
    results: "Demonstrated a statistically significant upregulation of SOD1 within 4 hours of oxidative stress induction (p < 0.01).",
    challenges: "Maintaining consistent enzymatic stability across multi-hour assay workflows.",
    futureScope: "Conducting transcriptomic sequencing to confirm upstream transcriptional activation.",
    tags: ["Biomedical Science", "Enzymology", "Biomarkers", "R", "Microscopy"],
    links: { repo: "https://github.com", demo: "#" },
    order: 2,
  },
];

export const initialPublications: Publication[] = [
  {
    id: "pub-1",
    title: "Interdisciplinary Surveillance Frameworks for Zoonotic Pathogen Spillover: A One Health Perspective",
    authors: ["Bisman Kaur", "Collaborating Researcher", "Senior Author"],
    venue: "Journal of One Health & Pathogen Genomics (Under Review)",
    year: "2025",
    type: "Submitted Manuscript",
    status: "Under Review",
    doi: "10.1016/j.onehealth.2025.10099",
    pdfUrl: "#",
    bibtex: `@article{kaur2025onehealth,
  title={Interdisciplinary Surveillance Frameworks for Zoonotic Pathogen Spillover: A One Health Perspective},
  author={Kaur, Bisman and Collaborators},
  journal={Journal of One Health & Pathogen Genomics},
  year={2025}
}`,
    abstract: "Emerging zoonotic pathogens present severe threats to global health systems. In this work, we present a unified computational data pipeline integrating epidemiological monitoring, host ecological distribution, and predictive geospatial modeling to accelerate regional outbreak detection.",
    highlights: ["Selected for presentation at National One Health Forum", "Integrates multi-system health metrics"],
    order: 1,
  },
  {
    id: "pub-2",
    title: "Transcriptomic Profiling of Cellular Homeostatic Response Under Metabolic Stress",
    authors: ["Bisman Kaur", "Research Advisor"],
    venue: "Preprints in BioRxiv / Molecular Cell Biology",
    year: "2024",
    type: "Preprint",
    status: "In Prep",
    pdfUrl: "#",
    bibtex: `@article{kaur2024transcriptomic,
  title={Transcriptomic Profiling of Cellular Homeostatic Response Under Metabolic Stress},
  author={Kaur, Bisman and Advisor},
  journal={bioRxiv},
  year={2024}
}`,
    abstract: "Systematic investigation into the transcriptional rewiring of cellular pathways exposed to acute metabolic deprivation, highlighting novel downstream effectors governing survival.",
    highlights: ["Detailed differential expression analysis", "Identifies key downstream target nodes"],
    order: 2,
  },
];

export const initialCertifications: Certification[] = [
  {
    id: "cert-1",
    title: "IIT JAM (Joint Admission Test for M.Sc. / Integrated PhD)",
    issuer: "Indian Institutes of Technology (IIT / NTA)",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=200&auto=format&fit=crop",
    date: "March 2024",
    credentialId: "JAM2024-AIR-38",
    verifyLink: "https://jam.iitm.ac.in",
    skillsGained: ["Biological Sciences", "Biochemistry", "Molecular Biology", "Biophysics"],
    order: 1,
  },
  {
    id: "cert-2",
    title: "JGEEBILS (Joint Graduate Entrance Examination for Biology and Interdisciplinary Life Sciences)",
    issuer: "Tata Institute of Fundamental Research (TIFR) / NCBS",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=200&auto=format&fit=crop",
    date: "Feb 2024",
    credentialId: "JGEEBILS-2024-QUAL",
    verifyLink: "https://www.ncbs.res.in/jgeebils",
    skillsGained: ["Interdisciplinary Life Sciences", "Scientific Reasoning", "Quantitative Biology"],
    order: 2,
  },
  {
    id: "cert-3",
    title: "Genomic Data Science & Bioinformatic Pipelines",
    issuer: "Coursera / Johns Hopkins University",
    logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=200&auto=format&fit=crop",
    date: "2023",
    credentialId: "COURSERA-GDS-9921",
    verifyLink: "https://coursera.org",
    skillsGained: ["Python", "R", "Bioconductor", "Galaxy", "Command Line Linux"],
    order: 3,
  },
];

export const initialAchievements: Achievement[] = [
  {
    id: "ach-1",
    title: "All India Rank 38 (AIR 38)",
    result: "AIR 38 Winner",
    metricNumber: "AIR 38",
    metricSubtext: "among 18,000+ candidates nationwide",
    level: "National",
    institution: "IIT JAM Examination (Biological Sciences)",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=200&auto=format&fit=crop",
    description: "Secured top All India Rank 38 in the competitive national IIT JAM exam, gaining admission to premier research institutes like IISER Pune.",
    date: "2024",
    order: 1,
  },
  {
    id: "ach-2",
    title: "1st Rank — Regional Level",
    result: "1st Rank Regional",
    metricNumber: "1st Rank",
    metricSubtext: "Regional Winner & Awardee",
    level: "Regional",
    institution: "National One Health Hackathon",
    logo: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    description: "Awarded 1st place in the regional competition for proposing an innovative multi-system zoonotic pathogen outbreak early-warning platform.",
    date: "2024",
    order: 2,
  },
  {
    id: "ach-3",
    title: "National Grand Finalist",
    result: "Grand Finalist",
    metricNumber: "Top 1%",
    metricSubtext: "National Grand Finals Participant",
    level: "National",
    institution: "National One Health Hackathon Grand Finals",
    logo: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=800&auto=format&fit=crop",
    description: "Selected among the top national teams across India to present research solutions to expert juries and national health authorities.",
    date: "2024",
    order: 3,
  },
  {
    id: "ach-4",
    title: "JGEEBILS Qualified",
    result: "Qualified",
    metricNumber: "Qualified",
    metricSubtext: "National Selection Score",
    level: "National",
    institution: "TIFR / NCBS JGEEBILS",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=200&auto=format&fit=crop",
    description: "Qualified the prestigious Joint Graduate Entrance Examination for Biology and Interdisciplinary Life Sciences.",
    date: "2024",
    order: 4,
  },
];

export const initialGallery: GalleryImage[] = [
  {
    id: "gal-1",
    url: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=1000&auto=format&fit=crop",
    caption: "IISER Pune Molecular Biology & Cell Culture Research Facility",
    category: "Lab Photography",
    date: "2024",
    order: 1,
  },
  {
    id: "gal-2",
    url: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1000&auto=format&fit=crop",
    caption: "National One Health Zoonotic Pathathon Finalist Defense",
    category: "Hackathons",
    date: "2024",
    order: 2,
  },
  {
    id: "gal-3",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
    caption: "National Research Symposium & Interdisciplinary Poster Presentation",
    category: "Poster Presentations",
    date: "2024",
    order: 3,
  },
  {
    id: "gal-4",
    url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop",
    caption: "Fluorescence Confocal Microscopy & Quantitative Assay Staining",
    category: "Experimental Work",
    date: "2024",
    order: 4,
  },
  {
    id: "gal-5",
    url: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop",
    caption: "IISER Pune Academic Complex & Botanical Research Grounds",
    category: "Campus",
    date: "2024",
    order: 5,
  },
  {
    id: "gal-6",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
    caption: "Computational Genomics Lab Sync & Data Pipeline Discussion",
    category: "Team Photos",
    date: "2024",
    order: 6,
  },
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Navigating the Confluence of Wet-Lab Precision and Single-Cell Genomics",
    slug: "navigating-wet-lab-and-single-cell-genomics",
    excerpt: "Why modern researchers must combine bench chemistry with high-throughput bioinformatic analytical tools to dissect cell fate dynamics.",
    contentMarkdown: `
# Navigating the Confluence of Wet-Lab Precision and Single-Cell Genomics

Biological systems are fundamentally heterogeneous. In traditional bulk RNA-sequencing, we average signal across thousands of cells, masking transient cellular states, subpopulation dynamics, and rare cell signatures.

## The Paradigm Shift

Single-cell RNA sequencing (scRNA-seq) has transformed our ability to query tissue microenvironments at single-cell resolution. However, high-throughput data brings unique challenges:
- High dimensionality & sparsity (zero inflation)
- Batch effects across experimental replicates
- Trajectory inference accuracy

\`\`\`python
import scanpy as sc
import anndata as ad

# Basic single-cell preprocessing pipeline
adata = sc.read_h5ad("sample_dataset.h5ad")
sc.pp.filter_cells(adata, min_genes=200)
sc.pp.filter_genes(adata, min_cells=3)
sc.pp.normalize_total(adata, target_sum=1e4)
sc.pp.log1p(adata)
sc.pp.highly_variable_genes(adata, n_top_genes=2000)
\`\`\`

## Bridging the Gap

A successful research workflow requires continuous feedback between computational hypotheses and experimental validation in cell culture models.
    `,
    category: "Computational Biology",
    tags: ["Genomics", "Single-Cell", "Python", "Bioinformatics"],
    readTime: "5 min read",
    publishedDate: "Aug 2024",
    coverImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
    author: "Bisman Kaur",
  },
  {
    id: "blog-2",
    title: "Building Resilient Zoonotic Surveillance Pipelines: Lessons from One Health",
    slug: "zoonotic-surveillance-one-health",
    excerpt: "Insights from designing early-warning pathogen tracking models that unify wildlife ecology and human clinical data.",
    contentMarkdown: `
# Building Resilient Zoonotic Surveillance Pipelines

Zoonotic disease emergence is governed by ecological disruption, climate variation, and viral evolution. 

## Key Architectural Principles:
1. **Heterogeneous Ingestion**: Integrating spatial remote sensing, hospital admission spikes, and viral sequencing databases.
2. **Predictive Compartmental Models**: Enhancing standard SEIR models with dynamic contact matrices.
3. **Open Access Standards**: Ensuring rapid data sharing with public health authorities.

> "Surveillance is not merely data collection — it is the rapid translation of ecological signals into clinical readiness."
    `,
    category: "Epidemiology",
    tags: ["One Health", "Zoonotics", "R", "Public Health"],
    readTime: "4 min read",
    publishedDate: "Jul 2024",
    coverImage: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=800&auto=format&fit=crop",
    author: "Bisman Kaur",
  },
];

export const initialTimeline: TimelineItem[] = [
  {
    id: "time-1",
    year: "MAY 2020",
    title: "Completed Senior Secondary (Class 12)",
    institution: "Jawahar Navodaya Vidyalaya, Kushinagar",
    category: "Education",
    description: "Completed Class 12 (Science Stream) from Jawahar Navodaya Vidyalaya, Kushinagar with a strong foundation in Biology, Physics, and Chemistry.",
    badgeText: "Science Stream",
    color: "blue",
  },
  {
    id: "time-2",
    year: "AUGUST 2023",
    title: "Joined B.Sc. (Hons) Biomedical Science",
    institution: "Bhaskaracharya College of Applied Sciences, University of Delhi",
    category: "Education",
    description: "Admitted to Bhaskaracharya College of Applied Sciences, University of Delhi — Started my undergraduate journey in biomedical science while building an interest in healthcare technology, innovation and research.",
    badgeText: "Biomedical Science",
    color: "emerald",
  },
  {
    id: "time-3",
    year: "FEBRUARY 2024",
    title: "Qualified JGEEBILS & IIT JAM AIR 38",
    institution: "TIFR / NCBS / IIT JAM",
    category: "Awards",
    description: "Qualified Joint Graduate Entrance Examination for Biology and Interdisciplinary Life Sciences and secured All India Rank 38 in competitive national entrance.",
    badgeText: "AIR 38",
    color: "amber",
  },
  {
    id: "time-4",
    year: "MAY 2024",
    title: "1st Rank Regional & Grand Finalist — One Health Hackathon",
    institution: "National One Health Hackathon",
    category: "Hackathons",
    description: "Awarded top regional honor and represented team at National Grand Finals for zoonotic pathogen outbreak surveillance framework.",
    badgeText: "1st Rank",
    color: "purple",
  },
  {
    id: "time-5",
    year: "AUGUST 2024",
    title: "Joined Integrated PhD (IPhD) in Biological Sciences",
    institution: "IISER Pune",
    category: "Education",
    description: "Secured national merit admission for doctoral studies in biological sciences at IISER Pune.",
    badgeText: "IPhD Scholar",
    color: "teal",
  },
];

export const initialStatMetrics: StatMetric[] = [
  {
    id: "stat-1",
    value: 38,
    suffix: "",
    label: "All India Rank",
    description: "IIT JAM Biological Sciences nationwide exam",
    icon: "Trophy",
  },
  {
    id: "stat-2",
    value: 1,
    suffix: "st Rank",
    label: "Regional Hackathon",
    description: "National One Health Zoonotics Initiative",
    icon: "Award",
  },
  {
    id: "stat-3",
    value: 5,
    suffix: "+",
    label: "Research Projects",
    description: "Wet-lab assays & computational bioinformatics workflows",
    icon: "Microscope",
  },
  {
    id: "stat-4",
    value: 20,
    suffix: "+",
    label: "Techniques Mastered",
    description: "Molecular biology, microscopy, R, Python, RNA-seq",
    icon: "Cpu",
  },
  {
    id: "stat-5",
    value: 2,
    suffix: "",
    label: "Publications & Preprints",
    description: "Manuscripts in preparation & under review",
    icon: "FileText",
  },
  {
    id: "stat-6",
    value: 100,
    suffix: "%",
    label: "Open Science Commitment",
    description: "Reproducible code, datasets & documentation",
    icon: "Share2",
  },
];

export const initialMessages: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Dr. Ananya Sharma",
    email: "ananya.sharma@example.edu",
    subject: "Collaborative Research Inquiry",
    message: "Dear Bisman, I saw your One Health Hackathon framework and would love to discuss potential synergy in pathogen tracking methodologies.",
    submittedAt: "2026-08-01 10:30 AM",
    read: false,
  },
];
