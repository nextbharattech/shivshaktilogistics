"use client";

import React, { useState, useEffect } from "react";
import { X, Truck, CheckCircle2, AlertCircle } from "lucide-react";

interface VendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => Promise<void>;
  loading: boolean;
}

const INITIAL_FORM_DATA = {
  vendorName: "",
  contactPerson: "",
  phoneNumber: "",
  email: "",
  fullAddress: "",
  cityDistrict: "",
  state: "",
};

export function VendorModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
}: VendorModalProps) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [error, setError] = useState<string | null>(null);

  // Reset form data and error every time modal is opened or closed
  useEffect(() => {
    if (isOpen) {
      setFormData(INITIAL_FORM_DATA);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only numbers, maximum 12 digits, no alphabets/symbols
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 12);
    setFormData({ ...formData, phoneNumber: digitsOnly });
  };

  const handleClose = () => {
    setError(null);
    setFormData(INITIAL_FORM_DATA);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailTrimmed = formData.email.trim();
    if (emailTrimmed && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      setError("Please enter a valid email address or leave it empty.");
      return;
    }

    const payload = {
      ...formData,
      email: emailTrimmed || null,
      contactPerson: formData.contactPerson.trim() || null,
    };

    try {
      await onSubmit(payload);
      // On success, reset form data
      setFormData(INITIAL_FORM_DATA);
    } catch (err: any) {
      setError(err?.message || "Failed to save vendor. Please check details.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-200 my-auto animate-in fade-in duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <Truck className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm">
              Add Vendor
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Error Alert at Top */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-start gap-2 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-medium">{error}</div>
            <button
              type="button"
              onClick={() => setError(null)}
              className="text-red-500 hover:text-red-800 font-bold ml-1"
            >
              ×
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Vendor / Carrier Name *
            </label>
            <input
              type="text"
              required
              value={formData.vendorName}
              onChange={(e) =>
                setFormData({ ...formData, vendorName: e.target.value })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Full Address *
            </label>
            <input
              type="text"
              required
              value={formData.fullAddress}
              onChange={(e) =>
                setFormData({ ...formData, fullAddress: e.target.value })
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Phone Number (Max 12 Digits) *
              </label>
              <input
                type="text"
                required
                inputMode="numeric"
                pattern="[0-9]{1,12}"
                maxLength={12}
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                City / District *
              </label>
              <input
                type="text"
                required
                value={formData.cityDistrict}
                onChange={(e) =>
                  setFormData({ ...formData, cityDistrict: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                State *
              </label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md shadow-orange-950/20 disabled:opacity-50 transition-all inline-flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{loading ? "Saving..." : "Save Carrier"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
