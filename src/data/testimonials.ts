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
    id: "test-1",
    clientName: "Sunil K. Varma",
    designation: "Head of Logistics & Distribution",
    company: "Precision Engineering Components Ltd.",
    industry: "Automotive & Heavy Engineering",
    quote:
      "Shiv Shakti Logistics transformed our interstate component transit. Their GPS control tower and committed line-haul delivery schedules have brought predictability to our factory docks that we simply didn't have with legacy transporters.",
    verifiedPartner: true,
  },
  {
    id: "test-2",
    clientName: "Meenakshi Sundaram",
    designation: "Director of Supply Chain",
    company: "Apex D2C Brands Group",
    industry: "E-Commerce & Retail",
    quote:
      "Fulfilling festive orders without stock-outs or delivery failures was our greatest operational hurdle. With Shiv Shakti's multi-hub fulfillment and responsive express dispatch, our customer delivery CSAT hit an all-time high.",
    verifiedPartner: true,
  },
  {
    id: "test-3",
    clientName: "Dr. Arvind Chawla",
    designation: "VP of Quality & Regulatory Affairs",
    company: "Biovault Therapeutics",
    industry: "Pharmaceuticals",
    quote:
      "In cold-chain biopharma, a temperature deviation means total consignment write-off. Shiv Shakti's active reefer tracking and automated temperature logs give our quality compliance team 100% peace of mind on every single run.",
    verifiedPartner: true,
  },
];
