"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { LuArrowUpRight, LuCopy, LuCheck } from "react-icons/lu";
import { useState } from "react";
import Magnetic from "./ui/Magnetic";
import FlexText from "./ui/FlexText";
import BankaiEgg from "./ui/BankaiEgg";

const EMAIL = "diamondfelix006@gmail.com";

const SOCIALS = [
  { name: "GitHub", href: "https://github.com/Felixdiamond", icon: <FaGithub /> },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/felix-dawodu-ba2b08211", icon: <FaLinkedin /> },
  { name: "Twitter", href: "https://x.com/ayanesenpai_", icon: <FaXTwitter /> },
  { name: "WhatsApp", href: "https://wa.me/2348128939779", icon: <FaWhatsapp /> },
];

/**
 * L0 — COPPER · the workbench. Bottom of the stack: the human. Copper
 * traces converge on the one pad that matters — the email.
 */
export default function Workbench() {
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer className="relative w-full min-h-[85vh] bg-void text-text-primary overflow-hidden flex flex-col justify-end">
      {/* Traces converging toward the CTA pad */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.15]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g stroke="#b87333" strokeWidth="1.2" fill="none">
          <path d="M0 120 H420 l60 60 v320 l40 40 H600" />
          <path d="M1200 80 H760 l-40 40 v340 l-60 60 H620" />
          <path d="M0 700 H380 l60 -60 h160" />
          <path d="M1200 640 H840 l-80 -80 H620" />
          <path d="M240 0 V300 l60 60 v180" />
          <path d="M980 0 V260 l-60 60 v200" />
        </g>
        <g fill="#b87333">
          <circle cx="420" cy="120" r="5" />
          <circle cx="760" cy="80" r="5" />
          <circle cx="300" cy="360" r="5" />
          <circle cx="920" cy="320" r="5" />
        </g>
        {/* Everything still flows toward the one pad that matters */}
        <g className="trace-current">
          <g>
            <animateMotion dur="10s" repeatCount="indefinite" path="M0 120 H420 l60 60 v320 l40 40 H600" />
            <circle r="6" fill="#d4a24e" opacity="0.18" />
            <circle r="3" fill="#d4a24e" opacity="0.85" />
          </g>
          <g>
            <animateMotion dur="12s" begin="4s" repeatCount="indefinite" path="M1200 80 H760 l-40 40 v340 l-60 60 H620" />
            <circle r="5" fill="#d4a24e" opacity="0.16" />
            <circle r="2.5" fill="#d4a24e" opacity="0.7" />
          </g>
          <g>
            <animateMotion dur="9s" begin="2s" repeatCount="indefinite" path="M240 0 V300 l60 60 v180" />
            <circle r="5" fill="#d4a24e" opacity="0.16" />
            <circle r="2.5" fill="#d4a24e" opacity="0.65" />
          </g>
        </g>
      </svg>

      <div className="relative z-10 max-w-7xl w-full mx-auto px-5 md:px-14 pt-20 pb-28 md:py-24 flex flex-col justify-between min-h-[85vh]">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-text-muted/70">
            The workbench
          </span>
          <span className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-text-muted/50">
            [ end of stack ]
          </span>
        </div>

        <div className="flex flex-col gap-8 md:gap-10 mt-16 md:mt-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-text-secondary">
              Accepting new connections · remote · any timezone
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              initial={reduceMotion ? false : { y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-[11vw] md:text-[8.5vw] leading-[0.9] font-black uppercase tracking-tighter"
              style={{ fontVariationSettings: '"wdth" 118' }}
            >
              You&apos;ve reached
            </motion.h2>
          </div>
          <div className="overflow-hidden -mt-4 md:-mt-6">
            <motion.h2
              initial={reduceMotion ? false : { y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="text-[11vw] md:text-[8.5vw] leading-[0.9] font-black uppercase tracking-tighter text-accent"
            >
              {/* Bookend: the metal bends under the cursor, like the glass did */}
              <FlexText text="bare metal." instant resting={112} peak={125} />
            </motion.h2>
          </div>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-md text-text-secondary text-sm md:text-base leading-relaxed"
          >
            That&apos;s the whole stack. You just scrolled through it. If your next
            problem lives on more than one of those layers, let&apos;s talk. One
            layer works too.
          </motion.p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Magnetic>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-void font-medium text-sm md:text-base rounded-full hover:bg-accent-hover transition-colors duration-300"
              >
                {EMAIL}
                <LuArrowUpRight />
              </a>
            </Magnetic>
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              className="inline-flex items-center gap-2 px-5 py-4 border border-border-subtle rounded-full font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary hover:border-border-accent hover:text-accent transition-colors duration-300"
            >
              {copied ? <LuCheck className="text-accent" /> : <LuCopy />}
              {copied ? "copied" : "copy"}
            </button>
          </div>
        </div>

        {/* Silkscreen legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-20 md:mt-24 pt-10 border-t border-border">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted/60">Direct</span>
            <a href={`mailto:${EMAIL}`} className="text-sm text-text-secondary hover:text-text-primary transition-colors break-all">
              {EMAIL}
            </a>
            <a href="tel:+2348128939779" className="text-sm text-text-muted hover:text-text-secondary transition-colors">
              +234 812 893 9779
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted/60">Elsewhere</span>
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors w-fit"
              >
                {s.icon} {s.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted/60">Location</span>
            <p className="text-sm text-text-secondary">Lagos, Nigeria</p>
            <p className="text-sm text-text-muted">UTC+1</p>
          </div>

          <div className="flex flex-col gap-3 md:items-end md:text-right">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted/60">Board</span>
            {/* Silkscreen signature — if you know, you know. Press it. */}
            <BankaiEgg />
            <p className="font-mono text-[10px] text-text-muted/60 tracking-[0.15em]">
              © {new Date().getFullYear()} Felix Dawodu
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
