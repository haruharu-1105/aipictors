import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/api/og/*"],
      disallow: "/api/",
    },
    sitemap: "https://beta.aipictors.io/sitemap.xml",
  }
}