"use client";

import React, { useState, useEffect } from "react";

interface AnimatedTypingProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayDuration?: number;
}

export const AnimatedTyping: React.FC<AnimatedTypingProps> = ({
  phrases,
  typingSpeed = 70,
  deletingSpeed = 40,
  delayDuration = 2200,
}) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    const currentPhrase = phrases[phraseIndex];

    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && displayedText === currentPhrase) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delayDuration);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, delayDuration]);

  return (
    <span className="inline-flex items-center text-gray-900 dark:text-gray-100 font-semibold tracking-tight">
      <span>{displayedText}</span>
      <span className="ml-1 w-0.5 h-6 sm:h-7 bg-blue-600 dark:bg-blue-400 animate-pulse rounded-full inline-block" />
    </span>
  );
};
