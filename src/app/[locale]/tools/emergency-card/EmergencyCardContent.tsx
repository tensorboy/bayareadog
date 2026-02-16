"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { emergencyVets } from "@/data/emergencyVets";
import {
  ChevronRight,
  Phone,
  MapPin,
  Clock,
  ExternalLink,
  AlertTriangle,
  ShieldAlert,
  Printer,
  Heart,
} from "lucide-react";

const ASPCA_PHONE = "(888) 426-4435";

const areas = ["All", "San Francisco", "North Bay", "East Bay", "South Bay"];

export default function EmergencyCardContent() {
  const t = useTranslations("emergencyCard");
  const [areaFilter, setAreaFilter] = useState("All");

  const filtered =
    areaFilter === "All"
      ? emergencyVets
      : emergencyVets.filter((v) => v.area === areaFilter);

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
      <section className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="w-8 h-8 text-red-600 dark:text-red-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">{t("subtitle")}</p>
          <button
            onClick={() => window.print()}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-colors print:hidden"
          >
            <Printer className="w-4 h-4" />
            {t("printCard")}
          </button>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* ASPCA Hotline - big CTA */}
        <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border-2 border-red-300 dark:border-red-800 text-center">
          <Phone className="w-10 h-10 text-red-600 dark:text-red-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-red-700 dark:text-red-400">{t("poisonControl")}</h2>
          <a
            href="tel:+18884264435"
            className="block text-3xl font-bold text-red-600 dark:text-red-300 mt-2 hover:underline"
          >
            {ASPCA_PHONE}
          </a>
          <p className="text-sm text-red-500 dark:text-red-400 mt-2">{t("poisonNote")}</p>
        </div>

        {/* Common Poisoning Symptoms */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            {t("symptomsTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "vomiting",
              "diarrhea",
              "drooling",
              "lethargy",
              "seizures",
              "breathing",
              "collapse",
              "pawing",
            ].map((key) => (
              <div
                key={key}
                className="flex items-center gap-3 px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800"
              >
                <span className="text-yellow-600 dark:text-yellow-400 text-lg">&#9888;</span>
                <span className="text-sm text-gray-800 dark:text-gray-200">{t(`symptom_${key}`)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* First Aid Steps */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-500" />
            {t("firstAidTitle")}
          </h2>
          <ol className="space-y-3">
            {["step1", "step2", "step3", "step4", "step5"].map((key, i) => (
              <li
                key={key}
                className="flex items-start gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700"
              >
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-sm font-bold">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">{t(`firstAid_${key}`)}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* 24-Hour Emergency Vets */}
        <section className="print:break-before-page">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t("emergencyVets")}</h2>

          {/* Area filter */}
          <div className="flex gap-2 flex-wrap mb-6 print:hidden">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() => setAreaFilter(area)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  areaFilter === area
                    ? "bg-red-600 text-white"
                    : "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:border-red-300"
                }`}
              >
                {area === "All" ? t("allAreas") : area}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map((vet) => (
              <div
                key={vet.name}
                className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{vet.name}</h3>
                  <span className="flex-shrink-0 px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-medium rounded-full">
                    {vet.hours}
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{vet.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                    <a href={`tel:${vet.phone.replace(/[^\d+]/g, "")}`} className="text-red-600 dark:text-red-400 font-medium hover:underline">
                      {vet.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{vet.area}</span>
                  </div>
                </div>
                <a
                  href={vet.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-sm text-amber-600 dark:text-amber-400 hover:underline print:hidden"
                >
                  {t("visitWebsite")} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
