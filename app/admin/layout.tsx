"use client";

import React, { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Check if document currently has dark class
    const hadDarkClass = document.documentElement.classList.contains("dark");

    // Force Dark Theme for Admin CMS
    document.documentElement.classList.add("dark");

    return () => {
      // Restore user theme preference when navigating away from Admin CMS
      const stored = localStorage.getItem("theme");
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      if (stored === "light" || (!stored && !mediaQuery.matches)) {
        if (!hadDarkClass) {
          document.documentElement.classList.remove("dark");
        }
      }
    };
  }, []);

  return (
    <div className="dark bg-[#0B0F19] text-gray-100 min-h-screen antialiased relative">
      <div className="fixed inset-0 pointer-events-none dotted-mesh-bg opacity-100 z-0" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
