"use client";

import { profile, navLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-5 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="text-center md:text-left">
          <a href="#home" className="text-lg font-semibold tracking-tight text-white">
            HARIOM<span className="text-accent-glow">.</span>
          </a>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/45">
            {profile.role} — building scalable, production-ready web
            applications.
          </p>
          <p className="mt-3 flex items-center justify-center gap-2 text-sm text-white/40 md:justify-start">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for opportunities
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/45 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-2 md:items-end">
          <div className="flex gap-3">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/60 transition-all hover:border-white/25 hover:text-white"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 4h16v16H4zM4 6l8 6 8-6" />
              </svg>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/60 transition-all hover:border-white/25 hover:text-white"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M8 10v6M8 7v.01M12 16v-3a2 2 0 0 1 4 0v3M12 16v-6" />
              </svg>
            </a>
          </div>
          <p className="mt-2 text-xs text-white/30">
            © {new Date().getFullYear()} Hariom Sharma
          </p>
        </div>
      </div>
    </footer>
  );
}
