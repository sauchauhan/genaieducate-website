import Nav from '../components/Nav';
import Footer from '../components/Footer';

export const metadata = {
  title: "Contact | GenAIEducate",
  description: "Get in touch with GenAIEducate over WhatsApp or email. No forms, no funnels.",
};

export default function Contact() {
  const dotPattern = "bg-[radial-gradient(circle_at_1px_1px,rgba(255,248,240,0.09)_1px,transparent_0)] bg-[length:28px_28px]";

  return (
    <main className="bg-white min-h-screen">
      <Nav />

      <section className={`relative bg-forest px-5 py-24 sm:py-32 text-center overflow-hidden ${dotPattern}`}>
        <div className="relative max-w-[560px] mx-auto">
          <div className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold mb-6 sm:mb-7">
            Get in touch
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl leading-[1.1] tracking-tight text-cream font-bold m-0">
            Start a conversation
          </h1>
          <p className="font-body text-base sm:text-lg leading-relaxed text-cream/80 mt-6 sm:mt-7">
            Whether you&apos;re exploring for yourself or evaluating for your
            team, we&apos;re happy to talk. No forms, no funnels, just a
            direct line.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-stretch max-w-xs sm:max-w-none mx-auto mt-9 sm:mt-11">
            <a
              href="https://wa.me/919326392693?text=Hi%20Saurav%2C%20I%20just%20visited%20the%20GenAIEducate%20website.%20Could%20you%20tell%20me%20more%20about%20the%20next%20cohort%3F"
              className="w-full sm:w-auto text-center font-body text-sm font-semibold text-cream bg-terracotta px-7 py-3.5 rounded-sm no-underline"
            >
              WhatsApp
            </a>
            <a
              href="mailto:hello@genaieducate.com"
              className="w-full sm:w-auto text-center font-body text-sm font-semibold text-cream border-[1.5px] border-cream/60 px-7 py-3.5 rounded-sm no-underline"
            >
              Email us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
