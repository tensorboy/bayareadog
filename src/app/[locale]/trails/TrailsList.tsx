"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Star, ExternalLink, Filter, Mountain } from "lucide-react";

interface Trail {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  leash: "on-leash" | "off-leash";
  difficulty: "easy" | "moderate" | "hard";
  distance: string;
  rating: number;
  description: string;
  descriptionZh: string;
  tags: string[];
  website: string;
}

export default function TrailsList({ trails }: { trails: Trail[] }) {
  const t = useTranslations("categories.trails");
  const locale = useLocale();
  const [filter, setFilter] = useState<"all" | "on-leash" | "off-leash">("all");

  const filtered = trails.filter((trail) => filter === "all" || trail.leash === filter);

  return (
    <div>
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Mountain className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{t("title")}</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">{t("description")}</p>

          <div className="mt-8 flex gap-2">
            {(["all", "off-leash", "on-leash"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"
                }`}
              >
                <Filter className="w-3.5 h-3.5 inline mr-1" />
                {f === "all" ? "All" : f === "off-leash" ? "Off-Leash" : "On-Leash"}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 rounded-2xl overflow-hidden border border-gray-200 h-[300px] bg-gray-100">
          <iframe
            src={`https://www.google.com/maps/d/embed?mid=1&z=9&ll=37.7749,-122.4194`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            title="Bay Area Dog Trails Map"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((trail) => (
            <div
              key={trail.id}
              className="group rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg hover:border-green-200 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                      {trail.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {trail.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{trail.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {locale === "zh" ? trail.descriptionZh : trail.description}
                </p>

                <div className="flex items-center gap-3 mb-4 text-sm">
                  <span
                    className={`px-2.5 py-1 rounded-full font-medium ${
                      trail.leash === "off-leash"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-amber-100 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {trail.leash === "off-leash" ? "Off-Leash" : "On-Leash"}
                  </span>
                  <span className="text-gray-500">{trail.distance}</span>
                  <span className="text-gray-500 capitalize">{trail.difficulty}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {trail.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={trail.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-500 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
