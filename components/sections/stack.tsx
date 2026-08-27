"use client";

import { BlurReveal } from "@/components/effects/blur-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/providers/language-provider";
import type { StackItem } from "@/types/stack";

export default function Stack() {
  const { content, dict } = useLanguage();
  const categories = [
    { title: dict.brandIdentity, items: content.stack.frontend },
    { title: dict.digitalDesign, items: content.stack.backend },
    { title: dict.graphicDesign, items: content.stack.database },
    { title: dict.artDirection, items: content.stack.tools },
  ];

  return (
    <section className="container-void bg-background text-foreground">
      <div className="container mx-auto px-container">
        <BlurReveal><SectionHeading className="mb-14 sm:mb-20">{dict.title.stack}</SectionHeading></BlurReveal>
        <div className="grid gap-x-14 lg:grid-cols-2">
          {categories.map((category) => (
            <BlurReveal key={category.title}>
              <div className="border-t border-border/70 py-8 sm:py-10">
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{category.title}</h3>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {(category.items as StackItem[]).map((item) => item.name).join(" / ")}
                </p>
              </div>
            </BlurReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
