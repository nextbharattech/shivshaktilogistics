import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Plane,
  Ship,
  Warehouse,
  Zap,
  MapPin,
  Globe,
  Cpu,
  Clock,
  ChevronRight,
  FileCheck,
  PhoneCall,
} from "lucide-react";
import { SERVICES, ServiceItem } from "@/data/services";
import { COMPANY } from "@/data/company";
import { ServiceSchema } from "@/components/StructuredData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} | Shiv Shakti Logistics`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} | Shiv Shakti Logistics`,
      description: service.shortDescription,
      images: [{ url: service.heroImage }],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const iconMap: Record<string, React.ElementType> = {
    Truck,
    Plane,
    Ship,
    Warehouse,
    Zap,
    MapPin,
    Globe,
    Cpu,
  };

  const Icon = iconMap[service.iconName] || Truck;

  return (
    <div className="pt-28 pb-24 bg-white text-slate-900 min-h-screen">
      <ServiceSchema serviceSlug={service.slug} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/services" className="hover:text-slate-900 transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sky-700 font-bold">{service.shortTitle}</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800">
              <Icon className="w-3.5 h-3.5 text-sky-700" />
              <span>Service Code: {service.number}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-orange-600 font-semibold">
              {service.tagline}
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {service.fullDescription}
            </p>

            {/* Operating Modes Tags */}
            <div className="pt-2 flex flex-wrap gap-2">
              {service.modes.map((mode, i) => (
                <span
                  key={i}
                  className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-medium"
                >
                  {mode}
                </span>
              ))}
            </div>

            {/* CTAs (without tracking) */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href={`/quote?service=${service.slug}`}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 transition-all flex items-center gap-2"
              >
                <span>Request Rate Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${COMPANY.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition-colors flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-sky-700" />
                <span>Call Dispatch Desk</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200 shadow-md">
            <img
              src={service.heroImage}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Operational Capabilities Grid */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 border-l-4 border-sky-600 pl-3">
            Core Service Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 hover:border-sky-300 transition-colors shadow-xs"
              >
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-700" />
                  <span>{cap.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Specifications Table */}
        <div className="mb-16 bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-orange-600" />
            <span>Operational SLA & Equipment Standards</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="text-slate-500 font-mono uppercase tracking-wider block mb-1 font-semibold">
                Territorial Coverage
              </span>
              <span className="text-sm font-bold text-slate-900">
                {service.operationalSpecs.coverage}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="text-slate-500 font-mono uppercase tracking-wider block mb-1 font-semibold">
                Fleet & Asset Classes
              </span>
              <span className="text-sm font-bold text-slate-900">
                {service.operationalSpecs.fleetOptions}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="text-slate-500 font-mono uppercase tracking-wider block mb-1 font-semibold">
                Committed Lead Times
              </span>
              <span className="text-sm font-bold text-sky-700 font-mono">
                {service.operationalSpecs.leadTimes}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="text-slate-500 font-mono uppercase tracking-wider block mb-1 font-semibold">
                Telemetry & Precision
              </span>
              <span className="text-sm font-bold text-emerald-700 font-mono">
                {service.operationalSpecs.trackingPrecision}
              </span>
            </div>

            <div className="md:col-span-2 p-4 rounded-xl bg-white border border-slate-200">
              <span className="text-slate-500 font-mono uppercase tracking-wider block mb-1 font-semibold">
                Statutory & Marine Compliance
              </span>
              <span className="text-sm font-semibold text-slate-800">
                {service.operationalSpecs.compliance}
              </span>
            </div>
          </div>
        </div>

        {/* Target Industries */}
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-slate-900">
            Primary Industries Utilizing This Service:
          </h3>
          <div className="flex flex-wrap gap-2">
            {service.suitableFor.map((ind, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium shadow-xs"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
