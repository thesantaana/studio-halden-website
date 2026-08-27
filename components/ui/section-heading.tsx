"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
  variant?: "section" | "display";
};

export function SectionHeading({
  children,
  className,
  align = "left",
  variant = "section",
}: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();
  const isCentered = align === "center";

  return (
    <div className={cn("w-full", className)}>
      <h2
        className={cn(
          variant === "section"
            ? "title"
            : "text-[clamp(3.5rem,9vw,8rem)] font-black leading-[0.9] tracking-[-0.04em]",
          isCentered && "text-center",
        )}
      >
        {children}
      </h2>

      <div
        className={cn(
          "mt-5 flex w-full items-center md:mt-6",
          isCentered && "mx-auto max-w-xl",
        )}
        aria-hidden="true"
      >
        {isCentered && <span className="h-px flex-1 bg-border/55" />}
        <motion.span
          initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0.35 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "h-0.5 w-16 bg-[#B28A67] md:w-20",
            isCentered ? "origin-center" : "origin-left",
          )}
        />
        <span className="h-px flex-1 bg-border/55" />
      </div>
    </div>
  );
}
