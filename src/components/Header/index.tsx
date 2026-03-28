"use client";

import { forwardRef } from "react";
import Link from "next/link";

const menuItems = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
  { label: "Acheivements", href: "/certificates" }
];

const Header = forwardRef<HTMLElement>(function Header(_, ref) {
  return (
    <header
      ref={ref}
      className="relative z-20 border-b border-[#f7f0d2]/10 bg-[linear-gradient(180deg,rgba(19,21,18,0.96),rgba(15,17,14,0.84))]"
    >
      <div className="mx-auto flex min-h-[92px] w-full max-w-[1680px] items-center gap-6 px-5 md:px-8 lg:px-12">
        <Link
          href="/"
          className="shrink-0 text-[2.8rem] font-extrabold leading-none tracking-[-0.08em] text-[#fff7da]"
        >
          hk
        </Link>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <nav className="flex items-center gap-12 rounded-full border border-[#f7f0d2]/10 bg-[#111411]/70 px-8 py-4 text-[1.45rem] text-[#f7f0d2]/72 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors duration-300 hover:text-[#fff7da]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="ml-auto">
          <a
            href="#contact"
            className="inline-flex min-h-12 min-w-[170px] items-center justify-center rounded-full bg-[#fff7da] px-8 text-lg font-semibold text-[#0d100d] transition-transform duration-300 hover:scale-[1.03]"
          >
            Let&apos;s talk
          </a>
        </div>
      </div>
    </header>
  );
});

export default Header;
