"use client";

import React from "react";
import Link from "next/link";
import {
  Truck,
  Package,
  Clock,
  Building2,
  Users,
  FileSpreadsheet,
  Settings,
  Plus,
  ExternalLink,
  LogOut,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { ActiveTab } from "./types";

interface PortalHeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: any;
  isAdmin: boolean;
  pendingApprovalsCount: number;
  onLogout: () => void;
}

export function PortalHeader({
  activeTab,
  setActiveTab,
  user,
  isAdmin,
  pendingApprovalsCount,
  onLogout,
}: PortalHeaderProps) {
  const tabs: Array<{
    id: ActiveTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    highlight?: boolean;
    badge?: number;
  }> = [
    { id: "dashboard" as ActiveTab, label: "Dashboard", icon: Truck },
    { id: "clients" as ActiveTab, label: "Clients", icon: Building2 },
    { id: "vendors" as ActiveTab, label: "Vendors", icon: Truck },
    {
      id: "consignments" as ActiveTab,
      label: "Dockets / Shipments",
      icon: Package,
    },
    {
      id: "cut-docket" as ActiveTab,
      label: "Book Docket",
      icon: Plus,
      highlight: true,
    },
    // ...(isAdmin
    //   ? [
    //       {
    //         id: "pending-approvals" as ActiveTab,
    //         label: "Approvals",
    //         icon: Clock,
    //         badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
    //       },
    //     ]
    //   : []),

    ...(isAdmin
      ? [{ id: "users" as ActiveTab, label: "Staff Users", icon: Users }]
      : []),
    {
      id: "reports" as ActiveTab,
      label: "Reports & Export",
      icon: FileSpreadsheet,
    },
    { id: "profile" as ActiveTab, label: "My Profile", icon: Settings },
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-sm">
      {/* Primary Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("dashboard")}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-900/30 font-black text-sm">
                SS
              </div>
              <div>
                <div className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1.5 leading-none">
                  <span>SHIVDOCKET</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5">
                  Shiv Shakti Logistics ERP
                </div>
              </div>
            </button>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/track"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
              <span>Public Live Tracker</span>
            </Link>

            <button
              onClick={() => setActiveTab("cut-docket")}
              className="px-3.5 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-950/20 inline-flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cut Docket</span>
              <span className="sm:hidden">Book</span>
            </button>

            <div className="h-6 w-px bg-slate-800 mx-0.5" />

            {/* User Pill */}
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-white max-w-[120px] truncate">
                  {user?.name || "Operator"}
                </div>
                <div className="text-[10px] text-slate-400 flex items-center justify-end gap-1">
                  {isAdmin ? (
                    <span className="text-orange-400 font-semibold flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" /> Admin
                    </span>
                  ) : (
                    <span className="text-sky-400 font-semibold flex items-center gap-0.5">
                      <UserCheck className="w-3 h-3" /> Staff
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={onLogout}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                title="Logout from portal"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar */}
      <div className="bg-slate-950/70 border-t border-slate-800/90 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 py-1.5 text-xs font-medium whitespace-nowrap">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 text-xs ${
                  isActive
                    ? "bg-orange-600 text-white font-bold shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-400"}`}
                />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive
                        ? "bg-white text-orange-700"
                        : "bg-amber-500 text-slate-950"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
