"use client";

import React, { useState } from "react";
import {
  Calculator,
  Send,
  CheckCircle2,
  AlertCircle,
  Truck,
  Plane,
  Ship,
  Zap,
  ShieldCheck,
  Calendar,
  Weight,
  MapPin,
  Building,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { SERVICES } from "@/data/services";

export const QuoteCalculator: React.FC<{ isStandalonePage?: boolean }> = ({
  isStandalonePage = false,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    pickupLocation: "",
    deliveryLocation: "",
    cargoType: "Industrial Equipment & Assemblies",
    shipmentMode: "road-freight",
    approxWeightKg: "1500",
    lengthCm: "120",
    widthCm: "80",
    heightCm: "100",
    expectedDate: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Volumetric weight calculator
  const volWeightRoad = Math.round(
    (Number(formData.lengthCm || 0) *
      Number(formData.widthCm || 0) *
      Number(formData.heightCm || 0)) /
      4000
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName || !formData.email || !formData.phone || !formData.pickupLocation || !formData.deliveryLocation) {
      setErrorMessage("Please complete all required fields (Name, Email, Phone, Pickup & Delivery).");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedRef = `SSL-REQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRefId(generatedRef);
      setIsSubmitting(false);
    }, 900);
  };

  return (
    <section
      id="quote"
      className={`relative ${
        isStandalonePage ? "py-12" : "py-24"
      } bg-white text-slate-900 border-b border-slate-200 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Value Proposition & Rate Estimator Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-semibold text-orange-800">
              <Calculator className="w-3.5 h-3.5 text-orange-600" />
              <span>Instant Commercial Freight Quotation</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Get an Accurate <br />
              <span className="text-orange-600">
                Freight Estimate.
              </span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Submit your cargo specifications for pan-India road freight, domestic air cargo, or global ocean container forwarding. Our commercial pricing desk delivers structured quotes within 2 hours.
            </p>

            {/* Pricing Benefits in light cards */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <ShieldCheck className="w-5 h-5 text-sky-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Transparent Fuel & Toll Surcharges</h4>
                  <p className="text-[11px] text-slate-600">
                    No hidden linehaul fees. All toll and state border cess are fully itemized upfront.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <Truck className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Guaranteed Linehaul Capacity</h4>
                  <p className="text-[11px] text-slate-600">
                    Committed equipment allocation even during high-demand festival and quarter-end surges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <Zap className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Dedicated Key Account Manager</h4>
                  <p className="text-[11px] text-slate-600">
                    Enterprise accounts receive a single point of contact for rate tenders and contract SLAs.
                  </p>
                </div>
              </div>
            </div>

            {/* Estimated Volumetric Preview */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-2">
              <div className="text-slate-500 uppercase tracking-wider text-[10px] font-bold flex items-center justify-between">
                <span>Volumetric Weight Preview</span>
                <span className="text-sky-700">Formula: (L×W×H)/4000</span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>Calculated Vol. Weight:</span>
                <span className="text-base font-bold text-slate-900">{volWeightRoad} kg</span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>Billable Weight Mode:</span>
                <span className="text-sky-700 font-bold">
                  {Math.max(Number(formData.approxWeightKg || 0), volWeightRoad)} kg (Chargeable)
                </span>
              </div>
            </div>
          </div>

          {/* Right: The High-Converting Quote Form in clean light theme */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
            {submittedRefId ? (
              <div className="text-center py-12 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Quote Request Dispatched Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Our commercial logistics engineering desk has received your cargo specifications. A detailed freight rate estimate will be sent to{" "}
                  <strong className="text-sky-800">{formData.email}</strong> shortly.
                </p>

                <div className="p-4 rounded-xl bg-white border border-slate-200 inline-block font-mono text-xs shadow-xs">
                  <span className="text-slate-500">Request Docket ID: </span>
                  <span className="text-orange-600 font-bold">{submittedRefId}</span>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmittedRefId(null);
                      setFormData({
                        fullName: "",
                        companyName: "",
                        email: "",
                        phone: "",
                        pickupLocation: "",
                        deliveryLocation: "",
                        cargoType: "Industrial Equipment & Assemblies",
                        shipmentMode: "road-freight",
                        approxWeightKg: "1500",
                        lengthCm: "120",
                        widthCm: "80",
                        heightCm: "100",
                        expectedDate: "",
                        message: "",
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-xs font-bold text-slate-800 border border-slate-300 shadow-xs"
                  >
                    Submit Another Quote Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-slate-900 pb-3 border-b border-slate-200">
                  Request Commercial Freight Quote
                </h3>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Sender Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name <span className="text-orange-600">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Ramesh Patel"
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Bharat Auto Components Ltd."
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Work Email <span className="text-orange-600">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="r.patel@company.com"
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone Number <span className="text-orange-600">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Routing Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Pickup Origin (City / PIN) <span className="text-orange-600">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-600" />
                      <input
                        type="text"
                        required
                        value={formData.pickupLocation}
                        onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                        placeholder="e.g. Gurugram, Delhi NCR (122015)"
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Delivery Destination (City / PIN) <span className="text-orange-600">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-700" />
                      <input
                        type="text"
                        required
                        value={formData.deliveryLocation}
                        onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                        placeholder="e.g. Bhiwandi, Mumbai (421302)"
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Logistics Mode & Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Required Service Mode
                    </label>
                    <select
                      value={formData.shipmentMode}
                      onChange={(e) => setFormData({ ...formData, shipmentMode: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.shortTitle}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Gross Weight (kg)
                    </label>
                    <div className="relative">
                      <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="number"
                        value={formData.approxWeightKg}
                        onChange={(e) => setFormData({ ...formData, approxWeightKg: e.target.value })}
                        placeholder="1500"
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Expected Dispatch Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        value={formData.expectedDate}
                        onChange={(e) => setFormData({ ...formData, expectedDate: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Dimensions */}
                <div className="pt-2 border-t border-slate-200">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Package Dimensions (cm) — Length × Width × Height
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="number"
                      placeholder="Length cm"
                      value={formData.lengthCm}
                      onChange={(e) => setFormData({ ...formData, lengthCm: e.target.value })}
                      className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono text-center"
                    />
                    <input
                      type="number"
                      placeholder="Width cm"
                      value={formData.widthCm}
                      onChange={(e) => setFormData({ ...formData, widthCm: e.target.value })}
                      className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono text-center"
                    />
                    <input
                      type="number"
                      placeholder="Height cm"
                      value={formData.heightCm}
                      onChange={(e) => setFormData({ ...formData, heightCm: e.target.value })}
                      className="px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono text-center"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Cargo Description / Special Handling (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Requires hydraulic tailgate, temperature controlled reefer, or bonded customs escort..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Calculating Rates & Capacity...</span>
                    ) : (
                      <>
                        <span>Submit Quote Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
