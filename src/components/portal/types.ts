export type ActiveTab =
  | "dashboard"
  | "consignments"
  | "cut-docket"
  | "pending-approvals"
  | "clients"
  | "vendors"
  | "users"
  | "reports"
  | "profile";

export interface BoxItem {
  boxType: string;
  unit?: "CM" | "INCH";
  length: number;
  width: number;
  height: number;
  weight: number;
  quantity: number;
  description?: string;
}

export interface ConsignmentItem {
  id?: number;
  boxType: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  quantity: number;
  volumetricWeight?: number;
  description?: string;
}

export interface Consignment {
  id: number;
  shivshaktiAirBillNumber: string;
  vendorAirwayBillNumber?: string;
  consignorName: string;
  consignorPhone?: string;
  consignorAddress?: string;
  consignorPincode?: string;
  consignorGst?: string;
  consigneeName: string;
  consigneeMobile?: string;
  consigneeAddress: string;
  consigneeDistrict?: string;
  consigneeState?: string;
  consigneePincode?: string;
  origin: string;
  destination: string;
  mode: string;
  shipmentType?: string;
  eWayBillNumber?: string;
  invoiceNumber?: string;
  totalQuantity?: number;
  actualWeight?: number;
  volumetricWeight?: number;
  billWeight: number;
  status: string;
  isApprovedByAdmin?: boolean;
  remarks?: string;
  createdAt: string;
  updatedAt?: string;
  items?: ConsignmentItem[];
  vendor?: {
    id: number;
    vendorName: string;
  };
  client?: {
    id: number;
    name: string;
  };
  statusHistory?: Array<{
    id: number;
    status: string;
    location?: string;
    remarks?: string;
    timestamp?: string;
    createdAt?: string;
  }>;
}

export interface Client {
  id: number;
  name: string;
  phoneNumber: string;
  emailAddress?: string;
  pincode?: string;
  fullAddress: string;
  billingName?: string;
  gstNumber?: string;
  billingAddress?: string;
  state?: string;
  city?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface Vendor {
  id: number;
  vendorName: string;
  contactPerson?: string;
  phoneNumber?: string;
  email?: string;
  fullAddress?: string;
  cityDistrict?: string;
  state?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface StaffUser {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: "ADMIN" | "EMPLOYEE";
  status?: string;
  createdAt?: string;
}

export interface DashboardStats {
  overview?: {
    totalConsignments?: number;
    pendingApprovals?: number;
    totalClients?: number;
    totalVendors?: number;
    totalBillWeightKg?: string | number;
    totalPackagesShipped?: string | number;
  };
  modeBreakdown?: {
    ROAD?: number;
    TRAIN?: number;
    AIR?: number;
    SEA?: number;
    SURFACE?: number;
    [key: string]: number | undefined;
  };
  statusBreakdown?: {
    PICKUP?: number;
    IN_TRANSIT?: number;
    ARRIVED?: number;
    OUT_FOR_DELIVERY?: number;
    DELIVERED?: number;
    PENDING_APPROVAL?: number;
    CANCELLED?: number;
    [key: string]: number | undefined;
  };
}

export interface ReportFilters {
  fromDate: string;
  toDate: string;
  clientId: string;
  vendorId: string;
  status: string;
  mode: string;
}
