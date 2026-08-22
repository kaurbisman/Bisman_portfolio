import type { Metadata } from "next";
import "@/styles/globals.css";
import { PersonSchema } from "@/components/ui/PersonSchema";

export const metadata: Metadata = {
  title: "Bisman Kaur — Researcher & IPhD Scholar, IISER Pune",
  description:
    "Official portfolio website of Bisman Kaur, Integrated PhD Scholar in Biological Sciences at IISER Pune, IIT JAM AIR 38, JGEEBILS Qualified, and National One Health Hackathon 1st Rank winner.",
  keywords: [
    "Bisman Kaur",
    "IISER Pune",
    "Biological Sciences",
    "Integrated PhD",
    "Biomedical Science",
    "IIT JAM Rank 38",
    "JGEEBILS",
    "One Health Hackathon",
    "Research Portfolio",
  ],
  authors: [{ name: "Bisman Kaur" }],
  openGraph: {
    title: "Bisman Kaur — Professional Research Portfolio",
    description:
      "Explore academic trajectory, research projects, credentials, and achievements of Bisman Kaur (IISER Pune).",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <PersonSchema />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem("theme");
                  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  if (stored === "dark" || (!stored && prefersDark)) {
                    document.documentElement.classList.add("dark");
                  } else {
                    document.documentElement.classList.remove("dark");
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-bgBase text-textPrimary antialiased selection:bg-accentPrimary/30">
        {children}
      </body>
    </html>
  );
}
