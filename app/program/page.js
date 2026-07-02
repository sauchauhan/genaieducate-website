import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProgramTiles from './ProgramTiles';

export const metadata = {
  title: "Programs | GenAIEducate",
  description: "Corporate AI training for engineering teams, the Applied GenAI Engineering Program cohort, and AI workshops for decision-makers.",
};

export default function Program() {
  const dotPattern = "bg-[radial-gradient(circle_at_1px_1px,rgba(255,248,240,0.09)_1px,transparent_0)] bg-[length:28px_28px]";

  return (
    <main className="bg-white min-h-screen">
      <Nav />

      {/* Header */}
      <section className={`relative bg-forest px-5 py-16 sm:px-14 sm:py-20 lg:py-24 overflow-hidden ${dotPattern}`}>
        <div className="relative max-w-[820px]">
          <div className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold mb-6 sm:mb-7">
            What we offer
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] tracking-tight text-cream font-bold m-0">
            Training built for engineers, and the teams they work on.
          </h1>
          <p className="font-body text-base sm:text-lg leading-7 sm:leading-[1.7] text-cream/80 mt-6 sm:mt-7 max-w-[600px]">
            Corporate training for engineering teams, our flagship cohort
            program for individual engineers, and workshops for the
            decision-makers around them. Pick a program below to see the
            full details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-9 sm:mt-11">
            <a
              href="https://wa.me/919326392693?text=Hi%20Saurav%2C%20I%27d%20like%20to%20talk%20about%20AI%20training%20for%20our%20engineering%20team."
              className="w-full sm:w-auto text-center font-body text-sm font-semibold text-cream bg-terracotta px-7 py-3.5 rounded-sm no-underline"
            >
              Talk to us about your team
            </a>
            <a
              href="#programs"
              className="w-full sm:w-auto text-center font-body text-sm font-semibold text-cream border-[1.5px] border-cream/60 px-7 py-3.5 rounded-sm no-underline"
            >
              Explore our programs
            </a>
          </div>
        </div>
      </section>

      <ProgramTiles />

      {/* CTA */}
      <section className={`relative bg-forest px-5 py-16 sm:py-24 text-center overflow-hidden ${dotPattern}`}>
        <div className="relative">
          <h2 className="font-heading text-3xl sm:text-[34px] text-cream font-bold mb-4 leading-tight">
            Not sure which fits?
          </h2>
          <p className="font-body text-base text-cream/80 mb-9 max-w-[520px] mx-auto">
            Tell us what you or your team need, and we&apos;ll point you to
            the right program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-stretch max-w-xs sm:max-w-none mx-auto">
            <a
              href="https://wa.me/919326392693?text=Hi%20Saurav%2C%20I%27d%20like%20to%20know%20more%20about%20the%20next%20cohort%20of%20the%20Applied%20GenAI%20Engineering%20Program."
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
