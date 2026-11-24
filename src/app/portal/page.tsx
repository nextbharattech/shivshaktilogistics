"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

// Types
import {
  ActiveTab,
  Consignment,
  Client,
  Vendor,
  StaffUser,
  DashboardStats,
  BoxItem,
  ReportFilters,
} from "@/components/portal/types";

// Layout & Navigation
import { PortalHeader } from "@/components/portal/PortalHeader";

// Modular Tabs
import { DashboardTab } from "@/components/portal/tabs/DashboardTab";
import { ConsignmentsTab } from "@/components/portal/tabs/ConsignmentsTab";
import { CutDocketTab } from "@/components/portal/tabs/CutDocketTab";
import { PendingApprovalsTab } from "@/components/portal/tabs/PendingApprovalsTab";
import { ClientsTab } from "@/components/portal/tabs/ClientsTab";
import { VendorsTab } from "@/components/portal/tabs/VendorsTab";
import { StaffUsersTab } from "@/components/portal/tabs/StaffUsersTab";
import { ReportsTab } from "@/components/portal/tabs/ReportsTab";
import { ProfileTab } from "@/components/portal/tabs/ProfileTab";

// Modular Modals
import { StatusUpdateModal } from "@/components/portal/modals/StatusUpdateModal";
import { ClientModal } from "@/components/portal/modals/ClientModal";
import { ViewClientModal } from "@/components/portal/modals/ViewClientModal";
import { EditClientModal } from "@/components/portal/modals/EditClientModal";
import { VendorModal } from "@/components/portal/modals/VendorModal";
import { ViewVendorModal } from "@/components/portal/modals/ViewVendorModal";
import { EditVendorModal } from "@/components/portal/modals/EditVendorModal";
import { StaffUserModal } from "@/components/portal/modals/StaffUserModal";
import { PrintableDocketModal } from "@/components/portal/PrintableDocketModal";
import { ViewDocketModal } from "@/components/portal/modals/ViewDocketModal";

export default function PortalDashboardPage() {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    isLoading: authLoading,
    logout,
    refreshProfile,
    isAdmin,
    isEmployee,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Granular Per-Tab Loading Indicators
  const [tabLoading, setTabLoading] = useState<Record<string, boolean>>({
    dashboard: false,
    consignments: false,
    "cut-docket": false,
    "pending-approvals": false,
    clients: false,
    vendors: false,
    users: false,
    reports: false,
    profile: false,
  });

  // Track which tabs have already loaded their data (Stale-While-Revalidate caching)
  const [loadedTabs, setLoadedTabs] = useState<Record<string, boolean>>({
    dashboard: false,
    consignments: false,
    "cut-docket": false,
    "pending-approvals": false,
    clients: false,
    vendors: false,
    users: false,
    reports: false,
    profile: true,
  });

  // Data states
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    null,
  );
  const [consignments, setConsignments] = useState<Consignment[]>([]);
  const [pendingApprovals, setPendingApprovals] = useState<Consignment[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [staffUsers, setStaffUsers] = useState<StaffUser[]>([]);

  // Modals & Active selections
  const [selectedDocketForView, setSelectedDocketForView] =
    useState<Consignment | null>(null);
  const [selectedDocketForSlip, setSelectedDocketForSlip] =
    useState<Consignment | null>(null);
  const [selectedDocketForStatus, setSelectedDocketForStatus] =
    useState<Consignment | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [selectedClientForView, setSelectedClientForView] =
    useState<Client | null>(null);
  const [selectedClientForEdit, setSelectedClientForEdit] =
    useState<Client | null>(null);
  const [statusLoadingClientId, setStatusLoadingClientId] = useState<
    number | null
  >(null);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [selectedVendorForView, setSelectedVendorForView] =
    useState<Vendor | null>(null);
  const [selectedVendorForEdit, setSelectedVendorForEdit] =
    useState<Vendor | null>(null);
  const [statusLoadingVendorId, setStatusLoadingVendorId] = useState<
    number | null
  >(null);
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

  // Cut Docket state
  const [docketForm, setDocketForm] = useState({
    shivshaktiAirBillNumber: "",
    vendorId: "",
    vendorAirwayBillNumber: "",
    clientId: "",
    consignorName: "",
    consignorPhone: "",
    consignorAddress: "",
    consignorPincode: "",
    consignorGst: "",
    consigneeName: "",
    consigneeMobile: "",
    consigneeAddress: "",
    consigneeDistrict: "",
    consigneeState: "",
    consigneePincode: "",
    origin: "Mumbai Main Hub",
    destination: "",
    mode: "ROAD",
    shipmentType: "STANDARD",
    eWayBillNumber: "",
    invoiceNumber: "",
    invoiceRequired: false,
    remarks: "",
  });

  const [boxItems, setBoxItems] = useState<BoxItem[]>([
    {
      boxType: "Standard Box",
      unit: "CM",
      length: 40,
      width: 30,
      height: 30,
      weight: 15,
      quantity: 1,
      description: "",
    },
  ]);

  // Report filters state
  const [reportFilters, setReportFilters] = useState<ReportFilters>({
    fromDate: "",
    toDate: "",
    clientId: "",
    vendorId: "",
    status: "",
    mode: "",
  });
  const [reportResults, setReportResults] = useState<any[]>([]);

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    name: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
  });

  // Check auth redirect
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/portal/login");
    }
  }, [authLoading, isAuthenticated, router]);

  // Auto-dismiss feedback message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Populate profile info when user loads
  useEffect(() => {
    if (user) {
      setProfileForm((prev) => ({
        ...prev,
        name: user.name || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  // --------------------------------------------------------------------------
  // Granular On-Demand API Loaders
  // --------------------------------------------------------------------------

  // 1. Dashboard Tab Data (Overview KPIs + Recent Shipments Feed)
  const loadDashboardData = useCallback(
    async (force = false) => {
      if (!force && loadedTabs.dashboard && dashboardStats) return;

      setTabLoading((prev) => ({ ...prev, dashboard: true }));
      try {
        const res = await api.dashboard.getStats();
        if (res?.data) {
          setDashboardStats(res.data);
          if (
            Array.isArray(res.data.recentShipments) &&
            consignments.length === 0
          ) {
            setConsignments(res.data.recentShipments);
          }
        }
        setLoadedTabs((prev) => ({ ...prev, dashboard: true }));
      } catch (err: any) {
        console.error("Failed to load dashboard statistics:", err);
      } finally {
        setTabLoading((prev) => ({ ...prev, dashboard: false }));
      }
    },
    [loadedTabs.dashboard, dashboardStats, consignments.length],
  );

  // 2. Consignments Directory Data
  const loadConsignmentsData = useCallback(
    async (force = false) => {
      if (!force && loadedTabs.consignments) return;

      setTabLoading((prev) => ({ ...prev, consignments: true }));
      try {
        const res = await api.consignments.getAll({ limit: 100 });
        if (res?.data) {
          setConsignments(Array.isArray(res.data) ? res.data : []);
        }
        setLoadedTabs((prev) => ({ ...prev, consignments: true }));
      } catch (err: any) {
        console.error("Failed to load consignments directory:", err);
      } finally {
        setTabLoading((prev) => ({ ...prev, consignments: false }));
      }
    },
    [loadedTabs.consignments],
  );

  // 3. Client Master Data
  const loadClientsData = useCallback(
    async (force = false) => {
      if (!force && loadedTabs.clients) return;

      setTabLoading((prev) => ({ ...prev, clients: true }));
      try {
        const res = await api.clients.getAll({ limit: 100 });
        if (res?.data) {
          setClients(Array.isArray(res.data) ? res.data : []);
        }
        setLoadedTabs((prev) => ({ ...prev, clients: true }));
      } catch (err: any) {
        console.error("Failed to load clients:", err);
      } finally {
        setTabLoading((prev) => ({ ...prev, clients: false }));
      }
    },
    [loadedTabs.clients],
  );

  // 4. Vendor Master Data
  const loadVendorsData = useCallback(
    async (force = false) => {
      if (!force && loadedTabs.vendors) return;

      setTabLoading((prev) => ({ ...prev, vendors: true }));
      try {
        const res = await api.vendors.getAll({ limit: 100 });
        if (res?.data) {
          setVendors(Array.isArray(res.data) ? res.data : []);
        }
        setLoadedTabs((prev) => ({ ...prev, vendors: true }));
      } catch (err: any) {
        console.error("Failed to load vendors:", err);
      } finally {
        setTabLoading((prev) => ({ ...prev, vendors: false }));
      }
    },
    [loadedTabs.vendors],
  );

  // 5. Pending Approvals Queue (Admin Only)
  const loadPendingApprovalsData = useCallback(
    async (force = false) => {
      if (!force && loadedTabs["pending-approvals"]) return;

      setTabLoading((prev) => ({ ...prev, "pending-approvals": true }));
      try {
        const res = await api.consignments.getPendingApprovals(1, 50);
        if (res?.data) {
          setPendingApprovals(Array.isArray(res.data) ? res.data : []);
        }
        setLoadedTabs((prev) => ({ ...prev, "pending-approvals": true }));
      } catch (err: any) {
        console.error("Failed to load pending approvals:", err);
      } finally {
        setTabLoading((prev) => ({ ...prev, "pending-approvals": false }));
      }
    },
    [loadedTabs],
  );

  // 6. Staff Users Accounts (Admin Only)
  const loadStaffUsersData = useCallback(
    async (force = false) => {
      if (!force && loadedTabs.users) return;

      setTabLoading((prev) => ({ ...prev, users: true }));
      try {
        const res = await api.users.getAll({ limit: 50 });
        if (res?.data) {
          setStaffUsers(Array.isArray(res.data) ? res.data : []);
        }
        setLoadedTabs((prev) => ({ ...prev, users: true }));
      } catch (err: any) {
        console.error("Failed to load staff users:", err);
      } finally {
        setTabLoading((prev) => ({ ...prev, users: false }));
      }
    },
    [loadedTabs.users],
  );

  // --------------------------------------------------------------------------
  // Intelligent Tab Route Dispatcher: Only call APIs for the ACTIVE tab
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!isAuthenticated) return;

    switch (activeTab) {
      case "dashboard":
        loadDashboardData();
        break;

      case "consignments":
        loadConsignmentsData();
        break;

      case "clients":
        loadClientsData();
        break;

      case "vendors":
        loadVendorsData();
        break;

      case "cut-docket":
        // Booking form requires client list & linehaul carriers for dropdowns
        loadClientsData();
        loadVendorsData();
        break;

      case "pending-approvals":
        if (isAdmin) loadPendingApprovalsData();
        break;

      case "users":
        if (isAdmin) loadStaffUsersData();
        break;

      case "reports":
        // Filter options can filter by client
        loadClientsData();
        break;

      case "profile":
        break;
    }
  }, [
    activeTab,
    isAuthenticated,
    isAdmin,
    loadDashboardData,
    loadConsignmentsData,
    loadClientsData,
    loadVendorsData,
    loadPendingApprovalsData,
    loadStaffUsersData,
  ]);

  // --------------------------------------------------------------------------
  // Targeted CRUD Handlers: Update only relevant domain state
  // --------------------------------------------------------------------------

  // Submit Cut Docket
  const handleCreateDocket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !docketForm.consignorName ||
      !docketForm.consigneeName ||
      !docketForm.consigneeAddress
    ) {
      setMessage({
        type: "error",
        text: "Please provide consignor, consignee, and destination address.",
      });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const divisorCm =
        Number(process.env.NEXT_PUBLIC_VOLUMETRIC_DIVISOR_CM) || 5000;
      const divisorInch =
        Number(process.env.NEXT_PUBLIC_VOLUMETRIC_DIVISOR_INCH) || 1728;

      let totalActual = 0;
      let totalVol = 0;
      const processedItems = boxItems.map((b) => {
        const q = Number(b.quantity) || 1;
        const divisor = b.unit === "INCH" ? divisorInch : divisorCm;
        const itemVol =
          (((Number(b.length) || 0) *
            (Number(b.width) || 0) *
            (Number(b.height) || 0)) /
            divisor) *
          q;
        totalActual += (Number(b.weight) || 0) * q;
        totalVol += itemVol;
        return {
          ...b,
          volumetricWeight: parseFloat(itemVol.toFixed(2)),
        };
      });
      const chargedBillWeight = Math.max(totalActual, totalVol);

      const payload = {
        ...docketForm,
        vendorId: docketForm.vendorId
          ? parseInt(docketForm.vendorId, 10)
          : null,
        clientId: docketForm.clientId
          ? parseInt(docketForm.clientId, 10)
          : null,
        items: processedItems,
        manualActualWeight: parseFloat(totalActual.toFixed(2)),
        manualVolumetricWeight: parseFloat(totalVol.toFixed(2)),
        manualBillWeight: parseFloat(chargedBillWeight.toFixed(2)),
      };

      const res = await api.consignments.create(payload);
      if (res.success) {
        setMessage({
          type: "success",
          text: res.message || "Docket cut successfully!",
        });

        // Reset form
        setDocketForm({
          shivshaktiAirBillNumber: "",
          vendorId: "",
          vendorAirwayBillNumber: "",
          clientId: "",
          consignorName: "",
          consignorPhone: "",
          consignorAddress: "",
          consignorPincode: "",
          consignorGst: "",
          consigneeName: "",
          consigneeMobile: "",
          consigneeAddress: "",
          consigneeDistrict: "",
          consigneeState: "",
          consigneePincode: "",
          origin: "Mumbai Main Hub",
          destination: "",
          mode: "ROAD",
          shipmentType: "STANDARD",
          eWayBillNumber: "",
          invoiceNumber: "",
          invoiceRequired: false,
          remarks: "",
        });
        setBoxItems([
          {
            boxType: "Standard Box",
            unit: "CM",
            length: 40,
            width: 30,
            height: 30,
            weight: 15,
            quantity: 1,
            description: "",
          },
        ]);

        // Invalidate cached consignments and dashboard stats
        setLoadedTabs((prev) => ({
          ...prev,
          consignments: false,
          dashboard: false,
          "pending-approvals": false,
        }));

        // Navigate to consignments directory and trigger immediate refresh
        setActiveTab("consignments");
        loadConsignmentsData(true);
      } else {
        setMessage({
          type: "error",
          text: res.message || "Failed to create docket",
        });
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Error cutting docket",
      });
    } finally {
      setLoading(false);
    }
  };

  // Confirm / Approve Docket (Admin)
  const handleConfirmDocket = async (id: number) => {
    setLoading(true);
    try {
      const res = await api.consignments.confirm(id);
      if (res.success) {
        setMessage({
          type: "success",
          text: "Docket approved and confirmed successfully!",
        });

        // Refresh pending approvals immediately
        loadPendingApprovalsData(true);

        // Invalidate consignments & dashboard caches
        setLoadedTabs((prev) => ({
          ...prev,
          consignments: false,
          dashboard: false,
        }));
      } else {
        setMessage({ type: "error", text: res.message || "Approval failed" });
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Error approving docket",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update Status
  const handleUpdateStatus = async (statusData: {
    status: string;
    location: string;
    remarks: string;
  }) => {
    if (!selectedDocketForStatus) return;

    setLoading(true);
    try {
      const res = await api.consignments.updateStatus(
        selectedDocketForStatus.id,
        statusData,
      );
      if (res.success) {
        setMessage({
          type: "success",
          text: "Milestone status updated successfully!",
        });
        setSelectedDocketForStatus(null);

        // Re-fetch consignments directory
        loadConsignmentsData(true);

        // Invalidate dashboard stats
        setLoadedTabs((prev) => ({ ...prev, dashboard: false }));
      } else {
        setMessage({
          type: "error",
          text: res.message || "Failed to update status",
        });
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Error updating status",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete Consignment (Admin)
  const handleDeleteConsignment = async (id: number) => {
    if (!confirm("Are you sure you want to delete this consignment docket?"))
      return;
    setLoading(true);
    try {
      const res = await api.consignments.delete(id);
      if (res.success) {
        setMessage({ type: "success", text: "Consignment deleted." });

        // Refresh consignments directly
        loadConsignmentsData(true);

        // Invalidate dashboard stats
        setLoadedTabs((prev) => ({ ...prev, dashboard: false }));
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to delete" });
    } finally {
      setLoading(false);
    }
  };

  // Create Client
  const handleCreateClient = async (formData: any) => {
    setLoading(true);
    try {
      const res = await api.clients.create(formData);
      if (res.success) {
        setMessage({ type: "success", text: "Client added successfully!" });
        setIsClientModalOpen(false);

        // Re-fetch only clients
        loadClientsData(true);
      } else {
        throw new Error(res.message || "Failed to add client");
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Error adding client" });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update Client
  const handleUpdateClient = async (id: number, formData: any) => {
    setLoading(true);
    try {
      const res = await api.clients.update(id, formData);
      if (res.success) {
        setMessage({ type: "success", text: "Client updated successfully!" });
        setSelectedClientForEdit(null);
        // Refresh local clients list
        setClients((prev) =>
          prev.map((c) => (c.id === id ? { ...c, ...formData } : c)),
        );
        loadClientsData(true);
      } else {
        throw new Error(res.message || "Failed to update client");
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Error updating client",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Toggle Client Active/Inactive Status
  const handleToggleClientStatus = async (client: Client) => {
    const nextStatus = client.isActive === false ? true : false;
    setStatusLoadingClientId(client.id);
    try {
      const res = await api.clients.update(client.id, { isActive: nextStatus });
      if (res.success) {
        setClients((prev) =>
          prev.map((c) =>
            c.id === client.id ? { ...c, isActive: nextStatus } : c,
          ),
        );
        setMessage({
          type: "success",
          text: `Client "${client.name}" ${nextStatus ? "activated" : "deactivated"} successfully.`,
        });
      } else {
        setMessage({
          type: "error",
          text: res.message || "Failed to update client status",
        });
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Failed to toggle client status",
      });
    } finally {
      setStatusLoadingClientId(null);
    }
  };

  // Create Vendor
  const handleCreateVendor = async (formData: any) => {
    setLoading(true);
    try {
      const res = await api.vendors.create(formData);
      if (res.success) {
        setMessage({
          type: "success",
          text: "Carrier vendor added successfully!",
        });
        setIsVendorModalOpen(false);

        // Re-fetch only vendors
        loadVendorsData(true);
      } else {
        throw new Error(res.message || "Failed to add vendor");
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Error adding vendor" });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update Vendor
  const handleUpdateVendor = async (id: number, formData: any) => {
    setLoading(true);
    try {
      const res = await api.vendors.update(id, formData);
      if (res.success) {
        setMessage({ type: "success", text: "Vendor updated successfully!" });
        setSelectedVendorForEdit(null);
        // Refresh local vendors list
        setVendors((prev) =>
          prev.map((v) => (v.id === id ? { ...v, ...formData } : v)),
        );
        loadVendorsData(true);
      } else {
        throw new Error(res.message || "Failed to update vendor");
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Error updating vendor",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Toggle Vendor Active/Inactive Status
  const handleToggleVendorStatus = async (vendor: Vendor) => {
    const nextStatus = vendor.isActive === false ? true : false;
    setStatusLoadingVendorId(vendor.id);
    try {
      const res = await api.vendors.update(vendor.id, { isActive: nextStatus });
      if (res.success) {
        setVendors((prev) =>
          prev.map((v) =>
            v.id === vendor.id ? { ...v, isActive: nextStatus } : v,
          ),
        );
        setMessage({
          type: "success",
          text: `Carrier "${vendor.vendorName}" ${nextStatus ? "activated" : "deactivated"} successfully.`,
        });
      } else {
        setMessage({
          type: "error",
          text: res.message || "Failed to update vendor status",
        });
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Failed to toggle vendor status",
      });
    } finally {
      setStatusLoadingVendorId(null);
    }
  };

  // Create Staff
  const handleCreateStaff = async (formData: any) => {
    setLoading(true);
    try {
      const res = await api.users.create(formData);
      if (res.success) {
        setMessage({
          type: "success",
          text: "Staff user created successfully!",
        });
        setIsStaffModalOpen(false);

        // Re-fetch only staff users
        loadStaffUsersData(true);
      } else {
        throw new Error(res.message || "Failed to create staff user");
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Error creating staff user",
      });
    } finally {
      setLoading(false);
    }
  };

  // Reports Generator
  const handleRunReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.reports.getConsignments(reportFilters, "json");
      if (res.success && res.data) {
        setReportResults(res.data.consignments || []);
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Failed to generate report",
      });
    } finally {
      setLoading(false);
    }
  };

  // Trigger Excel / CSV Export
  const handleExportDownload = async (format: "excel" | "csv") => {
    try {
      await api.reports.downloadFile(reportFilters, format);
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Failed to export report",
      });
    }
  };

  // Update Profile
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (profileForm.name || profileForm.phone) {
        await api.auth.updateProfile({
          name: profileForm.name,
          phone: profileForm.phone,
        });
        await refreshProfile();
      }
      if (profileForm.oldPassword && profileForm.newPassword) {
        await api.auth.changePassword({
          oldPassword: profileForm.oldPassword,
          newPassword: profileForm.newPassword,
        });
        setMessage({
          type: "success",
          text: "Password changed successfully! Please login again.",
        });
        logout();
        return;
      }
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const pendingApprovalsCount =
    dashboardStats?.overview?.pendingApprovals ?? pendingApprovals.length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900">
      {/* Modular Portal Header */}
      <PortalHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        isAdmin={Boolean(isAdmin)}
        pendingApprovalsCount={pendingApprovalsCount}
        onLogout={logout}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        {/* Toast Notification Alert */}
        {message && (
          <div
            className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in duration-200 ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <span>{message.text}</span>
            <button
              onClick={() => setMessage(null)}
              className="font-bold underline ml-4 hover:opacity-75"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Tab 1: Dashboard (Only loads dashboard stats & recent feed) */}
        {activeTab === "dashboard" && (
          <DashboardTab
            stats={dashboardStats}
            consignments={consignments}
            onCutDocket={() => setActiveTab("cut-docket")}
            onViewConsignments={() => setActiveTab("consignments")}
            onSelectSlip={(c) => setSelectedDocketForSlip(c)}
            onSelectStatus={(c) => setSelectedDocketForStatus(c)}
            loading={tabLoading.dashboard}
            onRefresh={() => loadDashboardData(true)}
          />
        )}

        {/* Tab 2: Client Master (Only loads clients data) */}
        {activeTab === "clients" && (
          <ClientsTab
            clients={clients}
            onOpenAddModal={() => setIsClientModalOpen(true)}
            onViewClient={(cl) => setSelectedClientForView(cl)}
            onEditClient={(cl) => setSelectedClientForEdit(cl)}
            onToggleStatus={handleToggleClientStatus}
            statusLoadingId={statusLoadingClientId}
            loading={tabLoading.clients}
            onRefresh={() => loadClientsData(true)}
          />
        )}

        {/* Tab 3: Vendor Master (Only loads vendors data) */}
        {activeTab === "vendors" && (
          <VendorsTab
            vendors={vendors}
            onOpenAddModal={() => setIsVendorModalOpen(true)}
            onViewVendor={(v) => setSelectedVendorForView(v)}
            onEditVendor={(v) => setSelectedVendorForEdit(v)}
            onToggleStatus={handleToggleVendorStatus}
            statusLoadingId={statusLoadingVendorId}
            loading={tabLoading.vendors}
            onRefresh={() => loadVendorsData(true)}
          />
        )}

        {/* Tab 4: Consignments Directory (Only loads consignments data) */}
        {activeTab === "consignments" && (
          <ConsignmentsTab
            consignments={consignments}
            isAdmin={Boolean(isAdmin)}
            onCutDocket={() => setActiveTab("cut-docket")}
            onViewDocket={(c) => setSelectedDocketForView(c)}
            onSelectSlip={(c) => setSelectedDocketForSlip(c)}
            onSelectStatus={(c) => setSelectedDocketForStatus(c)}
            onConfirmDocket={handleConfirmDocket}
            onDeleteConsignment={handleDeleteConsignment}
            onRefresh={() => loadConsignmentsData(true)}
            loading={tabLoading.consignments}
          />
        )}

        {/* Tab 5: Cut Docket Form (Loads client/vendor options only as needed) */}
        {activeTab === "cut-docket" && (
          <CutDocketTab
            docketForm={docketForm}
            setDocketForm={setDocketForm}
            boxItems={boxItems}
            setBoxItems={setBoxItems}
            clients={clients}
            vendors={vendors}
            isAdmin={Boolean(isAdmin)}
            isEmployee={Boolean(isEmployee)}
            onSubmit={handleCreateDocket}
            onCancel={() => setActiveTab("consignments")}
            loading={loading}
          />
        )}

        {/* Tab 6: Pending Approvals Queue (Admin Only - Loads only pending approvals) */}
        {/* {activeTab === "pending-approvals" && isAdmin && (
          <PendingApprovalsTab
            pendingApprovals={pendingApprovals}
            onConfirmDocket={handleConfirmDocket}
            onSelectSlip={(c) => setSelectedDocketForSlip(c)}
            loading={tabLoading["pending-approvals"]}
            onRefresh={() => loadPendingApprovalsData(true)}
          />
        )} */}

        {/* Tab 7: Staff User Accounts (Admin Only - Loads only staff users) */}
        {activeTab === "users" && isAdmin && (
          <StaffUsersTab
            staffUsers={staffUsers}
            onOpenAddModal={() => setIsStaffModalOpen(true)}
            loading={tabLoading.users}
            onRefresh={() => loadStaffUsersData(true)}
          />
        )}

        {/* Tab 8: Reports & Exports */}
        {activeTab === "reports" && (
          <ReportsTab
            reportFilters={reportFilters}
            setReportFilters={setReportFilters}
            clients={clients}
            reportResults={reportResults}
            onRunReport={handleRunReport}
            onExportDownload={handleExportDownload}
            loading={loading}
          />
        )}

        {/* Tab 9: Profile & Security */}
        {activeTab === "profile" && (
          <ProfileTab
            user={user}
            isAdmin={Boolean(isAdmin)}
            profileForm={profileForm}
            setProfileForm={setProfileForm}
            onSubmit={handleUpdateProfile}
            loading={loading}
          />
        )}
      </main>

      {/* MODAL: View Full Docket */}
      <ViewDocketModal
        isOpen={Boolean(selectedDocketForView)}
        consignment={selectedDocketForView}
        onClose={() => setSelectedDocketForView(null)}
        onPrintSlip={(c) => setSelectedDocketForSlip(c)}
      />

      {/* MODAL: Printable AWB Docket Slip */}
      {selectedDocketForSlip && (
        <PrintableDocketModal
          consignment={selectedDocketForSlip}
          onClose={() => setSelectedDocketForSlip(null)}
        />
      )}

      {/* MODAL: Update Milestone Status */}
      {selectedDocketForStatus && (
        <StatusUpdateModal
          consignment={selectedDocketForStatus}
          onClose={() => setSelectedDocketForStatus(null)}
          onSubmit={handleUpdateStatus}
          loading={loading}
        />
      )}

      {/* MODAL: Add Client */}
      <ClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onSubmit={handleCreateClient}
        loading={loading}
      />

      {/* MODAL: View Client (Reads client from memory without extra ID fetch) */}
      <ViewClientModal
        isOpen={Boolean(selectedClientForView)}
        client={selectedClientForView}
        onClose={() => setSelectedClientForView(null)}
        onEdit={(cl) => {
          setSelectedClientForView(null);
          setSelectedClientForEdit(cl);
        }}
      />

      {/* MODAL: Edit Client */}
      <EditClientModal
        isOpen={Boolean(selectedClientForEdit)}
        client={selectedClientForEdit}
        onClose={() => setSelectedClientForEdit(null)}
        onSubmit={handleUpdateClient}
        loading={loading}
      />

      {/* MODAL: Add Vendor */}
      <VendorModal
        isOpen={isVendorModalOpen}
        onClose={() => setIsVendorModalOpen(false)}
        onSubmit={handleCreateVendor}
        loading={loading}
      />

      {/* MODAL: View Vendor (Reads vendor from state without extra ID fetch) */}
      <ViewVendorModal
        isOpen={Boolean(selectedVendorForView)}
        vendor={selectedVendorForView}
        onClose={() => setSelectedVendorForView(null)}
        onEdit={(v) => {
          setSelectedVendorForView(null);
          setSelectedVendorForEdit(v);
        }}
      />

      {/* MODAL: Edit Vendor */}
      <EditVendorModal
        isOpen={Boolean(selectedVendorForEdit)}
        vendor={selectedVendorForEdit}
        onClose={() => setSelectedVendorForEdit(null)}
        onSubmit={handleUpdateVendor}
        loading={loading}
      />

      {/* MODAL: Add Staff User */}
      <StaffUserModal
        isOpen={isStaffModalOpen && Boolean(isAdmin)}
        onClose={() => setIsStaffModalOpen(false)}
        onSubmit={handleCreateStaff}
        loading={loading}
      />
    </div>
  );
}
