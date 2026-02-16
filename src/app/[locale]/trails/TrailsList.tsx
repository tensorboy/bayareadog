"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { trails, regionNames, type Region, type LeashStatus, type Difficulty } from "@/data/trails";
import { MapPin, Star, Mountain, ChevronDown, ArrowUpDown } from "lucide-react";

type LeashFilter = "all" | LeashStatus;
type RegionFilter = "all" | Region;
type DifficultyFilter = "all" | Difficulty;
type SortOption = "rating" | "name" | "difficulty";

const difficultyOrder: Record<string, number> = { easy: 0, moderate: 1, hard: 2 };

export default function TrailsList() {
  const t = useTranslations("categories.trails");
  const tf = useTranslations("trailFilters");
  const locale = useLocale();
  const [leash, setLeash] = useState<LeashFilter>("all");
  const [region, setRegion] = useState<RegionFilter>("all");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [sort, setSort] = useState<SortOption>("rating");

  const filtered = trails
    .filter((trail) => {
      if (leash !== "all" && trail.leash !== leash) return false;
      if (region !== "all" && trail.region !== region) return false;
      if (difficulty !== "all" && trail.difficulty !== difficulty) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sort) {
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        case "difficulty":
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return 0;
      }
    });

  return (
    <div>
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Mountain className="w-8 h-8 text-green-600 dark:text-green-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">{t("description")}</p>

          {/* Filters */}
          <div className="mt-8 flex flex-wrap gap-3">
            {/* Leash filter */}
            <div className="flex gap-1.5">
              {([
                { key: "all", labelKey: "all" },
                { key: "off-leash", labelKey: "offLeash" },
                { key: "on-leash", labelKey: "onLeash" },
                { key: "mixed", labelKey: "mixed" },
              ] as const).map((f) => (
                <button
                  key={f.key}
                  onClick={() => setLeash(f.key)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    leash === f.key
                      ? f.key === "off-leash"
                        ? "bg-green-600 text-white"
                        : f.key === "on-leash"
                        ? "bg-yellow-500 text-white"
                        : f.key === "mixed"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-800 text-white"
                      : "bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:border-green-300"
                  }`}
                >
                  {tf(f.labelKey)}
                </button>
              ))}
            </div>

            {/* Region filter */}
            <div className="relative">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as RegionFilter)}
                className="appearance-none pl-3 pr-8 py-1.5 rounded-full text-sm font-medium bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-200 cursor-pointer"
              >
                <option value="all">{tf("allAreas")}</option>
                {Object.entries(regionNames).map(([key, names]) => (
                  <option key={key} value={key}>
                    {locale === "zh" ? names.zh : names.en}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>

            {/* Difficulty filter */}
            <div className="flex gap-1.5">
              {([
                { key: "all", labelKey: "anyDifficulty" },
                { key: "easy", labelKey: "easy" },
                { key: "moderate", labelKey: "moderate" },
                { key: "hard", labelKey: "hard" },
              ] as const).map((f) => (
                <button
                  key={f.key}
                  onClick={() => setDifficulty(f.key)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    difficulty === f.key
                      ? "bg-green-600 text-white"
                      : "bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:border-green-300"
                  }`}
                >
                  {tf(f.labelKey)}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="appearance-none pl-2 pr-7 py-1.5 rounded-full text-sm font-medium bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600 hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-200 cursor-pointer"
              >
                <option value="rating">{tf("sortRating")}</option>
                <option value="name">{tf("sortName")}</option>
                <option value="difficulty">{tf("sortDifficulty")}</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {tf("showing", { count: filtered.length, total: trails.length })}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((trail) => (
            <Link
              key={trail.slug}
              href={`/trails/${trail.slug}`}
              className="group rounded-2xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden hover:shadow-lg hover:border-green-200 dark:hover:border-green-600 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
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

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {locale === "zh" ? trail.description.zh : trail.description.en}
                </p>

                <div className="flex items-center gap-3 mb-4 text-sm">
                  <span
                    className={`px-2.5 py-1 rounded-full font-medium border ${
                      trail.leash === "off-leash"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : trail.leash === "on-leash"
                        ? "bg-amber-100 text-amber-700 border-amber-200"
                        : "bg-blue-100 text-blue-700 border-blue-200"
                    }`}
                  >
                    {trail.leash === "off-leash" ? tf("offLeash") : trail.leash === "on-leash" ? tf("onLeash") : tf("mixed")}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">{trail.distance}</span>
                  <span className="text-gray-500 dark:text-gray-400 capitalize">{trail.difficulty}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {trail.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs px-2 py-0.5 rounded-full bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-slate-600 capitalize"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Mountain className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p className="text-lg font-medium">{tf("noResults")}</p>
            <p className="text-sm mt-1">{tf("noResultsHint")}</p>
          </div>
        )}
      </section>
    </div>
  );
}
