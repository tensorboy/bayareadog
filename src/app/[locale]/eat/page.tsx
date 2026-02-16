import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { restaurants } from "@/data/restaurants";
import { routing } from "@/i18n/routing";
import EatContent from "./EatContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "categories.eat" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/eat`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/eat`])
      ),
    },
  };
}

export default async function EatPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://bayarea.dog/${locale}` },
      { "@type": "ListItem", position: 2, name: "Eat & Drink", item: `https://bayarea.dog/${locale}/eat` },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dog-Friendly Restaurants in the Bay Area",
    numberOfItems: restaurants.length,
    itemListElement: restaurants.slice(0, 10).map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.name,
      url: r.website,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <EatContent />
    </>
  );
}
