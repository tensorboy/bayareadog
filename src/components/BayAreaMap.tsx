"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { trails } from "@/data/trails";
import { rawFoodShops } from "@/data/rawfood";
import { restaurants } from "@/data/restaurants";

type MapCategory = "all" | "trails-off" | "trails-on" | "restaurants" | "rawfood";

interface MapPin {
  lat: number;
  lng: number;
  name: string;
  type: string;
  color: string;
  href: string;
  detail: string;
}

function getAllPins(): MapPin[] {
  const pins: MapPin[] = [];

  for (const t of trails) {
    pins.push({
      lat: t.lat,
      lng: t.lng,
      name: t.name,
      type: t.leash === "off-leash" ? "Off-Leash" : t.leash === "on-leash" ? "On-Leash" : "Mixed",
      color: t.leash === "off-leash" ? "#22c55e" : t.leash === "on-leash" ? "#eab308" : "#3b82f6",
      href: `/trails/${t.slug}`,
      detail: `${t.city} | ${t.difficulty} | ${t.distance}`,
    });
  }

  for (const r of restaurants) {
    pins.push({
      lat: r.lat,
      lng: r.lng,
      name: r.name,
      type: "Restaurant",
      color: "#f97316",
      href: `/eat`,
      detail: `${r.city} | ${r.priceRange}`,
    });
  }

  for (const s of rawFoodShops) {
    pins.push({
      lat: s.lat,
      lng: s.lng,
      name: s.name,
      type: "Raw Food",
      color: "#ef4444",
      href: `/eat`,
      detail: s.city,
    });
  }

  return pins;
}

export default function BayAreaMap() {
  const t = useTranslations("map");
  const [filter, setFilter] = useState<MapCategory>("all");
  const [MapComponent, setMapComponent] = useState<React.ComponentType<{
    pins: MapPin[];
  }> | null>(null);

  const filterOptions: { key: MapCategory; labelKey: string; color: string }[] = [
    { key: "all", labelKey: "all", color: "#6b7280" },
    { key: "trails-off", labelKey: "offLeash", color: "#22c55e" },
    { key: "trails-on", labelKey: "onLeash", color: "#eab308" },
    { key: "restaurants", labelKey: "restaurants", color: "#f97316" },
    { key: "rawfood", labelKey: "rawFood", color: "#ef4444" },
  ];

  useEffect(() => {
    import("./MapInner").then((mod) => {
      setMapComponent(() => mod.default);
    });
  }, []);

  const allPins = getAllPins();
  const filteredPins = allPins.filter((pin) => {
    if (filter === "all") return true;
    if (filter === "trails-off") return pin.type === "Off-Leash";
    if (filter === "trails-on") return pin.type === "On-Leash" || pin.type === "Mixed";
    if (filter === "restaurants") return pin.type === "Restaurant";
    if (filter === "rawfood") return pin.type === "Raw Food";
    return true;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("title")}</h2>
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setFilter(opt.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === opt.key
                  ? "text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={filter === opt.key ? { backgroundColor: opt.color } : undefined}
            >
              {t(opt.labelKey)}
              {opt.key !== "all" && (
                <span className="ml-1.5 opacity-80">
                  {allPins.filter((p) => {
                    if (opt.key === "trails-off") return p.type === "Off-Leash";
                    if (opt.key === "trails-on") return p.type === "On-Leash" || p.type === "Mixed";
                    if (opt.key === "restaurants") return p.type === "Restaurant";
                    if (opt.key === "rawfood") return p.type === "Raw Food";
                    return false;
                  }).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm" style={{ height: "500px" }}>
        {MapComponent ? (
          <MapComponent pins={filteredPins} />
        ) : (
          <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
            {t("loading")}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-green-500" /> {t("offLeash")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-yellow-500" /> {t("onLeash")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-orange-500" /> {t("legendRestaurant")}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500" /> {t("legendRawFood")}
        </span>
      </div>
    </section>
  );
}
