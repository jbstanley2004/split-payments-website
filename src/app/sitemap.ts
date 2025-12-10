import type { MetadataRoute } from "next";

export const baseUrl = "https://split-llc.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/payments", "/funding", "/cc-split", "/partnerships", "/get-started"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return routes;
}
