import HeroSection from "@/components/ui/hero-section";
import HowItWorks from "@/components/ui/how-it-works";
import ThemeGallery from "@/components/ui/theme-gallery";
import InteractivePreview from "@/components/ui/interactive-preview";
import PricingPlans from "@/components/ui/pricing-plans";
import Testimonials from "@/components/ui/testimonials";
import FAQSection from "@/components/ui/faq-section";
import Footer from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <ThemeGallery />
      <InteractivePreview />
      <PricingPlans />
      <Testimonials />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
