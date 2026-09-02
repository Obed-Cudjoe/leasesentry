"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Our Story" },
  { href: "/about", label: "About" },
  { href: "/visit", label: "Visit & Contact" },
];

// Sticky top navigation with a mobile hamburger menu.
export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-cream/90 backdrop-blur">
      <nav className="container-site flex items-center justify-between py-4">
        <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink">
          {SITE.name}
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-inksoft">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-ember">
              {l.label}
            </Link>
          ))}
          <Link href="/book" className="btn btn-primary">
            Book a table
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label="Toggle menu"
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-line"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-line bg-cream">
          <div className="container-site flex flex-col gap-1 py-4">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink hover:bg-creamdark"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/book" onClick={() => setOpen(false)} className="btn btn-primary mt-2">
              Book a table
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
