export interface TestimonialItem {
  id: string;
  clientName: string;
  designation: string;
  company: string;
  industry: string;
  quote: string;
  verifiedPartner: boolean;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-7",
    clientName: "Mr. Nitish",
    designation: "Logistics Manager",
    company: "Tata 1Mg Healthcare Solutions Pvt. Ltd.",
    industry: "Healthcare & E-Pharmacy",
    quote:
      "For healthcare supply networks, punctuality and integrity of cargo are paramount. Shiv Shakti Logistics consistently maintains strict SLA adherence and reliable freight coordination across all our supply routes.",
    verifiedPartner: true,
  },
  {
    id: "test-2",
    clientName: "Mr. Vineet Sharma",
    designation: "Logistics Manager",
    company: "Torrent Pharma Ltd.",
    industry: "Pharmaceuticals",
    quote:
      "Handling pharmaceutical shipments demands strict timeliness, temperature adherence, and zero transit deviation. Shiv Shakti Logistics delivers professional fleet management and real-time transit visibility on every single consignment.",
    verifiedPartner: true,
  },
  {
    id: "test-1",
    clientName: "Mr. Ravi",
    designation: "Logistics Manager",
    company: "KRBL Ltd.",
    industry: "FMCG & Agri-Commodities",
    quote:
      "Shiv Shakti Logistics has been an outstanding logistics partner for KRBL Ltd. Their dependable line-haul fleet and disciplined transit schedules ensure our bulk grain shipments arrive safely and on time across key state corridors.",
    verifiedPartner: true,
  },
  {
    id: "test-3",
    clientName: "Mr. Ram",
    designation: "Logistics Manager",
    company: "Brandman Retail Ltd.",
    industry: "Retail & Consumer Goods",
    quote:
      "Meeting peak retail supply cycles without stock-outs requires an agile freight partner. Shiv Shakti's prompt vehicle placement and proactive tracking have consistently streamlined our nationwide distribution operations.",
    verifiedPartner: true,
  },
  {
    id: "test-4",
    clientName: "Mr. Chankit",
    designation: "Logistics Manager",
    company: "Sunford HealthCare Pvt. Ltd.",
    industry: "Healthcare & Pharmaceuticals",
    quote:
      "We rely heavily on Shiv Shakti Logistics for moving sensitive healthcare products securely. Their prompt fleet dispatch, intact cargo handling, and responsive dispatch team have made them our trusted freight partner.",
    verifiedPartner: true,
  },
  {
    id: "test-5",
    clientName: "Mr. Manoj",
    designation: "Logistics Manager",
    company: "Godrej & Boyce Ltd.",
    industry: "Manufacturing & Consumer Durables",
    quote:
      "Moving heavy industrial and commercial equipment safely requires robust vehicles and seasoned drivers. Shiv Shakti Logistics delivers exemplary freight execution, transparent transit updates, and dependable service quality.",
    verifiedPartner: true,
  },
  {
    id: "test-6",
    clientName: "Mr. Virender",
    designation: "Logistics Manager",
    company: "Pearl Polymers Ltd.",
    industry: "Polymers & Packaging",
    quote:
      "Their seamless interstate connectivity and prompt vehicle availability have significantly cut down our transit turnaround times. Shiv Shakti Logistics handles our polymer and packaging consignments with utmost care.",
    verifiedPartner: true,
  },
];
