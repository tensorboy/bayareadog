import type { MetadataRoute } from "next";
import { trails } from "@/data/trails";

const locales = ["en", "zh", "es", "ja", "ko"];
const pages = ["", "/trails", "/eat", "/play", "/shop", "/learn"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `https://bayarea.dog/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1.0 : 0.8,
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
  }

  return entries;
}
