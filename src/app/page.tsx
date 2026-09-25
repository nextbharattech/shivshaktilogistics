import React from "react";
import Link from "next/link";
import { ArrowRight, PhoneCall, ShieldCheck, Zap } from "lucide-react";
import { Hero } from "@/components/Hero";
import { InteractiveStory } from "@/components/InteractiveStory";
import { ServicesSection } from "@/components/ServicesSection";
import { GlobalNetwork } from "@/components/GlobalNetwork";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { IndustriesSection } from "@/components/IndustriesSection";
import { TechnologySection } from "@/components/TechnologySection";
import { CinematicVideoSection } from "@/components/CinematicVideoSection";
import { ProcessSection } from "@/components/ProcessSection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { QuoteCalculator } from "@/components/QuoteCalculator";
import { TestimonialSection } from "@/components/TestimonialSection";
import { FAQSection } from "@/components/FAQSection";
import { InsightsSection } from "@/components/InsightsSection";
import { COMPANY } from "@/data/company";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900 overflow-hidden">
      {/* 1. Cinematic Hero Section */}
      <Hero />

      {/* 2. Interactive Logistics Storytelling */}
      <InteractiveStory />

      {/* 3. 8 Core Multi-Modal Services */}
      <ServicesSection />

      {/* 4. Global & Pan-India Trade Network & Interactive Map */}
      <GlobalNetwork />

      {/* 5. Why Choose Us (Split Screen) */}
      <WhyChooseUs />

      {/* 6. Vertical Industry Solutions */}
      <IndustriesSection />

      {/* 7. Technology & Telematics Platform */}
      <TechnologySection />

      {/* 8. Cinematic Experience Section */}
      <CinematicVideoSection />

      {/* 9. 5-Step Freight Execution Process */}
      <ProcessSection />

      {/* 10. Verified Case Studies */}
      <CaseStudiesSection />

      {/* 11. Instant Commercial Rate Quote Calculator */}
      <QuoteCalculator />

      {/* 12. Enterprise Testimonials Carousel */}
      <TestimonialSection />

      {/* 13. SEO-First FAQ Section with Schema */}
      <FAQSection />

      {/* 14. Supply Chain Insights & Research */}
      <InsightsSection />

      {/* 15. Final Visual Story Banner */}
      <section className="py-24 relative overflow-hidden bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-orange-800">
            <Zap className="w-3.5 h-3.5 text-orange-600" />
            <span>Ready to Accelerate Your Freight Operations?</span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Wherever your business needs to go, <br />
            <span className="text-orange-600">
              we're built to move it.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Eliminate transit blind spots, reduce logistics costs, and partner with a team dedicated to punctuality and cargo security.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg shadow-orange-500/25 transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Start Shipping with Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${COMPANY.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-xs font-bold tracking-wide text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-all duration-200 flex items-center justify-center gap-2 shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-sky-700" />
              <span>Call Dispatch: {COMPANY.contact.phone}</span>
            </a>
          </div>

          <div className="pt-6 text-xs text-slate-500 font-medium flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Instant rate tender response within 2-4 business hours.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
