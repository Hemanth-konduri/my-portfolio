"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import Link from "next/link";

type Skill = { name: string; icon: string; level: string };

const skillCategories = [
  {
    label: "Languages",
    number: "01",
    desc: "The languages I think and write in.",
    skills: [
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", level: "Intermediate" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", level: "Intermediate" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: "Intermediate" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", level: "Intermediate" },
    ],
  },
  {
    label: "Frontend",
    number: "02",
    desc: "Tools I use to craft interfaces people enjoy.",
    skills: [
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: "Proficient" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", level: "Proficient" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", level: "Proficient" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", level: "Proficient" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", level: "Proficient" },
    ],
  },
  {
    label: "Backend",
    number: "03",
    desc: "The engine under the hood.",
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", level: "Intermediate" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", level: "Intermediate" },
      { name: "RESTful APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", level: "Intermediate" },
      { name: "JWT Auth", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg", level: "Intermediate" },
    ],
  },
  {
    label: "Databases",
    number: "04",
    desc: "Where the data lives.",
    skills: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", level: "Intermediate" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", level: "Intermediate" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", level: "Intermediate" },
      { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", level: "Familiar" },
    ],
  },
  {
    label: "Cloud & Services",
    number: "05",
    desc: "Deploying and scaling in the cloud.",
    skills: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", level: "Familiar" },
      { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", level: "Familiar" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", level: "Proficient" },
      { name: "Netlify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg", level: "Proficient" },
      { name: "Cloudinary", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudinary/cloudinary-original.svg", level: "Intermediate" },
      { name: "Render", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/render/render-original.svg", level: "Intermediate" },
    ],
  },
  {
    label: "Tools & Technologies",
    number: "06",
    desc: "The workflow that keeps me productive.",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", level: "Proficient" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", level: "Proficient" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", level: "Proficient" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", level: "Intermediate" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", level: "Familiar" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", level: "Proficient" },
    ],
  },
  {
    label: "Soft Skills",
    number: "07",
    desc: "The human side of engineering.",
    skills: [
      { name: "Team Collaboration", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg", level: "Strong" },
      { name: "Technical Communication", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg", level: "Strong" },
      { name: "Time Management", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg", level: "Strong" },
    ],
  },
];

const stats = [
  { label: "Technologies", value: "20+" },
  { label: "Categories", value: "7" },
  { label: "Projects Shipped", value: "10+" },
  { label: "Learning", value: "Always" },
];

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <div
      className="skill-item"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "16px 20px",
        border: "1px solid rgba(255,247,218,0.07)",
        borderRadius: "14px",
        transition: "border-color 0.3s, background 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,247,218,0.18)";
        (e.currentTarget as HTMLDivElement).style.background = "rgba(255,247,218,0.03)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,247,218,0.07)";
        (e.currentTarget as HTMLDivElement).style.background = "transparent";
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={skill.icon}
        alt={skill.name}
        style={{ width: "28px", height: "28px", objectFit: "contain", opacity: 0.75 }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff7da' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='3'/%3E%3C/svg%3E";
        }}
      />
      <div style={{ flex: 1 }}>
        <p className="text-[#fff7da]/80 font-medium" style={{ fontSize: "14px" }}>{skill.name}</p>
      </div>
      <span
        className="font-mono text-[#fff7da]/25 uppercase"
        style={{ fontSize: "10px", letterSpacing: "0.15em" }}
      >
        {skill.level}
      </span>
    </div>
  );
}

export default function SkillsPage() {
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

      gsap.from(".cat-row", {
        scrollTrigger: { trigger: ".cats-list", start: "top 88%", once: true },
        y: 40,
        opacity: 0,
        stagger: 0.1,
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
            &#123; Skills &#125;
          </p>
          <h1
            ref={headingRef}
            className="font-semibold text-[#fff7da] mb-8"
            style={{ fontSize: "clamp(3.5rem, 8vw, 9rem)", lineHeight: 0.88, letterSpacing: "-0.05em" }}
          >
            Technologies
            <br />
            <span style={{ color: "rgba(255,247,218,0.25)" }}>I work with.</span>
          </h1>
          <p
            ref={subRef}
            className="font-mono text-[#fff7da]/30 uppercase"
            style={{ fontSize: "13px", letterSpacing: "0.25em" }}
          >
            Frontend · Backend · Cloud · Tools
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

        {/* ── Categories ── */}
        <section
          className="cats-list"
          style={{ paddingTop: "100px", paddingBottom: "100px" }}
        >
          <p
            className="font-mono text-[#fff7da]/30 uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.2em", marginBottom: "64px" }}
          >
            &#123; All Skills &#125;
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {skillCategories.map((cat) => (
              <div
                key={cat.label}
                className="cat-row"
                style={{ borderTop: "1px solid rgba(255,247,218,0.08)" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 260px 1fr",
                    gap: "40px",
                    paddingTop: "48px",
                    paddingBottom: "48px",
                    alignItems: "start",
                  }}
                >
                  {/* Number */}
                  <span
                    className="font-mono text-[#fff7da]/20"
                    style={{ fontSize: "12px", letterSpacing: "0.15em", paddingTop: "4px" }}
                  >
                    {cat.number}
                  </span>

                  {/* Label + desc */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <h2
                      className="font-semibold text-[#fff7da]"
                      style={{ fontSize: "clamp(1.4rem, 2.2vw, 2.2rem)", letterSpacing: "-0.03em", lineHeight: 1 }}
                    >
                      {cat.label}
                    </h2>
                    <p
                      className="font-mono text-[#fff7da]/30"
                      style={{ fontSize: "12px", lineHeight: 1.7 }}
                    >
                      {cat.desc}
                    </p>
                  </div>

                  {/* Skills grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                      gap: "10px",
                    }}
                  >
                    {cat.skills.map((skill) => (
                      <SkillItem key={skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
            style={{ fontSize: "clamp(3rem, 7vw, 8rem)", lineHeight: 0.88, letterSpacing: "-0.05em" }}
          >
            Always
            <br />
            <span style={{ color: "rgba(255,247,218,0.2)" }}>learning.</span>
          </h2>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link
              href="/projects"
              className="font-mono text-[#fff7da]/60 hover:text-[#fff7da] transition-all duration-300"
              style={{ fontSize: "14px", padding: "12px 32px", border: "1px solid rgba(255,247,218,0.2)", borderRadius: "100px" }}
            >
              See Projects
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
