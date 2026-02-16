import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { articles } from "@/data/articles";
import { routing } from "@/i18n/routing";
import ArticleContent from "./ArticleContent";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const article of articles) {
      params.push({ locale, slug: article.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: `${article.title} | Bay Area Dog`,
      description: article.description,
      type: "article",
      publishedTime: article.date,
    },
    alternates: {
      canonical: `/${locale}/guides/${article.slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/guides/${article.slug}`])
      ),
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "Bay Area Dog",
      url: "https://bayarea.dog",
    },
    publisher: {
      "@type": "Organization",
      name: "Bay Area Dog",
      url: "https://bayarea.dog",
    },
    mainEntityOfPage: `https://bayarea.dog/${locale}/guides/${article.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://bayarea.dog/${locale}` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `https://bayarea.dog/${locale}/learn` },
      { "@type": "ListItem", position: 3, name: article.title, item: `https://bayarea.dog/${locale}/guides/${article.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ArticleContent article={article} />
    </>
  );
}
