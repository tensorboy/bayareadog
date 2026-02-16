import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import HikingChecklistContent from "./HikingChecklistContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hikingChecklist" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/tools/hiking-checklist`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/tools/hiking-checklist`])
      ),
    },
  };
}

export default async function HikingChecklistPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.bayarea.dog/${locale}` },
      { "@type": "ListItem", position: 2, name: "Learn", item: `https://www.bayarea.dog/${locale}/learn` },
      { "@type": "ListItem", position: 3, name: "Hiking Checklist", item: `https://www.bayarea.dog/${locale}/tools/hiking-checklist` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <HikingChecklistContent />
    </>
  );
}
