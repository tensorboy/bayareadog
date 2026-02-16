import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import MobileNav from "@/components/MobileNav";
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
        en: "/en", zh: "/zh", es: "/es", ja: "/ja", ko: "/ko",
        fr: "/fr", de: "/de", pt: "/pt", it: "/it", ru: "/ru",
        ar: "/ar", hi: "/hi", th: "/th", vi: "/vi", id: "/id",
        tr: "/tr", nl: "/nl", pl: "/pl", sv: "/sv", da: "/da",
        nb: "/nb", fi: "/fi", cs: "/cs", he: "/he", ms: "/ms",
        tl: "/tl", uk: "/uk", ro: "/ro", hu: "/hu", el: "/el",
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
    <html lang={locale} dir={locale === "ar" || locale === "he" ? "rtl" : "ltr"} className={geist.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
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
      <body className="font-sans antialiased bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors">
        <NextIntlClientProvider>
          <Header />
          <main className="min-h-screen pb-16 md:pb-0">{children}</main>
          <Footer />
          <BackToTop />
          <MobileNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
