import React from "react";
import { COMPANY } from "@/data/company";
import { SERVICES } from "@/data/services";
import { FAQS } from "@/data/faq";

export const OrganizationSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://shivshaktilogistics.com/#organization",
        name: COMPANY.name,
        legalName: COMPANY.legalName,
        url: "https://shivshaktilogistics.com",
        logo: {
          "@type": "ImageObject",
          url: "https://shivshaktilogistics.com/logo.png",
          caption: "Shiv Shakti Logistics Brand Logo",
        },
        description: COMPANY.fullDescription,
        telephone: COMPANY.contact.phone,
        email: COMPANY.contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: COMPANY.headquarters.address,
          addressLocality: COMPANY.headquarters.city,
          addressRegion: COMPANY.headquarters.state,
          postalCode: COMPANY.headquarters.postalCode,
          addressCountry: "IN",
        },
        sameAs: [
          COMPANY.socials.linkedin,
          COMPANY.socials.twitter,
          COMPANY.socials.facebook,
        ],
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "Place", name: "Global Trade Corridors" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://shivshaktilogistics.com/#website",
        url: "https://shivshaktilogistics.com",
        name: "Shiv Shakti Logistics",
        description: COMPANY.tagline,
        publisher: {
          "@id": "https://shivshaktilogistics.com/#organization",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const FAQSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const ServiceSchema: React.FC<{ serviceSlug?: string }> = ({
  serviceSlug,
}) => {
  const serviceList = serviceSlug
    ? SERVICES.filter((s) => s.slug === serviceSlug)
    : SERVICES;

  const schema = {
    "@context": "https://schema.org",
    "@graph": serviceList.map((service) => ({
      "@type": "Service",
      name: service.title,
      description: service.shortDescription,
      provider: {
        "@id": "https://shivshaktilogistics.com/#organization",
      },
      areaServed: "India & International Corridors",
      serviceType: service.shortTitle,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
