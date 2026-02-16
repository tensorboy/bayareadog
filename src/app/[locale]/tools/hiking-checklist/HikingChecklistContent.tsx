"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronRight, CheckSquare, Square, Backpack, Droplets, Sun, Shield } from "lucide-react";

interface CheckItem {
  key: string;
  category: "water" | "safety" | "gear" | "sun";
}

const items: CheckItem[] = [
  { key: "water_bottle", category: "water" },
  { key: "collapsible_bowl", category: "water" },
  { key: "extra_water", category: "water" },
  { key: "leash", category: "gear" },
  { key: "harness", category: "gear" },
  { key: "poop_bags", category: "gear" },
  { key: "treats", category: "gear" },
  { key: "first_aid", category: "safety" },
  { key: "id_tags", category: "safety" },
  { key: "flea_tick", category: "safety" },
  { key: "paw_balm", category: "safety" },
  { key: "towel", category: "gear" },
  { key: "sunscreen", category: "sun" },
  { key: "booties", category: "sun" },
  { key: "reflective", category: "safety" },
  { key: "phone_charged", category: "safety" },
];

const categoryConfig = {
  water: { icon: Droplets, color: "text-blue-500" },
  safety: { icon: Shield, color: "text-red-500" },
  gear: { icon: Backpack, color: "text-amber-600" },
  sun: { icon: Sun, color: "text-yellow-500" },
};

export default function HikingChecklistContent() {
  const t = useTranslations("hikingChecklist");
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const progress = Math.round((checked.size / items.length) * 100);

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
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <Backpack className="w-8 h-8 text-green-600 dark:text-green-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">{t("subtitle")}</p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("progress", { count: checked.size, total: items.length })}
            </span>
            <span className="text-sm font-bold text-green-600 dark:text-green-400">{progress}%</span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-3">
          {items.map((item) => {
            const config = categoryConfig[item.category];
            const Icon = config.icon;
            const isChecked = checked.has(item.key);
            return (
              <button
                key={item.key}
                onClick={() => toggle(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors text-left ${
                  isChecked
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                    : "bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-700"
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                )}
                <Icon className={`w-4 h-4 ${config.color} flex-shrink-0`} />
                <span className={`text-sm font-medium ${isChecked ? "text-green-700 dark:text-green-400 line-through" : "text-gray-900 dark:text-white"}`}>
                  {t(`item_${item.key}`)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Reset */}
        <button
          onClick={() => setChecked(new Set())}
          className="mt-6 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          {t("reset")}
        </button>

        {/* Tips */}
        <div className="mt-10 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800">
          <h2 className="font-bold text-gray-900 dark:text-white mb-3">{t("tipsTitle")}</h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>&#8226; {t("tip1")}</li>
            <li>&#8226; {t("tip2")}</li>
            <li>&#8226; {t("tip3")}</li>
            <li>&#8226; {t("tip4")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
