import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PainPointsSection from "@/components/PainPointsSection";
import SolutionsSection from "@/components/SolutionsSection";
import FeaturesSection from "@/components/FeaturesSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CaseStudySection from "@/components/CaseStudySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "TruckFlow — Smart POS for Food Trucks" },
      { name: "description", content: "Power your food truck with fast POS, real-time analytics, and order management. Built for speed and mobility." },
      { property: "og:title", content: "TruckFlow — Smart POS for Food Trucks" },
      { property: "og:description", content: "The all-in-one business management system designed for food trucks and mobile food businesses." },
    ],
  }),
});

function Index() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PainPointsSection />
      <SolutionsSection />
      <FeaturesSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <CaseStudySection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
