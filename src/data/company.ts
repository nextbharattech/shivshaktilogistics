export interface CompanyInfo {
  name: string;
  legalName: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  headquarters: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  contact: {
    phone: string;
    tollFree: string;
    email: string;
    supportEmail: string;
    whatsapp: string;
  };
  operatingHours: string;
  socials: {
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
  };
  metrics: {
    domesticHubs: string;
    fleetPartners: string;
    activeRoutes: string;
    onTimeRate: string;
    pinCodesCovered: string;
  };
  branches: Array<{
    city: string;
    state: string;
    type: string;
    address: string;
    phone: string;
    email: string;
    isPrimary?: boolean;
  }>;
}

export const COMPANY: CompanyInfo = {
  name: "Shiv Shakti Logistics",
  legalName: "Shiv Shakti Logistics & Supply Chain Solutions Pvt. Ltd.",
  tagline: "Your Cargo. Our Network. Delivered.",
  shortDescription:
    "End-to-end multi-modal logistics, freight forwarding, and intelligent supply-chain infrastructure built for speed, complete visibility, and unmatched reliability.",
  fullDescription:
    "Shiv Shakti Logistics delivers resilient road freight, high-velocity air cargo, scalable ocean freight, automated warehousing, and intelligent last-mile distribution across domestic and international trade corridors.",
  headquarters: {
    address: "Logistics Hub Tower, Sector 18, Udyog Vihar",
    city: "Gurugram / New Delhi NCR",
    state: "Haryana",
    country: "India",
    postalCode: "122015",
  },
  contact: {
    phone: "+91 11 4890 2200",
    tollFree: "1800 209 8899",
    email: "contact@shivshaktilogistics.com",
    supportEmail: "ops@shivshaktilogistics.com",
    whatsapp: "+91 98110 54321",
  },
  operatingHours: "24/7 Operations & Control Tower Support",
  socials: {
    linkedin: "https://linkedin.com/company/shivshakti-logistics",
    twitter: "https://x.com/shivshaktilogistics",
    facebook: "https://facebook.com/shivshaktilogistics",
    instagram: "https://instagram.com/shivshaktilogistics",
  },
  metrics: {
    domesticHubs: "48+",
    fleetPartners: "3,200+",
    activeRoutes: "650+",
    onTimeRate: "99.4%",
    pinCodesCovered: "19,000+",
  },
  branches: [
    {
      city: "New Delhi NCR",
      state: "Delhi",
      type: "Corporate Headquarters & Northern Gateway",
      address: "Logistics Hub Tower, Sector 18, Udyog Vihar, Gurugram - 122015",
      phone: "+91 11 4890 2200",
      email: "delhi@shivshaktilogistics.com",
      isPrimary: true,
    },
    {
      city: "Mumbai",
      state: "Maharashtra",
      type: "Western Marine & Port Operations Hub",
      address: "JNPT Logistics Zone, Sector 11, CBD Belapur, Navi Mumbai - 400614",
      phone: "+91 22 6780 4300",
      email: "mumbai@shivshaktilogistics.com",
    },
    {
      city: "Ahmedabad / Mundra",
      state: "Gujarat",
      type: "Industrial Corridor & Multimodal Rail Siding",
      address: "Mundra Port Logistics Park, Plot 44-B, Kutch - 370421",
      phone: "+91 79 3500 1190",
      email: "gujarat@shivshaktilogistics.com",
    },
    {
      city: "Bengaluru",
      state: "Karnataka",
      type: "Southern Tech & Express Fulfillment Hub",
      address: "Electronic City Phase II, Hosur Main Road, Bengaluru - 560100",
      phone: "+91 80 4511 8833",
      email: "bengaluru@shivshaktilogistics.com",
    },
    {
      city: "Chennai",
      state: "Tamil Nadu",
      type: "Automotive & Maritime Distribution Hub",
      address: "Ennore Port Logistics Terminal, Sriperumbudur Road, Chennai - 600001",
      phone: "+91 44 2855 7766",
      email: "chennai@shivshaktilogistics.com",
    },
    {
      city: "Kolkata",
      state: "West Bengal",
      type: "Eastern Gateway & Cross-Border Logistics",
      address: "Dankuni Multi-Modal Freight Complex, Hooghly, Kolkata - 712311",
      phone: "+91 33 2289 4400",
      email: "kolkata@shivshaktilogistics.com",
    },
  ],
};
