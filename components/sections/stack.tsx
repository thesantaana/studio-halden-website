"use client";

import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import type { StackItem } from "@/types/stack";

export default function Stack() {
    const { content, dict } = useLanguage();

    const categories = [
        {
            title: dict.frontendStack,
            items: content.stack?.frontend || [],
        },
        {
            title: dict.backendStack,
            items: content.stack?.backend || [],
        },
        {
            title: dict.databaseStack,
            items: content.stack?.database || [],
        },
        {
            title: dict.toolsStack,
            items: content.stack?.tools || [],
        },
    ];

    return (
        <section className="w-full bg-background text-foreground overflow-hidden relative py-16 md:py-24 lg:py-32 xl:py-40 2xl:py-36">

            <div className="h-full flex flex-col px-container container mx-auto">
                <div className="flex flex-col gap-4 mb-16">
                    <BlurReveal>
                        <h2 className="title">{dict.title.stack}</h2>
                    </BlurReveal>
                </div>

                <div className="flex flex-col gap-container mb-6">
                    {categories.map((category, catIndex) => (
                        <BlurReveal key={category.title}>
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-[10px] font-mono tracking-widest text-muted-foreground/40">
                                        0{catIndex + 1}
                                    </span>
                                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground">
                                        {category.title}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-6 flex-wrap mb-6">
                                    {category.items.map((item: StackItem, itemIndex: number) => (
                                        <div
                                            key={item.name}
                                            className="group flex items-center gap-3 py-2.5 pr-5 shrink-0 cursor-default"
                                        >
                                            <span className="text-[10px] font-mono tracking-widest text-muted-foreground/35 transition-colors duration-500 group-hover:text-foreground/60">
                                                {String(itemIndex + 1).padStart(2, "0")}
                                            </span>
                                            <span className="text-sm tracking-wide text-muted-foreground transition-colors duration-500 ease-out group-hover:text-foreground">
                                                {item.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </BlurReveal>
                    ))}
                </div>

            </div>
        </section>
    );
}
