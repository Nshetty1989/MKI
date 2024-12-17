import { HeroSection } from "@/components/landing/HeroSection";
import { WhyChooseSection } from "@/components/landing/WhyChooseSection";
import { ExperienceFutureSection } from "@/components/landing/ExperienceFutureSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-kingdom-dark to-black">
      <main>
        <HeroSection />
        <WhyChooseSection />
        <ExperienceFutureSection />
        <TestimonialsSection />
        <div id="faq-section">
          <FAQSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;