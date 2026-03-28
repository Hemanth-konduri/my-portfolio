"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useLenis } from "@/hooks/useLenis";
import Header from "@/components/Header";

const socialItems = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Resume", href: "#" },
];

export default function Hero() {
  useLenis();

  const heroRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const hemanthRef = useRef<HTMLHeadingElement>(null);
  const konduriRef = useRef<HTMLHeadingElement>(null);
  const introLabelRef = useRef<HTMLParagraphElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const hemanthSplit = new SplitText(hemanthRef.current, { type: "chars" });
      const konduriSplit = new SplitText(konduriRef.current, { type: "chars" });

      gsap.set([...hemanthSplit.chars, ...konduriSplit.chars], {
        transformOrigin: "50% 100%",
      });

      const tl = gsap.timeline({ delay: 0.12 });

      tl.from(headerRef.current, {
        y: -28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      })
        .from(
          hemanthSplit.chars,
          {
            yPercent: 105,
            opacity: 0,
            stagger: 0.028,
            duration: 1.08,
            ease: "expo.out",
          },
          "-=0.4"
        )
        .from(
          konduriSplit.chars,
          {
            yPercent: 108,
            opacity: 0,
            stagger: 0.026,
            duration: 1.04,
            ease: "expo.out",
          },
          "-=0.72"
        )
        .from(
          [introLabelRef.current, roleRef.current, socialsRef.current],
          {
            y: 24,
            opacity: 0,
            stagger: 0.1,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.45"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-[#090b09] text-[#fff7da]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_16%,rgba(255,174,76,0.12),transparent_24%),radial-gradient(circle_at_72%_50%,rgba(176,126,255,0.14),transparent_20%),linear-gradient(180deg,#0b0d0a_0%,#090b09_100%)]" />

      <Header ref={headerRef} />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-92px)] w-full max-w-420 flex-col px-5 pb-8 pt-4 md:px-8 md:pb-10 md:pt-5 lg:px-12">
        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-390 flex-col items-center justify-center">
            <p
              ref={introLabelRef}
              className="mb-4 text-center text-[clamp(1.25rem,2.2vw,2.35rem)] font-medium tracking-[-0.05em] text-[#f6efd0]/82 md:mb-6"
            >
              Hi I&apos;m
            </p>

            <div className="relative w-full">
              <h1
                ref={hemanthRef}
                className="hero-line hero-glow text-center text-[clamp(5.8rem,15vw,15.8rem)] font-semibold leading-[0.84] tracking-[-0.09em] text-[#f6efd0]"
              >
                Hemanth
              </h1>

              <div className="relative ml-[12%] mt-0.5 md:ml-[18%] md:mt-1">
                <h2
                  ref={konduriRef}
                  className="hero-line hero-glow text-center text-[clamp(5.8rem,15vw,15.8rem)] font-semibold leading-[0.84] tracking-[-0.09em] text-[#f6efd0]"
                >
                  Konduri
                </h2>
              </div>
            </div>

            <div
              ref={roleRef}
              className="mt-8 flex max-w-225 flex-col items-center gap-5 md:mt-10"
            >
              <p className="max-w-190 text-center text-[clamp(1.15rem,1.85vw,1.8rem)] leading-[1.15] tracking-[-0.04em] text-[#f6efd0]/82">
                Full-stack developer crafting modern web experiences with clean
                design, thoughtful motion, and strong front-end detail.
              </p>

              <div
                ref={socialsRef}
                className="flex flex-wrap items-center justify-center gap-4 pt-1"
              >
                {socialItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-37.5 rounded-full bg-[#fff7da] px-7 py-3 text-center text-base font-medium text-[#0d100d] transition-transform duration-300 hover:scale-[1.03] md:min-w-[170px] md:px-8 md:py-3.5 md:text-lg"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
