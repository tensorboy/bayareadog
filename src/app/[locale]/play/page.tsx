import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import PlayContent from "./PlayContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "categories.play" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/play`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/play`])
      ),
    },
  };
}

export default async function PlayPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.bayarea.dog/${locale}` },
      { "@type": "ListItem", position: 2, name: "Play", item: `https://www.bayarea.dog/${locale}/play` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PlayContent />
    </>
  );
}
