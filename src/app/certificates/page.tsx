"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import Link from "next/link";

const certificates = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
    desc: "Foundational understanding of AWS Cloud concepts, services, security, and pricing models.",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    link: "#",
  },
  {
    title: "Meta Front-End Developer",
    issuer: "Meta / Coursera",
    year: "2024",
    desc: "Professional certificate covering React, UI/UX principles, and modern front-end workflows.",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    link: "#",
  },
  {
    title: "Google UX Design",
    issuer: "Google / Coursera",
    year: "2023",
    desc: "End-to-end UX design process including research, wireframing, prototyping, and testing.",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    link: "#",
  },
  {
    title: "Node.js Application Development",
    issuer: "OpenJS Foundation",
    year: "2023",
    desc: "Building scalable server-side applications with Node.js, Express, and REST APIs.",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    link: "#",
  },
  {
    title: "MongoDB Developer Path",
    issuer: "MongoDB University",
    year: "2023",
    desc: "Data modeling, aggregation pipelines, indexing strategies, and Atlas cloud deployment.",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    link: "#",
  },
];

const achievements = [
  {
    title: "Hackathon Winner",
    org: "College Tech Fest",
    year: "March 2024",
    desc: "1st place at college-level 24-hour hackathon building an AI-powered study assistant.",
    icon: "🥇",
  },
  {
    title: "Top 5% — LeetCode",
    org: "LeetCode",
    year: "Ongoing 2024",
    desc: "Solved 300+ problems across arrays, trees, graphs, and dynamic programming.",
    icon: "🏆",
  },
  {
    title: "Open Source Contributor",
    org: "GitHub",
    year: "Jan 2024",
    desc: "Merged 8 PRs into popular open-source repositories with 2k+ GitHub stars.",
    icon: "🌐",
  },
  {
    title: "Dean's List — 2 Semesters",
    org: "Your College",
    year: "Dec 2023",
    desc: "Maintained a 9.2 GPA across two consecutive semesters in the CS program.",
    icon: "🎓",
  },
  {
    title: "500+ GitHub Contributions",
    org: "GitHub",
    year: "2023 — 2024",
    desc: "Consistent daily coding streak with contributions across personal and team projects.",
    icon: "⚡",
  },
  {
    title: "Tech Blog — 10k Reads",
    org: "Personal Blog",
    year: "2023",
    desc: "Published 12 technical articles on React, Node.js, and system design patterns.",
    icon: "✍️",
  },
];

const stats = [
  { label: "Certificates", value: "5" },
  { label: "Achievements", value: "6+" },
  { label: "Hackathons", value: "3" },
  { label: "GPA", value: "9.2" },
];

export default function CertificatesPage() {
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

      gsap.from(".cert-row", {
        scrollTrigger: { trigger: ".certs-list", start: "top 88%", once: true },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "expo.out",
      });

      gsap.from(".ach-card", {
        scrollTrigger: { trigger: ".ach-grid", start: "top 88%", once: true },
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
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
            &#123; Achievements &#125;
          </p>
          <h1
            ref={headingRef}
            className="font-semibold text-[#fff7da] mb-8"
            style={{ fontSize: "clamp(3.5rem, 8vw, 9rem)", lineHeight: 0.88, letterSpacing: "-0.05em" }}
          >
            Certifications
            <br />
            <span style={{ color: "rgba(255,247,218,0.25)" }}>&amp; milestones.</span>
          </h1>
          <p
            ref={subRef}
            className="font-mono text-[#fff7da]/30 uppercase"
            style={{ fontSize: "13px", letterSpacing: "0.25em" }}
          >
            Certified · Recognised · Achieved
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

        {/* ── Certificates ── */}
        <section
          className="certs-list"
          style={{ paddingTop: "100px", paddingBottom: "100px" }}
        >
          <p
            className="font-mono text-[#fff7da]/30 uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.2em", marginBottom: "64px" }}
          >
            &#123; Certificates &#125;
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {certificates.map((cert, i) => (
              <div
                key={cert.title}
                className="cert-row"
                style={{ borderTop: "1px solid rgba(255,247,218,0.08)" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr auto",
                    gap: "40px",
                    paddingTop: "40px",
                    paddingBottom: "40px",
                    alignItems: "center",
                  }}
                >
                  {/* Number */}
                  <span
                    className="font-mono text-[#fff7da]/20"
                    style={{ fontSize: "12px", letterSpacing: "0.15em" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Content */}
                  <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cert.logo}
                      alt={cert.issuer}
                      style={{ width: "36px", height: "36px", objectFit: "contain", opacity: 0.6, flexShrink: 0 }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <h3
                        className="font-semibold text-[#fff7da]"
                        style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.7rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
                      >
                        {cert.title}
                      </h3>
                      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                        <span className="font-mono text-[#fff7da]/35" style={{ fontSize: "12px" }}>
                          {cert.issuer}
                        </span>
                        <span className="font-mono text-[#fff7da]/20" style={{ fontSize: "11px" }}>
                          {cert.year}
                        </span>
                      </div>
                      <p className="text-[#fff7da]/40" style={{ fontSize: "13px", lineHeight: 1.6, marginTop: "4px" }}>
                        {cert.desc}
                      </p>
                    </div>
                  </div>

                  {/* View link */}
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[#fff7da]/35 hover:text-[#fff7da] transition-colors duration-300 shrink-0"
                    style={{ fontSize: "12px", letterSpacing: "0.08em" }}
                  >
                    View ↗
                  </a>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,247,218,0.08)" }} />
          </div>
        </section>

        <div style={{ borderTop: "1px solid rgba(255,247,218,0.08)" }} />

        {/* ── Achievements ── */}
        <section style={{ paddingTop: "100px", paddingBottom: "100px" }}>
          <p
            className="font-mono text-[#fff7da]/30 uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.2em", marginBottom: "64px" }}
          >
            &#123; Achievements &#125;
          </p>

          <div
            className="ach-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}
          >
            {achievements.map((ach) => (
              <div
                key={ach.title}
                className="ach-card"
                style={{
                  border: "1px solid rgba(255,247,218,0.08)",
                  borderRadius: "20px",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,247,218,0.18)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,247,218,0.08)")}
              >
                <span style={{ fontSize: "2rem", lineHeight: 1 }}>{ach.icon}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <h3
                    className="font-semibold text-[#fff7da]"
                    style={{ fontSize: "1.1rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}
                  >
                    {ach.title}
                  </h3>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <span className="font-mono text-[#fff7da]/30" style={{ fontSize: "11px" }}>{ach.org}</span>
                    <span className="font-mono text-[#fff7da]/20" style={{ fontSize: "11px" }}>{ach.year}</span>
                  </div>
                </div>
                <p className="font-mono text-[#fff7da]/35" style={{ fontSize: "12px", lineHeight: 1.75 }}>
                  {ach.desc}
                </p>
              </div>
            ))}
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
            style={{ fontSize: "clamp(3rem, 7vw, 8rem)", lineHeight: 0.88, letterSpacing: "-0.05em" }}
          >
            Want to know
            <br />
            <span style={{ color: "rgba(255,247,218,0.2)" }}>more?</span>
          </h2>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link
              href="/about"
              className="font-mono text-[#fff7da]/60 hover:text-[#fff7da] transition-all duration-300"
              style={{ fontSize: "14px", padding: "12px 32px", border: "1px solid rgba(255,247,218,0.2)", borderRadius: "100px" }}
            >
              About Me
            </Link>
            <Link
              href="/contact"
              className="font-medium text-[#0a0d0a] transition-all duration-300 hover:scale-[1.03]"
              style={{ fontSize: "14px", padding: "12px 32px", background: "#fff7da", borderRadius: "100px", display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              Let&apos;s Talk →
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
