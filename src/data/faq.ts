export interface FAQItem {
  id: string;
  category: "Services" | "Quotes & Pricing" | "Operations & Safety";
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "services-overview",
    category: "Services",
    question: "What logistics services do you provide?",
    answer:
      "Shiv Shakti Logistics provides complete multimodal logistics including Full Truckload (FTL) and Part Truckload (PTL) Road Freight, Scheduled Air Cargo, Ocean Container Shipping (FCL & LCL), Grade-A Warehousing & Distribution, Priority Express Cargo, Urban Last-Mile Distribution, Licensed Customs Brokerage (CHA), and Enterprise 4PL Supply Chain Management.",
  },
  {
    id: "door-to-door",
    category: "Services",
    question: "Do you provide door-to-door delivery?",
    answer:
      "Yes. We offer turnkey door-to-door services for domestic and international shipments. This covers origin pickup, export documentation, primary long-distance transit, customs brokerage, and final delivery directly to the recipient factory dock, retail store, or distribution facility with digital Proof of Delivery (e-POD).",
  },
  {
    id: "shipment-status",
    category: "Operations & Safety",
    question: "How do I receive status updates for my consignment?",
    answer:
      "Every booked consignment is assigned a dedicated Account Executive and operational dispatch coordinator. We provide scheduled milestone dispatches via automated email and SMS, digital Proof of Delivery (e-POD), and 24/7 access to our central dispatch desk for immediate status reports and ETA confirmations.",
  },
  {
    id: "international-freight",
    category: "Services",
    question: "Do you handle international freight?",
    answer:
      "Yes. We manage international freight forwarding across major global sea and air trade lanes. Our maritime services include FCL and LCL ocean container shipping across Middle East, Southeast Asia, Europe, and the Americas, paired with dedicated air freight capacity and licensed in-house customs clearance.",
  },
  {
    id: "warehousing-solutions",
    category: "Services",
    question: "Do you provide warehousing?",
    answer:
      "Yes. We operate modern Grade-A fulfillment centers and warehousing facilities situated strategically near key industrial zones and consumer metros (including Delhi NCR, Mumbai, Gujarat, Bengaluru, Chennai, and Kolkata). Facilities offer multi-client flexible storage, dedicated contract warehousing, bonded customs zones, and temperature-controlled cold rooms.",
  },
  {
    id: "request-quote",
    category: "Quotes & Pricing",
    question: "How can I request a logistics quote?",
    answer:
      "You can submit a quote request directly through our interactive online Quote Calculator on this website, email our commercial desk at contact@shivshaktilogistics.com, or call our 24/7 commercial line at +91 11 4890 2200. Our logistics engineering team typically provides structured rate quotes within 2 to 4 business hours.",
  },
  {
    id: "quote-information",
    category: "Quotes & Pricing",
    question: "What information is required for a shipment quote?",
    answer:
      "To provide an accurate freight rate, we require: (1) Origin and Destination pincodes or city names, (2) Cargo commodity type and special handling instructions (e.g., hazardous or temperature-controlled), (3) Total gross weight and dimensions (length, width, height) to assess volumetric weight, (4) Desired service mode (Road FTL, Air Express, Ocean FCL, etc.), and (5) Expected dispatch timeline.",
  },
  {
    id: "industries-served",
    category: "Operations & Safety",
    question: "Which industries do you serve?",
    answer:
      "We serve high-demand industrial sectors including Automotive & Auto Components, E-Commerce & Omnichannel Retail, Pharmaceuticals & Healthcare, Heavy Engineering & Machinery, Fast-Moving Consumer Goods (FMCG), Electronics & Technology, Chemicals, and Renewable Energy Equipment.",
  },
  {
    id: "delay-handling",
    category: "Operations & Safety",
    question: "How do you handle shipment delays?",
    answer:
      "Our 24/7 Control Tower utilizes proactive telemetry to detect potential delays (weather, highway congestion, border bottlenecks) hours before they escalate. In case of route disruptions, our team initiates immediate dynamic rerouting, secondary driver relay swaps, or contingency express modes, keeping shippers proactively informed via automated alert notifications.",
  },
  {
    id: "last-mile",
    category: "Services",
    question: "Do you provide last-mile delivery?",
    answer:
      "Yes. Our urban and regional last-mile delivery network spans over 120 cities and 19,000+ PIN codes. We offer B2B store replenishments, commercial dock deliveries, electric vehicle (EV) zero-emission delivery runs, appointment-based slots, and OTP-verified digital Proof of Delivery with photo confirmation.",
  },
];
