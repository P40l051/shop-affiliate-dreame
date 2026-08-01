import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/go/"],
      },
    ],
    sitemap: "https://robotaspirapolvere.pro/sitemap.xml",
    host: "https://robotaspirapolvere.pro",
  };
}
