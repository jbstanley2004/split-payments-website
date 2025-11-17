import type { MetadataRoute } from "next";

export const baseUrl = "https://splitpayments.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/payments", "/funding", "/cc-split", "/partnerships", "/get-started"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return routes;
}
