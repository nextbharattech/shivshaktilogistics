export interface IndustryItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  iconName: string;
  challenge: string;
  solution: string;
  keyBenefits: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  servicesUtilized: string[];
}

export const INDUSTRIES: IndustryItem[] = [
  {
    id: "ecommerce",
    slug: "ecommerce",
    title: "E-Commerce & D2C Brands",
    tagline: "High-velocity fulfillment, multi-hub distribution, and frictionless returns.",
    description:
      "Modern e-commerce requires fast order fulfillment, distributed micro-warehousing, and reliable doorstep delivery. Shiv Shakti Logistics enables omni-channel brands to fulfill orders across the nation with minimal transit times.",
    heroImage:
      "https://images.unsplash.com/photo-1556742049-0a67c5574f73?q=80&w=1600&auto=format&fit=crop",
    iconName: "ShoppingBag",
    challenge:
      "High return rates (RTO), unpredictable demand spikes during festival sales, and consumer demands for same-day/next-day deliveries without inflating shipping costs.",
    solution:
      "Multi-city micro-fulfillment centers, automated pick-and-pack lines, real-time OTP customer verification, and rapid reverse-logistics QC processing.",
    keyBenefits: [
      "Sub-2-hour order-to-dispatch turnaround time",
      "Seamless Shopify, WooCommerce, and custom API integrations",
      "Automated Cash-on-Delivery (COD) reconciliation within 48 hours",
      "Pre-delivery address validation reducing RTO occurrences",
    ],
    metrics: [
      { label: "Dispatch Accuracy", value: "99.8%" },
      { label: "RTO Reduction", value: "Up to 34%" },
      { label: "Metro Delivery", value: "Same / Next Day" },
    ],
    servicesUtilized: ["Warehousing", "Last-Mile Delivery", "Express Delivery"],
  },
  {
    id: "automotive",
    slug: "automotive",
    title: "Automotive & Auto Components",
    tagline: "Just-In-Time (JIT) line-side delivery and critical OEM spare parts logistics.",
    description:
      "Automotive assembly lines operate on razor-thin inventory buffers. A delay in a single component can halt an entire production plant. Shiv Shakti Logistics delivers time-critical automotive supply chain orchestration.",
    heroImage:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop",
    iconName: "Car",
    challenge:
      "Factory line-stoppage risks caused by transit delays, strict delivery appointment slots at OEM assembly docks, and complex returnable packaging management.",
    solution:
      "Dedicated milk-run collection routes, GPS-telemetry tracked line-haul trucking, JIT sequence buffering near major auto clusters (Gurugram, Pune, Chennai, Sanand), and returnable dunnage tracking.",
    keyBenefits: [
      "Zero-downtime assembly line replenishment protocols",
      "Direct dock-to-line barcode receiving compliance",
      "Emergency Next-Flight-Out (NFO) hot-shot recovery services",
      "Damage-free handling with custom vehicle fixtures and straps",
    ],
    metrics: [
      { label: "On-Time-In-Full (OTIF)", value: "99.6%" },
      { label: "Auto Hubs Connected", value: "All Major OEM Zones" },
      { label: "Assembly Stoppage", value: "Zero Tolerance" },
    ],
    servicesUtilized: ["Road Freight", "Express Delivery", "Supply Chain Management"],
  },
  {
    id: "manufacturing",
    slug: "manufacturing",
    title: "Heavy Manufacturing & Engineering",
    tagline: "Inbound raw materials, heavy plant machinery, and finished goods distribution.",
    description:
      "Heavy industrial manufacturers require robust multimodal transport capable of handling high-tonnage consignments, specialized flat-bed trailers, and seamless inbound-to-outbound freight flows.",
    heroImage:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop",
    iconName: "Factory",
    challenge:
      "Irregular cargo dimensions, specialized crane and rigging requirements, multi-state permit clearances, and coordinating raw material bulk flows with production cycles.",
    solution:
      "Engineered route surveys for Over-Dimensional Cargo (ODC), hydraulic axle trailers, multi-modal rail-to-road integration, and raw material buffer warehousing near production plants.",
    keyBenefits: [
      "Turnkey route clearance and municipal escort management",
      "Heavy-haul multi-axle trailer capability up to 150+ metric tons",
      "Dedicated industrial account managers and on-site dispatch marshals",
      "Comprehensive in-transit marine and engineering insurance cover",
    ],
    metrics: [
      { label: "Heavy Lift Capacity", value: "Up to 150+ MT" },
      { label: "Route Feasibility", value: "Pre-Surveyed Corridors" },
      { label: "Fleet Readiness", value: "Dedicated Industrial Assets" },
    ],
    servicesUtilized: ["Road Freight", "Ocean Freight", "Freight Forwarding"],
  },
  {
    id: "retail",
    slug: "retail",
    title: "Retail & Consumer Durables",
    tagline: "Seamless store replenishment, cross-dock consolidation, and seasonal peak scaling.",
    description:
      "From nationwide fashion store chains to department stores and hypermarkets, retail distribution demands precise delivery windows, palletized handling, and rapid regional warehouse replenishment.",
    heroImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
    iconName: "Store",
    challenge:
      "Strict mall delivery curfews, fragmented store distribution networks, high SKU velocity, and managing massive seasonal volume spikes during festive quarters.",
    solution:
      "Consolidated regional cross-dock hubs, off-peak night delivery protocols, scheduled store replenishment cycles, and automated palletized distribution.",
    keyBenefits: [
      "Scheduled store delivery windows respecting local city curfews",
      "Carton-level barcode tracing and automated invoice consolidation",
      "Rapid reverse logistics for end-of-season inventory consolidation",
      "High volume scalability during festive and end-of-season sales",
    ],
    metrics: [
      { label: "Store Delivery SLA", value: "99.2% Window Adherence" },
      { label: "Seasonal Elasticity", value: "3x Volume Scale" },
      { label: "Pallet Integrity", value: "Zero Pilferage Sealed Locks" },
    ],
    servicesUtilized: ["Warehousing", "Road Freight", "Last-Mile Delivery"],
  },
  {
    id: "pharmaceuticals",
    slug: "pharmaceuticals",
    title: "Pharmaceuticals & Healthcare",
    tagline: "GDP-compliant cold chain, unbroken temperature monitoring, and clinical logistics.",
    description:
      "Pharmaceutical shipments demand zero temperature deviations, tamper-evident security, and strict regulatory documentation. Shiv Shakti Logistics delivers certified cold-chain and clinical freight.",
    heroImage:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1600&auto=format&fit=crop",
    iconName: "ShieldAlert",
    challenge:
      "Maintaining continuous +2°C to +8°C or -20°C temperature integrity during extreme ambient heat, preventing pilferage of sensitive medicines, and meeting stringent Good Distribution Practice (GDP) standards.",
    solution:
      "Active and passive refrigerated reefer trucks, IoT temperature and humidity data loggers with live cloud telemetry, sealed GPS digital locks, and temperature-controlled air freight containers.",
    keyBenefits: [
      "Live temperature telemetry with threshold alert SMS/email pings",
      "Tamper-proof digital e-locks unlocking only at designated geo-fences",
      "Validated cold boxes and dry-ice replenishments for biological samples",
      "Trained handling personnel following strict GDP operating SOPs",
    ],
    metrics: [
      { label: "Cold-Chain Integrity", value: "99.9% Excursion-Free" },
      { label: "Temperature Range", value: "-25°C to +25°C" },
      { label: "Regulatory Compliance", value: "GDP & WHO Standards" },
    ],
    servicesUtilized: ["Air Freight", "Road Freight", "Express Delivery"],
  },
  {
    id: "fmcg",
    slug: "fmcg",
    title: "Fast-Moving Consumer Goods (FMCG)",
    tagline: "High-tonnage primary distribution, regional CFA hubs, and stock availability.",
    description:
      "FMCG companies succeed by keeping store shelves stocked without overpaying for storage. Shiv Shakti Logistics synchronizes primary plant dispatches with carrying & forwarding agent (CFA) distribution.",
    heroImage:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop",
    iconName: "Boxes",
    challenge:
      "Massive daily tonnage requirements, low product margins demanding cost-efficient transit, FIFO inventory management to prevent expiry, and widespread rural/urban distribution networks.",
    solution:
      "Dedicated 32ft MXL high-cube truck corridors, multi-modal rail rakes for long-distance staples, automated WMS with FEFO/FIFO logic, and regional distribution hub cross-docks.",
    keyBenefits: [
      "High cube utilization lowering transport cost per unit",
      "Automated e-Way Bill renewal and continuous green-corridor transit",
      "Batch and expiry tracking preventing obsolete inventory write-offs",
      "Rapid dispatch to Tier-2, Tier-3 and rural distributor points",
    ],
    metrics: [
      { label: "Daily Dispatch Vol", value: "Tonnage Scalable" },
      { label: "Batch Tracing", value: "100% Barcoded" },
      { label: "Transit Consistency", value: "98.9% Schedule Match" },
    ],
    servicesUtilized: ["Road Freight", "Warehousing", "Supply Chain Management"],
  },
  {
    id: "electronics",
    slug: "electronics",
    title: "High-Tech & Consumer Electronics",
    tagline: "High-security bonded transit, anti-static handling, and component delivery.",
    description:
      "Sensitive micro-electronics, smart devices, and computing hardware require high security, static-safe environments, and high-velocity transit between fabrication hubs and retail channels.",
    heroImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    iconName: "Laptop",
    challenge:
      "High cargo value making shipments attractive targets for theft, fragile electronic components susceptible to shock and vibration damage, and rapid product lifecycle obsolescence.",
    solution:
      "Containerized air-ride suspension trucks, dual-escort armed protocols for high-value lanes, continuous tamper-sensing digital seals, and shock-monitoring sensors.",
    keyBenefits: [
      "Air-ride suspension eliminating in-transit vibration damage",
      "Real-time GPS geofencing with unauthorized route deviation alerts",
      "Bonded customs clearance for imported PCBAs and silicon components",
      "Serial-number level verification during receiving and dispatch",
    ],
    metrics: [
      { label: "Transit Security", value: "Zero Loss Protocol" },
      { label: "Handling Quality", value: "Air-Ride Vibration Damping" },
      { label: "Bonded Clearance", value: "< 24h Gateway Processing" },
    ],
    servicesUtilized: ["Air Freight", "Express Delivery", "Freight Forwarding"],
  },
  {
    id: "industrial",
    slug: "industrial",
    title: "Industrial Equipment & Machinery",
    tagline: "Heavy-haul engineering, project cargo charters, and industrial turnkey moves.",
    description:
      "From turbines and transformers to automated CNC equipment and manufacturing lines, industrial machinery logistics requires specialized engineering, permits, and heavy-lift equipment.",
    heroImage:
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1600&auto=format&fit=crop",
    iconName: "Wrench",
    challenge:
      "Over-weight, over-height, and over-width loads that cannot use standard highway bridges or toll lanes, requiring specialized hydraulic axles and government permits.",
    solution:
      "Full civil engineering route surveys, bridge load assessments, hydraulic multi-axle modular trailers, barge transport coordination, and heavy crane offloading at installation sites.",
    keyBenefits: [
      "Turnkey project freight management from factory floor to foundation bed",
      "Liaison with national highway authorities for statutory permits",
      "Professional rigging, lashing, and marine engineering oversight",
      "Dedicated project control room tracking every kilometer of progress",
    ],
    metrics: [
      { label: "Single Load Record", value: "Up to 150+ MT" },
      { label: "Route Feasibility", value: "100% Surveyed" },
      { label: "Site Placement", value: "Direct Onto Foundation" },
    ],
    servicesUtilized: ["Road Freight", "Ocean Freight", "Freight Forwarding"],
  },
];
