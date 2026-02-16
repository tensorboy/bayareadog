import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://www.bayarea.dog/sitemap.xml",
    host: "https://www.bayarea.dog",
  };
}
