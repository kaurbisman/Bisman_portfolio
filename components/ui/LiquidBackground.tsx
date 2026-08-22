"use client";

import React from "react";

export const LiquidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* SVG Hexagon Grid Backdrop */}
      <div className="absolute inset-0 hexagon-grid-bg opacity-100" />

      {/* Top Left Soft Glow */}
      <div 
        className="absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full filter blur-[100px] opacity-15 dark:opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00685f 0%, rgba(0,104,95,0) 70%)"
        }}
      />

      {/* Top Right Soft Glow */}
      <div 
        className="absolute top-1/4 -right-32 w-[32rem] h-[32rem] rounded-full filter blur-[100px] opacity-10 dark:opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #4059aa 0%, rgba(64,89,170,0) 70%)"
        }}
      />
    </div>
  );
};
