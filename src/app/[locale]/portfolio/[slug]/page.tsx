import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";
import { getProjectAssets } from "@/lib/s3";
import PortfolioDetailClient from "@/components/portfolio/PortfolioDetailClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return PORTFOLIO_ITEMS.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = PORTFOLIO_ITEMS.find((p) => p.slug === slug);
  return {
    title: item ? `ARBC — ${item.name}` : "ARBC — Portfolio",
  };
}

export default async function PortfolioItemPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const item = PORTFOLIO_ITEMS.find((p) => p.slug === slug);
  if (!item) notFound();

  const { assets, meta } = await getProjectAssets(slug);

  return (
    <main data-page-name={item.name}>
      <PortfolioDetailClient
        item={item}
        assets={assets}
        featuredVideoKey={meta.featuredVideo ?? null}
        locale={locale}
      />
    </main>
  );
}
