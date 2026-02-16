"use client";

import { useTranslations } from "next-intl";
import { Send } from "lucide-react";

export default function Newsletter() {
  const t = useTranslations("newsletter");

  return (
    <section className="bg-gradient-to-r from-amber-500 to-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{t("title")}</h2>
          <p className="text-amber-100 mb-8">{t("description")}</p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder={t("placeholder")}
              className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder:text-amber-100 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-white text-amber-600 font-semibold hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {t("button")}
            </button>
          </form>

          <p className="mt-4 text-xs text-amber-100/80">{t("privacy")}</p>
        </div>
      </div>
    </section>
  );
}
