import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark px-5 py-8 sm:px-14">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center max-w-[1100px] mx-auto">
        <div className="font-heading text-base font-bold text-cream">
          GenAI<span className="text-terracotta">Educate</span>
          <span className="font-body text-xs text-[#999] font-normal ml-3">Institute for Generative AI</span>
        </div>
        <div className="flex gap-6 font-body text-xs text-[#999]">
          <Link href="/program" className="no-underline text-inherit hover:text-cream transition-colors">Program</Link>
          <Link href="/about" className="no-underline text-inherit hover:text-cream transition-colors">About</Link>
          <Link href="/this-week-in-ai" className="no-underline text-inherit hover:text-cream transition-colors">The GenAI Brief</Link>
          <Link href="/contact" className="no-underline text-inherit hover:text-cream transition-colors">Contact</Link>
          <Link href="/verify" className="no-underline text-inherit hover:text-cream transition-colors">Verify a Certificate →</Link>
        </div>
        <div className="font-body text-xs text-[#999]">
          &copy; 2026 GenAIEducate
        </div>
      </div>
    </footer>
  );
}
