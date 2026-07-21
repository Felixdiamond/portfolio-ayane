"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaGamepad, FaBolt, FaMicrochip, FaEarListen, FaSeedling, FaBluetooth } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const EXPERIMENTS = [
  {
    ref: "U1",
    title: "ESP_DECK",
    type: "Embedded / KiCad",
    desc: "A handheld console from scratch: ESP32, OLED, custom firmware. Currently graduating from breadboard to its own KiCad PCB.",
    icon: <FaGamepad />,
    status: "PCB REV A",
  },
  {
    ref: "U2",
    title: "TINY_ML",
    type: "Edge AI / ESP32",
    desc: "A keyword-spotting model living on an ESP32 in under 1MB of RAM. No cloud, no internet. It hears “fan on” and obeys.",
    icon: <FaEarListen />,
    status: "ONLINE",
  },
  {
    ref: "U3",
    title: "PLANT_LINK",
    type: "AgTech / Sensors",
    desc: "An ESP32 soil station reading moisture, pH, and N-P-K. Plants can’t talk. This is a way for them to.",
    icon: <FaSeedling />,
    status: "FIELD TEST",
  },
  {
    ref: "U4",
    title: "PAD_BRIDGE",
    type: "USB / BLE",
    desc: "A ₦2,500 knockoff gamepad speaks USB-A and phones don’t. An ESP32-S3 sits between, reading USB and re-broadcasting as native Bluetooth.",
    icon: <FaBluetooth />,
    status: "DAILY DRIVER",
  },
  {
    ref: "U5",
    title: "COIL_GUN",
    type: "High Voltage / Physics",
    desc: "Experimental resonant transformer and magnetic propulsion studies.",
    icon: <FaBolt />,
    status: "CONCEPT",
  },
  {
    ref: "U6",
    title: "1_BIT_CPU",
    type: "Architecture",
    desc: "A full adder out of bare logic gates, torn down and rebuilt flush after the first rat’s nest taught me why clean circuits debug faster.",
    icon: <FaMicrochip />,
    status: "REBUILT",
  },
];

/** Copper trace backdrop — static SVG, no filters, no canvas. */
function TraceField() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.13]"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <g stroke="#b87333" strokeWidth="1.2" fill="none">
        <path d="M0 80 H340 l40 40 H700 l30 -30 H1200" />
        <path d="M0 200 H180 l30 30 H520 l40 -40 H900 l40 40 h260" />
        <path d="M0 420 H260 l50 -50 H640 l30 30 H1040 l40 -40 h120" />
        <path d="M120 0 V140 l40 40 V380 l-30 30 V600" />
        <path d="M860 0 V90 l-30 30 V330 l40 40 V600" />
        <path d="M1080 0 V200 l30 30 V520" />
      </g>
      <g fill="#b87333">
        <circle cx="340" cy="80" r="5" />
        <circle cx="180" cy="200" r="5" />
        <circle cx="900" cy="200" r="5" />
        <circle cx="640" cy="370" r="5" />
        <circle cx="120" cy="140" r="5" />
        <circle cx="860" cy="90" r="5" />
        <circle cx="1080" cy="230" r="5" />
      </g>
      <g fill="#d4a24e">
        <rect x="695" y="45" width="10" height="10" />
        <rect x="515" y="225" width="10" height="10" />
        <rect x="1035" y="415" width="10" height="10" />
      </g>
      {/* Current on the bus — small charge packets travelling the traces */}
      <g className="trace-current" fill="#d4a24e">
        <circle r="3.5" opacity="0.9">
          <animateMotion dur="9s" repeatCount="indefinite" path="M0 80 H340 l40 40 H700 l30 -30 H1200" />
        </circle>
        <circle r="3" opacity="0.75">
          <animateMotion dur="12s" begin="3s" repeatCount="indefinite" path="M0 200 H180 l30 30 H520 l40 -40 H900 l40 40 h260" />
        </circle>
        <circle r="3" opacity="0.7">
          <animateMotion dur="11s" begin="6s" repeatCount="indefinite" path="M0 420 H260 l50 -50 H640 l30 30 H1040 l40 -40 h120" />
        </circle>
        <circle r="2.5" opacity="0.6">
          <animateMotion dur="10s" begin="1.5s" repeatCount="indefinite" path="M860 0 V90 l-30 30 V330 l40 40 V600" />
        </circle>
      </g>
    </svg>
  );
}

/**
 * L0 — COPPER · the hardware lab. The Construct sits where it belongs
 * now: at the bottom of the stack, printed on the board.
 */
export default function CopperLab() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".construct-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center+=150",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 md:py-36 bg-void z-40 overflow-hidden rounded-t-[2.5rem] md:rounded-t-[3rem] border-t border-accent/20 shadow-[0_-30px_60px_rgba(0,0,0,0.7)]"
    >
      <TraceField />

      <div className="max-w-7xl mx-auto px-5 md:px-14 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 border-b border-border pb-8 md:pb-10">
          <div>
            <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-accent/80 block mb-3">
              Hardware lab · off the clock
            </span>
            <h2 className="text-[12.5vw] md:text-8xl font-black text-text-primary uppercase tracking-tighter" data-vskew>
              The
              <br />
              Construct
            </h2>
          </div>
          <div className="mt-8 md:mt-0 md:text-right">
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.25em] text-text-muted/50 block mb-3">
              [ L0 · COPPER ]
            </span>
            <p className="text-text-muted max-w-sm font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] leading-relaxed">
              Experimental prototypes, unfinished
              <br />
              code, and things that spark.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXPERIMENTS.map((item) => (
            <div
              key={item.ref}
              className="construct-card group relative bg-surface/30 border border-border p-7 md:p-8 min-h-72 flex flex-col justify-between overflow-hidden hover:bg-surface/50 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex justify-between items-start relative z-10">
                <span className="text-3xl md:text-4xl text-text-faint group-hover:text-accent transition-colors duration-300">
                  {item.icon}
                </span>
                <div className="flex flex-col items-end gap-1.5">
                  {/* Component designator — this card is a part on the board */}
                  <span className="font-mono text-[10px] text-accent/70">{item.ref}</span>
                  <span className="font-mono text-[9px] border border-border px-2 py-0.5 text-text-muted tracking-[0.15em]">
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="relative z-10">
                <span className="font-mono text-[9px] text-text-muted/60 tracking-[0.2em] uppercase block mb-2">
                  {item.type}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-text-primary uppercase tracking-tight mb-2 group-hover:translate-x-1.5 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>

              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-border group-hover:w-full group-hover:h-full group-hover:border-accent/30 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-border group-hover:w-full group-hover:h-full group-hover:border-accent/30 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
