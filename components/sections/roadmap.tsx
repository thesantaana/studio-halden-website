"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/providers/language-provider";
import type { RoadmapItem } from "@/types/roadmap";

export default function Roadmap() {
  const containerRef = useRef<HTMLElement>(null);
  const { content, dict } = useLanguage();
  const roadmapItems: RoadmapItem[] = content.roadmap || [];

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section id="history" ref={containerRef} className="container-void relative overflow-hidden border-t border-border/50 py-32 xl:py-48">
      <motion.div style={{ y: yBackground }} className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden opacity-[0.018]">
        <div className="whitespace-nowrap text-[20vw] font-black uppercase tracking-tighter">{dict.title.history}</div>
      </motion.div>

      <div className="container relative z-10 mx-auto max-w-6xl px-container">
        <div className="mb-24 flex flex-col gap-4 text-center md:mb-40 md:items-center">
          <BlurReveal className="w-full max-w-xl"><SectionHeading align="center">{dict.title.history}</SectionHeading></BlurReveal>
          <BlurReveal><p className="mt-3 max-w-xl text-lg font-medium italic tracking-tight text-foreground/60">{dict.historyDescription}</p></BlurReveal>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 left-6 top-0 w-px -translate-x-1/2 bg-border/40 md:left-1/2" />
          <motion.div style={{ scaleY, originY: 0 }} className="absolute bottom-0 left-6 top-0 z-10 w-[2px] -translate-x-1/2 bg-linear-to-b from-[#B28A67] via-[#B28A67] to-transparent md:left-1/2" />

          <div className="relative z-20 flex w-full flex-col gap-8 md:gap-24">
            {roadmapItems.map((item, index) => <TimelineNode key={item.id} item={item} isEven={index % 2 === 0} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineNode({ item, isEven }: { item: RoadmapItem; isEven: boolean }) {
  return (
    <div className={cn("relative flex w-full items-center justify-between", isEven ? "flex-row" : "flex-row-reverse")}>
      <div className="hidden w-[calc(50%-3rem)] md:block" />
      <div className="absolute left-6 z-20 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-[#B28A67]/45 bg-background transition-colors duration-500 md:left-1/2 md:h-10 md:w-10">
        <div className="h-2.5 w-2.5 rounded-full bg-[#B28A67] md:h-3 md:w-3" />
      </div>

      <div className="group relative w-full pl-16 md:w-[calc(50%-3rem)] md:pl-0">
        <BlurReveal>
          <article className={cn("relative overflow-hidden border border-border/50 bg-secondary/5 p-8 backdrop-blur-md transition-all duration-700 ease-out hover:border-[#B28A67]/45 hover:bg-secondary/20 md:p-10", isEven ? "md:text-right" : "md:text-left")}>
            <span className={cn("mb-4 hidden font-mono text-xs uppercase tracking-widest text-[#B28A67] sm:flex", isEven ? "md:justify-end" : "md:justify-start")}>{item.id}</span>
            <div className="relative z-10 flex flex-col gap-3">
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-[#B28A67]">{item.year}</p>
              <h3 className="text-3xl font-semibold tracking-[-0.035em] text-foreground transition-colors duration-500 group-hover:text-[#B28A67] md:text-4xl">{item.title}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base" style={{ marginLeft: isEven ? "auto" : "0" }}>{item.description}</p>
              <div className={cn("mt-6 flex flex-wrap gap-2", isEven ? "md:justify-end" : "justify-start")}>
                {item.stack.map((tag) => <span key={tag} className="rounded-full border border-border/40 bg-background/50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{tag}</span>)}
              </div>
            </div>
          </article>
        </BlurReveal>
      </div>
    </div>
  );
}
