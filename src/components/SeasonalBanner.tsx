"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Flower2, Sun, Leaf, CloudRain } from "lucide-react";

function getSeason(): "spring" | "summer" | "fall" | "winter" {
  const month = new Date().getMonth(); // 0-11
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "fall";
  return "winter";
}

const seasonConfig = {
  spring: {
    icon: Flower2,
    gradient: "from-pink-50 to-green-50 dark:from-pink-950/20 dark:to-green-950/20",
    border: "border-pink-200 dark:border-pink-800",
    iconColor: "text-pink-500",
    textColor: "text-pink-700 dark:text-pink-400",
  },
  summer: {
    icon: Sun,
    gradient: "from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20",
    border: "border-yellow-200 dark:border-yellow-800",
    iconColor: "text-yellow-500",
    textColor: "text-yellow-700 dark:text-yellow-400",
  },
  fall: {
    icon: Leaf,
    gradient: "from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20",
    border: "border-orange-200 dark:border-orange-800",
    iconColor: "text-orange-500",
    textColor: "text-orange-700 dark:text-orange-400",
  },
  winter: {
    icon: CloudRain,
    gradient: "from-blue-50 to-slate-50 dark:from-blue-950/20 dark:to-slate-950/20",
    border: "border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-500",
    textColor: "text-blue-700 dark:text-blue-400",
  },
};

export default function SeasonalBanner() {
  const t = useTranslations("seasonal");
  const season = getSeason();
  const config = seasonConfig[season];
  const Icon = config.icon;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className={`bg-gradient-to-r ${config.gradient} border ${config.border} rounded-2xl p-5 flex items-start sm:items-center gap-4`}>
        <Icon className={`w-8 h-8 ${config.iconColor} flex-shrink-0`} />
        <div className="flex-1">
          <h3 className={`font-bold ${config.textColor}`}>{t(`${season}_title`)}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{t(`${season}_tip`)}</p>
        </div>
        <Link
          href="/trails"
          className={`flex-shrink-0 text-sm font-medium ${config.textColor} hover:underline hidden sm:block`}
        >
          {t("explore")} &rarr;
        </Link>
      </div>
    </section>
  );
}
