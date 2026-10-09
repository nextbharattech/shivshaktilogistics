import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  hideText?: boolean;
  variant?: "light" | "dark";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  hideText = false,
  variant = "light",
}) => {
  const iconDimensions = {
    sm: { w: 36, h: 36, imgClass: "w-8 h-8" },
    md: { w: 46, h: 46, imgClass: "w-10 h-10" },
    lg: { w: 56, h: 56, imgClass: "w-12 h-12" },
  }[size];

  const isDark = variant === "dark";

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 select-none transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-sky-500/40 rounded-lg ${className}`}
      aria-label="Shiv Shakti Logistics Homepage"
    >
      {/* Brand Icon logo.png - completely transparent with no background */}
      <div className="relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 bg-transparent">
        <Image
          src="/images/logo.png"
          alt="Shiv Shakti Logistics Logo"
          width={iconDimensions.w}
          height={iconDimensions.h}
          className={`${iconDimensions.imgClass} object-contain bg-transparent`}
          priority
          unoptimized
        />
      </div>

      {/* Brand Typography */}
      {!hideText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5 font-bold tracking-tight text-lg md:text-xl">
            <span className="text-orange-500 font-extrabold tracking-wide">
              Shiv
            </span>
            <span
              className={`font-extrabold tracking-wide ${
                isDark ? "text-[#015195]" : "text-[#015195]"
              }`}
            >
              Shakti
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[9px] uppercase tracking-[0.22em] font-bold ${
                isDark ? "text-[#015195]" : "text-[#015195]"
              }`}
            >
              Logistics
            </span>
            <span className="w-1 h-1 rounded-full bg-orange-500" />
            <span
              className={`text-[9px] uppercase tracking-[0.16em] font-medium ${
                isDark ? "text-slate-400" : "text-slate-500"
              }`}
            >
              Supply Chain
            </span>
          </div>
        </div>
      )}
    </Link>
  );
};
