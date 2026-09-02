import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { DISHES } from "@/lib/menu-data";

// Auto-generated sitemap for SEO.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const staticPaths = ["", "/menu", "/book", "/about", "/story", "/visit"];
  const entries = staticPaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));
  const dishes = DISHES.map((d) => ({
    url: `${base}/menu/${d.slug}`,
    lastModified: new Date(),
  }));
  return [...entries, ...dishes];
}
