"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, SplitText } from "@/lib/gsap";

type Skill = { name: string; icon: string };
type Category = { label: string; skills: Skill[]; reverse?: boolean };

const categories: Category[] = [
  {
    label: "Languages / Frontend",
    skills: [
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    label: "Backend / Databases",
    reverse: true,
    skills: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "RESTful APIs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "JWT Auth", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
    ],
  },
  {
    label: "Cloud / Tools",
    skills: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
      { name: "Google Cloud", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
      { name: "MongoDB Atlas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Cloudinary", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudinary/cloudinary-original.svg" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
      { name: "Render", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/render/render-original.svg" },
      { name: "Netlify", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    ],
  },
  {
    label: "Soft Skills",
    reverse: true,
    skills: [
      { name: "Team Collaboration", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" },
      { name: "Technical Communication", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg" },
      { name: "Time Management", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" },
    ],
  },
];

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="group mx-3 flex w-[148px] shrink-0 flex-col items-center gap-4 rounded-[26px] border border-[#fff7da]/8 bg-[#0d100d] px-5 py-6 transition-all duration-500 hover:border-[#fff7da]/18 hover:bg-[#111411]">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff7da]/4 p-2 transition-colors duration-500 group-hover:bg-[#fff7da]/8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={skill.icon}
          alt={skill.name}
          className="max-h-8 max-w-[2.3rem] object-contain opacity-78 transition-opacity duration-500 group-hover:opacity-100"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff7da' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='3'/%3E%3C/svg%3E";
          }}
        />
      </div>

      <span className="text-center text-[0.84rem] font-medium leading-snug tracking-[0.01em] text-[#fff7da]/55 transition-colors duration-500 group-hover:text-[#fff7da]/86">
        {skill.name}
      </span>
    </div>
  );
}

function MarqueeRow({
  category,
  rowRef,
}: {
  category: Category;
  rowRef: (el: HTMLDivElement | null) => void;
}) {
  const repeated = [...category.skills, ...category.skills, ...category.skills, ...category.skills];

  return (
    <div ref={rowRef} className="skills-row">
      <div className="relative overflow-hidden py-2">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#0a0d0a] to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#0a0d0a] to-transparent md:w-28" />

        <div
          className={`flex w-max ${category.reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
          style={{ animationDuration: "42s" }}
        >
          {repeated.map((skill, index) => (
            <SkillCard key={`${skill.name}-${index}`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let headingSplit: InstanceType<typeof SplitText> | null = null;

    const ctx = gsap.context(() => {
      headingSplit = new SplitText(headingRef.current, { type: "lines" });
      gsap.set(headingSplit.lines, { overflow: "hidden" });
      gsap.set(rowRefs.current.filter(Boolean), { y: 34, opacity: 0 });
      gsap.set(btnRef.current, { y: 24, opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 84%",
            once: true,
          },
        })
        .from(labelRef.current, {
          y: 18,
          opacity: 0,
          duration: 0.65,
          ease: "power3.out",
        })
        .from(
          headingSplit.lines,
          {
            yPercent: 110,
            opacity: 0,
            stagger: 0.08,
            duration: 1.02,
            ease: "expo.out",
          },
          "-=0.24"
        )
        .from(
          subRef.current,
          {
            y: 18,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to(
          rowRefs.current.filter(Boolean),
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.78,
            ease: "power3.out",
          },
          "-=0.26"
        )
        .to(
          btnRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3"
        );
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
        <div className="mb-18 md:mb-22">
          <p
            ref={labelRef}
            className="mb-12 w-fit rounded-full border border-[#fff7da]/20 px-4 py-1.5 font-mono text-[30px] tracking-[0.1em] text-[#fff7da]/60"
          >
            &#123; Skills &#125;
          </p>

          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] md:items-end md:gap-12">
            <h2
              ref={headingRef}
              className="max-w-[860px] text-[clamp(1.8rem,3.6vw,4.2rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[#fff7da]"
            >
              Technologies I work with
            </h2>

            <p
              ref={subRef}
              className="text-[clamp(1.05rem,1.5vw,1.45rem)] leading-[1.45] tracking-[-0.025em] text-[#fff7da]/55 md:text-right"
            >
              A curated set of tools and technologies I use to design, build,
              and ship products.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-12 md:gap-14">
          {categories.map((category, index) => (
            <div key={category.label} className="space-y-5">
              <span className="block font-mono text-[0.95rem] tracking-[0.18em] uppercase text-[#fff7da]/38">
                {category.label}
              </span>

              <MarqueeRow
                category={category}
                rowRef={(el) => {
                  rowRefs.current[index] = el;
                }}
              />
            </div>
          ))}
        </div>

        <div ref={btnRef} className="mt-16">
          <Link
            href="/skills"
            className="inline-flex min-h-12 min-w-[170px] items-center justify-center rounded-full bg-[#fff7da] px-8 text-lg font-semibold text-[#0d100d] transition-transform duration-300 hover:scale-[1.03]"
          >
            View all skills →
          </Link>
        </div>
      </div>
    </section>
  );
}
