"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, SplitText } from "@/lib/gsap";

type Certificate = {
  title: string;
  issuer: string;
  description: string;
  image: string;
  logo: string;
  link: string;
};

const certificates: Certificate[] = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    description:
      "Foundational understanding of AWS Cloud concepts, services, security, and pricing models.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    link: "#",
  },
  {
    title: "Meta Front-End Developer",
    issuer: "Meta / Coursera",
    description:
      "Professional certificate covering React, UI/UX principles, and modern front-end workflows.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80&auto=format&fit=crop",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    link: "#",
  },
  {
    title: "Google UX Design",
    issuer: "Google / Coursera",
    description:
      "End-to-end UX design process including research, wireframing, prototyping, and testing.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&auto=format&fit=crop",
    logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    link: "#",
  },
  {
    title: "Node.js Application Development",
    issuer: "OpenJS Foundation",
    description:
      "Building scalable server-side applications with Node.js, Express, and REST APIs.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    link: "#",
  },
  {
    title: "MongoDB Developer Path",
    issuer: "MongoDB University",
    description:
      "Data modeling, aggregation pipelines, indexing strategies, and Atlas cloud deployment.",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80&auto=format&fit=crop",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    link: "#",
  },
];

function CertCard({ cert }: { cert: Certificate }) {
  return (
    <div className="group relative w-full pt-7">
      <div className="absolute right-7 top-0 z-20 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#fff7da]/12 bg-[#1a1e1a] shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cert.logo}
          alt={cert.issuer}
          className="h-8 w-8 object-contain opacity-85"
        />
      </div>

      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#fff7da]/8 bg-[#111411] shadow-[0_8px_40px_rgba(0,0,0,0.45)] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-[#fff7da]/16 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        <div className="relative h-[260px] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cert.image}
            alt={cert.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111411] to-transparent" />
        </div>

        <div className="flex flex-1 flex-col gap-4 px-7 pb-8 pt-6">
          <span className="font-mono text-[0.7rem] tracking-[0.18em] text-[#fff7da]/38 uppercase">
            {cert.issuer}
          </span>

          <h3 className="text-[1.12rem] font-semibold leading-[1.22] tracking-[-0.025em] text-[#fff7da]">
            {cert.title}
          </h3>

          <p className="text-[0.87rem] leading-[1.62] tracking-[-0.01em] text-[#fff7da]/45">
            {cert.description}
          </p>

          <div className="mt-auto pt-3">
            <Link
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-full border border-[#fff7da]/14 bg-[#fff7da]/5 px-5 text-[0.84rem] font-medium text-[#fff7da]/70 transition-all duration-300 hover:border-[#fff7da]/28 hover:bg-[#fff7da]/10 hover:text-[#fff7da]"
            >
              View Certificate -
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let headingSplit: InstanceType<typeof SplitText> | null = null;

    const ctx = gsap.context(() => {
      headingSplit = new SplitText(headingRef.current, { type: "lines" });
      gsap.set(headingSplit.lines, { overflow: "hidden" });
      gsap.set(btnRef.current, { y: 24, opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
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
            duration: 1,
            ease: "expo.out",
          },
          "-=0.2"
        )
        .to(
          btnRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.2"
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
      style={{ padding: "8rem 0" }}
    >
      <div className="mx-auto mb-20 w-full max-w-[1400px] px-[8vw]">
        <p
          ref={labelRef}
          className="mb-16 w-fit rounded-full border border-[#fff7da]/20 px-4 py-1.5 font-mono text-[30px] tracking-[0.1em] text-[#fff7da]/60"
        >
          &#123; Achievements &#125;
        </p>

        <h2
          ref={headingRef}
          className="text-[clamp(1.8rem,3.6vw,4.2rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[#fff7da]"
        >
          Certifications &amp; milestones
        </h2>
      </div>

      <div className="mb-24">
        <div className="mx-auto mb-8 w-full max-w-[1400px] px-[8vw]">
          <span className="font-mono text-[0.95rem] tracking-[0.18em] text-[#fff7da]/38 uppercase">
            Certificates
          </span>
        </div>

        <div className="mx-auto w-full max-w-[1400px] px-[8vw]">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {certificates.map((cert) => (
              <div key={cert.title}>
                <CertCard cert={cert} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={btnRef} className="flex justify-center px-[8vw]">
        <Link
          href="/about"
          className="inline-flex min-h-12 min-w-[220px] items-center justify-center rounded-full bg-[#fff7da] px-8 text-lg font-semibold text-[#0d100d] transition-transform duration-300 hover:scale-[1.03]"
        >
          Know More About Me -
        </Link>
      </div>
    </section>
  );
}
