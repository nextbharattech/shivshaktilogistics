"use client";

import React, { useState, useMemo } from "react";
import { Users, Plus, Search, ShieldCheck, UserCheck, X, RefreshCw } from "lucide-react";
import { StaffUser } from "../types";

interface StaffUsersTabProps {
  staffUsers: StaffUser[];
  onOpenAddModal: () => void;
  loading?: boolean;
  onRefresh?: () => void;
}

export function StaffUsersTab({ staffUsers, onOpenAddModal, loading = false, onRefresh }: StaffUsersTabProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    return staffUsers.filter((u) => {
      const q = searchQuery.toLowerCase().trim();
      return (
        !q ||
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phone?.toLowerCase().includes(q) ||
        u.role?.toLowerCase().includes(q)
      );
    });
  }, [staffUsers, searchQuery]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <Users className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Staff & Operations Accounts
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage dispatchers, booking officers, and administrative security roles
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              title="Refresh Staff Users"
              className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-orange-600" : ""}`} />
            </button>
          )}
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 text-white font-bold text-xs rounded-xl shadow-md inline-flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Staff User</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search staff by name, email, or role..."
          className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-slate-200/90 rounded-2xl">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-3.5">Staff Name</th>
              <th className="py-3 px-3">Email Address</th>
              <th className="py-3 px-3">Phone</th>
              <th className="py-3 px-3">Access Role</th>
              <th className="py-3 px-3.5 text-right">Account Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-500">
                  <div className="inline-flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-orange-600" />
                    <span className="font-medium text-xs">Loading staff accounts...</span>
                  </div>
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-slate-400">
                  No staff users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3.5 font-bold text-slate-900 whitespace-nowrap">
                    {u.name}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-slate-700 whitespace-nowrap">
                    {u.email}
                  </td>
                  <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                    {u.phone || "-"}
                  </td>
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        u.role === "ADMIN"
                          ? "bg-orange-100 text-orange-800 border border-orange-200"
                          : "bg-sky-100 text-sky-800 border border-sky-200"
                      }`}
                    >
                      {u.role === "ADMIN" ? (
                        <>
                          <ShieldCheck className="w-3 h-3 text-orange-600" />
                          <span>ADMINISTRATOR</span>
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-3 h-3 text-sky-600" />
                          <span>BOOKING OFFICER</span>
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-3.5 px-3.5 text-right whitespace-nowrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {u.status || "ACTIVE"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
