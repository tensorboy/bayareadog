import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { trails } from "@/data/trails";
import { routing } from "@/i18n/routing";
import TrailsList from "./TrailsList";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "categories.trails" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/trails`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/trails`])
      ),
    },
  };
}

export default async function TrailsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://bayarea.dog/${locale}` },
      { "@type": "ListItem", position: 2, name: "Trails", item: `https://bayarea.dog/${locale}/trails` },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dog Trails in the Bay Area",
    numberOfItems: trails.length,
    itemListElement: trails.slice(0, 10).map((trail, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: trail.name,
      url: `https://bayarea.dog/${locale}/trails/${trail.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <TrailsList />
    </>
  );
}
