"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap, SplitText } from "@/lib/gsap";

type Project = {
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  images: string[];
  accent: string;
};

const projects: Project[] = [
  {
    title: "DevFlow",
    description: "A full-stack developer Q&A platform with real-time answers, reputation system, and AI-powered suggestions.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://example.com",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1400&q=80&auto=format&fit=crop",
    ],
    accent: "#a78bfa",
  },
  {
    title: "Shopify Clone",
    description: "A production-ready e-commerce storefront with cart, auth, Stripe payments, and an admin dashboard.",
    tags: ["React.js", "Node.js", "PostgreSQL", "Stripe"],
    github: "https://github.com",
    live: "https://example.com",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=80&auto=format&fit=crop",
    ],
    accent: "#34d399",
  },
  {
    title: "AI Vision Board",
    description: "Upload images and get instant AI-generated insights using Google Gemini Vision API and Cloudinary.",
    tags: ["Next.js", "Gemini API", "Cloudinary", "Supabase"],
    github: "https://github.com",
    live: "https://example.com",
    images: [
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1400&q=80&auto=format&fit=crop",
    ],
    accent: "#fb923c",
  },
  {
    title: "RealtimeChat",
    description: "End-to-end encrypted chat app with rooms, presence indicators, and file sharing built on WebSockets.",
    tags: ["React.js", "Express.js", "Socket.io", "JWT"],
    github: "https://github.com",
    live: "https://example.com",
    images: [
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1400&q=80&auto=format&fit=crop",
    ],
    accent: "#38bdf8",
  },
];

// How far each card peeks above the previous (sticky top offset)
const CARD_OFFSET = 80;
const SLIDE_INTERVAL = 3000;

function ImageSlider({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (next: number) => {
    setPrev(active);
    setActive(next);
  };

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      goTo((active + 1) % images.length);
    }, SLIDE_INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, images.length]);

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/7" }}>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={`${title} screenshot ${i + 1}`}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 2 : i === prev ? 1 : 0 }}
        />
      ))}

      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#0d100d] to-transparent" />

      {/* dot indicators */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-5 bg-[#fff7da]/80" : "w-1.5 bg-[#fff7da]/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className="project-card sticky w-full cursor-pointer relative overflow-hidden rounded-3xl border border-[#fff7da]/8 bg-[#0d100d] transition-colors duration-500 hover:border-[#fff7da]/14"
      style={{ top: `${CARD_OFFSET + index * 16}px` }}
      onClick={() => window.open(project.live, "_blank")}
    >
      {/* Media */}
      <ImageSlider images={project.images} title={project.title} />

      {/* Index number — top right, outside slider so it's always on top */}
      <div className="pointer-events-none absolute right-6 top-6 z-30">
        <span className="font-mono text-[0.78rem] tracking-[0.18em] text-[#fff7da]/30">
          {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-6 px-8 pb-10 pt-7 md:flex-row md:items-end md:justify-between md:gap-12 md:px-10 md:pb-12">
        {/* Left — title + description */}
        <div className="flex flex-col gap-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#fff7da]/10 px-3 py-0.5 font-mono text-[0.72rem] tracking-[0.08em] text-[#fff7da]/40"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-[clamp(1.6rem,2.8vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#fff7da]">
            {project.title}
          </h3>

          <p className="max-w-[560px] text-[clamp(0.95rem,1.3vw,1.2rem)] leading-[1.5] tracking-[-0.02em] text-[#fff7da]/50">
            {project.description}
          </p>
        </div>

        {/* Right — GitHub button */}
        <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 min-w-[150px] items-center justify-center gap-2 rounded-full border border-[#fff7da]/15 bg-[#fff7da]/5 px-7 text-base font-medium text-[#fff7da]/80 transition-all duration-300 hover:border-[#fff7da]/30 hover:bg-[#fff7da]/10 hover:text-[#fff7da]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let headingSplit: InstanceType<typeof SplitText> | null = null;

    const ctx = gsap.context(() => {
      // ── Header entrance ──────────────────────────────────────────
      headingSplit = new SplitText(headingRef.current, { type: "lines" });
      gsap.set(headingSplit.lines, { overflow: "hidden" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        })
        .from(labelRef.current, {
          y: 16,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        .from(
          headingSplit.lines,
          {
            yPercent: 110,
            opacity: 0,
            stagger: 0.08,
            duration: 1.0,
            ease: "expo.out",
          },
          "-=0.2"
        );

      // ── Stacking cards: each card scales down slightly as the next slides over ──
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // last card doesn't need to scale

        gsap.to(card, {
          scale: 0.96,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],   // starts when the NEXT card begins entering
            start: "top 85%",
            end: "top 20%",
            scrub: 0.6,
          },
        });
      });

      // ── Cards slide up on enter ───────────────────────────────────
      cards.forEach((card) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => {
      headingSplit?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full border-t border-[#fff7da]/10 bg-[#0a0d0a]"
      style={{ padding: "8rem 8vw" }}
    >
      <div className="mx-auto w-full max-w-[1400px]">

        {/* Section header */}
        <div className="mb-20">
          <p
            ref={labelRef}
            className="mb-16 w-fit rounded-full border border-[#fff7da]/20 px-4 py-1.5 font-mono text-[30px] tracking-[0.1em] text-[#fff7da]/60"
          >
            &#123; Projects &#125;
          </p>

          <h2
            ref={headingRef}
            className="text-[clamp(1.8rem,3.6vw,4.2rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[#fff7da]"
          >
            Things I&apos;ve built
          </h2>
        </div>

        {/* Stacking cards */}
        <div ref={cardsWrapRef} className="flex flex-col gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="mt-16">
          <Link
            href="/projects"
            className="inline-flex min-h-12 min-w-[170px] items-center justify-center rounded-full bg-[#fff7da] px-8 text-lg font-semibold text-[#0d100d] transition-transform duration-300 hover:scale-[1.03]"
          >
            View all projects →
          </Link>
        </div>

      </div>
    </section>
  );
}
