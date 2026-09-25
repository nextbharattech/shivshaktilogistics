import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  ShoppingBag,
  Car,
  Factory,
  Store,
  ShieldAlert,
  Boxes,
  Laptop,
  Wrench,
} from "lucide-react";
import { INDUSTRIES } from "@/data/industries";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INDUSTRIES.map((ind) => ({
    slug: ind.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) {
    return { title: "Industry Not Found" };
  }

  return {
    title: `Logistics for ${industry.title} | Shiv Shakti Logistics`,
    description: industry.description,
    openGraph: {
      title: `Logistics for ${industry.title}`,
      description: industry.description,
      images: [{ url: industry.heroImage }],
    },
  };
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);

  if (!industry) {
    notFound();
  }

  const iconMap: Record<string, React.ElementType> = {
    ShoppingBag,
    Car,
    Factory,
    Store,
    ShieldAlert,
    Boxes,
    Laptop,
    Wrench,
  };

  const Icon = iconMap[industry.iconName] || Briefcase;

  return (
    <div className="pt-28 pb-24 bg-white text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/industries" className="hover:text-slate-900 transition-colors">
            Industries
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-orange-600 font-bold">{industry.title}</span>
        </nav>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-orange-800">
              <Icon className="w-3.5 h-3.5 text-orange-600" />
              <span>Dedicated Sector Protocol</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Logistics for {industry.title}
            </h1>

            <p className="text-base sm:text-lg text-orange-600 font-semibold">
              {industry.tagline}
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {industry.description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2 font-mono">
              {industry.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-base font-bold text-slate-900">{m.value}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{m.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/quote"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 transition-all flex items-center gap-2"
              >
                <span>Request Sector Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 shadow-md">
            <img
              src={industry.heroImage}
              alt={industry.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Challenge vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-6 sm:p-8 rounded-3xl border border-red-200 bg-red-50/60 space-y-3">
            <div className="text-xs font-mono text-red-800 uppercase tracking-wider flex items-center gap-2 font-bold">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>Industry Operational Hurdle</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">The Challenge</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {industry.challenge}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl border border-sky-200 bg-sky-50/60 space-y-3">
            <div className="text-xs font-mono text-sky-800 uppercase tracking-wider flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
              <span>Shiv Shakti Engineered Strategy</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Solution</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {industry.solution}
            </p>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 space-y-6 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Measurable Operational Advantages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {industry.keyBenefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-800 font-medium">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
