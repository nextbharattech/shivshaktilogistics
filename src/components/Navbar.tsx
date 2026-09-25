"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  PhoneCall,
  Truck,
  Plane,
  Ship,
  Warehouse,
  Zap,
  MapPin,
  Cpu,
  Layers,
} from "lucide-react";
import { Logo } from "./Logo";
import { SERVICES } from "@/data/services";
import { INDUSTRIES } from "@/data/industries";
import { COMPANY } from "@/data/company";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "/services",
      hasDropdown: true,
      dropdownType: "services",
    },
    {
      label: "Industries",
      href: "/industries",
      hasDropdown: true,
      dropdownType: "industries",
    },
    { label: "Technology", href: "/technology" },
    { label: "Network", href: "/network" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled
            ? "py-2.5 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm shadow-slate-900/5"
            : "py-4 bg-white/80 backdrop-blur-sm border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <div className="flex-shrink-0">
              <Logo size={isScrolled ? "sm" : "md"} />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(link.dropdownType || null)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Link
                        href={link.href}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-150 ${
                          isActive
                            ? "text-sky-700 bg-sky-50"
                            : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/70"
                        }`}
                      >
                        {link.label}
                        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                      </Link>

                      {/* Dropdown for Services */}
                      {activeDropdown === "services" && link.dropdownType === "services" && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[680px] p-5 rounded-2xl bg-white shadow-2xl shadow-slate-900/10 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                            <div>
                              <h4 className="text-sm font-bold text-slate-900">
                                Multi-Modal Logistics Services
                              </h4>
                              <p className="text-xs text-slate-500">
                                End-to-end transportation and supply chain infrastructure
                              </p>
                            </div>
                            <Link
                              href="/services"
                              className="text-xs font-semibold text-sky-700 hover:text-sky-800 inline-flex items-center gap-1"
                            >
                              View All 8 Services <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {SERVICES.map((srv) => (
                              <Link
                                key={srv.id}
                                href={`/services/${srv.slug}`}
                                className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                              >
                                <div className="p-2 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                                  {srv.id === "road-freight" && <Truck className="w-4 h-4" />}
                                  {srv.id === "air-freight" && <Plane className="w-4 h-4" />}
                                  {srv.id === "ocean-freight" && <Ship className="w-4 h-4" />}
                                  {srv.id === "warehousing" && <Warehouse className="w-4 h-4" />}
                                  {srv.id === "express-delivery" && <Zap className="w-4 h-4" />}
                                  {srv.id === "last-mile-delivery" && <MapPin className="w-4 h-4" />}
                                  {srv.id === "freight-forwarding" && <Layers className="w-4 h-4" />}
                                  {srv.id === "supply-chain-management" && <Cpu className="w-4 h-4" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition-colors flex items-center justify-between">
                                    <span>{srv.shortTitle}</span>
                                    <span className="text-[10px] text-slate-400 font-mono">
                                      {srv.number}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                    {srv.tagline}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dropdown for Industries */}
                      {activeDropdown === "industries" && link.dropdownType === "industries" && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-[580px] p-5 rounded-2xl bg-white shadow-2xl shadow-slate-900/10 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
                          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                            <div>
                              <h4 className="text-sm font-bold text-slate-900">
                                Tailored Industry Solutions
                              </h4>
                              <p className="text-xs text-slate-500">
                                Specialized handling engineered for your sector
                              </p>
                            </div>
                            <Link
                              href="/industries"
                              className="text-xs font-semibold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1"
                            >
                              Explore All <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            {INDUSTRIES.map((ind) => (
                              <Link
                                key={ind.id}
                                href={`/industries/${ind.slug}`}
                                className="group p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                              >
                                <div className="text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                                  {ind.title}
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                  {ind.tagline}
                                </p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-150 ${
                      isActive
                        ? "text-sky-700 bg-sky-50"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${COMPANY.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-200/70 border border-slate-200 rounded-xl transition-all duration-200 inline-flex items-center gap-1.5"
                title="Direct Phone Dispatch"
              >
                <PhoneCall className="w-3.5 h-3.5 text-sky-700" />
                <span>{COMPANY.contact.phone}</span>
              </a>

              <Link
                href="/quote"
                className="relative group overflow-hidden px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl shadow-md shadow-orange-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                href="/quote"
                className="px-3 py-1.5 text-xs font-bold bg-orange-600 text-white rounded-lg"
              >
                Quote
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200 rounded-xl focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation in clean light mode */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white border-l border-slate-200 p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <Logo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-800 rounded-lg bg-slate-100 border border-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-1">
                <Link
                  href="/"
                  className="block px-3 py-2.5 text-base font-semibold text-slate-800 hover:text-sky-700 rounded-lg hover:bg-slate-50"
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className="block px-3 py-2.5 text-base font-semibold text-slate-800 hover:text-sky-700 rounded-lg hover:bg-slate-50"
                >
                  Services (8 Core Modes)
                </Link>
                <Link
                  href="/industries"
                  className="block px-3 py-2.5 text-base font-semibold text-slate-800 hover:text-sky-700 rounded-lg hover:bg-slate-50"
                >
                  Industries We Serve
                </Link>
                <Link
                  href="/technology"
                  className="block px-3 py-2.5 text-base font-semibold text-slate-800 hover:text-sky-700 rounded-lg hover:bg-slate-50"
                >
                  Technology Platform
                </Link>
                <Link
                  href="/network"
                  className="block px-3 py-2.5 text-base font-semibold text-slate-800 hover:text-sky-700 rounded-lg hover:bg-slate-50"
                >
                  Network & Hubs
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-2.5 text-base font-semibold text-slate-800 hover:text-sky-700 rounded-lg hover:bg-slate-50"
                >
                  About Shiv Shakti
                </Link>
                <Link
                  href="/blog"
                  className="block px-3 py-2.5 text-base font-semibold text-slate-800 hover:text-sky-700 rounded-lg hover:bg-slate-50"
                >
                  Insights & Resources
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2.5 text-base font-semibold text-slate-800 hover:text-sky-700 rounded-lg hover:bg-slate-50"
                >
                  Branch Locations & Contact
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <Link
                href="/quote"
                className="w-full py-3 px-4 rounded-xl text-center text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-600 to-amber-600 shadow-md shadow-orange-500/20 flex items-center justify-center gap-2"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`tel:${COMPANY.contact.phone.replace(/[^0-9+]/g, "")}`}
                className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-sky-700" />
                <span>Call Dispatch: {COMPANY.contact.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
