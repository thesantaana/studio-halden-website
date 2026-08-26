"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, shouldReduceMotion ? 0 : 1120);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: shouldReduceMotion ? 0 : 0.24 } }}
          className="fixed inset-0 z-99999 flex items-center justify-center bg-background"
        >
          <div className="relative flex h-20 min-w-56 items-center justify-center overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -8] }}
              transition={{ duration: 0.7, times: [0, 0.2, 0.68, 1], ease: "easeOut" }}
              className="absolute font-serif text-4xl italic tracking-tight text-foreground"
            >
              μῆτις
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.32, ease: "easeOut" }}
              className="absolute text-4xl font-black tracking-[-0.04em] text-foreground"
            >
              MĒTIS
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
