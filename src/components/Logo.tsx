import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  hideText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  hideText = false,
}) => {
  const iconDimensions = {
    sm: { w: 32, h: 32 },
    md: { w: 42, h: 42 },
    lg: { w: 52, h: 52 },
  }[size];

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 select-none transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-sky-500/40 rounded-lg p-1 ${className}`}
      aria-label="Shiv Shakti Logistics Homepage"
    >
      {/* Precision Brand Icon inspired by the Shiv Shakti dual flame / aerodynamic swoosh */}
      <div className="relative flex items-center justify-center">
        <svg
          width={iconDimensions.w}
          height={iconDimensions.h}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            {/* Orange Gradient (Energy / Speed / Fire) */}
            <linearGradient id="ssl-orange-grad-light" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C2410C" />
              <stop offset="50%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>

            {/* Blue / Royal Cyan Gradient (Reliability / Technology / Ocean & Air) */}
            <linearGradient id="ssl-blue-grad-light" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0C4A6E" />
              <stop offset="50%" stopColor="#0369A1" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          {/* Outer sweeping loop in vibrant orange */}
          <path
            d="M 28 55 C 26 70 38 85 54 85 C 64 85 70 76 70 66 C 70 54 62 44 56 34 C 54 30 53 26 54 22 C 54.5 19 56 16 57 14 C 55 16 52 20 50 25 C 47 32 48 39 52 46 C 56 54 60 60 59 68 C 58 74 53 78 47 78 C 37 78 33 68 35 56 C 36 49 39 42 42 36 C 41 39 34 47 31 52 Z"
            fill="url(#ssl-orange-grad-light)"
          />

          {/* Inner upward swoosh in deep blue / royal cyan */}
          <path
            d="M 50 78 C 53 72 55 64 54 56 C 53 48 49 42 47 35 C 45 28 47 20 51 14 C 47 19 44 26 44 34 C 44 42 48 49 50 56 C 52 63 50 69 47 74 C 45 76 44 77 43 78 C 45 78 48 78 50 78 Z"
            fill="url(#ssl-blue-grad-light)"
          />

          {/* Secondary crest accent */}
          <path
            d="M 58 35 C 60 28 62 22 66 17 C 64 21 62 26 61 32 C 60 38 61 44 63 50 C 62 45 60 40 58 35 Z"
            fill="url(#ssl-blue-grad-light)"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Brand Typography in crisp light mode */}
      {!hideText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-lg md:text-xl">
            <span className="text-orange-600 font-extrabold tracking-wide">
              Shiv
            </span>
            <span className="text-slate-900 font-extrabold tracking-wide">
              Shakti
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] uppercase tracking-[0.22em] font-bold text-sky-700">
              Logistics
            </span>
            <span className="w-1 h-1 rounded-full bg-orange-500" />
            <span className="text-[9px] uppercase tracking-[0.16em] text-slate-500 font-medium">
              Supply Chain
            </span>
          </div>
        </div>
      )}
    </Link>
  );
};
