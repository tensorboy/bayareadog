import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import TrailsList from "./TrailsList";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "categories.trails" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function TrailsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TrailsList />;
}
