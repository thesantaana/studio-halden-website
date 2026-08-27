"use client";

import { BlurReveal } from "@/components/effects/blur-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/providers/language-provider";

type ApproachItem = {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  keywords: string[];
};

function ApproachGraphic({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="absolute right-5 top-16 h-28 w-32 opacity-70 transition-transform duration-700 ease-out group-hover:translate-x-1 group-hover:translate-y-1 sm:right-8" aria-hidden="true">
        <span className="absolute left-0 top-3 h-px w-24 bg-white/[0.05]" />
        <span className="absolute left-6 top-10 h-px w-20 bg-white/[0.04]" />
        <span className="absolute left-2 top-[4.5rem] h-px w-28 bg-white/[0.06]" />
        <span className="absolute left-10 top-0 h-24 w-px bg-white/[0.04]" />
        <span className="absolute right-3 top-7 h-20 w-px bg-white/[0.05]" />
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="absolute right-7 top-16 h-28 w-32 opacity-70 transition-transform duration-700 ease-out group-hover:-translate-x-1 group-hover:translate-y-1" aria-hidden="true">
        <span className="absolute right-2 top-1/2 h-px w-28 origin-right rotate-[-22deg] bg-white/[0.05]" />
        <span className="absolute right-2 top-1/2 h-px w-28 origin-right bg-white/[0.06]" />
        <span className="absolute right-2 top-1/2 h-px w-28 origin-right rotate-[22deg] bg-white/[0.05]" />
        <span className="absolute right-0 top-[calc(50%-2px)] h-1.5 w-1.5 rounded-full border border-white/[0.08]" />
      </div>
    );
  }

  if (index === 2) {
    return (
      <div
        className="absolute right-5 top-14 h-32 w-32 opacity-70 transition-transform duration-700 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 sm:right-8"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        aria-hidden="true"
      />
    );
  }

  if (index === 3) {
    return (
      <div className="absolute right-6 top-16 h-28 w-32 opacity-70 transition-transform duration-700 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1" aria-hidden="true">
        <span className="absolute left-0 top-0 h-14 w-20 border border-white/[0.05]" />
        <span className="absolute right-0 top-7 h-16 w-16 border border-white/[0.06]" />
        <span className="absolute bottom-0 left-8 h-10 w-24 border border-white/[0.04]" />
      </div>
    );
  }

  return (
    <div className="absolute right-6 top-16 h-28 w-32 border border-white/[0.04] p-4 opacity-70 transition-transform duration-700 ease-out group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true">
      <span className="block h-px w-full bg-white/[0.06]" />
      <span className="mt-5 block h-px w-4/5 bg-white/[0.05]" />
      <span className="mt-5 block h-px w-full bg-white/[0.06]" />
      <span className="mt-5 block h-px w-3/5 bg-white/[0.04]" />
    </div>
  );
}

export default function Approach() {
  const { content, dict } = useLanguage();

  return (
    <section className="container-void border-t border-border/60 bg-background text-foreground">
      <div className="container mx-auto px-container">
        <div className="mb-14 max-w-3xl sm:mb-20">
          <BlurReveal><SectionHeading>{dict.title.approach}</SectionHeading></BlurReveal>
          <BlurReveal><p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{dict.approachDescription}</p></BlurReveal>
        </div>

        <div className="grid gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 md:grid-cols-2 xl:grid-cols-5">
          {(content.approach as ApproachItem[]).map((item, index) => (
            <BlurReveal key={item.id} className="h-full" delay={index * 0.04}>
              <article className="group relative isolate flex h-full min-h-[360px] flex-col overflow-hidden bg-background p-6 transition-colors duration-500 hover:bg-[#1a1a17] md:min-h-[390px] xl:min-h-[430px] sm:p-8">
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[#B28A67] transition-transform duration-500 ease-out group-hover:scale-x-100" aria-hidden="true" />
                <ApproachGraphic index={index} />

                <span className="relative z-10 font-mono text-xs text-[#B28A67]/75 transition-colors duration-500 group-hover:text-[#c99c76]">{item.id}</span>

                <div className="relative z-10 mt-28">
                  <h3 className="text-3xl font-semibold tracking-[-0.03em] text-foreground">{item.title}</h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/45">{item.titleEn}</p>
                  <p className="mt-6 text-sm leading-7 text-muted-foreground">{item.description}</p>
                </div>

                <ul className="relative z-10 mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-10 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45 transition-colors duration-500 group-hover:text-foreground/90" aria-label={item.titleEn}>
                  {item.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}
                </ul>
              </article>
            </BlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
