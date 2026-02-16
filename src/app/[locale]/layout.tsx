import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: {
      default: t("title"),
      template: `%s | Bay Area Dog`,
    },
    description: t("description"),
    metadataBase: new URL("https://bayarea.dog"),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        zh: "/zh",
        es: "/es",
        ja: "/ja",
        ko: "/ko",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://bayarea.dog",
      siteName: "Bay Area Dog",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <html lang={locale} className={geist.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Bay Area Dog",
              url: "https://bayarea.dog",
              description:
                "The ultimate guide for dog owners in the Bay Area.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://bayarea.dog/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <NextIntlClientProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
