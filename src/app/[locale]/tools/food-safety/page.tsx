import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import FoodSafetyContent from "./FoodSafetyContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "foodSafety" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}/tools/food-safety`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/tools/food-safety`])
      ),
    },
  };
}

export default async function FoodSafetyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://bayarea.dog/${locale}` },
      { "@type": "ListItem", position: 2, name: "Learn", item: `https://bayarea.dog/${locale}/learn` },
      { "@type": "ListItem", position: 3, name: "Food Safety Checker", item: `https://bayarea.dog/${locale}/tools/food-safety` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can dogs eat chocolate?",
        acceptedAnswer: { "@type": "Answer", text: "No. Chocolate contains theobromine which is toxic to dogs. Dark chocolate is more dangerous than milk chocolate." },
      },
      {
        "@type": "Question",
        name: "Can dogs eat grapes?",
        acceptedAnswer: { "@type": "Answer", text: "No. Grapes and raisins are toxic to dogs and can cause kidney failure even in small amounts." },
      },
      {
        "@type": "Question",
        name: "Can dogs eat peanut butter?",
        acceptedAnswer: { "@type": "Answer", text: "Yes, in moderation, as long as it does not contain xylitol. Peanut butter is a good source of protein for dogs." },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <FoodSafetyContent />
    </>
  );
}
