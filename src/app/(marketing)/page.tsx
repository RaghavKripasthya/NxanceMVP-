import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import Hero from "@/components/Hero";
import IntelligenceSection from "@/components/IntelligenceSection";
import PricingSection from "@/components/PricingSection";
import ProductShowcase from "@/components/ProductShowcase";
import TrustBar from "@/components/TrustBar";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <ProductShowcase />
      <TrustBar />
      <IntelligenceSection />
      <PricingSection />
      <FAQSection />
      <CTABanner />
    </main>
  );
}
