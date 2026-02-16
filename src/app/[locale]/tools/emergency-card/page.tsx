import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import EmergencyCardContent from "./EmergencyCardContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "emergencyCard" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/tools/emergency-card`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/tools/emergency-card`])
      ),
    },
  };
}

export default async function EmergencyCardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://www.bayarea.dog/${locale}` },
      { "@type": "ListItem", position: 2, name: "Learn", item: `https://www.bayarea.dog/${locale}/learn` },
      { "@type": "ListItem", position: 3, name: "Emergency Card", item: `https://www.bayarea.dog/${locale}/tools/emergency-card` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <EmergencyCardContent />
    </>
  );
}
