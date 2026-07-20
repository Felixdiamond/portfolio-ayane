import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-dvh bg-carbon flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted/60 mb-6">
        [ L? · UNMAPPED ]
      </p>
      <h1
        className="text-[28vw] md:text-[14vw] font-black leading-none text-text-primary uppercase tracking-tighter"
        style={{ fontVariationSettings: '"wdth" 118' }}
      >
        404
      </h1>
      <div className="mt-8 font-mono text-xs md:text-sm text-text-secondary leading-loose">
        <p>
          <span className="text-accent">$</span> cd {`{this page}`}
        </p>
        <p className="text-text-muted">bash: cd: no such layer in the stack</p>
      </div>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-3 px-7 py-3.5 text-[11px] font-medium tracking-widest uppercase text-text-primary/90 border border-border-subtle rounded-full transition-all duration-300 hover:border-border-accent hover:bg-accent/5"
      >
        Return to the surface
        <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0 0l-6-6m6 6l6-6" />
        </svg>
      </Link>
    </main>
  );
}
