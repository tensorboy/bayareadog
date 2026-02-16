import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import FoodCalculatorContent from "./FoodCalculatorContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "foodCalculator" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/tools/food-calculator`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/tools/food-calculator`])
      ),
    },
  };
}

export default async function FoodCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://bayarea.dog/${locale}` },
      { "@type": "ListItem", position: 2, name: "Learn", item: `https://bayarea.dog/${locale}/learn` },
      { "@type": "ListItem", position: 3, name: "Raw Food Calculator", item: `https://bayarea.dog/${locale}/tools/food-calculator` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <FoodCalculatorContent />
    </>
  );
}
