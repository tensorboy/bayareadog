"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Trail } from "@/data/trails";
import {
  MapPin,
  Star,
  ArrowLeft,
  ExternalLink,
  Car,
  Droplets,
  AlertTriangle,
  Clock,
  Footprints,
  Camera,
  UtensilsCrossed,
  Stethoscope,
  Mountain,
  ChevronRight,
} from "lucide-react";

const leashBadge = {
  "off-leash": { bg: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" },
  "on-leash": { bg: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800" },
  mixed: { bg: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800" },
};

const difficultyColors = {
  easy: "text-green-600 dark:text-green-400",
  moderate: "text-yellow-600 dark:text-yellow-400",
  hard: "text-red-600 dark:text-red-400",
};

const featureEmoji: Record<string, string> = {
  beach: "\u{1F3D6}\u{FE0F}",
  forest: "\u{1F332}",
  waterfront: "\u{1F30A}",
  hills: "\u{26F0}\u{FE0F}",
  lake: "\u{1F3DE}\u{FE0F}",
  urban: "\u{1F3D9}\u{FE0F}",
  cliffs: "\u{1FAA8}",
};

const leashLabels: Record<string, string> = {
  "off-leash": "Off-Leash",
  "on-leash": "On-Leash",
  mixed: "Mixed",
};

export default function TrailDetail({ trail }: { trail: Trail }) {
  const locale = useLocale();
  const t = useTranslations("trailDetail");
  const description = locale === "zh" ? trail.description.zh : trail.description.en;
  const badge = leashBadge[trail.leash];

  const sizeLabels: Record<string, string> = {
    large: t("largeDogs"),
    small: t("smallDogs"),
    senior: t("seniorDogs"),
    puppy: t("puppies"),
    "water-lover": t("waterDogs"),
    shy: t("shyDogs"),
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400">{t("home")}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/trails" className="hover:text-amber-600 dark:hover:text-amber-400">{t("trails")}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 dark:text-white font-medium">{trail.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link
            href="/trails"
            className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToTrails")}
          </Link>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{trail.name}</h1>
              <div className="flex items-center gap-2 mt-2 text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{trail.city}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${badge.bg}`}>
                {leashLabels[trail.leash]}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-lg font-bold">{trail.rating}</span>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
              <Mountain className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm">
                <span className={`font-medium capitalize ${difficultyColors[trail.difficulty]}`}>
                  {trail.difficulty}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
              <Footprints className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium dark:text-gray-200">{trail.distance}</span>
            </div>
            {trail.elevation && (
              <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
                <span className="text-sm font-medium dark:text-gray-200">{"\u2191"} {trail.elevation}</span>
              </div>
            )}
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
              <span className="text-sm dark:text-gray-200">{trail.ground}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t("aboutTrail")}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t("features")}</h2>
              <div className="flex flex-wrap gap-2">
                {trail.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm border border-green-100 dark:border-green-800"
                  >
                    {featureEmoji[f] || ""} {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Suitable for */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t("bestFor")}</h2>
              <div className="flex flex-wrap gap-2">
                {trail.suitableFor.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm border border-amber-100 dark:border-amber-800"
                  >
                    {"\u{1F415}"} {sizeLabels[s] || s}
                  </span>
                ))}
              </div>
            </div>

            {/* Map embed */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t("location")}</h2>
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 h-[300px]">
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${trail.lng - 0.02},${trail.lat - 0.015},${trail.lng + 0.02},${trail.lat + 0.015}&layer=mapnik&marker=${trail.lat},${trail.lng}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title={`Map of ${trail.name}`}
                />
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${trail.lat},${trail.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-sm text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 font-medium"
              >
                <MapPin className="w-4 h-4" />
                {t("getDirections")}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info cards */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
              <h3 className="px-5 py-3 bg-gray-50 dark:bg-slate-700/50 border-b border-gray-100 dark:border-slate-600 font-semibold text-gray-900 dark:text-white text-sm">
                {t("trailInfo")}
              </h3>
              <div className="divide-y divide-gray-50 dark:divide-slate-700">
                <InfoRow icon={Car} label={t("parking")} value={trail.parking} />
                <InfoRow icon={Droplets} label={t("water")} value={trail.water} />
                <InfoRow icon={AlertTriangle} label={t("tips")} value={trail.tips} />
                <InfoRow icon={Clock} label={t("bestTime")} value={trail.bestTime} />
                {trail.photoSpot && (
                  <InfoRow icon={Camera} label={t("photoSpot")} value={trail.photoSpot} />
                )}
              </div>
            </div>

            {/* Nearby */}
            {(trail.nearbyFood || trail.nearbyVet) && (
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
                <h3 className="px-5 py-3 bg-gray-50 dark:bg-slate-700/50 border-b border-gray-100 dark:border-slate-600 font-semibold text-gray-900 dark:text-white text-sm">
                  {t("nearby")}
                </h3>
                <div className="divide-y divide-gray-50 dark:divide-slate-700">
                  {trail.nearbyFood && (
                    <InfoRow icon={UtensilsCrossed} label={t("food")} value={trail.nearbyFood} />
                  )}
                  {trail.nearbyVet && (
                    <InfoRow icon={Stethoscope} label={t("vet")} value={trail.nearbyVet} />
                  )}
                </div>
              </div>
            )}

            {/* Website link */}
            {trail.website && (
              <a
                href={trail.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-500 transition-colors"
              >
                {t("officialWebsite")}
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="px-5 py-3">
      <div className="flex items-start gap-3">
        <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
        <div>
          <div className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">{label}</div>
          <div className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">{value}</div>
        </div>
      </div>
    </div>
  );
}
