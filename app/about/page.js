import Nav from '../components/Nav';
import Footer from '../components/Footer';

export const metadata = {
  title: "About | GenAIEducate",
  description: "GenAIEducate is built by a practitioner instructor with a 3+ year track record training working professionals in Data Science and Generative AI.",
};

export default function About() {
  const trackStats = [
    { n: "4.85/5", label: "Avg. mentoring rating, consistent across 3 years" },
    { n: "56", label: "Sessions delivered" },
    { n: "112", label: "Hours delivered" },
    { n: "115+", label: "Professionals trained" },
  ];

  const subjects = [
    { name: "SQL", ratings: "4.8, 4.9" },
    { name: "Introduction to Generative AI", ratings: "4.9" },
    { name: "Machine Learning 1", ratings: "4.7" },
    { name: "Machine Learning 2", ratings: "4.9, 4.9" },
    { name: "Unsupervised Learning", ratings: "4.7, 4.9" },
    { name: "Predictive Modeling", ratings: "4.8, 4.9" },
    { name: "Inferential Statistics", ratings: "4.9, 4.9" },
    { name: "Python for Data Science", ratings: "4.7, 4.8" },
    { name: "Time Series Forecasting", ratings: "4.9" },
  ];

  const philosophy = [
    {
      n: "01",
      title: "Teach less, go deeper",
      body: "We would rather cover fewer topics and have you actually understand them than race through a syllabus. Depth over coverage.",
    },
    {
      n: "02",
      title: "Demo-first, always",
      body: "Every concept is shown working before it's explained in theory. You see the system run, then we open it up.",
    },
  ];

  const dotPattern = "bg-[radial-gradient(circle_at_1px_1px,rgba(255,248,240,0.09)_1px,transparent_0)] bg-[length:28px_28px]";

  return (
    <main className="bg-white min-h-screen">
      <Nav />

      {/* Header */}
      <section className={`relative bg-forest px-5 py-16 sm:px-14 sm:py-20 lg:py-24 overflow-hidden ${dotPattern}`}>
        <div className="relative max-w-[760px]">
          <div className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold mb-6 sm:mb-7">
            About GenAIEducate
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[52px] leading-[1.1] tracking-tight text-cream font-bold m-0">
            Teach less. Go deeper.
          </h1>
          <p className="font-body text-base sm:text-lg leading-7 sm:leading-[1.7] text-cream/80 mt-6 sm:mt-7 max-w-[600px]">
            GenAIEducate is built and taught by a practitioner instructor,
            not a curriculum team assembling slides. Every session comes from
            direct engineering practice and years of teaching it live to
            working professionals.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-white px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
        <div className="max-w-[1040px] mx-auto">
          <div className="flex items-center gap-4 mb-10 sm:mb-14">
            <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
              Our philosophy
            </span>
            <span className="flex-1 h-px bg-[#E2DCCE]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {philosophy.map((p) => (
              <div key={p.n} className="bg-white border border-[#E0E0E0] border-l-4 border-l-terracotta rounded p-7">
                <div className="font-mono text-sm text-terracotta font-bold mb-4">
                  {p.n}
                </div>
                <h3 className="font-heading text-xl text-forest font-bold mb-3">
                  {p.title}
                </h3>
                <p className="font-body text-[15px] text-dark leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Background + track record stats */}
      <section className="bg-lightgray px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
        <div className="max-w-[1040px] mx-auto">
          <div className="flex items-center gap-4 mb-10 sm:mb-14">
            <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
              Background
            </span>
            <span className="flex-1 h-px bg-[#DCDCDC]" />
          </div>
          <p className="font-body text-base sm:text-lg leading-relaxed text-dark max-w-[760px] mb-10 sm:mb-12">
            Previously: 3+ years as a Data Science instructor at a leading
            edtech platform, delivering live programs to working
            professionals across SQL, Python, Machine Learning, Statistics,
            and Generative AI.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {trackStats.map((s) => (
              <div key={s.label} className="bg-white border border-[#E0E0E0] rounded p-6">
                <div className="font-mono text-3xl sm:text-4xl text-terracotta font-bold mb-2">
                  {s.n}
                </div>
                <div className="font-body text-sm text-dark leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects taught */}
      <section className="bg-white px-5 py-12 sm:px-14 sm:py-20 lg:py-24">
        <div className="max-w-[1040px] mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs tracking-[2px] uppercase text-terracotta font-semibold whitespace-nowrap">
              Subjects taught
            </span>
            <span className="flex-1 h-px bg-[#E2DCCE]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-[34px] text-forest font-bold mb-2 leading-tight">
            Rated 4.5+ across every subject.
          </h2>
          <p className="font-body text-base text-[#666] mb-10 sm:mb-12 max-w-[600px]">
            Consistently rated 4.5 and above across 14+ different subjects
            over 3 years. Teaching quality is not subject-dependent.
          </p>

          <div className="border-t border-[#E2DCCE]">
            {subjects.map((s) => (
              <div
                key={s.name}
                className="flex justify-between items-center gap-4 py-4 px-4 -mx-4 border-b border-[#E2DCCE] transition-colors hover:bg-lightgray"
              >
                <span className="font-body text-[15px] text-dark">
                  {s.name}
                </span>
                <span className="font-mono text-sm text-forest font-semibold whitespace-nowrap">
                  {s.ratings}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`relative bg-forest px-5 py-16 sm:py-24 text-center overflow-hidden ${dotPattern}`}>
        <div className="relative">
          <h2 className="font-heading text-3xl sm:text-[34px] text-cream font-bold mb-4 leading-tight">
            Start a conversation
          </h2>
          <p className="font-body text-base text-cream/80 mb-9 max-w-[520px] mx-auto">
            Whether you&apos;re exploring for yourself or evaluating for your
            team, we&apos;re happy to talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-stretch max-w-xs sm:max-w-none mx-auto">
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
