"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import { TextPlugin } from "gsap/dist/TextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin);
}

export { gsap, ScrollTrigger, SplitText, TextPlugin };
