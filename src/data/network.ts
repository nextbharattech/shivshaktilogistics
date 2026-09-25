export interface NetworkNode {
  id: string;
  name: string;
  type: "hub" | "port" | "airport" | "warehouse";
  category: "Domestic Gateway" | "Maritime Port" | "Air Cargo Hub" | "International Terminal";
  coordinates: { x: number; y: number }; // normalized 0-100 on stylized world/regional SVG map
  country: string;
  capabilities: string[];
  status: "Operational 24/7" | "Expanded Hub";
}

export interface NetworkRoute {
  id: string;
  name: string;
  mode: "road" | "air" | "ocean";
  originId: string;
  destinationId: string;
  transitTime: string;
  frequency: string;
  corridorType: string;
}

export const NETWORK_NODES: NetworkNode[] = [
  {
    id: "delhi",
    name: "Delhi NCR Gateway",
    type: "hub",
    category: "Domestic Gateway",
    coordinates: { x: 67, y: 39 },
    country: "India",
    capabilities: ["Automated Sorting Hub", "Customs Bonded ICD", "Fleet Dispatch Yard", "Air Cargo Complex"],
    status: "Operational 24/7",
  },
  {
    id: "mumbai",
    name: "Mumbai & JNPT Port",
    type: "port",
    category: "Maritime Port",
    coordinates: { x: 65, y: 44 },
    country: "India",
    capabilities: ["Deep-Sea Container Terminal", "CFS Warehousing", "Coastal Rail Siding", "Reefer Yard"],
    status: "Operational 24/7",
  },
  {
    id: "mundra",
    name: "Mundra Port Logistics Park",
    type: "port",
    category: "Maritime Port",
    coordinates: { x: 63, y: 41 },
    country: "India",
    capabilities: ["Direct FCL Ocean Services", "Double-Stack Container Rail", "Liquid & Dry Cargo"],
    status: "Operational 24/7",
  },
  {
    id: "bengaluru",
    name: "Bengaluru Tech Fulfillment",
    type: "warehouse",
    category: "Domestic Gateway",
    coordinates: { x: 66, y: 49 },
    country: "India",
    capabilities: ["E-Commerce Micro-Fulfillment", "Cold Chain Life Sciences", "Air Express Hub"],
    status: "Operational 24/7",
  },
  {
    id: "chennai",
    name: "Chennai Auto & Maritime",
    type: "port",
    category: "Maritime Port",
    coordinates: { x: 68, y: 48 },
    country: "India",
    capabilities: ["Automotive Yard", "Container Port", "Corridor Linehaul Hub"],
    status: "Operational 24/7",
  },
  {
    id: "kolkata",
    name: "Kolkata Eastern Hub",
    type: "hub",
    category: "Domestic Gateway",
    coordinates: { x: 72, y: 42 },
    country: "India",
    capabilities: ["Riverine Port", "Northeast Highway Gateway", "Cross-Border Transit"],
    status: "Operational 24/7",
  },
  {
    id: "dubai",
    name: "Dubai (Jebel Ali / DXB)",
    type: "hub",
    category: "International Terminal",
    coordinates: { x: 57, y: 41 },
    country: "UAE",
    capabilities: ["Global Transshipment Hub", "Free Zone Bonded Logistics", "Air-Sea Transshipment"],
    status: "Operational 24/7",
  },
  {
    id: "singapore",
    name: "Singapore Port & Changi Hub",
    type: "port",
    category: "International Terminal",
    coordinates: { x: 76, y: 53 },
    country: "Singapore",
    capabilities: ["Southeast Asia Relay", "Automated Maritime Port", "Changi Air Express"],
    status: "Operational 24/7",
  },
  {
    id: "london",
    name: "London (Heathrow / Felixstowe)",
    type: "airport",
    category: "International Terminal",
    coordinates: { x: 47, y: 28 },
    country: "United Kingdom",
    capabilities: ["European Customs Gateway", "Scheduled Air Cargo Inflow", "Channel Freight"],
    status: "Operational 24/7",
  },
  {
    id: "frankfurt",
    name: "Frankfurt CargoCity (FRA)",
    type: "airport",
    category: "Air Cargo Hub",
    coordinates: { x: 49, y: 30 },
    country: "Germany",
    capabilities: ["Pharma Temperature Shield Gateway", "European Road Feeder Service"],
    status: "Operational 24/7",
  },
  {
    id: "chicago",
    name: "Chicago Logistics Center (ORD)",
    type: "hub",
    category: "International Terminal",
    coordinates: { x: 22, y: 33 },
    country: "United States",
    capabilities: ["North America Intermodal Rail", "Air Cargo Gateway", "Industrial Warehousing"],
    status: "Operational 24/7",
  },
];

export const NETWORK_ROUTES: NetworkRoute[] = [
  // Domestic Road Express Corridors
  {
    id: "r1",
    name: "Delhi — Mumbai Golden Quadrilateral",
    mode: "road",
    originId: "delhi",
    destinationId: "mumbai",
    transitTime: "28-34 Hours",
    frequency: "Daily Continuous Linehaul (18+ Departures)",
    corridorType: "High-Density Express Highway",
  },
  {
    id: "r2",
    name: "Mundra Port — Delhi NCR Rail & Road",
    mode: "road",
    originId: "mundra",
    destinationId: "delhi",
    transitTime: "24-30 Hours",
    frequency: "Scheduled Intermodal Daily",
    corridorType: "Dedicated Freight Siding",
  },
  {
    id: "r3",
    name: "Mumbai — Bengaluru Express",
    mode: "road",
    originId: "mumbai",
    destinationId: "bengaluru",
    transitTime: "22-26 Hours",
    frequency: "Twice Daily Scheduled Runs",
    corridorType: "Southern Industrial Line",
  },
  {
    id: "r4",
    name: "Bengaluru — Chennai Automotive Siding",
    mode: "road",
    originId: "bengaluru",
    destinationId: "chennai",
    transitTime: "6-8 Hours",
    frequency: "Hourly Scheduled Shuttle",
    corridorType: "OEM JIT Corridor",
  },
  {
    id: "r5",
    name: "Delhi — Kolkata Eastern Trunk",
    mode: "road",
    originId: "delhi",
    destinationId: "kolkata",
    transitTime: "36-42 Hours",
    frequency: "Daily Relay Trucking",
    corridorType: "National Highway 19",
  },

  // International Ocean Lanes
  {
    id: "r6",
    name: "Mundra / JNPT → Dubai Jebel Ali Lane",
    mode: "ocean",
    originId: "mumbai",
    destinationId: "dubai",
    transitTime: "3-4 Days",
    frequency: "4 Sailings Weekly",
    corridorType: "Direct Middle East Feeder",
  },
  {
    id: "r7",
    name: "JNPT / Chennai → Singapore Port",
    mode: "ocean",
    originId: "chennai",
    destinationId: "singapore",
    transitTime: "4-5 Days",
    frequency: "Weekly Direct Services",
    corridorType: "Strait of Malacca Arterial",
  },
  {
    id: "r8",
    name: "JNPT Mumbai → Felixstowe / London Gateway",
    mode: "ocean",
    originId: "mumbai",
    destinationId: "london",
    transitTime: "18-22 Days",
    frequency: "Weekly Mainline Container Loop",
    corridorType: "Suez / Global Trade Route",
  },

  // International Air Corridors
  {
    id: "r9",
    name: "Delhi (DEL) → Frankfurt CargoCity (FRA)",
    mode: "air",
    originId: "delhi",
    destinationId: "frankfurt",
    transitTime: "8.5 Hours Flight / 24h Clearance",
    frequency: "Daily Scheduled Freighter Capacity",
    corridorType: "High-Priority Air Cargo Lane",
  },
  {
    id: "r10",
    name: "Bengaluru (BLR) → London Heathrow (LHR)",
    mode: "air",
    originId: "bengaluru",
    destinationId: "london",
    transitTime: "9.5 Hours Flight / 24h Clearance",
    frequency: "Daily Commercial Space",
    corridorType: "High-Tech & Pharma Express",
  },
  {
    id: "r11",
    name: "Delhi (DEL) → Chicago O'Hare (ORD)",
    mode: "air",
    originId: "delhi",
    destinationId: "chicago",
    transitTime: "16 Hours Transit / 36h Clearance",
    frequency: "5 Flights Weekly",
    corridorType: "Trans-Atlantic Cargo Link",
  },
];
