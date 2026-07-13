import { Lora, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';

// The GenAI Brief uses its own typographic system (Lora / IBM Plex Sans / IBM
// Plex Mono), distinct from the main site's Georgia/Calibri. Loaded here and
// exposed as CSS variables that tailwind.config.js maps to font-brief-*.
const lora = Lora({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-brief-serif',
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-brief-sans',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-brief-mono',
  display: 'swap',
});

export default function BriefLayout({ children }) {
  return (
    <div className={`${lora.variable} ${plexSans.variable} ${plexMono.variable}`}>
      {children}
    </div>
  );
}
