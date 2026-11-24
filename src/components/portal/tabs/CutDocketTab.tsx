"use client";

import React, { useMemo } from "react";
import {
  Package,
  Plus,
  Trash2,
  ArrowRight,
  Truck,
  Building2,
  Scale,
  MapPin,
} from "lucide-react";
import { Client, Vendor, BoxItem } from "../types";

const DIVISOR_CM =
  Number(process.env.NEXT_PUBLIC_VOLUMETRIC_DIVISOR_CM) || 5000;
const DIVISOR_INCH =
  Number(process.env.NEXT_PUBLIC_VOLUMETRIC_DIVISOR_INCH) || 1728;

interface CutDocketTabProps {
  docketForm: any;
  setDocketForm: React.Dispatch<React.SetStateAction<any>>;
  boxItems: BoxItem[];
  setBoxItems: React.Dispatch<React.SetStateAction<BoxItem[]>>;
  clients: Client[];
  vendors: Vendor[];
  isAdmin: boolean;
  isEmployee: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  loading: boolean;
}

export function CutDocketTab({
  docketForm,
  setDocketForm,
  boxItems,
  setBoxItems,
  clients,
  vendors,
  isEmployee,
  onSubmit,
  onCancel,
  loading,
}: CutDocketTabProps) {
  const handleClientSelect = (clientIdStr: string) => {
    setDocketForm((prev: any) => ({ ...prev, clientId: clientIdStr }));
    if (!clientIdStr) return;
    const client = clients.find((c) => String(c.id) === clientIdStr);
    if (client) {
      setDocketForm((prev: any) => ({
        ...prev,
        clientId: clientIdStr,
        consignorName: client.name || "",
        consignorPhone: client.phoneNumber || "",
        consignorAddress: client.fullAddress || "",
        consignorPincode: client.pincode || "",
        consignorGst: client.gstNumber || "",
        origin: client.city ? `${client.city} Hub` : prev.origin,
      }));
    }
  };

  const calculatedWeights = useMemo(() => {
    let totalActualWeight = 0;
    let totalVolumetricWeight = 0;
    let totalQuantity = 0;

    boxItems.forEach((item) => {
      const qty = parseInt(String(item.quantity), 10) || 1;
      const actWt = parseFloat(String(item.weight)) || 0;
      const l = parseFloat(String(item.length)) || 0;
      const w = parseFloat(String(item.width)) || 0;
      const h = parseFloat(String(item.height)) || 0;
      const divisor = item.unit === "INCH" ? DIVISOR_INCH : DIVISOR_CM;

      totalQuantity += qty;
      totalActualWeight += actWt * qty;
      totalVolumetricWeight += ((l * w * h) / divisor) * qty;
    });

    const chargedBillWeight = Math.max(
      totalActualWeight,
      totalVolumetricWeight,
    );

    return {
      totalActualWeight: parseFloat(totalActualWeight.toFixed(2)),
      totalVolumetricWeight: parseFloat(totalVolumetricWeight.toFixed(2)),
      chargedBillWeight: parseFloat(chargedBillWeight.toFixed(2)),
      totalQuantity,
    };
  }, [boxItems]);

  const addBoxItem = () => {
    setBoxItems((prev) => [
      ...prev,
      {
        boxType: "Standard Box",
        unit: "CM",
        length: 30,
        width: 30,
        height: 30,
        weight: 10,
        quantity: 1,
        description: "",
      },
    ]);
  };

  const removeBoxItem = (index: number) => {
    if (boxItems.length <= 1) return;
    setBoxItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateBoxItem = (index: number, field: string, val: any) => {
    setBoxItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: val } : item)),
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
            <Package className="w-4 h-4" />
          </div>
          <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
            Cut Docket
          </h1>
        </div>

        {/* <div className="flex items-center gap-4 text-xs bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
          <div>
            <span className="text-slate-500">Actual: </span>
            <strong className="font-mono text-slate-900">
              {calculatedWeights.totalActualWeight} kg
            </strong>
          </div>
          <div>
            <span className="text-slate-500">Volumetric: </span>
            <strong className="font-mono text-slate-900">
              {calculatedWeights.totalVolumetricWeight} kg
            </strong>
          </div>
          <div>
            <span className="text-slate-500">Charged: </span>
            <strong className="font-mono text-orange-600">
              {calculatedWeights.chargedBillWeight} kg
            </strong>
          </div>
        </div> */}
      </div>

      {/* Consignor & Consignee */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Consignor */}
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-orange-600" />
            <span>1. Consignor</span>
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Select Client
            </label>
            <select
              value={docketForm.clientId || ""}
              onChange={(e) => handleClientSelect(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-orange-500"
            >
              <option value="">Manual Entry</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.city || c.state || "Client"})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">
                Company / Shipper Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={docketForm.consignorName}
                onChange={(e) =>
                  setDocketForm({
                    ...docketForm,
                    consignorName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                value={docketForm.consignorPhone}
                onChange={(e) =>
                  setDocketForm({
                    ...docketForm,
                    consignorPhone: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                GSTIN
              </label>
              <input
                type="text"
                value={docketForm.consignorGst}
                onChange={(e) =>
                  setDocketForm({ ...docketForm, consignorGst: e.target.value })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono uppercase focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Origin <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={docketForm.origin}
                onChange={(e) =>
                  setDocketForm({ ...docketForm, origin: e.target.value })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Pincode
              </label>
              <input
                type="text"
                value={docketForm.consignorPincode}
                onChange={(e) =>
                  setDocketForm({
                    ...docketForm,
                    consignorPincode: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">
                Pickup Address
              </label>
              <input
                type="text"
                value={docketForm.consignorAddress}
                onChange={(e) =>
                  setDocketForm({
                    ...docketForm,
                    consignorAddress: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* 2. Consignee */}
        <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>2. Consignee</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">
                Consignee Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={docketForm.consigneeName}
                onChange={(e) =>
                  setDocketForm({
                    ...docketForm,
                    consigneeName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={docketForm.consigneeMobile}
                onChange={(e) =>
                  setDocketForm({
                    ...docketForm,
                    consigneeMobile: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Destination <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={docketForm.destination}
                onChange={(e) =>
                  setDocketForm({ ...docketForm, destination: e.target.value })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                District
              </label>
              <input
                type="text"
                value={docketForm.consigneeDistrict}
                onChange={(e) =>
                  setDocketForm({
                    ...docketForm,
                    consigneeDistrict: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                State
              </label>
              <input
                type="text"
                value={docketForm.consigneeState}
                onChange={(e) =>
                  setDocketForm({
                    ...docketForm,
                    consigneeState: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">
                Delivery Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={docketForm.consigneeAddress}
                onChange={(e) =>
                  setDocketForm({
                    ...docketForm,
                    consigneeAddress: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Pincode
              </label>
              <input
                type="text"
                value={docketForm.consigneePincode}
                onChange={(e) =>
                  setDocketForm({
                    ...docketForm,
                    consigneePincode: e.target.value,
                  })
                }
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Shipment Details */}
      <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <Truck className="w-4 h-4 text-sky-600" />
          <span>3. Shipment Details</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Mode</label>
            <select
              value={docketForm.mode}
              onChange={(e) =>
                setDocketForm({ ...docketForm, mode: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold focus:outline-none focus:border-orange-500"
            >
              <option value="ROAD">ROAD</option>
              <option value="TRAIN">TRAIN</option>
              <option value="AIR">AIR</option>
              <option value="SURFACE">SURFACE</option>
              <option value="SEA">SEA</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Vendor / Carrier
            </label>
            <select
              value={docketForm.vendorId || ""}
              onChange={(e) =>
                setDocketForm({ ...docketForm, vendorId: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
            >
              <option value="">Direct</option>
              {vendors.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.vendorName} ({v.cityDistrict || v.state})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Vendor AWB #
            </label>
            <input
              type="text"
              value={docketForm.vendorAirwayBillNumber}
              onChange={(e) =>
                setDocketForm({
                  ...docketForm,
                  vendorAirwayBillNumber: e.target.value,
                })
              }
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* <div>
            <label className="block font-bold text-slate-700 mb-1">
              Shivshakti AWB #
            </label>
            <input
              type="text"
              value={docketForm.shivshaktiAirBillNumber}
              onChange={(e) =>
                setDocketForm({
                  ...docketForm,
                  shivshaktiAirBillNumber: e.target.value,
                })
              }
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono focus:outline-none focus:border-orange-500"
            />
          </div> */}

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              E-Way Bill #
            </label>
            <input
              type="text"
              value={docketForm.eWayBillNumber}
              onChange={(e) =>
                setDocketForm({ ...docketForm, eWayBillNumber: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Invoice #
            </label>
            <input
              type="text"
              value={docketForm.invoiceNumber}
              onChange={(e) =>
                setDocketForm({ ...docketForm, invoiceNumber: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-mono focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Shipment Type
            </label>
            <select
              value={docketForm.shipmentType}
              onChange={(e) =>
                setDocketForm({ ...docketForm, shipmentType: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
            >
              <option value="STANDARD">STANDARD</option>
              <option value="EXPRESS">EXPRESS</option>
              <option value="NON-DOX">NON-DOX</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Remarks
            </label>
            <input
              type="text"
              value={docketForm.remarks}
              onChange={(e) =>
                setDocketForm({ ...docketForm, remarks: e.target.value })
              }
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      {/* 4. Packages & Volumetric Weight */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Scale className="w-4 h-4 text-indigo-600" />
            <span>4. Packages</span>
          </h2>

          <button
            type="button"
            onClick={addBoxItem}
            className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Box</span>
          </button>
        </div>

        <div className="space-y-3">
          {boxItems.map((item, index) => {
            const unit = item.unit === "INCH" ? "INCH" : "CM";
            const unitLabel = unit === "INCH" ? "in" : "cm";
            const divisor = unit === "INCH" ? DIVISOR_INCH : DIVISOR_CM;
            const vol =
              (((item.length || 0) * (item.width || 0) * (item.height || 0)) /
                divisor) *
              (item.quantity || 1);

            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 grid grid-cols-2 sm:grid-cols-9 gap-3 items-end text-xs"
              >
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-600 mb-1">
                    Box Type
                  </label>
                  <select
                    value={item.boxType}
                    onChange={(e) =>
                      updateBoxItem(index, "boxType", e.target.value)
                    }
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Standard Box">Standard Box</option>
                    <option value="Wooden Crate">Wooden Crate</option>
                    <option value="Carton">Carton Box</option>
                    <option value="Bag">Bag Packing</option>
                    <option value="Draph">Draph</option>
                    <option value="Plastic Crate">Plastic Crate</option>
                    {/* <option value="Heavy Drum">Drum / Barrel</option> */}
                    <option value="Pallet">Pallet</option>
                    {/* <option value="Insulated Cold Box">Cold Box</option> */}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    Unit
                  </label>
                  <select
                    value={unit}
                    onChange={(e) =>
                      updateBoxItem(
                        index,
                        "unit",
                        e.target.value === "INCH" ? "INCH" : "CM",
                      )
                    }
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                  >
                    <option value="CM">cm ({DIVISOR_CM})</option>
                    <option value="INCH">inch ({DIVISOR_INCH})</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    L ({unitLabel})
                  </label>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={item.length}
                    onChange={(e) =>
                      updateBoxItem(
                        index,
                        "length",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    W ({unitLabel})
                  </label>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={item.width}
                    onChange={(e) =>
                      updateBoxItem(
                        index,
                        "width",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    H ({unitLabel})
                  </label>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={item.height}
                    onChange={(e) =>
                      updateBoxItem(
                        index,
                        "height",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    Wt (kg)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={item.weight}
                    onChange={(e) =>
                      updateBoxItem(
                        index,
                        "weight",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-600 mb-1">
                    Qty
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateBoxItem(
                        index,
                        "quantity",
                        parseInt(e.target.value, 10) || 1,
                      )
                    }
                    className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold"
                  />
                </div>

                <div className="flex items-center justify-between gap-1">
                  <div>
                    <div className="text-[10px] text-slate-500">Vol Wt</div>
                    <div className="font-mono font-bold text-slate-900">
                      {vol.toFixed(2)} kg
                    </div>
                  </div>
                  {boxItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBoxItem(index)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove Box"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 text-white text-xs font-bold shadow-md shadow-orange-950/20 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
        >
          {loading ? (
            <span>Saving...</span>
          ) : (
            <>
              <span>{isEmployee ? "Submit Docket" : "Cut Docket"}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
