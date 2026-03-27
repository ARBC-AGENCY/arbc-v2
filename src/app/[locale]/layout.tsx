import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Providers } from "@/components/providers";
import PageWrapper from "@/components/layout/PageWrapper";
import BackgroundSpotlight from "@/components/layout/BackgroundSpotlight";
import Header from "@/components/layout/Header";
import "../globals.css";

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
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <BackgroundSpotlight />
            <Header />
            <PageWrapper>{children}</PageWrapper>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
