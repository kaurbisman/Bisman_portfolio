"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  prefix = "",
  suffix = "",
  label,
}) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500; // 1.5 seconds
      const steps = 30;
      const stepTime = duration / steps;
      const increment = value / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-2">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="font-mono"
      >
        {prefix}
        {count}
        {suffix}
      </motion.div>
      {label && (
        <span className="text-xs font-semibold text-textSecondary uppercase tracking-wider block mt-1">
          {label}
        </span>
      )}
    </div>
  );
};
