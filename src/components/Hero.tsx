import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center bg-[#f8f9fc] px-5 pb-6 pt-16 sm:px-8 sm:pb-8 sm:pt-20 md:pt-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        {/* Badge */}
        <div
          className="animate-rise-up mb-6 inline-flex items-center gap-2 rounded-full bg-[#e8f0fe] px-4 py-2 sm:mb-8 sm:px-5 sm:py-2.5"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-base sm:text-lg" aria-hidden="true">
            ⚡
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#2563eb] sm:text-xs md:text-sm">
            Powered by Next-Gen Artificial Intelligence
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-rise-up max-w-4xl text-[2.25rem] font-bold leading-[1.1] tracking-tight text-[#0f172a] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem]"
          style={{ animationDelay: "0.25s" }}
        >
          Build Better Wealth
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Decisions with AI
        </h1>

        {/* Subheadline */}
        <p
          className="animate-rise-up mt-6 max-w-2xl text-base leading-relaxed text-[#64748b] sm:mt-8 sm:text-lg md:max-w-3xl md:text-xl lg:text-2xl lg:leading-relaxed"
          style={{ animationDelay: "0.4s" }}
        >
          The precision of a quantitative hedge fund, delivered as a
          personalized concierge. Optimize your portfolio with deep-tech
          insights that traditional advisors miss.
        </p>

        {/* CTA Buttons */}
        <div
          className="animate-rise-up mt-8 flex w-full flex-col items-center justify-center gap-4 sm:mt-10 sm:w-auto sm:flex-row sm:gap-5"
          style={{ animationDelay: "0.55s" }}
        >
          <Link
            href="/login"
            className="w-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-8 py-3.5 text-base font-bold text-white shadow-[0_8px_24px_rgba(37,99,235,0.35)] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto sm:px-10 sm:py-4 sm:text-lg"
          >
            Start Free
          </Link>

          <a
            href="#"
            className="flex w-full items-center justify-center gap-2.5 rounded-full border border-[#e2e8f0] bg-white px-8 py-3.5 text-base font-semibold text-[#0f172a] shadow-sm transition-colors hover:border-[#cbd5e1] hover:bg-[#fafafa] sm:w-auto sm:px-10 sm:py-4 sm:text-lg"
          >
            <PlayIcon />
            Watch Demo
          </a>
        </div>
      </div>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M8 5.14v14.72a1 1 0 001.5.86l11.04-7.36a1 1 0 000-1.72L9.5 4.28A1 1 0 008 5.14z" />
    </svg>
  );
}
