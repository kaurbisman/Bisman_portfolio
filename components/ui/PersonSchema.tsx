import React from "react";

export const PersonSchema: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bisman Kaur",
    jobTitle: "Integrated PhD Scholar in Biological Sciences",
    worksFor: {
      "@type": "EducationalOrganization",
      name: "Indian Institute of Science Education and Research (IISER), Pune",
    },
    almaMater: [
      {
        "@type": "EducationalOrganization",
        name: "Indian Institute of Science Education and Research (IISER), Pune",
      },
      {
        "@type": "EducationalOrganization",
        name: "Bhaskaracharya College of Applied Sciences, University of Delhi",
      },
    ],
    knowsAbout: [
      "Computational Biology",
      "Systems Biology",
      "Genomics",
      "Bioinformatics",
      "Drug Discovery",
      "Cancer Biology",
      "Precision Medicine",
      "AI in Healthcare",
      "One Health Zoonotics",
      "RNA-seq Analysis",
    ],
    award: [
      "IIT JAM All India Rank 38",
      "JGEEBILS Qualified",
      "National One Health Hackathon 1st Rank Regional Level",
      "National One Health Hackathon Grand Finalist",
    ],
    sameAs: [
      "https://scholar.google.com",
      "https://orcid.org/0009-0000-0000-0000",
      "https://github.com",
      "https://linkedin.com/in/bisman-kaur",
    ],
    url: "https://bismankaur.com",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
