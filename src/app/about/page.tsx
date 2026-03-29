"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import Link from "next/link";

const facts = [
  { label: "Location", value: "Andhra Pradesh, India" },
  { label: "Status", value: "2nd Year B.Tech CS" },
  { label: "Available", value: "Open to Internships" },
  { label: "Mode", value: "Remote" },
];

const education = [
  {
    degree: "B.Tech Computer Science",
    college: "Godavari Global University",
    year: "2024 — 2028",
    cgpa: "8.02 / 10",
    coursework: [
      "Data Structures",
      "DBMS",
      "Operating Systems",
      "Web Technologies",
      "OOP",
      "Computer Networks",
    ],
  },
];

const whatIDo = [
  {
    number: "01",
    title: "Frontend",
    desc: "I build interfaces people actually enjoy using — clean, fast, and pixel-perfect.",
  },
  {
    number: "02",
    title: "Backend",
    desc: "I engineer systems that scale — APIs, databases, auth, the whole stack.",
  },
  {
    number: "03",
    title: "Design",
    desc: "I care deeply about how things look and feel — motion, spacing, and detail.",
  },
  {
    number: "04",
    title: "Learn",
    desc: "I pick up new technologies embarrassingly fast and love every second of it.",
  },
];

const hobbies = [
  "Travelling",
  "Reading",
  "Music",
  "Experiencing New Places",
  "Exploring Cultures",
  "New Experiences",
  "Discovering Music",
];

const currently = [
  "Studying B.Tech CS at Your College, Tamil Nadu",
  "Building this portfolio with Next.js, GSAP and Lenis",
  "Open to internships — Remote or Onsite",
  "Exploring new places, music and experiences",
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headingSplit = new SplitText(headingRef.current, {
        type: "lines,words",
      });

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

      gsap.from(bioRef.current, {
        scrollTrigger: {
          trigger: bioRef.current,
          start: "top 85%",
          once: true,
        },
        x: -30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
          once: true,
        },
        x: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
      });

      gsap.from(Array.from(factsRef.current?.children ?? []), {
        scrollTrigger: {
          trigger: factsRef.current,
          start: "top 88%",
          once: true,
        },
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".wid-card", {
        scrollTrigger: {
          trigger: ".wid-section",
          start: "top 85%",
          once: true,
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out",
      });

      gsap.from(".hobby-item", {
        scrollTrigger: {
          trigger: ".hobbies-section",
          start: "top 88%",
          once: true,
        },
        y: 30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.6,
        ease: "back.out(1.4)",
      });

      gsap.from(".edu-content", {
        scrollTrigger: {
          trigger: ".edu-content",
          start: "top 85%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
      });

      gsap.from(".currently-item", {
        scrollTrigger: {
          trigger: ".currently-wrap",
          start: "top 88%",
          once: true,
        },
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".cta-section", {
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 88%",
          once: true,
        },
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
      {/* Consistent wrapper for all sections */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 60px" }}>

        {/* ── Hero ── */}
        <section style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <p className="font-mono text-[13px] tracking-[0.1em] text-[#fff7da]/50 mb-10 border border-[#fff7da]/15 rounded-full w-fit px-4 py-1.5">
            &#123; About &#125;
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
            The Person Behind
            <br />
            <span style={{ color: "rgba(255,247,218,0.25)" }}>the Code.</span>
          </h1>
          <p
            ref={subRef}
            className="font-mono text-[#fff7da]/30 uppercase"
            style={{ fontSize: "13px", letterSpacing: "0.25em" }}
          >
            Developer · Student · Builder
          </p>
        </section>

        <div style={{ borderTop: "1px solid rgba(255,247,218,0.08)" }} />

        {/* ── Spotlight Intro ── */}
        <section
          style={{
            paddingTop: "100px",
            paddingBottom: "100px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div ref={bioRef} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <p
              className="text-[#fff7da]/60"
              style={{ fontSize: "clamp(1rem,1.5vw,1.3rem)", lineHeight: 1.85, letterSpacing: "-0.01em" }}
            >
              I&apos;m Hemanth Konduri — a second year Computer Science student
              from Godavari Global University, Rajamundry, with a deep obsession for building things on the
              web. I started coding out of curiosity and now I can&apos;t stop.
              Every project teaches me something new and pushes me to get better.
            </p>
            <p
              className="text-[#fff7da]/60"
              style={{ fontSize: "clamp(1rem,1.5vw,1.3rem)", lineHeight: 1.85, letterSpacing: "-0.01em" }}
            >
              I care about the details — the smoothness of an animation, the
              clarity of an API, the elegance of a database schema. I want to
              build things that are both beautiful and bulletproof.
            </p>

            {/* Facts grid */}
            <div
              ref={factsRef}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginTop: "16px",
              }}
            >
              {facts.map((f) => (
                <div
                  key={f.label}
                  style={{
                    border: "1px solid rgba(255,247,218,0.08)",
                    borderRadius: "12px",
                    padding: "16px 20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <span
                    className="font-mono text-[#fff7da]/25 uppercase"
                    style={{ fontSize: "10px", letterSpacing: "0.2em" }}
                  >
                    {f.label}
                  </span>
                  <span
                    className="text-[#fff7da]/80 font-medium"
                    style={{ fontSize: "14px" }}
                  >
                    {f.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div
            ref={imageRef}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              minHeight: "500px",
            }}
          >
            {/* Spotlight beam */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "2px",
                height: "80px",
                background: "linear-gradient(to bottom, rgba(255,247,218,0.5), transparent)",
                zIndex: 10,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "400px",
                height: "450px",
                background: "radial-gradient(ellipse at 50% 0%, rgba(255,247,218,0.1) 0%, transparent 65%)",
                zIndex: 0,
                borderRadius: "50%",
              }}
            />

            {/* Image placeholder */}
            <div
              style={{
                position: "relative",
                zIndex: 10,
                width: "300px",
                height: "460px",
                border: "1px dashed rgba(255,247,218,0.12)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "rgba(255,247,218,0.04)",
                  border: "1px solid rgba(255,247,218,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  className="font-bold text-[#fff7da]/20"
                  style={{ fontSize: "24px" }}
                >
                  HK
                </span>
              </div>
              <p
                className="font-mono text-[#fff7da]/20 uppercase text-center"
                style={{ fontSize: "10px", letterSpacing: "0.18em" }}
              >
                Add your photo here
              </p>
            </div>
          </div>
        </section>

        <div style={{ borderTop: "1px solid rgba(255,247,218,0.08)" }} />

        {/* ── Education ── */}
        <section style={{ paddingTop: "100px", paddingBottom: "100px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: "80px",
            }}
          >
            <p
              className="font-mono text-[#fff7da]/30 uppercase"
              style={{ fontSize: "11px", letterSpacing: "0.2em", paddingTop: "6px" }}
            >
              &#123; Education &#125;
            </p>
            <div className="edu-content" style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              {education.map((e) => (
                <div key={e.degree} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <h3
                      className="font-semibold text-[#fff7da]"
                      style={{
                        fontSize: "clamp(1.5rem,2.5vw,2.4rem)",
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                      }}
                    >
                      {e.degree}
                    </h3>
                    <p className="font-mono text-[#fff7da]/40" style={{ fontSize: "14px" }}>
                      {e.college}
                    </p>
                    <div style={{ display: "flex", gap: "32px" }}>
                      <span className="font-mono text-[#fff7da]/25" style={{ fontSize: "12px" }}>
                        {e.year}
                      </span>
                      <span className="font-mono text-[#fff7da]/25" style={{ fontSize: "12px" }}>
                        CGPA: {e.cgpa}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <p
                      className="font-mono text-[#fff7da]/20 uppercase"
                      style={{ fontSize: "11px", letterSpacing: "0.18em" }}
                    >
                      Relevant Coursework
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {e.coursework.map((c) => (
                        <span
                          key={c}
                          className="font-mono text-[#fff7da]/50"
                          style={{
                            fontSize: "12px",
                            padding: "6px 16px",
                            border: "1px solid rgba(255,247,218,0.1)",
                            borderRadius: "100px",
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div style={{ borderTop: "1px solid rgba(255,247,218,0.08)" }} />

        {/* ── What I Do ── */}
        <section
          className="wid-section"
          style={{ paddingTop: "100px", paddingBottom: "100px" }}
        >
          <p
            className="font-mono text-[#fff7da]/30 uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.2em", marginBottom: "48px" }}
          >
            &#123; What I Do &#125;
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
            }}
          >
            {whatIDo.map((item) => (
              <div
                key={item.number}
                className="wid-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  border: "1px solid rgba(255,247,218,0.08)",
                  borderRadius: "20px",
                  padding: "32px 28px",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(255,247,218,0.2)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(255,247,218,0.08)")
                }
              >
                <span
                  className="font-mono text-[#fff7da]/20"
                  style={{ fontSize: "11px", letterSpacing: "0.2em" }}
                >
                  {item.number}
                </span>
                <h3
                  className="font-semibold text-[#fff7da]"
                  style={{ fontSize: "1.5rem", letterSpacing: "-0.03em" }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-mono text-[#fff7da]/40"
                  style={{ fontSize: "12px", lineHeight: 1.75 }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ borderTop: "1px solid rgba(255,247,218,0.08)" }} />

        {/* ── Hobbies ── */}
        <section
          className="hobbies-section"
          style={{ paddingTop: "100px", paddingBottom: "100px" }}
        >
          <p
            className="font-mono text-[#fff7da]/30 uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.2em", marginBottom: "48px" }}
          >
            &#123; Hobbies & Interests &#125;
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 32px" }}>
            {hobbies.map((h) => (
              <span
                key={h}
                className="hobby-item font-semibold text-[#fff7da]/12 cursor-default"
                style={{
                  fontSize: "clamp(2rem,4vw,4rem)",
                  letterSpacing: "-0.03em",
                  transition: "color 0.4s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLSpanElement).style.color =
                    "rgba(255,247,218,0.75)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLSpanElement).style.color =
                    "rgba(255,247,218,0.12)")
                }
              >
                {h}
              </span>
            ))}
          </div>
        </section>

        <div style={{ borderTop: "1px solid rgba(255,247,218,0.08)" }} />

        {/* ── Currently ── */}
        <section style={{ paddingTop: "100px", paddingBottom: "100px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: "80px",
            }}
          >
            <p
              className="font-mono text-[#fff7da]/30 uppercase"
              style={{ fontSize: "11px", letterSpacing: "0.2em", paddingTop: "6px" }}
            >
              &#123; Currently &#125;
            </p>
            <div className="currently-wrap" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {currently.map((line) => (
                <p
                  key={line}
                  className="currently-item font-mono text-[#fff7da]/50"
                  style={{ fontSize: "15px", lineHeight: 1.6 }}
                >
                  → {line}
                </p>
              ))}
            </div>
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
              fontSize: "clamp(3rem,7vw,8rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.05em",
            }}
          >
            Want to work
            <br />
            <span style={{ color: "rgba(255,247,218,0.2)" }}>together?</span>
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
              href="https://linkedin.com/in/hemanth-konduri"
              target="_blank"
              className="font-mono text-[#fff7da]/60 hover:text-[#fff7da] transition-all duration-300"
              style={{
                fontSize: "14px",
                padding: "12px 32px",
                border: "1px solid rgba(255,247,218,0.2)",
                borderRadius: "100px",
              }}
            >
              LinkedIn
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