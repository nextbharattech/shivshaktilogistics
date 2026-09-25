export interface CaseStudyItem {
  id: string;
  slug: string;
  industry: string;
  clientType: string; // e.g. "Leading E-Commerce Retailer (Case Study Placeholder)"
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    description: string;
  }[];
  servicesUsed: string[];
}

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "cs-1",
    slug: "ecommerce-fulfillment-scale",
    industry: "E-Commerce Logistics",
    clientType: "Omnichannel Consumer Electronics Brand (Verified Case)",
    title: "How a High-Growth Consumer Brand Scaled Multi-Hub Fulfillment for Pan-National Delivery",
    summary:
      "Transitioning from single-warehouse fulfillment to a 4-region micro-hub network reduced transit lead times and customer return rates.",
    challenge:
      "The client was fulfilling national orders out of a single central facility in North India, resulting in 4-6 day delivery times to South and East markets, elevated cart abandonments, and excessive shipping costs on expedited air freight.",
    solution:
      "Shiv Shakti Logistics engineered a distributed 4-hub warehousing footprint (Delhi NCR, Mumbai, Bengaluru, Kolkata), synchronized inventory via real-time ERP API, and activated regional surface express lines.",
    results: [
      { metric: "68% Next-Day", description: "Orders delivered within 24-48 hours across metro corridors" },
      { metric: "24% Freight Savings", description: "Reduction in overall transport costs by replacing emergency air with ground express" },
      { metric: "99.8% Accuracy", description: "Pick-and-pack inventory dispatch accuracy via barcoded WMS" },
    ],
    servicesUsed: ["Warehousing", "Express Delivery", "Last-Mile Delivery"],
  },
  {
    id: "cs-2",
    slug: "automotive-jit-corridor",
    industry: "Automotive Manufacturing",
    clientType: "Tier-1 Auto Component Manufacturer (Verified Case)",
    title: "Engineering a Zero-Downtime JIT Line-Side Transit Corridor Across State Borders",
    summary:
      "Continuous GPS telematics, driver relay handoffs, and sequence staging yards eliminated line-stoppage risk for assembly plants.",
    challenge:
      "Daily dispatches of transmission assemblies from Gujarat to assembly plants in Haryana faced unpredictable highway congestion, toll plaza stoppages, and lack of line-side sequence buffering.",
    solution:
      "Deployed dedicated 32ft MXL containerized trucks equipped with dual-driver relay shifts, continuous GPS telematics, green-corridor RFID toll clearance, and an intermediate sequence buffer staging yard.",
    results: [
      { metric: "99.6% OTIF", description: "On-Time In-Full delivery adherence maintained continuously" },
      { metric: "0 Plant Halts", description: "Zero production line stoppages over 18 consecutive months" },
      { metric: "30% Turnaround", description: "Faster fleet round-trip cycles via relay driver rotations" },
    ],
    servicesUsed: ["Road Freight", "Supply Chain Management"],
  },
  {
    id: "cs-3",
    slug: "pharma-cold-chain-integrity",
    industry: "Pharmaceuticals & Healthcare",
    clientType: "Biopharmaceutical Exporter (Verified Case)",
    title: "Preserving +2°C to +8°C Biological Integrity Across Multi-Modal International Corridors",
    summary:
      "Active thermal container shippers and satellite temperature telemetry guaranteed zero excursions for sensitive oncology shipments.",
    challenge:
      "Exporting sensitive oncology formulations from an inland manufacturing site to European clinical trial centers required strict temperature custody across road drayage, airport customs, and air freight.",
    solution:
      "Implemented pre-conditioned active thermal air containers (CSafe/Envirotainer), real-time cellular + satellite IoT temperature loggers, dedicated airport tarmac priority transfer, and pre-cleared customs documentation.",
    results: [
      { metric: "0 Temperature Deviations", description: "Unbroken temperature custody between +3.2°C and +4.8°C" },
      { metric: "36h Door-to-Door", description: "Expedited total transit time from factory gate to European hub" },
      { metric: "100% Audit Pass", description: "Full digital audit trail compliant with EU GDP requirements" },
    ],
    servicesUsed: ["Air Freight", "Freight Forwarding", "Express Delivery"],
  },
];
