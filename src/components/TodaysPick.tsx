"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { trails } from "@/data/trails";
import { Sparkles, Dice5, MapPin, Star, Sun, CloudRain, Snowflake, Flower2 } from "lucide-react";

function getSeasonAndDay() {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDay(); // 0=Sun
  const isWeekend = day === 0 || day === 6;

  let season: "spring" | "summer" | "fall" | "winter";
  if (month >= 2 && month <= 4) season = "spring";
  else if (month >= 5 && month <= 7) season = "summer";
  else if (month >= 8 && month <= 10) season = "fall";
  else season = "winter";

  return { season, isWeekend };
}

type ReasonKey = "weekendAdventure" | "beatTheHeat" | "winterWalk" | "quickWalk";

function getRecommendation(season: string, isWeekend: boolean): { trail: (typeof trails)[number]; reasonKey: ReasonKey } {
  if (isWeekend) {
    const dayTrips = trails.filter((t) => t.region === "day-trip" || parseFloat(t.distance) >= 3);
    if (dayTrips.length > 0) {
      const idx = new Date().getDate() % dayTrips.length;
      return { trail: dayTrips[idx], reasonKey: "weekendAdventure" };
    }
  }

  if (season === "summer") {
    const waterTrails = trails.filter((t) => t.features.includes("beach") || t.features.includes("lake"));
    if (waterTrails.length > 0) {
      const idx = new Date().getDate() % waterTrails.length;
      return { trail: waterTrails[idx], reasonKey: "beatTheHeat" };
    }
  }

  if (season === "winter") {
    const easyTrails = trails.filter((t) => t.difficulty === "easy" && !t.features.includes("cliffs"));
    if (easyTrails.length > 0) {
      const idx = new Date().getDate() % easyTrails.length;
      return { trail: easyTrails[idx], reasonKey: "winterWalk" };
    }
  }

  const shortTrails = trails.filter((t) => t.difficulty === "easy");
  const idx = new Date().getDate() % shortTrails.length;
  return { trail: shortTrails[idx], reasonKey: "quickWalk" };
}

const seasonIcons = {
  spring: Flower2,
  summer: Sun,
  fall: Sparkles,
  winter: Snowflake,
};

const seasonColors = {
  spring: "from-pink-50 to-green-50 dark:from-pink-950/20 dark:to-green-950/20",
  summer: "from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20",
  fall: "from-amber-50 to-red-50 dark:from-amber-950/20 dark:to-red-950/20",
  winter: "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
};

export default function TodaysPick() {
  const t = useTranslations("todaysPick");
  const locale = useLocale();
  const { season, isWeekend } = getSeasonAndDay();
  const defaultPick = useMemo(() => getRecommendation(season, isWeekend), [season, isWeekend]);
  const [pick, setPick] = useState(defaultPick);

  const randomize = () => {
    const idx = Math.floor(Math.random() * trails.length);
    setPick({ trail: trails[idx], reasonKey: "quickWalk" });
  };

  const SeasonIcon = seasonIcons[season];
  const trail = pick.trail;
  const description = locale === "zh" ? trail.description.zh : trail.description.en;

  return (
    <section className={`bg-gradient-to-br ${seasonColors[season]}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <SeasonIcon className="w-5 h-5 text-amber-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("title")}</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">{t(pick.reasonKey)}</span>
          </div>
          <button
            onClick={randomize}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-amber-300 hover:text-amber-600 transition-colors shadow-sm"
          >
            <Dice5 className="w-4 h-4" />
            {t("random")}
          </button>
        </div>

        <Link
          href={`/trails/${trail.slug}`}
          className="group block rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-lg hover:border-amber-200 dark:hover:border-amber-600 transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center p-8">
              <span className="text-7xl">
                {trail.features.includes("beach") ? "🏖️" : trail.features.includes("forest") ? "🌲" : trail.features.includes("lake") ? "🏞️" : "🐕"}
              </span>
            </div>
            <div className="flex-1 p-6 md:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {trail.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {trail.city}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{trail.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mt-3 line-clamp-2">{description}</p>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    trail.leash === "off-leash"
                      ? "bg-green-100 text-green-700"
                      : trail.leash === "on-leash"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {trail.leash === "off-leash" ? "Off-Leash" : trail.leash === "on-leash" ? "On-Leash" : "Mixed"}
                </span>
                <span className="text-sm text-gray-500">{trail.distance}</span>
                <span className="text-sm text-gray-500 capitalize">{trail.difficulty}</span>
                <span className="text-sm text-gray-500">{trail.ground}</span>
              </div>

              <div className="mt-4 text-sm text-amber-600 font-medium group-hover:text-amber-500">
                {t("viewDetails")} &rarr;
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
