"use client";

import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";

export default function Approach() {
  const { content, dict } = useLanguage();

  return (
    <section className="container-void border-t border-border/60 bg-background text-foreground">
      <div className="container mx-auto px-container">
        <div className="mb-14 max-w-2xl sm:mb-20">
          <BlurReveal><h2 className="title">{dict.title.approach}</h2></BlurReveal>
          <BlurReveal><p className="mt-5 text-lg leading-relaxed text-muted-foreground">{dict.approachDescription}</p></BlurReveal>
        </div>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 md:grid-cols-5">
          {content.approach.map((item: { id: string; title: string; description: string }) => (
            <BlurReveal key={item.id}>
              <article className="flex min-h-64 flex-col bg-background p-6 sm:p-8">
                <span className="font-mono text-xs text-[#B28A67]">{item.id}</span>
                <h3 className="mt-auto text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            </BlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
