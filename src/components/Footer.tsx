import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Shield,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Logo } from "./Logo";
import { COMPANY } from "@/data/company";
import { SERVICES } from "@/data/services";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800 text-slate-300 text-sm overflow-hidden">
      {/* Live System Telemetry Status Banner */}
      <div className="border-b border-slate-800 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-200 font-mono">
              Operational Status: <strong className="text-emerald-400">All Gateways & Corridors Active</strong>
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:inline-block text-slate-300 font-mono">
              24/7 National Operations Control Desk
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-mono">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              <span>ISO 9001:2015 & GDP Certified</span>
            </span>
            <span className="text-slate-600">|</span>
            <span>AEO-T2 Compliant</span>
          </div>
        </div>
      </div>

      {/* Main Mega Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-16">
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2 space-y-5">
            <Logo size="lg" />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {COMPANY.shortDescription}
            </p>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>
                  {COMPANY.headquarters.address}, {COMPANY.headquarters.city}, {COMPANY.headquarters.state} - {COMPANY.headquarters.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a
                  href={`tel:${COMPANY.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY.contact.phone} (Dispatch) / {COMPANY.contact.tollFree}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a
                  href={`mailto:${COMPANY.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY.contact.email}
                </a>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76 1.75.79 1.75 1.76-.78 1.76-1.75 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>
              <a
                href={COMPANY.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition-colors"
                aria-label="Twitter / X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={COMPANY.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-orange-400 hover:border-orange-500/40 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Solutions & Services */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white border-l-2 border-sky-400 pl-2">
              Services
            </h3>
            <ul className="space-y-2.5 text-xs">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-[10px] text-slate-500 font-mono">
                      {service.number}
                    </span>
                    <span>{service.shortTitle}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-1 pt-1"
                >
                  View All Services <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white border-l-2 border-orange-400 pl-2">
              Industries
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/industries/ecommerce" className="hover:text-white transition-colors">
                  E-Commerce & Retail
                </Link>
              </li>
              <li>
                <Link href="/industries/automotive" className="hover:text-white transition-colors">
                  Automotive & OEM
                </Link>
              </li>
              <li>
                <Link href="/industries/manufacturing" className="hover:text-white transition-colors">
                  Heavy Manufacturing
                </Link>
              </li>
              <li>
                <Link href="/industries/pharmaceuticals" className="hover:text-white transition-colors">
                  Pharmaceuticals Cold Chain
                </Link>
              </li>
              <li>
                <Link href="/industries/fmcg" className="hover:text-white transition-colors">
                  FMCG & Food Staples
                </Link>
              </li>
              <li>
                <Link href="/industries/electronics" className="hover:text-white transition-colors">
                  High-Tech Electronics
                </Link>
              </li>
              <li>
                <Link
                  href="/industries"
                  className="text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-1 pt-1"
                >
                  All Industry Sectors <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links & Resources (without tracking) */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white border-l-2 border-sky-400 pl-2">
              Resources
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/quote" className="hover:text-white transition-colors text-orange-400 font-medium">
                  Request Rate Quote
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Freight Capabilities
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-white transition-colors">
                  Technology Platform
                </Link>
              </li>
              <li>
                <Link href="/network" className="hover:text-white transition-colors">
                  Global & Domestic Network
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Supply Chain Insights
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Freight Dispatch Hotline */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white border-l-2 border-orange-400 pl-2">
              Commercial Desk
            </h3>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="text-xs text-slate-200 font-semibold">
                Need Immediate Freight Movement?
              </div>
              <p className="text-[11px] text-slate-400">
                Our national control tower operates 24/7 for linehaul and urgent charters.
              </p>
              <Link
                href="/quote"
                className="w-full py-2 px-3 rounded-lg text-xs font-bold text-center text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 block transition-all shadow-sm"
              >
                Instant Freight Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-xs">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Branch Offices
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
