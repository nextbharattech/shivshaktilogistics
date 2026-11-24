"use client";

import React from "react";
import { Settings, Lock, UserCheck, ShieldCheck, Phone, Mail, Save } from "lucide-react";

interface ProfileTabProps {
  user: any;
  isAdmin: boolean;
  profileForm: {
    name: string;
    phone: string;
    oldPassword: string;
    newPassword: string;
  };
  setProfileForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      phone: string;
      oldPassword: string;
      newPassword: string;
    }>
  >;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export function ProfileTab({
  user,
  isAdmin,
  profileForm,
  setProfileForm,
  onSubmit,
  loading,
}: ProfileTabProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Account Profile & Security
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your dispatcher contact information and login credentials
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-5 text-xs">
        {/* Contact info card */}
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-orange-600" />
            <span>Profile Information</span>
          </h2>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              disabled
              value={user?.email || ""}
              className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-mono"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              Email is managed by system administrator.
            </span>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Direct Contact Phone</label>
            <input
              type="text"
              value={profileForm.phone}
              onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Change Password Card */}
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-3.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-amber-600" />
            <span>Change Account Password (Optional)</span>
          </h2>
          <p className="text-[11px] text-slate-500">
            Leave blank if you do not wish to change your current password.
          </p>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Current Password</label>
            <input
              type="password"
              value={profileForm.oldPassword}
              onChange={(e) => setProfileForm({ ...profileForm, oldPassword: e.target.value })}
              placeholder="Enter current password"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">New Password</label>
            <input
              type="password"
              value={profileForm.newPassword}
              onChange={(e) => setProfileForm({ ...profileForm, newPassword: e.target.value })}
              placeholder="Enter new strong password"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-950/20 disabled:opacity-50 inline-flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? "Updating Profile..." : "Save Profile Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
