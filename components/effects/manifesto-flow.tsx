"use client";

import { useLanguage } from "@/providers/language-provider";

export default function ManifestoFlow() {
  const { content } = useLanguage();
  const line = content.manifesto.join(" — ");

  return (
    <section aria-label={line} className="overflow-hidden border-y border-[#B28A67]/30 bg-background py-8 sm:py-10">
      <div className="manifesto-marquee flex w-max items-center whitespace-nowrap text-3xl font-semibold uppercase tracking-[-0.02em] text-foreground sm:text-5xl lg:text-7xl">
        <span className="pr-12 sm:pr-20">{line}</span>
        <span aria-hidden="true" className="pr-12 sm:pr-20">{line}</span>
      </div>
    </section>
  );
}
