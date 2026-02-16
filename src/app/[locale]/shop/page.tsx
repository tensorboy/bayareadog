import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import ShopContent from "./ShopContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "categories.shop" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/shop`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/shop`])
      ),
    },
  };
}

export default async function ShopPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.bayarea.dog/${locale}` },
      { "@type": "ListItem", position: 2, name: "Shop", item: `https://www.bayarea.dog/${locale}/shop` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ShopContent />
    </>
  );
}
