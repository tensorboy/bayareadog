"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Calculator, ChevronRight, Beef, Bone, Heart, Carrot, Info } from "lucide-react";

type ActivityLevel = "low" | "normal" | "high";

function calculate(weightLbs: number, activity: ActivityLevel) {
  const weightKg = weightLbs * 0.4536;
  const pctMap = { low: 0.02, normal: 0.025, high: 0.03 };
  const dailyKg = weightKg * pctMap[activity];
  const dailyG = Math.round(dailyKg * 1000);

  return {
    totalG: dailyG,
    muscleMeatG: Math.round(dailyG * 0.8),
    boneG: Math.round(dailyG * 0.1),
    organG: Math.round(dailyG * 0.05),
    liverG: Math.round(dailyG * 0.05),
    veggieG: Math.round(dailyG * 0.1),
    weeklyLbs: Math.round((dailyG * 7 / 453.6) * 10) / 10,
    monthlyCost: {
      budget: Math.round(dailyG * 30 * 0.004),
      standard: Math.round(dailyG * 30 * 0.008),
      premium: Math.round(dailyG * 30 * 0.014),
    },
  };
}

export default function FoodCalculatorContent() {
  const t = useTranslations("foodCalculator");
  const [weight, setWeight] = useState(50);
  const [activity, setActivity] = useState<ActivityLevel>("normal");

  const result = calculate(weight, activity);

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
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{t("title")}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">{t("subtitle")}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("weightLabel")}</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={5}
                  max={200}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="flex-1 accent-amber-500"
                />
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{weight}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">lbs</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{Math.round(weight * 0.4536)} kg</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("activityLabel")}</label>
              <div className="grid grid-cols-3 gap-2">
                {(["low", "normal", "high"] as ActivityLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setActivity(level)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors border ${
                      activity === level
                        ? "bg-amber-500 text-white border-amber-500"
                        : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:border-amber-300"
                    }`}
                  >
                    {t(`activity_${level}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Info box */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700 dark:text-blue-300">{t("infoNote")}</p>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t("dailyAmount")}</h2>
            <div className="text-center p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800">
              <div className="text-4xl font-bold text-amber-600">{result.totalG}g</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t("perDay")} ({result.weeklyLbs} lbs/{t("perWeek")})</div>
            </div>

            <div className="space-y-2">
              <ResultRow icon={Beef} label={t("muscleMeat")} value={`${result.muscleMeatG}g`} pct="80%" color="text-red-500" />
              <ResultRow icon={Bone} label={t("rawBone")} value={`${result.boneG}g`} pct="10%" color="text-gray-500" />
              <ResultRow icon={Heart} label={t("organ")} value={`${result.organG}g`} pct="5%" color="text-purple-500" />
              <ResultRow icon={Heart} label={t("liver")} value={`${result.liverG}g`} pct="5%" color="text-pink-500" />
              <ResultRow icon={Carrot} label={t("veggies")} value={`${result.veggieG}g`} pct="~10%" color="text-green-500" />
            </div>

            <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-6">{t("estimatedCost")}</h2>
            <div className="grid grid-cols-3 gap-3">
              <CostCard label={t("budgetPlan")} cost={result.monthlyCost.budget} desc={t("budgetDesc")} />
              <CostCard label={t("standardPlan")} cost={result.monthlyCost.standard} desc={t("standardDesc")} />
              <CostCard label={t("premiumPlan")} cost={result.monthlyCost.premium} desc={t("premiumDesc")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultRow({ icon: Icon, label, value, pct, color }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; pct: string; color: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
      <Icon className={`w-5 h-5 ${color} flex-shrink-0`} />
      <div className="flex-1">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">({pct})</span>
      </div>
      <span className="text-sm font-bold text-gray-900 dark:text-white">{value}</span>
    </div>
  );
}

function CostCard({ label, cost, desc }: { label: string; cost: number; desc: string }) {
  return (
    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 text-center">
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</div>
      <div className="text-lg font-bold text-gray-900 dark:text-white mt-1">${cost}</div>
      <div className="text-xs text-gray-400 dark:text-gray-500">/mo</div>
      <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{desc}</div>
    </div>
  );
}
