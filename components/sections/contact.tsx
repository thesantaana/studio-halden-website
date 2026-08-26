"use client";

import { ArrowUpRight } from "lucide-react";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";

export default function Contact() {
  const { content, dict } = useLanguage();

  return (
    <section className="border-t border-border/60 bg-background px-container pb-10 pt-24 text-foreground sm:pt-32 lg:pt-40">
      <div className="container mx-auto">
        <div className="max-w-5xl">
          <BlurReveal><h2 className="text-[clamp(3.5rem,9vw,8rem)] font-black leading-[0.9] tracking-[-0.04em]">{dict.title.contact}</h2></BlurReveal>
          <BlurReveal><p className="mt-7 max-w-xl text-xl leading-relaxed text-muted-foreground">{dict.contactIntroText}</p></BlurReveal>
          <BlurReveal>
            <a href={`mailto:${content.contact.email}`} className="group mt-10 inline-flex h-14 items-center gap-4 rounded-full bg-foreground px-7 text-sm font-semibold text-background transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B28A67]">
              {dict.sendEmail}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </BlurReveal>
        </div>
        <footer className="mt-24 flex flex-col gap-5 border-t border-border/60 py-8 text-sm text-muted-foreground sm:mt-36 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 MĒTIS. {dict.allRightsReserved}</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={`mailto:${content.contact.email}`} className="transition-colors hover:text-foreground">{content.contact.email}</a>
            <a href={`tel:${content.contact.phone}`} className="transition-colors hover:text-foreground">{content.contact.phone}</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
