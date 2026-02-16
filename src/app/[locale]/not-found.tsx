import { Dog } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Dog className="w-24 h-24 text-amber-400" />
            <span className="absolute -bottom-2 -right-2 text-4xl">?</span>
          </div>
        </div>
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          {t("title")}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">{t("description")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors"
          >
            {t("goHome")}
          </Link>
          <Link
            href="/trails"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-medium hover:border-amber-300 hover:text-amber-600 transition-colors"
          >
            {t("exploreTrails")}
          </Link>
        </div>
      </div>
    </div>
  );
}
