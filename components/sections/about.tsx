"use client";

import Image from "next/image";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";
import { withBasePath } from "@/lib/base-path";

export default function About() {
  const { content, dict } = useLanguage();

  return (
    <section className="container-void relative overflow-hidden bg-background text-foreground">
      <div className="container mx-auto grid gap-12 px-container lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <BlurReveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted lg:aspect-[3/4]">
            <Image src={withBasePath("/assets/metis/extra/extra-01_inspiration-wall.webp")} alt={dict.studioImageAlt} fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" />
          </div>
        </BlurReveal>
        <div className="flex flex-col justify-between gap-16 lg:py-6">
          <BlurReveal>
            <h2 className="text-[clamp(4.5rem,11vw,9rem)] font-black uppercase leading-[0.78] tracking-[-0.04em]">MĒTIS</h2>
          </BlurReveal>
          <div className="max-w-2xl space-y-7">
            <BlurReveal><p className="text-2xl font-medium leading-snug text-foreground sm:text-3xl lg:text-4xl">{content.about.intro}</p></BlurReveal>
            <BlurReveal><p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{content.about.description}</p></BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
