export interface ServiceItem {
  id: string;
  number: string;
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  heroImage: string;
  modes: string[];
  keyHighlights: string[];
  capabilities: Array<{
    title: string;
    description: string;
  }>;
  operationalSpecs: {
    coverage: string;
    fleetOptions: string;
    leadTimes: string;
    trackingPrecision: string;
    compliance: string;
  };
  suitableFor: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: "road-freight",
    number: "01",
    slug: "road-freight",
    title: "Full Truckload (FTL) & Surface Road Freight",
    shortTitle: "Road Freight",
    tagline: "High-density interstate corridors with GPS-governed fleet telemetry.",
    shortDescription:
      "Reliable primary and secondary line-haul road transportation across all major national highways, industrial zones, and multi-modal freight corridors.",
    fullDescription:
      "Shiv Shakti Logistics operates an expansive road freight network combining dedicated fleet assets and audited partner carriers. From dedicated Full Truckload (FTL) movements of dry cargo, heavy industrial components, and bulk FMCG to temperature-controlled reefers and Part Truckload (PTL) consolidation, our road transit is monitored 24/7 through a unified GPS and telematics control tower.",
    iconName: "Truck",
    heroImage:
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1600&auto=format&fit=crop",
    modes: ["Dedicated FTL", "Part Truckload (PTL)", "Containerized Fleet", "Reefer Cold Chain", "ODC / Heavy Haul"],
    keyHighlights: [
      "Real-time GPS telematics with live geofencing and stopover alerts",
      "Multi-axle, containerized 32ft MXL, and 40ft high-cube options",
      "24/7 National Route Monitoring & Driver Rest Protocol",
      "Automated e-Way Bill integration and electronic Proof of Delivery (e-POD)",
    ],
    capabilities: [
      {
        title: "Dedicated Full Truckload (FTL)",
        description:
          "End-to-end direct point-to-point transit eliminating midway cross-dock touches, maximizing speed and cargo integrity.",
      },
      {
        title: "Part-Truckload (PTL) Consolidation",
        description:
          "Scheduled departures between major hub cities with intelligent cube optimization and automated barcoded carton sorting.",
      },
      {
        title: "ODC & Project Cargo Transportation",
        description:
          "Engineering route surveys, hydraulic multi-axle trailers, and escort management for oversized machinery.",
      },
      {
        title: "Refrigerated Reefer Fleet",
        description:
          "Microprocessor-controlled temperature logging from -25°C to +25°C for pharmaceuticals, dairy, and perishables.",
      },
    ],
    operationalSpecs: {
      coverage: "Pan-India National Highway Network & Key Corridors",
      fleetOptions: "14ft, 20ft, 24ft, 32ft SXL/MXL, 40ft Trailers, Reefer Vans",
      leadTimes: "Same-day regional dispatch, 24-72h inter-state express lines",
      trackingPrecision: "Live GPS updates every 60 seconds with temperature telemetry",
      compliance: "CMVR compliant, Motor Vehicle Act certified, Comprehensive In-Transit Marine Cover",
    },
    suitableFor: [
      "Automotive Parts & Assemblies",
      "Heavy Machinery & Industrial Equipment",
      "FMCG & Packaged Foods",
      "Consumer Electronics",
      "Textiles & Retail Bulk Moves",
    ],
  },
  {
    id: "air-freight",
    number: "02",
    slug: "air-freight",
    title: "Global & Domestic Express Air Freight",
    shortTitle: "Air Freight",
    tagline: "Time-critical cargo delivered through scheduled airline capacity and chartered freighters.",
    shortDescription:
      "Urgent domestic airport-to-airport or door-to-door cargo connections and international IATA air cargo solutions for high-value and sensitive goods.",
    fullDescription:
      "When market timing is non-negotiable, Shiv Shakti Logistics provides rapid air cargo operations. Leveraging block space agreements with leading commercial air carriers and dedicated freight charters, we bridge national gateways and key international hubs in Dubai, Singapore, Frankfurt, London, and Chicago with guaranteed cut-off windows and expedited customs documentation.",
    iconName: "Plane",
    heroImage:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1600&auto=format&fit=crop",
    modes: ["Next Flight Out (NFO)", "Consolidated Air Cargo", "Charter Cargo Flights", "Temperature Controlled Air", "Hazardous Material (HAZMAT)"],
    keyHighlights: [
      "Direct airport tarmac handoffs and expedited bonded transfers",
      "Complete customs air waybill (AWB) generation & pre-clearance",
      "IATA certified dangerous goods (DGR) handling capability",
      "Dedicated air chartering for project crunches and line stoppages",
    ],
    capabilities: [
      {
        title: "Next Flight Out (NFO)",
        description:
          "Mission-critical cargo assigned to the earliest commercial departure with priority ramp transfer and hand-carry courier options.",
      },
      {
        title: "Consolidated Air Services",
        description:
          "Regular scheduled air consolidations offering optimal cost efficiency for mid-weight urgent manufacturing inputs.",
      },
      {
        title: "Cold-Chain Air Logistics",
        description:
          "Passive and active thermal container solutions (Envirotainer/CSafe) with dry-ice replenishments for life sciences.",
      },
      {
        title: "Customs Airport Brokerage",
        description:
          "Dedicated airport brokerage teams working 24/7 for zero-dwell customs processing at major air cargo complexes.",
      },
    ],
    operationalSpecs: {
      coverage: "35+ Domestic Commercial Airports & 120+ International Gateways",
      fleetOptions: "Wide-body belly space, Boeing 777F/747F charters, regional turboprops",
      leadTimes: "Domestic: 12-24 hours | International: 24-72 hours door-to-door",
      trackingPrecision: "Milestone telemetry linked to FlightRadar24 and airline AWB data feeds",
      compliance: "IATA Member Standards, TSA / BCAS Security Regulated, AEO Certified",
    },
    suitableFor: [
      "Aerospace & AOG Spare Parts",
      "Pharmaceuticals & Vaccines",
      "High-Value Electronics & Chips",
      "Luxury Fashion & Samples",
      "Automotive Assembly Prototypes",
    ],
  },
  {
    id: "ocean-freight",
    number: "03",
    slug: "ocean-freight",
    title: "Global Ocean Freight Forwarding (FCL / LCL)",
    shortTitle: "Ocean Freight",
    tagline: "Scalable sea container shipping connecting major world ports and domestic coastal lines.",
    shortDescription:
      "Comprehensive Full Container Load (FCL) and Less than Container Load (LCL) sea transportation with secure multi-carrier contracts and customs clearance.",
    fullDescription:
      "Shiv Shakti Logistics coordinates maritime logistics across major international shipping lanes. We manage origin drayage, port terminal operations, ocean bill of lading documentation, and final inland destination clearance through long-term partnerships with premier container shipping alliances.",
    iconName: "Ship",
    heroImage:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600&auto=format&fit=crop",
    modes: ["Full Container Load (FCL)", "Less than Container Load (LCL)", "Breakbulk & Project Ocean", "Reefer Containers", "Coastal RO-RO"],
    keyHighlights: [
      "Direct contracts with Tier-1 ocean liners ensuring predictable container allocation",
      "Automated electronic Bill of Lading (eBL) and VGM (Verified Gross Mass) processing",
      "Weekly LCL consolidation boxes for cost-effective export/import consignments",
      "Inland Container Depot (ICD) multi-modal rail integration",
    ],
    capabilities: [
      {
        title: "Full Container Load (FCL)",
        description:
          "Standard 20ft, 40ft, 40ft High Cube, Open Top, and Flat Rack container configurations with priority equipment release.",
      },
      {
        title: "LCL Consolidation Hubs",
        description:
          "Dedicated CFS (Container Freight Station) stuffing, de-stuffing, barcoding, and split customs declarations.",
      },
      {
        title: "Port Drayage & Multimodal Rail",
        description:
          "Seamless port-to-inland container rail sidings linking ports like JNPT, Mundra, and Chennai directly to hinterland ICDs.",
      },
      {
        title: "Project Maritime Forwarding",
        description:
          "Charter vessels, tugs, barges, and heavy-lift vessels for turnkey power, infrastructure, and oil & gas projects.",
      },
    ],
    operationalSpecs: {
      coverage: "Direct services to APAC, Middle East, Europe, North America & Africa",
      fleetOptions: "20' GP, 40' GP, 40' HC, 45' High Cube, Reefer, Flat Racks",
      leadTimes: "Port-to-port scheduled sailings with fixed ETA buffer modeling",
      trackingPrecision: "Container AIS vessel tracking + terminal gate-in / gate-out sensors",
      compliance: "FMC licensed, IMO SOLAS VGM compliant, WCO AEO Tier-2 certified",
    },
    suitableFor: [
      "Industrial Bulk Chemicals & Raw Materials",
      "Heavy Machinery & Turnkey Equipment",
      "Solar Panels & Renewable Hardware",
      "Agricultural Commodities & Coffee/Spices",
      "Export Garments & Retail Merchandise",
    ],
  },
  {
    id: "warehousing",
    number: "04",
    slug: "warehousing",
    title: "Grade-A Automated Warehousing & Distribution",
    shortTitle: "Warehousing",
    tagline: "Modern fulfillment centers equipped with WMS, temperature zones, and automated sorting.",
    shortDescription:
      "Scalable multi-client and dedicated warehouse facilities situated at strategic logistics hubs with advanced inventory control and value-added packaging.",
    fullDescription:
      "Our Grade-A warehousing infrastructure provides high-bay storage, automated racking, barcode/RFID tracking, and climate-controlled zones. Driven by an enterprise Warehouse Management System (WMS), we support batch tracing, FIFO/FEFO inventory turnover, kitting, labeling, and seamless ERP integration.",
    iconName: "Warehouse",
    heroImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
    modes: ["Dedicated Contract Warehousing", "Multi-Client Shared Facilities", "Bonded Custom Warehouses", "Cold Storage & Reefer Hubs", "Micro-Fulfillment Centers"],
    keyHighlights: [
      "Real-time cloud WMS with live inventory dashboards and ERP API integration",
      "Heavy-duty VNA racking, electric reach trucks, and laser-guided sorting",
      "NFPA compliant fire suppression, 24/7 CCTV, and biometrically gated access",
      "Value-added services: MRP sticker tagging, shrink-wrapping, and reverse logistics",
    ],
    capabilities: [
      {
        title: "Automated Inventory Management",
        description:
          "Sub-carton and serial-number level visibility with automated replenishment triggers and cycle counting.",
      },
      {
        title: "Bonded Customs Warehousing",
        description:
          "Authorized storage under customs bond, enabling duty deferment until goods are cleared for domestic consumption.",
      },
      {
        title: "Cross-Dock Operations",
        description:
          "Rapid inbound-to-outbound transshipment minimizing storage dwell time and lowering distribution expenses.",
      },
      {
        title: "E-Commerce Fulfillment",
        description:
          "Pick-and-pack lines optimized for same-day dispatch with integrated shipping label and invoice printing.",
      },
    ],
    operationalSpecs: {
      coverage: "Over 1.5 Million sq. ft. across Delhi NCR, Mumbai, Gujarat, Bengaluru & Kolkata",
      fleetOptions: "Modern dock levelers, battery electric reach trucks, motorized conveyors",
      leadTimes: "Same-day order-to-ship fulfillment SLA under 2 hours",
      trackingPrecision: "SKU-level barcode scanning with real-time API inventory synchronization",
      compliance: "ISO 9001:2015, ISO 27001 Security, FSSAI certified for food items",
    },
    suitableFor: [
      "E-Commerce Brands & D2C Marketplaces",
      "Pharma & Healthcare Formulations",
      "Automotive Spare Parts Distribution",
      "Consumer Electronics & Appliances",
      "Retail Brand Distribution Centers",
    ],
  },
  {
    id: "express-delivery",
    number: "05",
    slug: "express-delivery",
    title: "High-Priority Express & Time-Definite Freight",
    shortTitle: "Express Delivery",
    tagline: "Guaranteed transit slots for high-urgency commercial consignments.",
    shortDescription:
      "Time-definite express transportation backed by dedicated surface express runs, air courier connectivity, and prioritized hub processing.",
    fullDescription:
      "Designed for high-stake shipments where hours dictate business outcomes, Shiv Shakti Express Cargo delivers guaranteed transit times. Backed by dedicated express bypass lines, double-driver long-distance linehauls, and priority airport handovers, your urgent orders move without pause.",
    iconName: "Zap",
    heroImage:
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1600&auto=format&fit=crop",
    modes: ["Same-Day Metro Express", "Next-Day Guaranteed Inter-City", "Time-Definite 48h National", "Dedicated Hot-Shot Vans", "Critical Sample Dispatch"],
    keyHighlights: [
      "Guaranteed delivery SLA with proactive delay warning telemetry",
      "Relay trucking models: two rested drivers per vehicle for non-stop transit",
      "Priority green-channel unloading at key transshipment gateways",
      "Automated SMS, email, and WhatsApp delivery milestone pings",
    ],
    capabilities: [
      {
        title: "Surface Express Relay Lines",
        description:
          "Long-haul trucks operating with driver swaps every 250 km to ensure continuous 24-hour wheel rotation safely.",
      },
      {
        title: "Air Express Connections",
        description:
          "Early morning departure and late-evening handoffs across all Tier-1 and Tier-2 domestic air terminals.",
      },
      {
        title: "Time-Slot Delivery",
        description:
          "Scheduled appointment-based deliveries customized for assembly lines and enterprise receiving docks.",
      },
      {
        title: "Special Handling White-Glove",
        description:
          "Trained handlers and shock-absorbing packaging for sensitive medical devices and lab instruments.",
      },
    ],
    operationalSpecs: {
      coverage: "Pan-India Express Network spanning 500+ commercial centers",
      fleetOptions: "GPS-locked GPS-sealed container trucks, dedicated sprinter vans",
      leadTimes: "Metro-to-Metro: 12-24 Hours | Secondary Hubs: 24-36 Hours",
      trackingPrecision: "Live GPS broadcast + automated checkpoint timestamp scan",
      compliance: "Strict transit SLA guarantees with milestone insurance cover",
    },
    suitableFor: [
      "Critical Spare Parts for Manufacturing Lines",
      "Biological Samples & Clinical Trials",
      "High-Value Contract Documents & Tenders",
      "New Product Launch Merchandise",
      "Electronics Replacement Spares",
    ],
  },
  {
    id: "last-mile-delivery",
    number: "06",
    slug: "last-mile-delivery",
    title: "Urban & Regional Last-Mile Distribution",
    shortTitle: "Last-Mile Delivery",
    tagline: "Smart route optimization for residential, retail, and commercial doorstep deliveries.",
    shortDescription:
      "Intelligent last-mile logistics combining EV and CNG fleet distribution, algorithmic multi-stop routing, and digital Proof-of-Delivery.",
    fullDescription:
      "The final mile represents the most customer-visible segment of your supply chain. Shiv Shakti Logistics optimizes urban and regional last-mile delivery using AI-powered route planning, dynamic delivery windows, contactless OTP verification, and an expanding eco-friendly electric vehicle (EV) urban fleet.",
    iconName: "MapPin",
    heroImage:
      "https://images.unsplash.com/photo-1549194388-f61be84a6e9e?q=80&w=1600&auto=format&fit=crop",
    modes: ["B2B Store Replenishment", "D2C Direct Doorstep", "Electric Vehicle (EV) Delivery", "Cash-on-Delivery (COD) Reconciliation", "Reverse Pickup & QC"],
    keyHighlights: [
      "Dynamic route clustering minimizing transit time and carbon footprint",
      "Real-time driver location sharing with live delivery ETA via SMS/WhatsApp",
      "Digital Proof of Delivery (e-POD) with geo-tagged photographic verification",
      "Trained delivery staff ensuring respectful, branded doorstep presentation",
    ],
    capabilities: [
      {
        title: "B2B Retail Store Delivery",
        description:
          "Scheduled daily and weekly store replenishments with inside-mall delivery compliance and off-hour dock clearance.",
      },
      {
        title: "EV Urban Green Fleet",
        description:
          "Zero-emission electric 2-wheelers and 3-wheelers for congested metro centers and zero-emission corridors.",
      },
      {
        title: "Reverse Logistics & Quality Checks",
        description:
          "Doorstep return pickup with on-the-spot physical QC, barcode scanning, and instant customer refund triggers.",
      },
      {
        title: "Cash & Digital Collection",
        description:
          "Seamless Cash-on-Delivery (COD) and UPI payment collection with daily automated reconciliation cycles.",
      },
    ],
    operationalSpecs: {
      coverage: "Direct presence in 120+ cities and 19,000+ PIN codes",
      fleetOptions: "EV Cargo Vans, 3-Wheelers, Small Commercial Vehicles (SCVs)",
      leadTimes: "Same-Day Urban, Next-Day Suburbs, Scheduled 2-Hour Appointment Slots",
      trackingPrecision: "Live turn-by-turn driver tracking with automated customer notification",
      compliance: "Full municipal compliance, certified couriers, insured goods-in-transit",
    },
    suitableFor: [
      "Omnichannel Fashion & Lifestyle Brands",
      "FMCG Grocery & Food Staples",
      "B2B Retail Chains & Supermarkets",
      "Electronics & Appliances Delivery & Unboxing",
      "Home Furnishings & Direct-to-Consumer Goods",
    ],
  },
  {
    id: "freight-forwarding",
    number: "07",
    slug: "freight-forwarding",
    title: "International Freight Forwarding & Customs Brokerage",
    shortTitle: "Freight Forwarding",
    tagline: "Navigating cross-border trade, regulatory compliance, and multi-modal transit.",
    shortDescription:
      "End-to-end international freight brokerage, tariff classification, licensed customs clearance, and global trade compliance.",
    fullDescription:
      "Expanding across borders requires flawless customs compliance and maritime expertise. Shiv Shakti Logistics acts as your licensed customs house broker (CHB) and global freight forwarder, managing letters of credit, certificates of origin, import duty rationalization, bonded transfers, and multi-modal ocean/air arrangements.",
    iconName: "Globe",
    heroImage:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1600&auto=format&fit=crop",
    modes: ["Import & Export Brokerage", "Customs Clearance (CHA)", "Bonded Cargo Transfers", "Dangerous Goods (HAZMAT)", "Free Trade Zone (FTWZ) Logistics"],
    keyHighlights: [
      "In-house licensed Customs House Agents (CHA) operating at all sea ports & airports",
      "Harmonized System (HS) code classification and import duty optimization advisory",
      "Paperless single-window customs filing via ICEGATE and international customs networks",
      "Marine cargo insurance underwriting and claims assistance",
    ],
    capabilities: [
      {
        title: "Licensed Customs Brokerage",
        description:
          "Zero-delay customs clearance with pre-arrival documentation processing, valuation checks, and duty calculations.",
      },
      {
        title: "Free Trade Warehousing Zones (FTWZ)",
        description:
          "Duty-free storage, repacking, and re-export capabilities inside designated Special Economic Zones.",
      },
      {
        title: "Trade Compliance Advisory",
        description:
          "Guidance on preferential trade treaties, export incentives (RoDTEP / RoSCTL), and anti-dumping regulations.",
      },
      {
        title: "Comprehensive Marine Insurance",
        description:
          "All-risk Institute Cargo Clauses (A) coverage protecting against total loss, damage, and general average.",
      },
    ],
    operationalSpecs: {
      coverage: "Direct operations across major Indian ports, airports, and 120 global trade lanes",
      fleetOptions: "Bonded trucks, container chassis, rail rakes, multi-modal transport operators (MTO)",
      leadTimes: "Customs clearance within 24-48 hours of vessel/flight arrival",
      trackingPrecision: "Integrated customs manifest & EDI status milestone updates",
      compliance: "Indian Customs Broker License, FIATA affiliated, AEO compliant",
    },
    suitableFor: [
      "Industrial Manufacturers & Importers",
      "Electronics & Semiconductor Components",
      "Chemicals & Petrochemicals",
      "Engineering Capital Goods",
      "Pharmaceutical APIs & Finished Dosages",
    ],
  },
  {
    id: "supply-chain-management",
    number: "08",
    slug: "supply-chain-management",
    title: "End-to-End Enterprise Supply Chain Engineering",
    shortTitle: "Supply Chain Solutions",
    tagline: "Holistic 4PL orchestration, network design, and digital control tower visibility.",
    shortDescription:
      "Strategic logistics architecture integrating multi-modal transportation, warehouse placement, vendor management, and continuous predictive optimization.",
    fullDescription:
      "True supply chain resilience requires strategic engineering. Shiv Shakti Logistics delivers comprehensive Fourth-Party Logistics (4PL) services, acting as the single orchestrator of your vendors, carriers, and fulfillment centers. Using digital twins, predictive lead time analytics, and control tower dashboards, we reduce total logistics cost while elevating delivery reliability.",
    iconName: "Cpu",
    heroImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    modes: ["4PL Logistics Orchestration", "Network Design & Facility Location", "Control Tower Visibility", "Reverse Logistics Architecture", "Vendor Consolidation"],
    keyHighlights: [
      "Centralized 24/7 Supply Chain Control Tower managing all carrier feeds and milestones",
      "Predictive delay modeling leveraging machine learning and historical traffic corridors",
      "Comprehensive inventory optimization reducing safety stock without compromising fill rates",
      "Carbon accounting and green logistics roadmap for ESG compliance",
    ],
    capabilities: [
      {
        title: "Unified Control Tower",
        description:
          "Single glass pane visibility across all suppliers, third-party carriers, and multi-modal shipments.",
      },
      {
        title: "Network Optimization & Modeling",
        description:
          "Simulating optimal warehouse placement, transportation nodes, and inventory allocation models.",
      },
      {
        title: "Vendor Management & Compliance",
        description:
          "Monitoring supplier dispatch discipline, packaging standards, and purchase order fulfillment accuracy.",
      },
      {
        title: "ESG & Carbon Reduction",
        description:
          "Measuring shipment carbon emissions, modal shift optimization (road to rail/sea), and route efficiency.",
      },
    ],
    operationalSpecs: {
      coverage: "Global and pan-national supply chain orchestration",
      fleetOptions: "Multi-carrier, multi-modal network integrated under single SLA",
      leadTimes: "Continuous real-time optimization with monthly operational reviews (QBR)",
      trackingPrecision: "Single API data lake consolidating EDI, IoT, GPS, and customs databases",
      compliance: "ISO 28000 (Supply Chain Security), SOC 2 Type II data governance",
    },
    suitableFor: [
      "Automotive OEMs & Tier-1 Suppliers",
      "Enterprise Consumer Durables",
      "Nationwide Retail Conglomerates",
      "High-Tech & Telecommunications",
      "Multi-Plant Heavy Manufacturing",
    ],
  },
];
