import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function CTABanner() {
  return (
    <section className="bg-[#f9faff] px-5 pb-16 sm:px-8 sm:pb-20 md:pb-24 lg:pb-28">
      <ScrollReveal>
        <div className="mx-auto max-w-6xl rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#7c3aed] px-6 py-12 text-center shadow-[0_20px_60px_rgba(37,99,235,0.25)] sm:rounded-3xl sm:px-10 sm:py-14 md:px-16 md:py-16 lg:py-20">
          <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            Future-proof Your Portfolio Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:mt-5 sm:text-lg md:text-xl">
            Stop guessing and start building with data-backed intelligence that
            adapts to you.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-bold text-[#2563eb] shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] sm:mt-10 sm:px-10 sm:py-4 sm:text-lg"
          >
            Get Started Free
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
