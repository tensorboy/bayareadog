"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Dog, Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const localeNames: Record<string, string> = {
  en: "English",
  zh: "中文",
  es: "Español",
  ja: "日本語",
  ko: "한국어",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  it: "Italiano",
  ru: "Русский",
  ar: "العربية",
  hi: "हिन्दी",
  th: "ไทย",
  vi: "Tiếng Việt",
  id: "Bahasa Indonesia",
  tr: "Türkçe",
  nl: "Nederlands",
  pl: "Polski",
  sv: "Svenska",
  da: "Dansk",
  nb: "Norsk",
  fi: "Suomi",
  cs: "Čeština",
  he: "עברית",
  ms: "Bahasa Melayu",
  tl: "Filipino",
  uk: "Українська",
  ro: "Română",
  hu: "Magyar",
  el: "Ελληνικά",
};

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "/trails", label: t("trails") },
    { href: "/eat", label: t("eat") },
    { href: "/play", label: t("play") },
    { href: "/shop", label: t("shop") },
    { href: "/learn", label: t("learn") },
  ];

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-amber-100 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Dog className="w-8 h-8 text-amber-600 group-hover:text-amber-500 transition-colors" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Bay Area <span className="text-amber-600 dark:text-amber-400">Dog</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <select
              value={locale}
              onChange={(e) => switchLocale(e.target.value)}
              className="text-sm bg-transparent dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg px-2 py-1.5 text-gray-600 dark:text-gray-300 hover:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              {Object.entries(localeNames).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-amber-600"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-amber-50 dark:border-slate-700 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
