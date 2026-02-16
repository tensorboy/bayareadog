import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import FoodCalculatorContent from "./FoodCalculatorContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "foodCalculator" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function FoodCalculatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FoodCalculatorContent />;
}
