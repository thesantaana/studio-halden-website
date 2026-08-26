"use client";

import { ArrowUpRight, Mail, Phone } from "lucide-react";
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
            <div className="mt-10 max-w-3xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B28A67]">{dict.contactDetailsLabel}</span>
                <span className="h-px flex-1 bg-border/60" />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={`mailto:${content.contact.email}`} className="group flex min-h-20 flex-1 items-center gap-4 rounded-2xl border border-border/60 bg-secondary/5 px-5 py-4 transition-colors duration-300 hover:border-[#B28A67]/55 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B28A67]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B28A67]/45 text-[#D6B28F]"><Mail className="h-4 w-4" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{dict.emailLabel}</span>
                    <span className="mt-1 block break-all text-sm font-medium text-foreground sm:text-base">{content.contact.email}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#D6B28F]" />
                </a>
                <a href={`tel:${content.contact.phone}`} className="group flex min-h-20 items-center gap-4 rounded-2xl border border-border/60 bg-secondary/5 px-5 py-4 transition-colors duration-300 hover:border-[#B28A67]/55 hover:bg-secondary/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B28A67] sm:min-w-64">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B28A67]/45 text-[#D6B28F]"><Phone className="h-4 w-4" /></span>
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{dict.phoneLabel}</span>
                    <span className="mt-1 block text-sm font-medium text-foreground sm:text-base">{content.contact.phone}</span>
                  </span>
                </a>
              </div>
            </div>
          </BlurReveal>
        </div>
        <footer className="mt-24 border-t border-border/60 py-8 text-sm text-muted-foreground sm:mt-36">
          <span>© 2026 MĒTIS. {dict.allRightsReserved}</span>
        </footer>
      </div>
    </section>
  );
}
