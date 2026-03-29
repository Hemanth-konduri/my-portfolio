import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hemanth Konduri — Fullstack Developer",
  description: "Portfolio of Hemanth Konduri, Fullstack Web Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0a0d0a] text-[#fff7da] antialiased overflow-x-hidden">
        <SmoothScroll />
        <Cursor />
        {children}
        <Footer />
      </body>
    </html>
  );
}
