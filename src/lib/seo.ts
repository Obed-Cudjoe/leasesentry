import type { Metadata } from "next";
import { SITE } from "./site";

// Shared metadata + JSON-LD builders so SEO stays consistent across pages.

export function buildMetadata(overrides: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const title = overrides.title ? `${overrides.title} — ${SITE.name}` : `${SITE.name} · ${SITE.tagline}`;
  const description = overrides.description ?? SITE.description;
  const url = `${SITE.url}${overrides.path ?? ""}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      images: [
        {
          url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
          width: 1200,
          height: 630,
          alt: `${SITE.name} — ${SITE.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** LocalBusiness + Menu + FAQ structured data (JSON-LD). */
export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: SITE.name,
    description: SITE.description,
    servesCuisine: "Farm-to-table",
    url: SITE.url,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressLocality: "Portland",
      addressRegion: "OR",
      postalCode: "97205",
      addressCountry: "US",
    },
    openingHours: "Tu-Su 17:00-22:00",
    priceRange: "$$",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    acceptsReservations: true,
  };
}
