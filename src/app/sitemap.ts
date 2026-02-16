import type { MetadataRoute } from "next";
import { trails } from "@/data/trails";
import { articles } from "@/data/articles";
import { routing } from "@/i18n/routing";

const locales = routing.locales;
const pages = [
  "", "/trails", "/eat", "/play", "/shop", "/learn",
  "/tools/food-safety", "/tools/food-calculator",
  "/tools/emergency-card", "/tools/hiking-checklist",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      const isHome = page === "";
      const isTool = page.startsWith("/tools/");
      entries.push({
        url: `https://bayarea.dog/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: isHome ? "daily" : "weekly",
        priority: isHome ? 1.0 : isTool ? 0.7 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `https://bayarea.dog/${l}${page}`])
          ),
        },
      });
    }

    // Trail detail pages
    for (const trail of trails) {
      entries.push({
        url: `https://bayarea.dog/${locale}/trails/${trail.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `https://bayarea.dog/${l}/trails/${trail.slug}`])
          ),
        },
      });
    }

    // Guide articles
    for (const article of articles) {
      entries.push({
        url: `https://bayarea.dog/${locale}/guides/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `https://bayarea.dog/${l}/guides/${article.slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
