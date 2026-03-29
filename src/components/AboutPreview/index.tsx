"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import Link from "next/link";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let textSplit: InstanceType<typeof SplitText> | null = null;

    const ctx = gsap.context(() => {
      textSplit = new SplitText(textRef.current, { type: "lines" });
      gsap.set(textSplit.lines, { overflow: "hidden" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          once: true,
        },
      });

      tl.from(labelRef.current, {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          textSplit.lines,
          {
            yPercent: 110,
            opacity: 0,
            stagger: 0.1,
            duration: 1.1,
            ease: "expo.out",
          },
          "-=0.2"
        )
        .from(
          btnRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.2"
        );
    }, sectionRef);

    return () => {
      textSplit?.revert();
      ctx.revert();
    };
  }, []);

  return (
    
  <section
  ref={sectionRef}
  style={{ padding: "8rem 8vw", borderTop: "1px solid rgba(255,247,218,0.1)" }}
  className="w-full bg-[#0a0d0a]"
>
      <div className="w-full max-w-[1400px] mx-auto">

        {/* { About } label */}
        <p
          ref={labelRef}
          className="font-mono text-[30px] tracking-[0.1em] text-[#fff7da]/60 mb-16 border border-[#fff7da]/20 rounded-full w-fit px-4 py-1.5"
        >
          &#123; About &#125;
        </p>

        {/* Paragraph */}
        <p
  ref={textRef}
  className="text-[clamp(1.8rem,3.6vw,4.2rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[#fff7da]"
>
          I&apos;m Hemanth — a second year CS student from Tamil Nadu, obsessed with building things
          
          on the web. I care about clean architecture,
          thoughtful UI, and code that actually scales.
          Currently looking for internships where I can
          contribute, learn fast, and ship real products.
        </p>

        {/* Button */}
       <div ref={btnRef} className="mt-16">
  <Link
    href="/about"
    className="inline-flex min-h-12 min-w-[170px] items-center justify-center rounded-full bg-[#fff7da] px-8 text-lg font-semibold text-[#0d100d] transition-transform duration-300 hover:scale-[1.03]"
  >
    View More  
    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
      →
    </span>
  </Link>
</div>

      </div>
    </section>
  
  );
}