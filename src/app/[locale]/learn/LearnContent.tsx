"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GraduationCap, BookOpen, UtensilsCrossed, Heart, Dumbbell, ExternalLink, ShieldCheck, Calculator, ShieldAlert, Backpack, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Article {
  icon: LucideIcon;
  categoryKey: string;
  titleKey: string;
  descKey: string;
  color: string;
  links: { labelKey: string; url: string }[];
}

const articles: Article[] = [
  {
    icon: UtensilsCrossed,
    categoryKey: "nutrition",
    titleKey: "rawFeedingTitle",
    descKey: "rawFeedingDesc",
    color: "amber",
    links: [
      { labelKey: "balanceIT", url: "https://balance.it/recipes" },
      { labelKey: "rawFeedingGuide", url: "https://www.dealmoon.com/guide/926765" },
    ],
  },
  {
    icon: UtensilsCrossed,
    categoryKey: "recipes",
    titleKey: "homemadeTitle",
    descKey: "homemadeDesc",
    color: "orange",
    links: [
      { labelKey: "vetApproved", url: "https://basepaws.com/dog-insider/vet-approved-homemade-dog-food-recipes" },
      { labelKey: "akcIngredients", url: "https://www.akc.org/expert-advice/nutrition/choosing-ingredients-homemade-dog-food/" },
    ],
  },
  {
    icon: Dumbbell,
    categoryKey: "training",
    titleKey: "offLeashTitle",
    descKey: "offLeashDesc",
    color: "blue",
    links: [],
  },
  {
    icon: Heart,
    categoryKey: "health",
    titleKey: "toxicFoodsTitle",
    descKey: "toxicFoodsDesc",
    color: "red",
    links: [
      { labelKey: "aspcaList", url: "https://www.aspca.org/pet-care/animal-poison-control/people-foods-avoid-feeding-your-pets" },
    ],
  },
  {
    icon: BookOpen,
    categoryKey: "guide",
    titleKey: "newOwnerTitle",
    descKey: "newOwnerDesc",
    color: "green",
    links: [],
  },
  {
    icon: Heart,
    categoryKey: "health",
    titleKey: "calciumTitle",
    descKey: "calciumDesc",
    color: "purple",
    links: [
      { labelKey: "balanceITSupp", url: "https://balance.it/" },
    ],
  },
];

const colorMap: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  amber: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-100", icon: "text-amber-600" },
  orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-100", icon: "text-orange-600" },
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100", icon: "text-blue-600" },
  red: { bg: "bg-red-50", text: "text-red-700", border: "border-red-100", icon: "text-red-600" },
  green: { bg: "bg-green-50", text: "text-green-700", border: "border-green-100", icon: "text-green-600" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-100", icon: "text-purple-600" },
};

const tools = [
  { href: "/tools/food-safety" as const, icon: ShieldCheck, color: "bg-green-50 dark:bg-green-900/20", iconColor: "text-green-600 dark:text-green-400", ns: "foodSafety" },
  { href: "/tools/food-calculator" as const, icon: Calculator, color: "bg-amber-50 dark:bg-amber-900/20", iconColor: "text-amber-600 dark:text-amber-400", ns: "foodCalculator" },
  { href: "/tools/emergency-card" as const, icon: ShieldAlert, color: "bg-red-50 dark:bg-red-900/20", iconColor: "text-red-600 dark:text-red-400", ns: "emergencyCard" },
  { href: "/tools/hiking-checklist" as const, icon: Backpack, color: "bg-emerald-50 dark:bg-emerald-900/20", iconColor: "text-emerald-600 dark:text-emerald-400", ns: "hikingChecklist" },
];

export default function LearnContent() {
  const t = useTranslations("learn");
  const tc = useTranslations("categories.learn");

  return (
    <div>
      <section className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{tc("title")}</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">{tc("description")}</p>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t("toolsSection")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.ns} tool={tool} />
          ))}
        </div>
      </section>

      {/* Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => {
            const colors = colorMap[article.color];
            const Icon = article.icon;
            return (
              <div
                key={article.titleKey}
                className="group rounded-2xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 rounded-lg ${colors.bg}`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} ${colors.border} border font-medium`}>
                    {t(article.categoryKey)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t(article.titleKey)}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{t(article.descKey)}</p>
                {article.links.length > 0 && (
                  <div className="space-y-1.5">
                    {article.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 text-sm ${colors.text} hover:underline`}
                      >
                        <ExternalLink className="w-3 h-3" />
                        {t(link.labelKey)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function ToolCard({ tool }: { tool: (typeof tools)[number] }) {
  const t = useTranslations(tool.ns);
  const Icon = tool.icon;
  return (
    <Link
      href={tool.href}
      className={`group flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 ${tool.color} hover:shadow-md transition-all`}
    >
      <Icon className={`w-8 h-8 ${tool.iconColor} flex-shrink-0`} />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{t("title")}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{t("subtitle")}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 flex-shrink-0" />
    </Link>
  );
}
