import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-5 py-5 sm:px-14 sm:py-6 bg-forest">
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
          className="font-body text-xs sm:text-sm font-semibold text-cream bg-terracotta px-4 py-2 sm:px-5 sm:py-2.5 rounded-sm no-underline whitespace-nowrap"
        >
          Start a conversation
        </Link>
      </div>
    </nav>
  );
}
