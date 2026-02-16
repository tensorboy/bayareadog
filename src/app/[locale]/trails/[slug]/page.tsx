import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { trails } from "@/data/trails";
import { routing } from "@/i18n/routing";
import TrailDetail from "./TrailDetail";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const trail of trails) {
      params.push({ locale, slug: trail.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const trail = trails.find((t) => t.slug === slug);
  if (!trail) return {};

  const description =
    locale === "zh" ? trail.description.zh : trail.description.en;

  return {
    title: `${trail.name} - Dog Trail`,
    description: description.slice(0, 160),
    openGraph: {
      title: `${trail.name} | Bay Area Dog`,
      description: description.slice(0, 160),
    },
    alternates: {
      canonical: `/${locale}/trails/${trail.slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/trails/${trail.slug}`])
      ),
    },
  };
}

export default async function TrailDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const trail = trails.find((t) => t.slug === slug);
  if (!trail) notFound();

  const description =
    locale === "zh" ? trail.description.zh : trail.description.en;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: trail.name,
    description: description,
    address: {
      "@type": "PostalAddress",
      addressLocality: trail.city,
      addressRegion: "CA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: trail.lat,
      longitude: trail.lng,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: trail.rating,
      bestRating: 5,
      worstRating: 1,
    },
    url: `https://bayarea.dog/${locale}/trails/${trail.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://bayarea.dog/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Trails",
        item: `https://bayarea.dog/${locale}/trails`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: trail.name,
        item: `https://bayarea.dog/${locale}/trails/${trail.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TrailDetail trail={trail} />
    </>
  );
}
