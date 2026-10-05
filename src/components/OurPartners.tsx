"use client";

import React from "react";
import { Globe } from "lucide-react";

const PARTNERS = [
  {
    name: "DHL",
    trackUrl: "https://www.dhl.com/in-en/home/tracking.html",
    logo: "DHL",
    logoColor: "#D40511",
    logoBg: "#FFCC00",
  },
  {
    name: "FedEx",
    trackUrl: "https://www.fedex.com/en-in/tracking.html",
    logo: "FedEx",
    logoColor: "#4D148C",
    logoBg: "#FFFFFF",
  },
  {
    name: "Aramex",
    trackUrl: "https://www.aramex.com/in/en/track/",
    logo: "aramex",
    logoColor: "#E8001D",
    logoBg: "#FFFFFF",
  },
  {
    name: "Blue Dart",
    trackUrl: "https://www.bluedart.com/tracking",
    logo: "BLUE DART",
    logoColor: "#FFFFFF",
    logoBg: "#003087",
  },
  {
    name: "UPS",
    trackUrl: "https://www.ups.com/track?loc=en_IN",
    logo: "UPS",
    logoColor: "#FFB500",
    logoBg: "#351C15",
  },
  {
    name: "Gati KWE",
    trackUrl: "https://www.gati.com/tracking/",
    logo: "GATI KWE",
    logoColor: "#004A99",
    logoBg: "#FFFFFF",
  },
  {
    name: "DTDC",
    trackUrl: "https://www.dtdc.in/tracking.asp",
    logo: "DTDC",
    logoColor: "#003087",
    logoBg: "#FFFFFF",
  },
  {
    name: "Delhivery",
    trackUrl: "https://www.delhivery.com/track/package/",
    logo: "DELHIVERY",
    logoColor: "#1a1a1a",
    logoBg: "#FFFFFF",
  },
];

function PartnerCard({ partner }: { partner: (typeof PARTNERS)[0] }) {
  return (
    <a
      href={partner.trackUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Track shipment with ${partner.name}`}
      className="group flex-shrink-0 mx-3 w-52 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-orange-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Track Now header */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-2">
        <div className="p-1.5 rounded-full bg-slate-100 group-hover:bg-orange-50 transition-colors duration-300">
          <Globe className="w-4 h-4 text-slate-500 group-hover:text-orange-500 transition-colors duration-300" />
        </div>
        <span className="text-xs font-semibold text-slate-500 group-hover:text-orange-600 transition-colors duration-300 tracking-wide">
          Track Now
        </span>
      </div>

      {/* Orange accent + logo tile */}
      <div className="relative flex items-center justify-center px-5 pb-5 pt-1">
        <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-gradient-to-b from-orange-400 to-amber-500" />
        <div
          className="h-16 w-full flex items-center justify-center rounded-xl px-3 border border-slate-100"
          style={{ backgroundColor: partner.logoBg }}
        >
          <span
            className="text-2xl font-black tracking-tight select-none"
            style={{
              color: partner.logoColor,
              fontFamily: "Arial Black, Arial, sans-serif",
            }}
          >
            {partner.logo}
          </span>
        </div>
      </div>
    </a>
  );
}

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...PARTNERS, ...PARTNERS, ...PARTNERS];
  return (
    <div className="relative overflow-hidden py-1">
      <div
        className={`flex w-max ${
          reverse ? "animate-partners-rev" : "animate-partners-fwd"
        }`}
      >
        {items.map((partner, idx) => (
          <PartnerCard key={`${partner.name}-${idx}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}

export const OurPartners: React.FC = () => {
  return (
    <section
      id="our-partners"
      className="py-12 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100 overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3 flex items-center justify-center gap-2">
          <span className="inline-block w-6 h-px bg-orange-400" />
          Trusted Network
          <span className="inline-block w-6 h-px bg-orange-400" />
        </p>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Our{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-white px-3">Partner</span>
            <span
              className="absolute inset-0 bg-orange-500 rounded-md"
              aria-hidden="true"
            />
          </span>
        </h2>
        <p className="mt-4 text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
          We work with the world&apos;s most trusted carriers to deliver your
          shipments faster, safer, and more reliably — every single time.
        </p>
      </div>

      {/* Marquee area with fade edges */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 z-10 bg-gradient-to-l from-slate-50 to-transparent" />

        <div className="flex flex-col gap-5">
          <MarqueeRow />
          <MarqueeRow reverse />
        </div>
      </div>

      {/* Partner pill badges */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2 px-4">
        {PARTNERS.map((p) => (
          <a
            key={p.name}
            href={p.trackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:border-orange-400 hover:text-orange-600 hover:shadow-sm transition-all duration-200"
          >
            {p.name}
          </a>
        ))}
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes partners-fwd {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes partners-rev {
          0%   { transform: translateX(calc(-100% / 3)); }
          100% { transform: translateX(0); }
        }
        .animate-partners-fwd {
          animation: partners-fwd 30s linear infinite;
        }
        .animate-partners-rev {
          animation: partners-rev 30s linear infinite;
        }
        .animate-partners-fwd:hover,
        .animate-partners-rev:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
