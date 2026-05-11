import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";
import { projects } from "@/data/projects";

const BASE_URL = "https://www.arbc-agency.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const now = new Date();

  const staticPages = [
    { path: "", priority: 1.0 },
    { path: "/about", priority: 0.9 },
    { path: "/projects", priority: 0.9 },
    { path: "/services", priority: 0.8 },
    { path: "/portfolio", priority: 0.8 },
  ];

  const staticRoutes = locales.flatMap((locale) =>
    staticPages.map(({ path, priority }) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    }))
  );

  const portfolioRoutes = locales.flatMap((locale) =>
    PORTFOLIO_ITEMS.map((item) => ({
      url: `${BASE_URL}/${locale}/portfolio/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const projectRoutes = locales.flatMap((locale) =>
    projects.map((project) => ({
      url: `${BASE_URL}/${locale}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...portfolioRoutes, ...projectRoutes];
}
