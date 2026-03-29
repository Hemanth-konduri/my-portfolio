"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import Link from "next/link";

type FormState = "idle" | "sending" | "success" | "error";

const contactLinks = [
  { label: "GitHub", href: "https://github.com", mono: "github.com/hemanth" },
  { label: "LinkedIn", href: "https://linkedin.com", mono: "linkedin.com/in/hemanth" },
  { label: "Email", href: "mailto:your_email@gmail.com", mono: "your_email@gmail.com" },
];

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

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

      gsap.from(".contact-left", {
        scrollTrigger: { trigger: ".contact-grid", start: "top 85%", once: true },
        x: -30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
      });

      gsap.from(".contact-right", {
        scrollTrigger: { trigger: ".contact-grid", start: "top 85%", once: true },
        x: 30,
        opacity: 0,
        duration: 1,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,247,218,0.03)",
    border: "1px solid rgba(255,247,218,0.1)",
    borderRadius: "12px",
    padding: "16px 20px",
    fontSize: "15px",
    color: "#fff7da",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.3s",
  };

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
            &#123; Contact &#125;
          </p>
          <h1
            ref={headingRef}
            className="font-semibold text-[#fff7da] mb-8"
            style={{ fontSize: "clamp(3.5rem, 8vw, 9rem)", lineHeight: 0.88, letterSpacing: "-0.05em" }}
          >
            Let&apos;s work
            <br />
            <span style={{ color: "rgba(255,247,218,0.25)" }}>together.</span>
          </h1>
          <p
            ref={subRef}
            className="font-mono text-[#fff7da]/30 uppercase"
            style={{ fontSize: "13px", letterSpacing: "0.25em" }}
          >
            Open to Internships · Collaborations · Freelance
          </p>
        </section>

        <div style={{ borderTop: "1px solid rgba(255,247,218,0.08)" }} />

        {/* ── Contact grid ── */}
        <section
          className="contact-grid"
          style={{
            paddingTop: "100px",
            paddingBottom: "100px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "100px",
            alignItems: "start",
          }}
        >
          {/* Left — info */}
          <div className="contact-left" style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <p
                className="text-[#fff7da]/60"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.3rem)", lineHeight: 1.85, letterSpacing: "-0.01em" }}
              >
                I&apos;m currently open to internship opportunities, freelance projects, and interesting collaborations. If you have something in mind, I&apos;d love to hear about it.
              </p>
              <p
                className="text-[#fff7da]/60"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.3rem)", lineHeight: 1.85, letterSpacing: "-0.01em" }}
              >
                Whether it&apos;s a quick question or a full project brief — my inbox is always open.
              </p>
            </div>

            {/* Contact links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(255,247,218,0.08)",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                >
                  <span
                    className="font-semibold text-[#fff7da]"
                    style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="font-mono text-[#fff7da]/35"
                    style={{ fontSize: "12px" }}
                  >
                    {link.mono} ↗
                  </span>
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid rgba(255,247,218,0.1)",
                borderRadius: "100px",
                padding: "10px 20px",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 8px #4ade80",
                  flexShrink: 0,
                }}
              />
              <span className="font-mono text-[#fff7da]/50" style={{ fontSize: "12px", letterSpacing: "0.1em" }}>
                Available for opportunities
              </span>
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-right">
            {status === "success" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "24px",
                  padding: "80px 40px",
                  border: "1px solid rgba(255,247,218,0.08)",
                  borderRadius: "20px",
                  textAlign: "center",
                  minHeight: "400px",
                }}
              >
                <span style={{ fontSize: "3rem" }}>✉️</span>
                <h3
                  className="font-semibold text-[#fff7da]"
                  style={{ fontSize: "1.8rem", letterSpacing: "-0.03em" }}
                >
                  Message sent!
                </h3>
                <p className="font-mono text-[#fff7da]/40" style={{ fontSize: "13px", lineHeight: 1.7 }}>
                  Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="font-mono text-[#fff7da]/50 hover:text-[#fff7da] transition-colors duration-300"
                  style={{ fontSize: "12px", letterSpacing: "0.1em", marginTop: "8px" }}
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                {/* Name + Email row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label
                      className="font-mono text-[#fff7da]/30 uppercase"
                      style={{ fontSize: "10px", letterSpacing: "0.18em" }}
                    >
                      Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Hemanth Konduri"
                      required
                      style={inputStyle}
                      onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,247,218,0.3)")}
                      onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,247,218,0.1)")}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label
                      className="font-mono text-[#fff7da]/30 uppercase"
                      style={{ fontSize: "10px", letterSpacing: "0.18em" }}
                    >
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      style={inputStyle}
                      onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,247,218,0.3)")}
                      onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,247,218,0.1)")}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label
                    className="font-mono text-[#fff7da]/30 uppercase"
                    style={{ fontSize: "10px", letterSpacing: "0.18em" }}
                  >
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Internship opportunity / Project collaboration"
                    style={inputStyle}
                    onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,247,218,0.3)")}
                    onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,247,218,0.1)")}
                  />
                </div>

                {/* Message */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label
                    className="font-mono text-[#fff7da]/30 uppercase"
                    style={{ fontSize: "10px", letterSpacing: "0.18em" }}
                  >
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, opportunity, or just say hi..."
                    required
                    rows={7}
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = "rgba(255,247,218,0.3)")}
                    onBlur={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = "rgba(255,247,218,0.1)")}
                  />
                </div>

                {/* Error */}
                {status === "error" && (
                  <p className="font-mono text-red-400" style={{ fontSize: "12px" }}>
                    ✕ {errorMsg}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="font-medium text-[#0a0d0a] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    marginTop: "8px",
                    padding: "16px 32px",
                    background: "#fff7da",
                    borderRadius: "100px",
                    fontSize: "15px",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    width: "100%",
                  }}
                >
                  {status === "sending" ? (
                    <>
                      <span
                        style={{
                          width: "14px",
                          height: "14px",
                          border: "2px solid rgba(10,13,10,0.3)",
                          borderTopColor: "#0a0d0a",
                          borderRadius: "50%",
                          display: "inline-block",
                          animation: "spin 0.7s linear infinite",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    "Send Message →"
                  )}
                </button>
              </form>
            )}
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
            While you&apos;re here,
            <br />
            <span style={{ color: "rgba(255,247,218,0.2)" }}>explore more.</span>
          </h2>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link
              href="/projects"
              className="font-mono text-[#fff7da]/60 hover:text-[#fff7da] transition-all duration-300"
              style={{ fontSize: "14px", padding: "12px 32px", border: "1px solid rgba(255,247,218,0.2)", borderRadius: "100px" }}
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="font-mono text-[#fff7da]/60 hover:text-[#fff7da] transition-all duration-300"
              style={{ fontSize: "14px", padding: "12px 32px", border: "1px solid rgba(255,247,218,0.2)", borderRadius: "100px" }}
            >
              About Me
            </Link>
            <Link
              href="/skills"
              className="font-medium text-[#0a0d0a] transition-all duration-300 hover:scale-[1.03]"
              style={{ fontSize: "14px", padding: "12px 32px", background: "#fff7da", borderRadius: "100px" }}
            >
              Skills →
            </Link>
          </div>
        </section>

      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
