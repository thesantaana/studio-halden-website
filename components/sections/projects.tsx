"use client";

import { motion, useTransform, useScroll, useSpring, useReducedMotion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/providers/language-provider";
import { useMediaQuery, BREAKPOINTS } from "@/hooks/use-media-query";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { ProjectModal } from "@/components/modals/project-modal";
import type { ProjectItem } from "@/types/project";
import { withBasePath } from "@/lib/base-path";

export default function Projects() {
    const { content, dict } = useLanguage();

    const isDesktop = useMediaQuery(BREAKPOINTS.xl);
    const shouldReduceMotion = useReducedMotion();
    const useHorizontal = isDesktop && !shouldReduceMotion;

    const targetRef = useRef<HTMLDivElement>(null);
    const horizontalContainerRef = useRef<HTMLDivElement>(null);

    const [measurements, setMeasurements] = useState({ scrollRange: 0, dynamicHeight: "auto" });
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!useHorizontal) {
            const frame = requestAnimationFrame(() => {
                setMeasurements({ scrollRange: 0, dynamicHeight: "auto" });
            });
            return () => cancelAnimationFrame(frame);
        }

        const updateMeasurements = () => {
            if (horizontalContainerRef.current) {
                const totalWidth = horizontalContainerRef.current.scrollWidth;
                const viewportW = window.innerWidth;
                const range = totalWidth - viewportW;
                const safeRange = range > 0 ? range : 0;

                setMeasurements({
                    scrollRange: safeRange,
                    dynamicHeight: `${safeRange + window.innerHeight}px`,
                });
            }
        };

        updateMeasurements();

        const timeout = setTimeout(updateMeasurements, 100);
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(updateMeasurements);
        });

        if (horizontalContainerRef.current) {
            resizeObserver.observe(horizontalContainerRef.current);
        }

        return () => {
            clearTimeout(timeout);
            resizeObserver.disconnect();
        };
    }, [useHorizontal, content.projects]);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, -measurements.scrollRange]);
    const smoothX = useSpring(x, { stiffness: 400, damping: 60, restDelta: 0.5 });

    const handleOpenProject = (project: ProjectItem) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <section
            ref={targetRef}
            data-slot="projects"
            className="relative py-16 md:py-24 lg:py-32 xl:py-0"
            style={{ height: measurements.dynamicHeight }}
        >
            <div
                className={`
                    w-full 
                    ${useHorizontal
                        ? "sticky top-0 min-h-[100dvh] flex items-center overflow-hidden"
                        : "relative flex flex-col"
                    }
                `}
            >

                {!useHorizontal ? (
                    <>
                        <div className="flex flex-col gap-4 px-container mb-10">
                            <BlurReveal>
                                <h2 className="title">
                                    {dict.title.projects}
                                </h2>
                            </BlurReveal>

                            <BlurReveal>
                                <p className="mt-4 text-muted-foreground text-lg">
                                    <ProjectIntro text={dict.projectsIntro} />
                                </p>
                            </BlurReveal>
                        </div>
                        <div className="flex flex-col w-full max-w-full px-container gap-container">
                            {content.projects.map((project: ProjectItem) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onClick={() => handleOpenProject(project)}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <motion.div
                        ref={horizontalContainerRef}
                        style={{ x: smoothX }}
                        className="flex px-container w-max items-center"
                    >
                        <div className="w-[60vw] xl:w-[40vw] shrink-0 flex flex-col justify-center pr-16">

                            <div className="flex flex-col gap-4">

                                <BlurReveal>
                                    <h2 className="title">
                                        {dict.title.projects}
                                    </h2>
                                </BlurReveal>

                                <BlurReveal>
                                    <p className="mt-4 text-5xl font-light leading-tight">
                                        <ProjectIntro text={dict.projectsIntro} />
                                    </p>
                                </BlurReveal>

                            </div>

                        </div>

                        {content.projects.map((project: ProjectItem) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={() => handleOpenProject(project)}
                            />
                        ))}

                        <div className="w-[12vw] shrink-0" aria-hidden="true" />
                    </motion.div>
                )}
            </div>

            <ProjectModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                project={selectedProject}
            />
        </section>
    );
}

function ProjectIntro({ text }: { text: string }) {
    const [before, ...after] = text.split("1000+");

    if (after.length === 0) {
        return text;
    }

    return (
        <>
            {before}
            <strong className="bg-linear-to-r from-[#8E6B4D] via-[#DEC194] to-[#A97D55] bg-clip-text font-extrabold text-transparent drop-shadow-[0_1px_0_rgba(255,230,190,0.12)]">
                1000+
            </strong>
            {after.join("1000+")}
        </>
    );
}

const ProjectCard = React.memo(function ProjectCard({ project, onClick }: { project: ProjectItem; onClick?: () => void }) {
    return (
        <BlurReveal>
            <button
                type="button"
                onClick={onClick}
                aria-label={`${project.title}: ${project.label}`}
                className="group relative block w-full xl:w-[45vw] aspect-4/3 shrink-0 xl:mx-6 perspective-1000 cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B28A67]"
            >
                <div className="relative w-full h-full overflow-hidden bg-muted border border-border/50 transition-all duration-700 ease-out group-hover:border-foreground/20">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={withBasePath(project.image)}
                            alt={project.title}
                            fill
                            sizes="(max-width: 1280px) 100vw, 45vw"
                            loading="lazy"
                            className="object-cover opacity-65 grayscale transition-all duration-1000 group-hover:scale-[1.025] group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100 group-focus-visible:grayscale-0 group-active:opacity-100 group-active:grayscale-0 motion-reduce:transition-none"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-black/25 transition-opacity duration-700 group-hover:opacity-65 group-focus-visible:opacity-65" />
                    </div>

                    <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 xl:p-12">
                        <div className="flex justify-between items-start">
                            <div className="overflow-hidden">
                                <span className="block text-xs xl:text-sm font-mono tracking-widest text-foreground/80 uppercase transition-colors duration-500 group-hover:text-foreground">
                                    {project.category}
                                </span>
                            </div>
                            <div className="overflow-hidden">
                                <span className="block text-xs xl:text-sm font-mono text-foreground/75 transition-colors duration-500 group-hover:text-foreground">
                                    {project.year}
                                </span>
                            </div>
                        </div>

                        <span className="absolute bottom-6 right-6 max-w-[44%] text-right text-[10px] font-medium leading-snug text-foreground/75 transition-colors duration-500 group-hover:text-foreground md:bottom-8 md:right-8 md:text-xs 2xl:bottom-12 2xl:right-12">
                            {project.label}
                        </span>

                        <h3 className="absolute bottom-6 md:bottom-8 2xl:bottom-12 left-6 md:left-8 2xl:left-12 text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tighter uppercase text-foreground opacity-100 transition-opacity duration-500 pointer-events-none">
                            {project.title}
                        </h3>
                    </div>

                </div>
            </button>
        </BlurReveal>
    );
});
