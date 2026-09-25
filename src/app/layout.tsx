import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileQuickBar } from "@/components/MobileQuickBar";
import { OrganizationSchema } from "@/components/StructuredData";
import { COMPANY } from "@/data/company";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shivshaktilogistics.com"),
  title: {
    default: "Shiv Shakti Logistics | Global Freight & Multimodal Supply Chain Infrastructure",
    template: "%s | Shiv Shakti Logistics",
  },
  description:
    "End-to-end multi-modal logistics built for speed, complete visibility, and unmatched reliability. Road freight, air cargo, ocean shipping, automated warehousing, and intelligent last-mile distribution.",
  keywords: [
    "Shiv Shakti Logistics",
    "Logistics Company India",
    "Freight Forwarding",
    "Road Freight FTL",
    "Air Cargo Express",
    "Ocean Container Shipping",
    "Cold Chain Warehousing",
    "Supply Chain Management",
    "Customs House Agent",
    "Multimodal Logistics",
  ],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shivshaktilogistics.com",
    title: "Shiv Shakti Logistics | Your Cargo. Our Network. Delivered.",
    description:
      "Enterprise logistics and multimodal supply-chain infrastructure. Real-time GPS visibility, dedicated linehauls, and cross-border trade corridors.",
    siteName: COMPANY.name,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shiv Shakti Logistics Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiv Shakti Logistics | Global Freight & Supply Chain",
    description:
      "End-to-end logistics solutions built for speed, visibility and reliability — from first mile to final delivery.",
    creator: "@shivshaktilogistics",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://shivshaktilogistics.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <head>
        <OrganizationSchema />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-white text-slate-900 min-h-screen flex flex-col font-sans antialiased selection:bg-sky-500 selection:text-white">
        <Navbar />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <MobileQuickBar />
      </body>
    </html>
  );
}
