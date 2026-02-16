import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import LearnContent from "./LearnContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "categories.learn" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/learn`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/learn`])
      ),
    },
  };
}

export default async function LearnPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.bayarea.dog/${locale}` },
      { "@type": "ListItem", position: 2, name: "Learn", item: `https://www.bayarea.dog/${locale}/learn` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <LearnContent />
    </>
  );
}
