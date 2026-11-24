"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Truck,
  UserCheck,
  Layers,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/Logo";

export default function PortalLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already logged in, redirect to portal dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/portal");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both email address and password.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      router.push("/portal");
    } else {
      setErrorMessage(
        result.message || "Invalid credentials. Please verify your details.",
      );
    }
  };

  const handleFillDemo = (type: "admin" | "employee") => {
    if (type === "admin") {
      setEmail("admin@shivdocket.com");
      setPassword("Admin@12345");
    } else {
      setEmail("employee@shivdocket.com");
      setPassword("Emp@12345");
    }
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="text-xs font-semibold text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
        >
          ← Return to Website
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Brand Logo & Heading */}
        <div className="text-center space-y-3">
          <div className="inline-flex justify-center p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-inner">
            <Logo size="md" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Shivdocket Operations Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Internal ERP console for Shiv Shakti Logistics staff, docket
            booking, dispatch control, and admin approval.
          </p>
        </div>

        {/* Login Box */}
        <div className="mt-8 bg-slate-800/90 backdrop-blur-xl py-8 px-5 sm:px-10 border border-slate-700/80 rounded-2xl shadow-2xl space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@shivdocket.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-400 hover:text-white absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials for pair testing */}
          {/* <div className="pt-4 border-t border-slate-700/80 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">
              Quick Test Credentials
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleFillDemo("admin")}
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700 hover:border-orange-500 text-left transition-all group"
              >
                <div className="font-bold text-white group-hover:text-orange-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                  <span>Admin</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">admin@shivdocket.com</div>
              </button>

              <button
                type="button"
                onClick={() => handleFillDemo("employee")}
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700 hover:border-sky-500 text-left transition-all group"
              >
                <div className="font-bold text-white group-hover:text-sky-400 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-sky-500" />
                  <span>Employee</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">employee@shivdocket.com</div>
              </button>
            </div>
          </div> */}
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <Lock className="w-3.5 h-3.5" />
          <span>
            Encrypted 256-bit TLS connection • Authorized Shivshakti Logistics
            personnel only
          </span>
        </div>
      </div>
    </div>
  );
}
