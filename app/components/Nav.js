'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-forest">
      <div className="flex justify-between items-center px-5 py-5 sm:px-14 sm:py-6">
        <Link href="/" className="font-heading text-xl font-bold text-cream tracking-[0.3px] no-underline">
          GenAI<span className="text-terracotta">Educate</span>
        </Link>
        <div className="flex items-center gap-5 sm:gap-9">
          <div className="hidden sm:flex gap-9 font-body text-[15px] text-cream/85">
            <Link href="/program" className="no-underline text-inherit hover:text-cream transition-colors">Program</Link>
            <Link href="/about" className="no-underline text-inherit hover:text-cream transition-colors">About</Link>
            <Link href="/contact" className="no-underline text-inherit hover:text-cream transition-colors">Contact</Link>
          </div>
          <Link
            href="/contact"
            className="hidden sm:inline-block font-body text-sm font-semibold text-cream bg-terracotta px-5 py-2.5 rounded-sm no-underline whitespace-nowrap"
          >
            Start a conversation
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="sm:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 shrink-0"
          >
            <span className={`block w-6 h-[2px] bg-cream transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block w-6 h-[2px] bg-cream transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[2px] bg-cream transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="sm:hidden flex flex-col px-5 pb-5 gap-1 border-t border-cream/10">
          <Link
            href="/program"
            onClick={() => setOpen(false)}
            className="font-body text-[15px] text-cream/85 no-underline py-3 border-b border-cream/10"
          >
            Program
          </Link>
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="font-body text-[15px] text-cream/85 no-underline py-3 border-b border-cream/10"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="font-body text-[15px] text-cream/85 no-underline py-3"
          >
            Contact
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="text-center font-body text-sm font-semibold text-cream bg-terracotta px-5 py-3 rounded-sm no-underline mt-2"
          >
            Start a conversation
          </Link>
        </div>
      )}
    </nav>
  );
}
