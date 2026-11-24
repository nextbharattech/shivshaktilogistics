"use client";

import React, { useState, useMemo } from "react";
import {
  Building2,
  Plus,
  Search,
  X,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
} from "lucide-react";
import { Client } from "../types";

interface ClientsTabProps {
  clients: Client[];
  onOpenAddModal: () => void;
  onViewClient?: (client: Client) => void;
  onEditClient?: (client: Client) => void;
  onToggleStatus?: (client: Client) => void;
  statusLoadingId?: number | null;
  loading?: boolean;
  onRefresh?: () => void;
}

const ITEMS_PER_PAGE = 25;

export function ClientsTab({
  clients,
  onOpenAddModal,
  onViewClient,
  onEditClient,
  onToggleStatus,
  statusLoadingId,
  loading = false,
  onRefresh,
}: ClientsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const q = searchQuery.toLowerCase().trim();
      return (
        !q ||
        c.name?.toLowerCase().includes(q) ||
        c.phoneNumber?.toLowerCase().includes(q) ||
        c.gstNumber?.toLowerCase().includes(q) ||
        c.city?.toLowerCase().includes(q) ||
        c.state?.toLowerCase().includes(q) ||
        c.fullAddress?.toLowerCase().includes(q) ||
        c.billingAddress?.toLowerCase().includes(q)
      );
    });
  }, [clients, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedClients = filteredClients.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
              <Building2 className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Client Master (Consignors)
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              title="Refresh Clients List"
              className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin text-orange-600" : ""}`}
              />
            </button>
          )}
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 text-white font-bold text-xs rounded-xl shadow-md inline-flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Client</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by company name, phone, city, or GSTIN..."
          className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setCurrentPage(1);
            }}
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
              <th className="py-3 px-3.5">Client / Consignor Name</th>
              <th className="py-3 px-3 min-w-[180px]">Full Address</th>
              {/* <th className="py-3 px-3 min-w-[180px]">Billing Address</th> */}
              <th className="py-3 px-3">Phone</th>
              <th className="py-3 px-3">Email Address</th>
              <th className="py-3 px-3">City & State</th>
              <th className="py-3 px-3">Pincode</th>
              <th className="py-3 px-3">GSTIN</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-slate-500">
                  <div className="inline-flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-orange-600" />
                    <span className="font-medium text-xs">
                      Loading registered clients...
                    </span>
                  </div>
                </td>
              </tr>
            ) : filteredClients.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-10 text-center text-slate-400">
                  No matching clients found.
                </td>
              </tr>
            ) : (
              paginatedClients.map((cl) => {
                const isActive = cl.isActive !== false;
                const isToggling = statusLoadingId === cl.id;

                return (
                  <tr
                    key={cl.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-3.5 font-bold text-slate-900 whitespace-nowrap">
                      {cl.name}
                    </td>
                    <td className="py-3.5 px-3 text-slate-700 whitespace-normal break-words leading-relaxed max-w-[260px]">
                      {cl.fullAddress || "-"}
                    </td>
                    {/* <td className="py-3.5 px-3 text-slate-700 whitespace-normal break-words leading-relaxed max-w-[260px]">
                      {cl.billingAddress || "-"}
                    </td> */}
                    <td className="py-3.5 px-3 font-mono text-slate-700 whitespace-nowrap">
                      {cl.phoneNumber}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 whitespace-nowrap">
                      {cl.emailAddress || "-"}
                    </td>
                    <td className="py-3.5 px-3 text-slate-700 whitespace-nowrap">
                      {[cl.city, cl.state].filter(Boolean).join(", ") || "-"}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-700 whitespace-nowrap">
                      {cl.pincode || "-"}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-700 whitespace-nowrap">
                      {cl.gstNumber || "-"}
                    </td>

                    {/* Sliding On/Off Status Switch */}
                    <td className="py-3.5 px-3 text-center whitespace-nowrap">
                      <div className="inline-flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={isActive}
                          disabled={isToggling}
                          onClick={() => onToggleStatus && onToggleStatus(cl)}
                          title={
                            isActive
                              ? "Click to deactivate"
                              : "Click to activate"
                          }
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none disabled:opacity-50 ${
                            isActive ? "bg-emerald-500" : "bg-slate-300"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                              isActive ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <span
                          className={`text-[10px] font-bold ${
                            isActive ? "text-emerald-700" : "text-slate-400"
                          }`}
                        >
                          {isActive ? "ON" : "OFF"}
                        </span>
                      </div>
                    </td>

                    {/* Actions: View & Edit */}
                    <td className="py-3.5 px-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {onViewClient && (
                          <button
                            type="button"
                            onClick={() => onViewClient(cl)}
                            title="View Client Details"
                            className="p-1.5 text-slate-600 hover:text-orange-600 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 rounded-lg transition-colors inline-flex items-center gap-1 font-semibold text-[11px]"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">View</span>
                          </button>
                        )}
                        {onEditClient && (
                          <button
                            type="button"
                            onClick={() => onEditClient(cl)}
                            title="Edit Client"
                            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg transition-colors inline-flex items-center gap-1 font-semibold text-[11px]"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {!loading && filteredClients.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500">
          <div>
            Showing{" "}
            <span className="font-bold text-slate-800">{startIndex + 1}</span>{" "}
            to{" "}
            <span className="font-bold text-slate-800">
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredClients.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-800">
              {filteredClients.length}
            </span>{" "}
            clients
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="px-3 py-1 font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg">
                Page {currentPage} of {totalPages}
              </div>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
