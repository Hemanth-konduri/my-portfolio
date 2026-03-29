"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, SplitText } from "@/lib/gsap";

const navLinks = [
  { label: "About",    href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills",   href: "/skills" },
  { label: "Contact",  href: "/contact" },
];

const socialLinks = [
  { label: "GitHub",   href: "https://github.com/hemanth-konduri" },
  { label: "LinkedIn", href: "https://linkedin.com/in/hemanth-konduri" },
  { label: "Instagram",  href: "https://instagram.com/konduri_hemanth" },
];

// Indices of chars in "Hemanth Konduri" (0-based, space = index 7) that float
// H=0  e=1  a=3  K=8  i=14
const FLOAT_INDICES = new Set([0, 1, 3, 8, 14]);

export default function Footer() {
  const footerRef  = useRef<HTMLElement>(null);
  const nameRef    = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const midRef     = useRef<HTMLDivElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let nameSplit: InstanceType<typeof SplitText> | null = null;

    const ctx = gsap.context(() => {
      nameSplit = new SplitText(nameRef.current, { type: "chars" });

      // ── Entrance timeline ──────────────────────────────────────
      gsap.set([taglineRef.current, midRef.current, bottomRef.current], {
        y: 28, opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 88%",
          once: true,
        },
      });

      tl.from(nameSplit.chars, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.022,
        duration: 0.9,
        ease: "expo.out",
      })
        .to(taglineRef.current, { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }, "-=0.4")
        .to(midRef.current,     { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" }, "-=0.4")
        .to(bottomRef.current,  { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" }, "-=0.35");

      // ── Floating animation on selected chars ───────────────────
      nameSplit.chars.forEach((char, i) => {
        if (!FLOAT_INDICES.has(i)) return;
        gsap.to(char, {
          y: -10,
          rotation: i % 2 === 0 ? -4 : 4,
          duration: 1.8 + i * 0.15,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.12,
        });
      });
    }, footerRef);

    return () => {
      nameSplit?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden bg-[#fff7da]"
    >
      {/* ── Background decoration ──────────────────────────────── */}
      {/* Soft radial glows in the inverted palette */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.04),transparent_70%)]" />
        <div className="absolute -bottom-24 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.05),transparent_70%)]" />
        {/* Fine dot-grid noise */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0a0d0a 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-[8vw]">

        {/* ── Large name ─────────────────────────────────────────── */}
        <div className="overflow-hidden pt-20 md:pt-28">
          <h2
            ref={nameRef}
            className="whitespace-nowrap text-[clamp(4.2rem,11vw,13rem)] font-semibold leading-[0.88] tracking-[-0.06em] text-[#0a0d0a]"
          >
            Hemanth Konduri
          </h2>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="mt-6 text-[clamp(1rem,1.6vw,1.4rem)] font-medium tracking-[-0.03em] text-[#0a0d0a]/50"
        >
          Full-stack developer · Open to internships
        </p>

        {/* ── Divider ────────────────────────────────────────────── */}
        <div className="my-14 h-px w-full bg-[#0a0d0a]/12" />

        {/* ── Mid row: nav + socials + email ─────────────────────── */}
        <div
          ref={midRef}
          className="flex flex-col gap-10 pb-10 md:flex-row md:items-start md:justify-between md:gap-0"
        >
          {/* Nav */}
          <div className="flex flex-col gap-2">
            <span className="mb-3 font-mono text-[0.72rem] tracking-[0.2em] text-[#0a0d0a]/38 uppercase">
              Navigation
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="w-fit text-[1.05rem] font-medium tracking-[-0.02em] text-[#0a0d0a]/65 transition-colors duration-200 hover:text-[#0a0d0a]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-2">
            <span className="mb-3 font-mono text-[0.72rem] tracking-[0.2em] text-[#0a0d0a]/38 uppercase">
              Socials
            </span>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-[1.05rem] font-medium tracking-[-0.02em] text-[#0a0d0a]/65 transition-colors duration-200 hover:text-[#0a0d0a]"
              >
                {link.label} ↗
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <span className="mb-3 font-mono text-[0.72rem] tracking-[0.2em] text-[#0a0d0a]/38 uppercase">
              Contact
            </span>
            <a
              href="mailto:hemanth@example.com"
              className="w-fit text-[1.05rem] font-medium tracking-[-0.02em] text-[#0a0d0a]/65 transition-colors duration-200 hover:text-[#0a0d0a]"
            >
              kondurihemanth62@gmail.com
            </a>
            <Link
              href="/contact"
              className="mt-4 inline-flex h-11 w-fit items-center justify-center rounded-full bg-[#0a0d0a] px-7 text-[0.95rem] font-semibold text-[#fff7da] transition-transform duration-300 hover:scale-[1.03]"
            >
              Get in touch →
            </Link>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────── */}
        <div
          ref={bottomRef}
          className="flex flex-col items-start gap-2 border-t border-[#0a0d0a]/10 py-8 md:flex-row md:items-center md:justify-between"
        >
          <p className="font-mono text-[0.78rem] tracking-[0.06em] text-[#0a0d0a]/40">
            © 2026 Hemanth Konduri. All rights reserved.
          </p>
          <p className="font-mono text-[0.78rem] tracking-[0.06em] text-[#0a0d0a]/30">
            Designed &amp; built by Hemanth Konduri
          </p>
        </div>

      </div>
    </footer>
  );
}
