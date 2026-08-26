"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/providers/language-provider";
import { ContactModal } from "@/components/modals/contact-modal";
import { withBasePath } from "@/lib/base-path";

const TRACK_1 = [
  "/assets/metis/hero/hero-01_workspace.webp",
  "/assets/metis/hero/hero-04_typography-poster.webp",
  "/assets/metis/extra/extra-02_material-library.webp",
  "/assets/metis/hero/hero-06_print-workbench.webp",
] as const;

const TRACK_2 = [
  "/assets/metis/hero/hero-03_web-interface.webp",
  "/assets/metis/hero/hero-05_editorial.webp",
  "/assets/metis/extra/extra-01_inspiration-wall.webp",
  "/assets/metis/hero/hero-02_packaging.webp",
] as const;

const COL_1_IMAGES = [...TRACK_1, ...TRACK_1];
const COL_2_IMAGES = [...TRACK_2, ...TRACK_2];

export default function Hero() {
  const { dict } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 760], [1, 0]);
  const scale = useTransform(scrollY, [0, 760], [1, 0.97]);
  const y = useTransform(scrollY, [0, 760], [0, -90]);
  const blurValue = useTransform(scrollY, [0, 760], [0, 5]);
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  const scrollToProjects = useCallback(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth" });
  }, [shouldReduceMotion]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="sticky top-0 flex min-h-[100dvh] w-full flex-col overflow-hidden bg-background px-container pb-10 pt-28 md:px-16 md:pb-14 md:pt-24"
    >
      <motion.div
        style={{ opacity }}
        aria-hidden="true"
        className="absolute bottom-0 right-3 top-20 z-0 flex w-[48vw] gap-2 overflow-hidden opacity-65 sm:right-8 sm:w-[42vw] sm:gap-3 lg:right-20 lg:w-[38vw] xl:right-28 xl:w-[34vw]"
      >
        <Rail images={COL_1_IMAGES} direction="up" reduced={Boolean(shouldReduceMotion)} />
        <Rail images={COL_2_IMAGES} direction="down" reduced={Boolean(shouldReduceMotion)} />
      </motion.div>

      <motion.div
        style={{ opacity, scale, y, filter }}
        className="relative z-10 mt-auto flex max-w-3xl flex-col items-start will-change-[opacity,transform,filter]"
      >
        <h1 className="text-[clamp(5rem,14vw,9rem)] font-black uppercase leading-[0.78] tracking-[-0.04em] text-foreground">MĒTIS</h1>
        <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B28A67] sm:text-xs">{dict.heroSubtitle}</p>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground sm:text-xl">{dict.heroDescription}</p>
        <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
          <button type="button" onClick={scrollToProjects} className="group inline-flex h-12 items-center gap-3 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B28A67] active:translate-y-0">
            {dict.viewWork}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button type="button" onClick={() => setContactOpen(true)} className="inline-flex h-12 items-center rounded-full border border-foreground/25 bg-background/65 px-6 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-[#B28A67] hover:text-[#D6B28F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B28A67]">
            {dict.startProject}
          </button>
        </div>
      </motion.div>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </section>
  );
}

function Rail({ images, direction, reduced }: { images: readonly string[]; direction: "up" | "down"; reduced: boolean }) {
  const from = direction === "up" ? "0%" : "-50%";
  const to = direction === "up" ? "-50%" : "0%";

  return (
    <div className="h-full flex-1 overflow-hidden">
      <motion.div animate={reduced ? { y: from } : { y: [from, to] }} transition={{ duration: 38, ease: "linear", repeat: Infinity }} className="flex flex-col gap-2 sm:gap-3">
        {images.map((src, index) => (
          <div key={`${src}-${index}`} className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-muted sm:rounded-3xl">
            <Image src={withBasePath(src)} alt="" fill priority={index < 2} sizes="(max-width: 640px) 46vw, 20vw" className="object-cover brightness-[0.82] contrast-[1.04]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
