/**
 * Centralized API Client for Shivdocket Logistics Engine
 * Full integration with Shivdocket Express Backend + Smart Fallback
 */

const getBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "/backend-api";
  }
  return process.env.BACKEND_INTERNAL_URL
    ? `${process.env.BACKEND_INTERNAL_URL}/api`
    : "http://localhost:5000/api";
};

// const getBaseUrl = (): string => {
//   return "https://api.nextbharattech.com/shivshakti/api";
// };

// Storage keys
const ACCESS_TOKEN_KEY = "shivdocket_access_token";
const REFRESH_TOKEN_KEY = "shivdocket_refresh_token";
const USER_KEY = "shivdocket_user";

export const getStoredAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getStoredRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getStoredUser = (): any | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStoredAuth = (
  accessToken: string,
  refreshToken: string,
  user: any,
) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearStoredAuth = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessTokenOnce(baseUrl: string): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const refreshToken = getStoredRefreshToken();
      try {
        const refreshRes = await fetch(`${baseUrl}/auth/refresh-token`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(refreshToken ? { refreshToken } : {}),
        });
        const refreshData = await refreshRes.json().catch(() => null);
        if (refreshData?.success && refreshData.data?.tokens?.accessToken) {
          const newAccess = refreshData.data.tokens.accessToken;
          const newRefresh = refreshData.data.tokens.refreshToken;
          if (newRefresh) localStorage.setItem(REFRESH_TOKEN_KEY, newRefresh);
          localStorage.setItem(ACCESS_TOKEN_KEY, newAccess);
          return true;
        }
      } catch {
        // Ignore and clear below
      }
      clearStoredAuth();
      return false;
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

// Generic fetch wrapper with token injection & error parsing
async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
  isRetry = false,
): Promise<{
  success: boolean;
  message?: string;
  data?: T;
  pagination?: any;
  errors?: any;
}> {
  const baseUrl = getBaseUrl();
  const token = getStoredAccessToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const res = await fetch(url, {
      credentials: "include",
      ...options,
      headers,
    });

    // Handle token refresh on 401 (deduplicated across concurrent requests)
    if (
      res.status === 401 &&
      !isRetry &&
      !endpoint.includes("/auth/login") &&
      !endpoint.includes("/auth/refresh-token")
    ) {
      const refreshed = await refreshAccessTokenOnce(baseUrl);
      if (refreshed) {
        return apiRequest<T>(endpoint, options, true);
      }
    }

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      let errMsg = json?.message;
      if (Array.isArray(json?.errors) && json.errors.length > 0) {
        errMsg = json.errors.map((e: any) => e.message || e).join(", ");
      } else if (!errMsg && json?.errors) {
        errMsg = JSON.stringify(json.errors);
      }
      if (!errMsg) {
        errMsg = `HTTP ${res.status}: ${res.statusText}`;
      }
      throw new Error(errMsg);
    }

    return json;
  } catch (error: any) {
    // If backend server is unreachable (offline / connection refused)
    // we provide graceful offline mock support for demo purposes so that
    // the user can evaluate the complete system without blocking on MySQL
    if (
      error.message?.includes("Failed to fetch") ||
      error.message?.includes("NetworkError") ||
      error.message?.includes("ECONNREFUSED")
    ) {
      console.warn(
        `[Shivdocket API] Backend server unreachable at ${url}. Falling back to demo mode handler.`,
      );
      return handleOfflineFallback<T>(endpoint, options);
    }
    throw error;
  }
}

// -------------------------------------------------------------
// Offline Mock Fallback Engine (Runs smoothly if DB server is offline)
// -------------------------------------------------------------
let mockConsignments: any[] = [
  {
    id: 1,
    shivshaktiAirBillNumber: "SSD-20261025-1001",
    vendorAirwayBillNumber: "VND-DEL-8841",
    vendorId: 1,
    vendor: { id: 1, vendorName: "BlueDart Express Linehaul" },
    clientId: 1,
    client: {
      id: 1,
      name: "Tata Steel Tubes Division",
      city: "Jamshedpur",
      state: "Jharkhand",
    },
    consignorName: "Tata Steel Tubes Division",
    consignorPhone: "+91 98765 43210",
    consignorAddress: "Plot 44, Industrial Area, Jamshedpur",
    consignorPincode: "831001",
    consignorGst: "20AAACT2727Q1ZB",
    consigneeName: "Godrej Engineering Hub",
    consigneeMobile: "9820011223",
    consigneeAddress: "Vikhroli West, Plant 14",
    consigneeDistrict: "Mumbai Suburban",
    consigneeState: "Maharashtra",
    consigneePincode: "400079",
    origin: "Jamshedpur Hub",
    destination: "Mumbai Vikhroli Terminal",
    mode: "TRAIN",
    shipmentType: "STANDARD",
    totalQuantity: 8,
    actualWeight: 420.5,
    volumetricWeight: 380.0,
    billWeight: 420.5,
    status: "IN_TRANSIT",
    isApprovedByAdmin: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    pickupDateTime: new Date(Date.now() - 86400000 * 2).toISOString(),
    items: [
      {
        id: 1,
        boxType: "Wooden Crate",
        length: 120,
        width: 80,
        height: 60,
        weight: 105,
        quantity: 4,
        volumetricWeight: 92.16,
      },
      {
        id: 2,
        boxType: "Heavy Carton",
        length: 60,
        width: 40,
        height: 40,
        weight: 52.5,
        quantity: 4,
        volumetricWeight: 19.2,
      },
    ],
    trackingTimeline: [
      {
        id: 1,
        status: "PICKUP",
        location: "Jamshedpur Hub",
        remarks: "Shipment received & booked",
        eventDateTime: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: 2,
        status: "IN_TRANSIT",
        location: "Asansol Rail Terminal (DFC)",
        remarks: "Loaded onto Dedicated Freight Corridor Rake",
        eventDateTime: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
  },
  {
    id: 2,
    shivshaktiAirBillNumber: "SSD-20261025-1002",
    vendorAirwayBillNumber: "VND-EXP-9920",
    vendorId: 2,
    vendor: { id: 2, vendorName: "Gati KWE Surface" },
    clientId: 2,
    client: {
      id: 2,
      name: "Sun Pharma Distribution Ltd",
      city: "Ahmedabad",
      state: "Gujarat",
    },
    consignorName: "Sun Pharma Distribution Ltd",
    consignorPhone: "+91 97123 45678",
    consignorAddress: "GIDC Estate, Phase II, Vatva, Ahmedabad",
    consignorPincode: "382445",
    consignorGst: "24AAACS3849B1Z0",
    consigneeName: "Apollo Hospitals Central Med Store",
    consigneeMobile: "9944012345",
    consigneeAddress: "Greams Road, Thousand Lights",
    consigneeDistrict: "Chennai",
    consigneeState: "Tamil Nadu",
    consigneePincode: "600006",
    origin: "Ahmedabad Pharma Cold Hub",
    destination: "Chennai Central Med Distribution",
    mode: "AIR",
    shipmentType: "EXPRESS",
    totalQuantity: 3,
    actualWeight: 45.0,
    volumetricWeight: 68.4,
    billWeight: 68.4,
    status: "OUT_FOR_DELIVERY",
    isApprovedByAdmin: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    pickupDateTime: new Date(Date.now() - 86400000).toISOString(),
    items: [
      {
        id: 3,
        boxType: "Cold Insulated Box",
        length: 50,
        width: 45,
        height: 40,
        weight: 15,
        quantity: 3,
        volumetricWeight: 22.8,
      },
    ],
    trackingTimeline: [
      {
        id: 3,
        status: "PICKUP",
        location: "Ahmedabad Cargo Terminal",
        remarks: "Received with temperature loggers",
        eventDateTime: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 4,
        status: "IN_TRANSIT",
        location: "Mumbai Air Hub",
        remarks: "Connecting flight departed",
        eventDateTime: new Date(Date.now() - 43200000).toISOString(),
      },
      {
        id: 5,
        status: "ARRIVED",
        location: "Chennai Cargo Airport",
        remarks: "Deplaned and cleared",
        eventDateTime: new Date(Date.now() - 14400000).toISOString(),
      },
      {
        id: 6,
        status: "OUT_FOR_DELIVERY",
        location: "Chennai Central Dispatch",
        remarks: "Out for final delivery van #TN-02-8877",
        eventDateTime: new Date(Date.now() - 3600000).toISOString(),
      },
    ],
  },
  {
    id: 3,
    shivshaktiAirBillNumber: "SSD-20261025-1003",
    vendorAirwayBillNumber: "",
    vendorId: null,
    clientId: 1,
    client: {
      id: 1,
      name: "Tata Steel Tubes Division",
      city: "Jamshedpur",
      state: "Jharkhand",
    },
    consignorName: "Tata Steel Tubes Division",
    consignorPhone: "+91 98765 43210",
    consignorAddress: "Plot 44, Industrial Area, Jamshedpur",
    consignorPincode: "831001",
    consignorGst: "20AAACT2727Q1ZB",
    consigneeName: "L&T Construction Site #4",
    consigneeMobile: "9443322110",
    consigneeAddress: "Outer Ring Road Metro Pier 32",
    consigneeDistrict: "Bengaluru",
    consigneeState: "Karnataka",
    consigneePincode: "560103",
    origin: "Jamshedpur Yard",
    destination: "Bengaluru Whitefield Yard",
    mode: "ROAD",
    shipmentType: "STANDARD",
    totalQuantity: 12,
    actualWeight: 850.0,
    volumetricWeight: 720.0,
    billWeight: 850.0,
    status: "PENDING_APPROVAL",
    isApprovedByAdmin: false,
    createdAt: new Date().toISOString(),
    pickupDateTime: new Date().toISOString(),
    items: [
      {
        id: 4,
        boxType: "Steel Bundle / Pallet",
        length: 180,
        width: 60,
        height: 50,
        weight: 425,
        quantity: 2,
        volumetricWeight: 108.0,
      },
    ],
    trackingTimeline: [
      {
        id: 7,
        status: "PENDING_APPROVAL",
        location: "Jamshedpur Yard",
        remarks: "Docket cut by employee, awaiting admin approval",
        eventDateTime: new Date().toISOString(),
      },
    ],
  },
];

let mockClients: any[] = [
  {
    id: 1,
    name: "Tata Steel Tubes Division",
    phoneNumber: "+91 98765 43210",
    emailAddress: "logistics@tatasteeltubes.com",
    pincode: "831001",
    fullAddress: "Plot 44, Industrial Area, Jamshedpur",
    billingName: "Tata Steel Limited - Tubes Unit",
    gstNumber: "20AAACT2727Q1ZB",
    billingAddress: "Bombay House, 24 Homi Mody Street, Mumbai 400001",
    state: "Jharkhand",
    city: "Jamshedpur",
    isActive: true,
  },
  {
    id: 2,
    name: "Sun Pharma Distribution Ltd",
    phoneNumber: "+91 97123 45678",
    emailAddress: "dispatch@sunpharma.example.com",
    pincode: "382445",
    fullAddress: "GIDC Estate, Phase II, Vatva, Ahmedabad",
    billingName: "Sun Pharmaceutical Industries Limited",
    gstNumber: "24AAACS3849B1Z0",
    billingAddress: "Sun House, CTS No. 201 B/1, Goregaon (E), Mumbai 400063",
    state: "Gujarat",
    city: "Ahmedabad",
    isActive: true,
  },
  {
    id: 3,
    name: "Reliance Retail Supply Hub",
    phoneNumber: "+91 91234 56789",
    emailAddress: "linehaul.ops@relianceretail.com",
    pincode: "421302",
    fullAddress: "Bhiwandi Mega Logistics Park, Godown 12-16",
    billingName: "Reliance Retail Ventures Ltd",
    gstNumber: "27AABCR4921N1ZW",
    billingAddress: "Maker Chambers IV, Nariman Point, Mumbai 400021",
    state: "Maharashtra",
    city: "Bhiwandi",
    isActive: true,
  },
];

let mockVendors: any[] = [
  {
    id: 1,
    vendorName: "BlueDart Express Linehaul",
    state: "Maharashtra",
    cityDistrict: "Mumbai",
    fullAddress: "Blue Dart Centre, Sahar Airport Road, Andheri East",
    phoneNumber: "+91 22 2839 6444",
    email: "partnerships@bluedart.example.com",
    contactPerson: "Vikram Joshi (Regional Ops Head)",
    isActive: true,
  },
  {
    id: 2,
    vendorName: "Gati KWE Surface",
    state: "Telangana",
    cityDistrict: "Hyderabad",
    fullAddress: "Plot 20, Survey 12, Kondapur",
    phoneNumber: "+91 40 2784 4400",
    email: "ops@gatikwe.example.com",
    contactPerson: "Suresh Nambiar",
    isActive: true,
  },
  {
    id: 3,
    vendorName: "Container Corporation of India (CONCOR)",
    state: "Delhi",
    cityDistrict: "New Delhi",
    fullAddress: "CONCOR Bhawan, C-3, Mathura Road, Opp. Apollo Hospital",
    phoneNumber: "+91 11 4167 3093",
    email: "railfreight@concorindia.example.com",
    contactPerson: "Rajesh Sharma",
    isActive: true,
  },
];

let mockUsers: any[] = [
  {
    id: 1,
    name: "Shivshakti Admin",
    email: "admin@shivdocket.com",
    role: "ADMIN",
    status: "ACTIVE",
    phone: "+91 98920 11223",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Ramesh Sharma (Booking Officer)",
    email: "employee@shivdocket.com",
    role: "EMPLOYEE",
    status: "ACTIVE",
    phone: "+91 97110 33445",
    createdAt: new Date().toISOString(),
  },
];

function handleOfflineFallback<T>(
  endpoint: string,
  options: RequestInit,
): Promise<any> {
  const method = (options.method || "GET").toUpperCase();
  const body = options.body ? JSON.parse(options.body as string) : {};

  // Auth Login
  if (endpoint.includes("/auth/login") && method === "POST") {
    const { email, password } = body;
    if (email === "admin@shivdocket.com" && password === "Admin@12345") {
      const user = mockUsers[0];
      return Promise.resolve({
        success: true,
        message: "Login successful (Offline Demo Mode)",
        data: {
          user,
          tokens: {
            accessToken: "mock_jwt_access_admin_" + Date.now(),
            refreshToken: "mock_jwt_refresh_admin_" + Date.now(),
          },
        },
      });
    } else if (
      email === "employee@shivdocket.com" &&
      password === "Emp@12345"
    ) {
      const user = mockUsers[1];
      return Promise.resolve({
        success: true,
        message: "Login successful (Offline Demo Mode)",
        data: {
          user,
          tokens: {
            accessToken: "mock_jwt_access_emp_" + Date.now(),
            refreshToken: "mock_jwt_refresh_emp_" + Date.now(),
          },
        },
      });
    } else {
      return Promise.reject(
        new Error(
          "Invalid email or password. Use demo credentials (admin@shivdocket.com / Admin@12345 or employee@shivdocket.com / Emp@12345).",
        ),
      );
    }
  }

  // Auth Profile
  if (endpoint.includes("/auth/profile") && method === "GET") {
    const user = getStoredUser() || mockUsers[0];
    return Promise.resolve({ success: true, data: user });
  }

  // Dashboard Stats
  if (endpoint.includes("/dashboard/stats") && method === "GET") {
    const totalActual = mockConsignments.reduce(
      (acc, c) => acc + (parseFloat(c.actualWeight) || 0),
      0,
    );
    const totalVol = mockConsignments.reduce(
      (acc, c) => acc + (parseFloat(c.volumetricWeight) || 0),
      0,
    );
    const totalBill = mockConsignments.reduce(
      (acc, c) => acc + (parseFloat(c.billWeight) || 0),
      0,
    );
    const totalBoxes = mockConsignments.reduce(
      (acc, c) => acc + (parseInt(c.totalQuantity) || 1),
      0,
    );

    const statusCounts: Record<string, number> = {
      PENDING_APPROVAL: 0,
      PICKUP: 0,
      IN_TRANSIT: 0,
      ARRIVED: 0,
      OUT_FOR_DELIVERY: 0,
      DELIVERED: 0,
      CANCELLED: 0,
    };
    mockConsignments.forEach((c) => {
      if (statusCounts[c.status] !== undefined) statusCounts[c.status]++;
    });

    const modeCounts: Record<string, number> = {
      ROAD: 0,
      TRAIN: 0,
      AIR: 0,
      SURFACE: 0,
      SEA: 0,
    };
    mockConsignments.forEach((c) => {
      if (modeCounts[c.mode] !== undefined) modeCounts[c.mode]++;
    });

    return Promise.resolve({
      success: true,
      message: "Dashboard stats loaded (Demo Mode)",
      data: {
        overview: {
          totalConsignments: mockConsignments.length,
          totalClients: mockClients.length,
          totalVendors: mockVendors.length,
          totalEmployees: mockUsers.filter((u) => u.role === "EMPLOYEE").length,
          pendingApprovals: mockConsignments.filter((c) => !c.isApprovedByAdmin)
            .length,
          todayBookings: 1,
          totalActualWeightKg: totalActual.toFixed(2),
          totalVolumetricWeightKg: totalVol.toFixed(2),
          totalBillWeightKg: totalBill.toFixed(2),
          totalPackagesShipped: totalBoxes,
        },
        statusBreakdown: statusCounts,
        modeBreakdown: modeCounts,
        shipmentTypeBreakdown: { "NON-DOX": 0, EXPRESS: 1, STANDARD: 2 },
        recentShipments: mockConsignments.slice(0, 5),
      },
    });
  }

  // Consignments Pending Approvals
  if (
    endpoint.includes("/consignments/pending-approvals") &&
    method === "GET"
  ) {
    const pending = mockConsignments.filter(
      (c) => !c.isApprovedByAdmin || c.status === "PENDING_APPROVAL",
    );
    return Promise.resolve({
      success: true,
      data: pending,
      pagination: { total: pending.length, page: 1, limit: 50, totalPages: 1 },
    });
  }

  // Confirm Consignment
  if (
    endpoint.includes("/consignments/") &&
    endpoint.includes("/confirm") &&
    method === "POST"
  ) {
    const id = parseInt(endpoint.split("/")[2], 10);
    const target = mockConsignments.find((c) => c.id === id);
    if (target) {
      target.isApprovedByAdmin = true;
      target.status = "PICKUP";
      target.trackingTimeline.push({
        id: Date.now(),
        status: "PICKUP",
        location: target.origin || "Main Hub",
        remarks: "Approved by Admin. Ready for Linehaul Pickup.",
        eventDateTime: new Date().toISOString(),
      });
      return Promise.resolve({
        success: true,
        message: "Docket confirmed successfully!",
        data: target,
      });
    }
  }

  // Update Status
  if (
    endpoint.includes("/consignments/") &&
    endpoint.includes("/status") &&
    method === "PATCH"
  ) {
    const id = parseInt(endpoint.split("/")[2], 10);
    const target = mockConsignments.find((c) => c.id === id);
    if (target) {
      target.status = body.status;
      target.trackingTimeline.push({
        id: Date.now(),
        status: body.status,
        location: body.location || target.destination,
        remarks: body.remarks || "Status update logged",
        eventDateTime: new Date().toISOString(),
      });
      return Promise.resolve({
        success: true,
        message: "Status updated successfully",
        data: target,
      });
    }
  }

  // Tracking endpoint: /tracking/:awbNumber
  if (endpoint.startsWith("/tracking/")) {
    const awb = decodeURIComponent(
      endpoint.replace("/tracking/", "").trim().toUpperCase(),
    );
    const match = mockConsignments.find(
      (c) =>
        c.shivshaktiAirBillNumber.toUpperCase() === awb ||
        (c.vendorAirwayBillNumber &&
          c.vendorAirwayBillNumber.toUpperCase() === awb),
    );

    if (match) {
      const formattedTimeline = match.trackingTimeline.map((t: any) => {
        const d = new Date(t.eventDateTime);
        return {
          id: t.id,
          status: t.status,
          location: t.location,
          remarks: t.remarks,
          timestamp: t.eventDateTime,
          date: d.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          time: d.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        };
      });

      const maskedMobile = match.consigneeMobile
        ? match.consigneeMobile.substring(0, 2) +
          "****" +
          match.consigneeMobile.slice(-4)
        : "";

      return Promise.resolve({
        success: true,
        message: "Shipment tracking details retrieved",
        data: {
          airwayBillNumber: match.shivshaktiAirBillNumber,
          vendorAirwayBillNumber: match.vendorAirwayBillNumber,
          currentStatus: match.status,
          origin: match.origin,
          destination: match.destination,
          pickupDateTime: match.pickupDateTime,
          mode: match.mode,
          shipmentType: match.shipmentType,
          totalQuantity: match.totalQuantity,
          actualWeight: match.actualWeight,
          billWeight: match.billWeight,
          consignor: {
            name: match.consignorName,
            city: match.client?.city || "",
            state: match.client?.state || "",
          },
          consignee: {
            name: match.consigneeName,
            mobile: maskedMobile,
            district: match.consigneeDistrict,
            state: match.consigneeState,
            pincode: match.consigneePincode,
          },
          packages: match.items,
          timeline: formattedTimeline,
          lastUpdated: formattedTimeline[formattedTimeline.length - 1],
        },
      });
    } else {
      return Promise.reject(
        new Error(`No shipment found matching Airway Bill Number: '${awb}'`),
      );
    }
  }

  // Consignments CRUD
  if (endpoint.startsWith("/consignments") && method === "GET") {
    return Promise.resolve({
      success: true,
      data: mockConsignments,
      pagination: {
        total: mockConsignments.length,
        page: 1,
        limit: 20,
        totalPages: 1,
      },
    });
  }

  if (endpoint === "/consignments" && method === "POST") {
    const user = getStoredUser() || mockUsers[0];
    const isEmployee = user.role === "EMPLOYEE";
    const status = isEmployee ? "PENDING_APPROVAL" : "PICKUP";

    const awb =
      body.shivshaktiAirBillNumber ||
      `SSD-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newConsignment = {
      id: Date.now(),
      ...body,
      shivshaktiAirBillNumber: awb,
      status,
      isApprovedByAdmin: !isEmployee,
      createdAt: new Date().toISOString(),
      items: body.items || [],
      trackingTimeline: [
        {
          id: Date.now(),
          status,
          location: body.origin || "Main Hub",
          remarks: isEmployee
            ? "Docket booked by employee, awaiting admin approval"
            : "Docket cut & ready for pickup",
          eventDateTime: new Date().toISOString(),
        },
      ],
    };

    mockConsignments.unshift(newConsignment);
    return Promise.resolve({
      success: true,
      message: isEmployee
        ? "Docket cut! Awaiting Admin Approval."
        : "Consignment created successfully.",
      data: newConsignment,
    });
  }

  // Clients CRUD
  if (endpoint.startsWith("/clients") && method === "GET") {
    return Promise.resolve({
      success: true,
      data: mockClients,
      pagination: {
        total: mockClients.length,
        page: 1,
        limit: 50,
        totalPages: 1,
      },
    });
  }
  if (endpoint === "/clients" && method === "POST") {
    const newClient = { id: Date.now(), ...body, isActive: true };
    mockClients.unshift(newClient);
    return Promise.resolve({
      success: true,
      message: "Client created",
      data: newClient,
    });
  }
  if (endpoint.startsWith("/clients/") && method === "PUT") {
    const id = parseInt(endpoint.split("/")[2], 10);
    const index = mockClients.findIndex((c) => c.id === id);
    if (index !== -1) {
      mockClients[index] = { ...mockClients[index], ...body };
      return Promise.resolve({
        success: true,
        message: "Client updated successfully",
        data: mockClients[index],
      });
    }
    return Promise.reject(new Error("Client not found"));
  }
  if (endpoint.startsWith("/clients/") && method === "PATCH") {
    const id = parseInt(endpoint.split("/")[2], 10);
    const index = mockClients.findIndex((c) => c.id === id);
    if (index !== -1) {
      mockClients[index] = { ...mockClients[index], ...body };
      return Promise.resolve({
        success: true,
        message: "Client updated successfully",
        data: mockClients[index],
      });
    }
    return Promise.reject(new Error("Client not found"));
  }

  // Vendors CRUD
  if (endpoint.startsWith("/vendors") && method === "GET") {
    return Promise.resolve({
      success: true,
      data: mockVendors,
      pagination: {
        total: mockVendors.length,
        page: 1,
        limit: 50,
        totalPages: 1,
      },
    });
  }
  if (endpoint === "/vendors" && method === "POST") {
    const newVendor = { id: Date.now(), ...body, isActive: true };
    mockVendors.unshift(newVendor);
    return Promise.resolve({
      success: true,
      message: "Vendor added",
      data: newVendor,
    });
  }
  if (endpoint.startsWith("/vendors/") && method === "PUT") {
    const id = parseInt(endpoint.split("/")[2], 10);
    const index = mockVendors.findIndex((v) => v.id === id);
    if (index !== -1) {
      mockVendors[index] = { ...mockVendors[index], ...body };
      return Promise.resolve({
        success: true,
        message: "Vendor updated successfully",
        data: mockVendors[index],
      });
    }
    return Promise.reject(new Error("Vendor not found"));
  }
  if (endpoint.startsWith("/vendors/") && method === "PATCH") {
    const id = parseInt(endpoint.split("/")[2], 10);
    const index = mockVendors.findIndex((v) => v.id === id);
    if (index !== -1) {
      mockVendors[index] = { ...mockVendors[index], ...body };
      return Promise.resolve({
        success: true,
        message: "Vendor updated successfully",
        data: mockVendors[index],
      });
    }
    return Promise.reject(new Error("Vendor not found"));
  }

  // Users CRUD
  if (endpoint.startsWith("/users") && method === "GET") {
    return Promise.resolve({
      success: true,
      data: mockUsers,
      pagination: {
        total: mockUsers.length,
        page: 1,
        limit: 50,
        totalPages: 1,
      },
    });
  }
  if (endpoint === "/users" && method === "POST") {
    const newUser = {
      id: Date.now(),
      ...body,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };
    mockUsers.unshift(newUser);
    return Promise.resolve({
      success: true,
      message: "Staff member added",
      data: newUser,
    });
  }

  // Fallback default response
  return Promise.resolve({
    success: true,
    message: "Operation completed (Offline Demo Mode)",
    data: [],
  });
}

// -------------------------------------------------------------
// Unified API Surface Export
// -------------------------------------------------------------
export const api = {
  // Auth
  auth: {
    login: (credentials: { email: string; password: string }) =>
      apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    refreshToken: (refreshToken: string) =>
      apiRequest("/auth/refresh-token", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      }),
    logout: () =>
      apiRequest("/auth/logout", {
        method: "POST",
      }),
    getProfile: () => apiRequest("/auth/profile"),
    updateProfile: (data: { name?: string; phone?: string }) =>
      apiRequest("/auth/profile", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    changePassword: (data: { oldPassword: string; newPassword: string }) =>
      apiRequest("/auth/change-password", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  },

  // Public Tracking
  tracking: {
    track: (awbNumber: string) =>
      apiRequest(`/tracking/${encodeURIComponent(awbNumber.trim())}`),
  },

  // Dashboard Analytics
  dashboard: {
    getStats: () => apiRequest("/dashboard/stats"),
  },

  // Consignments / Dockets
  consignments: {
    getAll: (params: Record<string, any> = {}) => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "")
          query.append(k, String(v));
      });
      return apiRequest(`/consignments?${query.toString()}`);
    },
    getPendingApprovals: (page = 1, limit = 20) =>
      apiRequest(`/consignments/pending-approvals?page=${page}&limit=${limit}`),
    getById: (id: string | number) => apiRequest(`/consignments/${id}`),
    create: (data: any) =>
      apiRequest("/consignments", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string | number, data: any) =>
      apiRequest(`/consignments/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    updateStatus: (
      id: string | number,
      payload: { status: string; location?: string; remarks?: string },
    ) =>
      apiRequest(`/consignments/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    confirm: (id: string | number) =>
      apiRequest(`/consignments/${id}/confirm`, {
        method: "POST",
      }),
    delete: (id: string | number) =>
      apiRequest(`/consignments/${id}`, {
        method: "DELETE",
      }),
  },

  // Clients
  clients: {
    getAll: (params: Record<string, any> = {}) => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "")
          query.append(k, String(v));
      });
      return apiRequest(`/clients?${query.toString()}`);
    },
    getById: (id: string | number) => apiRequest(`/clients/${id}`),
    create: (data: any) =>
      apiRequest("/clients", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string | number, data: any) =>
      apiRequest(`/clients/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: string | number) =>
      apiRequest(`/clients/${id}`, {
        method: "DELETE",
      }),
  },

  // Vendors
  vendors: {
    getAll: (params: Record<string, any> = {}) => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "")
          query.append(k, String(v));
      });
      return apiRequest(`/vendors?${query.toString()}`);
    },
    getById: (id: string | number) => apiRequest(`/vendors/${id}`),
    create: (data: any) =>
      apiRequest("/vendors", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string | number, data: any) =>
      apiRequest(`/vendors/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: string | number) =>
      apiRequest(`/vendors/${id}`, {
        method: "DELETE",
      }),
  },

  // Staff / Users
  users: {
    getAll: (params: Record<string, any> = {}) => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "")
          query.append(k, String(v));
      });
      return apiRequest(`/users?${query.toString()}`);
    },
    getById: (id: string | number) => apiRequest(`/users/${id}`),
    create: (data: any) =>
      apiRequest("/users", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string | number, data: any) =>
      apiRequest(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: string | number) =>
      apiRequest(`/users/${id}`, {
        method: "DELETE",
      }),
  },

  // Reports
  reports: {
    getConsignments: (filters: Record<string, any> = {}, format = "json") => {
      const query = new URLSearchParams({ ...filters, format });
      return apiRequest(`/reports/consignments?${query.toString()}`);
    },
    getDownloadUrl: (
      filters: Record<string, any> = {},
      format: "excel" | "csv",
    ) => {
      const baseUrl = getBaseUrl();
      const token = getStoredAccessToken();
      const query = new URLSearchParams({ ...filters, format });
      return `${baseUrl}/reports/consignments?${query.toString()}&token=${token || ""}`;
    },
    downloadFile: async (
      filters: Record<string, any> = {},
      format: "excel" | "csv",
    ) => {
      const baseUrl = getBaseUrl();
      const token = getStoredAccessToken();
      const query = new URLSearchParams({ ...filters, format });
      const url = `${baseUrl}/reports/consignments?${query.toString()}`;
      const res = await fetch(url, {
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        throw new Error(errJson?.message || `Export failed (HTTP ${res.status})`);
      }
      const blob = await res.blob();
      const ext = format === "csv" ? "csv" : "xlsx";
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `Shivdocket_Report_${new Date().toISOString().slice(0, 10)}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    },
  },
};

export default api;
