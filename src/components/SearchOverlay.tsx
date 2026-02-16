"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { trails } from "@/data/trails";
import { restaurants } from "@/data/restaurants";
import { foodSafety } from "@/data/foodSafety";
import { Search, X, Mountain, UtensilsCrossed, ShieldCheck } from "lucide-react";

interface SearchResult {
  type: "trail" | "restaurant" | "food";
  name: string;
  subtitle: string;
  href: string;
}

function buildIndex(locale: string): SearchResult[] {
  const results: SearchResult[] = [];

  for (const trail of trails) {
    results.push({
      type: "trail",
      name: trail.name,
      subtitle: `${trail.city} · ${trail.leash} · ${trail.difficulty}`,
      href: `/trails/${trail.slug}`,
    });
  }

  for (const rest of restaurants) {
    results.push({
      type: "restaurant",
      name: rest.name,
      subtitle: `${rest.city} · ${rest.priceRange}${rest.dogMenu ? " · Dog Menu" : ""}`,
      href: `/eat`,
    });
  }

  for (const food of foodSafety) {
    const name = locale === "zh" ? `${food.name} (${food.nameZh})` : food.name;
    const note = locale === "zh" ? food.noteZh : food.note;
    results.push({
      type: "food",
      name,
      subtitle: `${food.safe === "yes" ? "Safe" : food.safe === "no" ? "Dangerous" : "Caution"} · ${note.slice(0, 60)}`,
      href: `/tools/food-safety`,
    });
  }

  return results;
}

const iconMap = {
  trail: Mountain,
  restaurant: UtensilsCrossed,
  food: ShieldCheck,
};

const colorMap = {
  trail: "text-green-600 dark:text-green-400",
  restaurant: "text-orange-600 dark:text-orange-400",
  food: "text-blue-600 dark:text-blue-400",
};

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("search");
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(() => buildIndex(locale), [locale]);

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return index
      .filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.subtitle.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [query, index]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-32">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl mx-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("placeholder")}
            className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none text-lg"
          />
          <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {query.length < 2 && (
            <div className="p-6 text-center text-sm text-gray-400 dark:text-gray-500">
              {t("hint")}
            </div>
          )}

          {query.length >= 2 && results.length === 0 && (
            <div className="p-6 text-center text-sm text-gray-400 dark:text-gray-500">
              {t("noResults")}
            </div>
          )}

          {results.map((r, i) => {
            const Icon = iconMap[r.type];
            return (
              <Link
                key={`${r.type}-${i}`}
                href={r.href as "/trails" | "/eat" | "/tools/food-safety"}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${colorMap[r.type]}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{r.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{r.subtitle}</div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2 bg-gray-50 dark:bg-slate-800/50 text-xs text-gray-400 dark:text-gray-500 flex items-center justify-between">
          <span>{t("escHint")}</span>
        </div>
      </div>
    </div>
  );
}
