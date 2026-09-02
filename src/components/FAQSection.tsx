import FAQAccordion from "./FAQAccordion";
import ScrollReveal from "./ScrollReveal";

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="bg-[#f9faff] px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            Frequently Asked Questions
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <FAQAccordion />
        </ScrollReveal>
      </div>
    </section>
  );
}
