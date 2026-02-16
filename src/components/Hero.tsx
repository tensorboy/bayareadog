"use client";

import { useTranslations } from "next-intl";
import { Search } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-300 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t("search_placeholder")}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent shadow-lg shadow-amber-100/50"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
            {["Fort Funston", "Point Isabel", "Marin Raw", "Lazy Dog"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/60 border border-gray-200 hover:border-amber-300 hover:text-amber-600 cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
