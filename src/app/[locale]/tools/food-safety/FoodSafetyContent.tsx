"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { foodSafety, type FoodItem } from "@/data/foodSafety";
import { Search, ShieldCheck, ShieldAlert, AlertTriangle, ChevronRight, Phone } from "lucide-react";

type Filter = "all" | "yes" | "no" | "caution";
type Category = "all" | FoodItem["category"];

const safetyConfig = {
  yes: {
    bg: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    badge: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400",
    icon: ShieldCheck,
  },
  no: {
    bg: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    badge: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400",
    icon: ShieldAlert,
  },
  caution: {
    bg: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
    badge: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400",
    icon: AlertTriangle,
  },
};

export default function FoodSafetyContent() {
  const t = useTranslations("foodSafety");
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [category, setCategory] = useState<Category>("all");

  const filtered = useMemo(() => {
    return foodSafety.filter((item) => {
      const matchQuery = query === "" || item.name.toLowerCase().includes(query.toLowerCase()) || item.nameZh.includes(query);
      const matchFilter = filter === "all" || item.safe === filter;
      const matchCategory = category === "all" || item.category === category;
      return matchQuery && matchFilter && matchCategory;
    });
  }, [query, filter, category]);

  const safeCount = foodSafety.filter((i) => i.safe === "yes").length;
  const dangerCount = foodSafety.filter((i) => i.safe === "no").length;
  const cautionCount = foodSafety.filter((i) => i.safe === "caution").length;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400">{t("home")}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/learn" className="hover:text-amber-600 dark:hover:text-amber-400">{t("learn")}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 dark:text-white font-medium">{t("title")}</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-2xl">{t("subtitle")}</p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-400 text-sm font-medium">
              <ShieldCheck className="w-4 h-4" />
              {safeCount} {t("safe")}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full text-yellow-700 dark:text-yellow-400 text-sm font-medium">
              <AlertTriangle className="w-4 h-4" />
              {cautionCount} {t("cautionLabel")}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full text-red-700 dark:text-red-400 text-sm font-medium">
              <ShieldAlert className="w-4 h-4" />
              {dangerCount} {t("dangerous")}
            </div>
          </div>

          {/* Emergency */}
          <div className="mt-6 flex items-center gap-3 p-4 bg-red-100 dark:bg-red-900/30 rounded-xl border border-red-200 dark:border-red-800">
            <Phone className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div className="text-sm">
              <span className="font-semibold text-red-700 dark:text-red-400">{t("emergency")}:</span>{" "}
              <span className="text-red-600 dark:text-red-300">ASPCA Poison Control: <a href="tel:+18884264435" className="underline font-medium">(888) 426-4435</a></span>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-800"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["all", "yes", "caution", "no"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-amber-500 text-white"
                    : "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:border-amber-300"
                }`}
              >
                {f === "all" ? t("filterAll") : f === "yes" ? t("safe") : f === "no" ? t("dangerous") : t("cautionLabel")}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {(["all", "fruit", "vegetable", "protein", "dairy", "grain", "other"] as Category[]).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                category === c
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
              }`}
            >
              {t(`cat_${c}`)}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => {
            const config = safetyConfig[item.safe];
            const Icon = config.icon;
            return (
              <div key={item.name} className={`rounded-xl border p-4 ${config.bg}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                    {locale === "zh" && <p className="text-sm text-gray-500 dark:text-gray-400">{item.nameZh}</p>}
                  </div>
                  <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.badge}`}>
                    <Icon className="w-3.5 h-3.5" />
                    {item.safe === "yes" ? t("safe") : item.safe === "no" ? t("dangerous") : t("cautionLabel")}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {locale === "zh" ? item.noteZh : item.note}
                </p>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">{t("noResults")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
