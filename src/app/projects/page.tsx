"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import Link from "next/link";

type Project = {
  title: string;
  description: string;
  longDesc: string;
  tags: string[];
  github: string;
  live: string;
  images: string[];
  year: string;
  role: string;
};

const projects: Project[] = [
  {
    title: "DevFlow",
    description: "A full-stack developer Q&A platform with real-time answers, reputation system, and AI-powered suggestions.",
    longDesc: "Built with Next.js and TypeScript on the frontend, Node.js and MongoDB on the backend. Features include real-time notifications, a reputation and badge system, AI-powered answer suggestions via OpenAI, and a rich markdown editor.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "OpenAI"],
    github: "https://github.com",
    live: "https://example.com",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1400&q=80&auto=format&fit=crop",
    ],
    year: "2024",
    role: "Full-Stack Developer",
  },
  {
    title: "Shopify Clone",
    description: "A production-ready e-commerce storefront with cart, auth, Stripe payments, and an admin dashboard.",
    longDesc: "Complete e-commerce solution with product catalog, cart management, user authentication via JWT, Stripe checkout integration, order tracking, and a full admin panel for inventory and order management.",
    tags: ["React.js", "Node.js", "PostgreSQL", "Stripe", "Express.js"],
    github: "https://github.com",
    live: "https://example.com",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=80&auto=format&fit=crop",
    ],
    year: "2024",
    role: "Full-Stack Developer",
  },
  {
    title: "AI Vision Board",
    description: "Upload images and get instant AI-generated insights using Google Gemini Vision API and Cloudinary.",
    longDesc: "Users upload images which are stored via Cloudinary and analyzed by Google Gemini Vision API. The app returns structured insights, labels, and descriptions. Built with Next.js App Router, Supabase for auth and storage metadata.",
    tags: ["Next.js", "Gemini API", "Cloudinary", "Supabase", "TypeScript"],
    github: "https://github.com",
    live: "https://example.com",
    images: [
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1400&q=80&auto=format&fit=crop",
    ],
    year: "2024",
    role: "Full-Stack Developer",
  },
  {
    title: "RealtimeChat",
    description: "End-to-end encrypted chat app with rooms, presence indicators, and file sharing built on WebSockets.",
    longDesc: "Real-time messaging application with Socket.io, supporting multiple chat rooms, online presence indicators, file and image sharing via Cloudinary, message history with MongoDB, and JWT-based authentication.",
    tags: ["React.js", "Express.js", "Socket.io", "JWT", "MongoDB"],
    github: "https://github.com",
    live: "https://example.com",
    images: [
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1400&q=80&auto=format&fit=crop",
    ],
    year: "2023",
    role: "Full-Stack Developer",
  },
];

const stats = [
  { label: "Projects Built", value: "10+" },
  { label: "Technologies Used", value: "20+" },
  { label: "GitHub Commits", value: "500+" },
  { label: "Years Coding", value: "3+" },
];

// ── Image slider ──────────────────────────────────────────────────
function ImageSlider({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  const goTo = (next: number) => { setPrev(active); setActive(next); };

  useEffect(() => {
    const t = setTimeout(() => goTo((active + 1) % images.length), 3200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, images.length]);

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/8" }}>
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
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[#111411] to-transparent" />
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-5 bg-[#fff7da]/80" : "w-1.5 bg-[#fff7da]/30"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let headingSplit: InstanceType<typeof SplitText> | null = null;
      headingSplit = new SplitText(headingRef.current, { type: "lines,words" });

      gsap.from(headingSplit.words, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.04,
        duration: 1,
        ease: "expo.out",
        delay: 0.3,
      });

      gsap.from(subRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.9,
      });

      gsap.from(".stats-item", {
        scrollTrigger: { trigger: ".stats-row", start: "top 88%", once: true },
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".project-row", {
        scrollTrigger: { trigger: ".projects-list", start: "top 88%", once: true },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "expo.out",
      });

      gsap.from(".cta-section", {
        scrollTrigger: { trigger: ".cta-section", start: "top 88%", once: true },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="w-full bg-[#0a0d0a] text-[#fff7da]"
      style={{ paddingTop: "130px" }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 60px" }}>

        {/* ── Hero ── */}
        <section style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <p className="font-mono text-[13px] tracking-[0.1em] text-[#fff7da]/50 mb-10 border border-[#fff7da]/15 rounded-full w-fit px-4 py-1.5">
            &#123; Projects &#125;
          </p>
          <h1
            ref={headingRef}
            className="font-semibold text-[#fff7da] mb-8"
            style={{
              fontSize: "clamp(3.5rem, 8vw, 9rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.05em",
            }}
          >
            Things I&apos;ve
            <br />
            <span style={{ color: "rgba(255,247,218,0.25)" }}>built.</span>
          </h1>
          <p
            ref={subRef}
            className="font-mono text-[#fff7da]/30 uppercase"
            style={{ fontSize: "13px", letterSpacing: "0.25em" }}
          >
            Full-Stack · Frontend · Backend
          </p>
        </section>

        <div style={{ borderTop: "1px solid rgba(255,247,218,0.08)" }} />

        {/* ── Stats ── */}
        <section style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div
            className="stats-row"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="stats-item"
                style={{
                  border: "1px solid rgba(255,247,218,0.08)",
                  borderRadius: "16px",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <span
                  className="font-semibold text-[#fff7da]"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
                >
                  {s.value}
                </span>
                <span
                  className="font-mono text-[#fff7da]/30 uppercase"
                  style={{ fontSize: "11px", letterSpacing: "0.18em" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div style={{ borderTop: "1px solid rgba(255,247,218,0.08)" }} />

        {/* ── Projects list ── */}
        <section
          className="projects-list"
          style={{ paddingTop: "100px", paddingBottom: "100px" }}
        >
          <p
            className="font-mono text-[#fff7da]/30 uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.2em", marginBottom: "64px" }}
          >
            &#123; Selected Work &#125;
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="project-row"
                style={{ borderTop: "1px solid rgba(255,247,218,0.08)" }}
              >
                {/* Top row — number + title + year */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr auto",
                    alignItems: "start",
                    gap: "32px",
                    paddingTop: "48px",
                    paddingBottom: "40px",
                  }}
                >
                  {/* Number */}
                  <span
                    className="font-mono text-[#fff7da]/20"
                    style={{ fontSize: "12px", letterSpacing: "0.15em", paddingTop: "6px" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Main content */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <h2
                        className="font-semibold text-[#fff7da]"
                        style={{
                          fontSize: "clamp(2rem, 4vw, 4.5rem)",
                          letterSpacing: "-0.04em",
                          lineHeight: 0.95,
                        }}
                      >
                        {project.title}
                      </h2>
                      <p
                        className="text-[#fff7da]/50"
                        style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)", lineHeight: 1.6, maxWidth: "600px" }}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[#fff7da]/40"
                          style={{
                            fontSize: "11px",
                            padding: "5px 14px",
                            border: "1px solid rgba(255,247,218,0.1)",
                            borderRadius: "100px",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Image slider */}
                    <div
                      style={{
                        borderRadius: "16px",
                        overflow: "hidden",
                        border: "1px solid rgba(255,247,218,0.08)",
                        marginTop: "8px",
                      }}
                    >
                      <ImageSlider images={project.images} title={project.title} />
                    </div>

                    {/* Long description */}
                    <p
                      className="font-mono text-[#fff7da]/35"
                      style={{ fontSize: "13px", lineHeight: 1.8, maxWidth: "640px" }}
                    >
                      {project.longDesc}
                    </p>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: "12px", paddingBottom: "8px" }}>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[#0a0d0a] transition-all duration-300 hover:scale-[1.03]"
                        style={{
                          fontSize: "14px",
                          padding: "12px 28px",
                          background: "#fff7da",
                          borderRadius: "100px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        Live Demo →
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-[#fff7da]/60 hover:text-[#fff7da] transition-all duration-300"
                        style={{
                          fontSize: "13px",
                          padding: "12px 28px",
                          border: "1px solid rgba(255,247,218,0.15)",
                          borderRadius: "100px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        GitHub ↗
                      </a>
                    </div>
                  </div>

                  {/* Right — year + role */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      alignItems: "flex-end",
                      paddingTop: "6px",
                    }}
                  >
                    <span
                      className="font-mono text-[#fff7da]/25"
                      style={{ fontSize: "12px", letterSpacing: "0.1em" }}
                    >
                      {project.year}
                    </span>
                    <span
                      className="font-mono text-[#fff7da]/25"
                      style={{ fontSize: "11px", letterSpacing: "0.08em", textAlign: "right" }}
                    >
                      {project.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {/* Bottom border */}
            <div style={{ borderTop: "1px solid rgba(255,247,218,0.08)" }} />
          </div>
        </section>

        <div style={{ borderTop: "1px solid rgba(255,247,218,0.08)" }} />

        {/* ── CTA ── */}
        <section
          className="cta-section"
          style={{
            paddingTop: "120px",
            paddingBottom: "120px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "48px",
          }}
        >
          <h2
            className="font-semibold text-[#fff7da]"
            style={{
              fontSize: "clamp(3rem, 7vw, 8rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.05em",
            }}
          >
            Like what
            <br />
            <span style={{ color: "rgba(255,247,218,0.2)" }}>you see?</span>
          </h2>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link
              href="https://github.com/hemanth-konduri"
              target="_blank"
              className="font-mono text-[#fff7da]/60 hover:text-[#fff7da] transition-all duration-300"
              style={{
                fontSize: "14px",
                padding: "12px 32px",
                border: "1px solid rgba(255,247,218,0.2)",
                borderRadius: "100px",
              }}
            >
              GitHub
            </Link>
            <Link
              href="/contact"
              className="font-medium text-[#0a0d0a] transition-all duration-300 hover:scale-[1.03]"
              style={{
                fontSize: "14px",
                padding: "12px 32px",
                background: "#fff7da",
                borderRadius: "100px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Let&apos;s Talk →
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
