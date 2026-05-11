import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Providers } from "@/components/providers";
import { TransitionProvider } from "@/context/TransitionContext";
import PageTransition from "@/components/layout/PageTransition";
import PageWrapper from "@/components/layout/PageWrapper";
import BackgroundSpotlight from "@/components/layout/BackgroundSpotlight";
import Header from "@/components/layout/Header";
import Nav from "@/components/layout/Nav";
import { routing } from "@/i18n/routing";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Tell Next.js (and Amplify) to pre-render one static build per locale.
// Without this, [locale] is treated as fully dynamic — every request hits the
// SSR Lambda, which can crash on cold starts and causes 500s on Amplify.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://www.arbc-agency.com/${locale}`,
      languages: {
        fr: "https://www.arbc-agency.com/fr",
        en: "https://www.arbc-agency.com/en",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://www.arbc-agency.com/${locale}`,
      siteName: "ARBC Agency",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
      type: "website",
      images: [
        {
          url: "https://www.arbc-agency.com/og-image.png",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["https://www.arbc-agency.com/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <TransitionProvider>
              <PageTransition />
              <BackgroundSpotlight />
              <Header />
              <PageWrapper overlay={<Nav />}>{children}</PageWrapper>
            </TransitionProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
