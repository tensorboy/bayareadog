"use client";

import { useTranslations, useLocale } from "next-intl";
import { UtensilsCrossed, MapPin, Star, ExternalLink, Bone, DollarSign } from "lucide-react";
import { restaurants } from "@/data/restaurants";
import { rawFoodShops, priceComparison, budgetPlans } from "@/data/rawfood";

export default function EatContent() {
  const t = useTranslations("eat");
  const tc = useTranslations("categories.eat");
  const locale = useLocale();

  return (
    <div>
      <section className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <UtensilsCrossed className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{tc("title")}</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">{tc("description")}</p>
        </div>
      </section>

      {/* Dog-Friendly Restaurants */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <UtensilsCrossed className="w-6 h-6 text-orange-500" />
          {t("restaurantsTitle")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{t("restaurantsSubtitle")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {restaurants.map((r) => (
            <div
              key={r.slug}
              className="group rounded-2xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:shadow-lg hover:border-orange-200 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {r.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      {r.city}
                    </div>
                    <span className="text-xs text-gray-400">|</span>
                    <span className="text-sm text-gray-500">{r.priceRange}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{r.rating}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                {locale === "zh" ? r.description.zh : r.description.en}
              </p>

              <div className="flex items-center gap-2 mb-3">
                {r.patio && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100">
                    {t("patio")}
                  </span>
                )}
                {r.dogMenu && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100">
                    {t("dogMenu")}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {r.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {r.website !== "#" && (
                  <a
                    href={r.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:text-orange-500 transition-colors flex items-center gap-1 text-sm shrink-0"
                  >
                    {t("visit")} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Raw Food & Bones */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Bone className="w-6 h-6 text-amber-600" />
          {t("rawFoodTitle")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{t("rawFoodSubtitle")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {rawFoodShops.map((shop) => (
            <div
              key={shop.slug}
              className="group rounded-2xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:shadow-lg hover:border-amber-200 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {shop.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {shop.city}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{shop.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {locale === "zh" ? shop.description.zh : shop.description.en}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {shop.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={shop.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-500 transition-colors flex items-center gap-1 text-sm shrink-0"
                >
                  {t("visit")} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Price Comparison Table */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-600" />
          {t("priceCompareTitle")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{t("priceCompareSubtitle")}</p>
        <div className="overflow-x-auto mb-16 rounded-2xl border border-gray-100 dark:border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700">
                <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">{t("item")}</th>
                {Object.keys(priceComparison[0].prices).map((store) => (
                  <th key={store} className="text-left p-4 font-semibold text-gray-900 dark:text-white">
                    {store}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {priceComparison.map((row) => (
                <tr key={row.item} className="border-b border-gray-50 dark:border-slate-700 hover:bg-orange-50/50 dark:hover:bg-slate-800/50">
                  <td className="p-4 font-medium text-gray-900 dark:text-white">
                    {locale === "zh" ? row.itemZh : row.item}
                  </td>
                  {Object.entries(row.prices).map(([store, price]) => (
                    <td key={store} className="p-4 text-gray-600">
                      {price ?? <span className="text-gray-300">N/A</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Budget Plans */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Bone className="w-6 h-6 text-amber-600" />
          {t("budgetTitle")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{t("budgetSubtitle")}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {budgetPlans.map((plan) => {
            const tierColors: Record<string, string> = {
              budget: "border-green-200 bg-green-50/50",
              standard: "border-blue-200 bg-blue-50/50",
              premium: "border-purple-200 bg-purple-50/50",
            };
            const badgeColors: Record<string, string> = {
              budget: "bg-green-100 text-green-700",
              standard: "bg-blue-100 text-blue-700",
              premium: "bg-purple-100 text-purple-700",
            };
            return (
              <div
                key={plan.tier}
                className={`rounded-2xl border-2 p-6 ${tierColors[plan.tier]}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${badgeColors[plan.tier]}`}>
                    {locale === "zh" ? plan.titleZh : plan.titleEn}
                  </span>
                  <span className="text-lg font-bold text-gray-900">{plan.priceEn}</span>
                </div>
                <p className="text-sm text-gray-700">
                  {locale === "zh" ? plan.descZh : plan.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
