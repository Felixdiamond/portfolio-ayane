"use client";
import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaGamepad, FaTerminal, FaBolt, FaMicrochip, FaChevronRight, FaExpand } from "react-icons/fa6";
import DecryptedText from "@/components/ui/DecryptedText";

gsap.registerPlugin(ScrollTrigger);
import { AnimatePresence, motion } from "framer-motion";

const experiments = [
    {
        id: "01",
        title: "ESP_DECK",
        type: "Embedded / C++",
        desc: "Portable gaming console built from scratch with ESP32, OLED display, and custom firmware.",
        icon: <FaGamepad />,
        status: "PROTOTYPE",
        code: "void setup() { system.init(GUI); }"
    },
    {
        id: "02",
        title: "PIPWATCH",
        type: "CLI / Automation",
        desc: "Intelligent CLI tool that automatically detects and installs missing Python dependencies via AST parsing.",
        icon: <FaTerminal />,
        status: "ONLINE",
        code: "pip install auto-detect --force"
    },
    {
        id: "03",
        title: "COIL_GUN",
        type: "High Voltage",
        desc: "Experimental resonant transformer and magnetic propulsion studies.",
        icon: <FaBolt />,
        status: "CONCEPT",
        code: "WARN: HIGH_VOLTAGE_DETECTED"
    },
    {
        id: "04",
        title: "1_BIT_CPU",
        type: "Architecture",
        desc: "Physical logic gate simulation and 1-bit full adder implementation.",
        icon: <FaMicrochip />,
        status: "ARCHIVED",
        code: "01010101 00001111"
    }
];

const CodeTypewriter = ({ code, isExpanded }: { code: string, isExpanded: boolean }) => {
    const [displayCode, setDisplayCode] = useState("");
    
    useEffect(() => {
        if (isExpanded) {
            let i = 0;
            setDisplayCode("");
            const interval = setInterval(() => {
                setDisplayCode(prev => code.slice(0, i + 1));
                i++;
                if (i > code.length) clearInterval(interval);
            }, 30);
            return () => clearInterval(interval);
        } else {
            setDisplayCode("");
        }
    }, [isExpanded, code]);

    return (
        <span className="font-mono text-accent/90">
            {displayCode}
        </span>
    );
};

export default function ConstructMobile({}: {}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [scanned, setScanned] = useState(false);
    
    const handleExpand = (id: string) => {
        if (navigator.vibrate) navigator.vibrate(10);
        setExpandedId(expandedId === id ? null : id);
    };

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
            },
            onComplete: () => setScanned(true)
        });
        
    }, { scope: containerRef });

    return (
        <section id="philosophy" ref={containerRef} className="relative w-full py-20 bg-transparent overflow-hidden min-h-[80vh] flex flex-col">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="scan-line absolute left-0 right-0 h-[2px] bg-accent shadow-[0_0_20px_rgba(var(--accent-rgb),0.8)] z-50 pointer-events-none top-0" />

            <div className="px-6 relative z-10 flex-1 flex flex-col">
                <div className="mb-10 relative">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                        <span className="text-[10px] uppercase tracking-widest text-text-muted font-mono">
                            System Status: <DecryptedText text="EXPERIMENTAL" animateOn="view" revealDirection="start" speed={100} className="text-accent inline-block" />
                        </span>
                    </div>
                    
                    <h2 className="text-4xl font-black uppercase text-text-primary tracking-tighter mix-blend-difference overflow-hidden flex flex-wrap gap-x-2">
                         <DecryptedText 
                            text="THE CONSTRUCT" 
                            animateOn="view" 
                            speed={70} 
                            maxIterations={20}
                            className="text-text-primary"
                            revealDirection="center"
                         />
                    </h2>
                    
                    <p className="text-xs text-text-muted mt-4 border-l-2 border-accent/30 pl-3 font-mono leading-relaxed">
                        // ACCESSING ARCHIVES...<br/>
                        // LOADING UNFINISHED PROTOCOLS...
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {experiments.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: parseInt(item.id) * 0.1 }}
                            onClick={() => handleExpand(item.id)}
                            className={`
                                relative border border-border/50 bg-surface/20 backdrop-blur-sm overflow-hidden 
                                transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                                ${expandedId === item.id ? 'ring-1 ring-accent/50 bg-surface/40 scale-[1.02] shadow-[0_0_30px_rgba(var(--accent-rgb),0.15)] my-1' : 'active:scale-[0.98]'}
                            `}
                        >
                             {expandedId === item.id && (
                                <motion.div 
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-accent/5 pointer-events-none z-0 mix-blend-overlay"
                                />
                             )}

                            <div className="p-5 flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className={`
                                        text-xl w-10 h-10 flex items-center justify-center rounded bg-surface/50 border border-border/30
                                        ${expandedId === item.id ? 'text-accent border-accent/30 shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]' : 'text-text-muted'}
                                        transition-all duration-300
                                    `}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-border/40 text-text-muted/80">
                                                {item.id}
                                            </span>
                                            <span className={`text-[9px] font-bold tracking-wider ${expandedId === item.id ? 'text-accent' : 'text-text-muted'}`}>
                                                {expandedId === item.id ? (
                                                    <DecryptedText text={item.status} animateOn="view" speed={80} maxIterations={5} />
                                                ) : item.status}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-text-primary tracking-tight">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                                <motion.div 
                                    animate={{ rotate: expandedId === item.id ? 90 : 0 }}
                                    className={`transition-colors duration-300 ${expandedId === item.id ? 'text-accent' : 'text-text-muted/50'}`}
                                >
                                    <FaChevronRight size={12} />
                                </motion.div>
                            </div>

                            <AnimatePresence>
                                {expandedId === item.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden relative z-10"
                                    >
                                        <div className="p-5 pt-0 border-t border-border/10">
                                            <p className="text-sm text-text-muted leading-relaxed mb-4 mt-4">
                                                {item.desc}
                                            </p>
                                            
                                            <div className="bg-black/40 rounded p-3 border border-white/5 font-mono text-[10px] overflow-x-auto whitespace-nowrap scrollbar-none relative group">
                                                <div className="absolute top-0 right-0 p-1 opacity-50">
                                                     <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                                                </div>
                                                <span className="text-accent/40 mr-2">$</span>
                                                <CodeTypewriter code={item.code} isExpanded={expandedId === item.id} />
                                                <span className="animate-pulse ml-1 opacity-50 text-accent">_</span>
                                            </div>

                                            <div className="mt-4 flex justify-between items-center">
                                                <span className="text-[10px] text-text-muted uppercase tracking-wider">
                                                    Type: {item.type}
                                                </span>
                                                <button className="text-[10px] flex items-center gap-1.5 text-text-primary bg-white/5 px-3 py-1.5 rounded hover:bg-white/10 transition-colors border border-white/5 hover:border-accent/20">
                                                    EXPLORE <FaExpand size={8} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                             <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: expandedId === item.id ? 1 : 0 }}
                                className="absolute top-0 right-0 p-2 pointer-events-none"
                            >
                                <div className="w-2 h-2 border-t border-r border-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]" />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-auto pt-10 pb-5">
                    <div className="flex justify-between text-[9px] text-text-muted/30 font-mono uppercase">
                        <span>SECURE_CONN_ESTABLISHED</span>
                        <span>v.2.0.4</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
