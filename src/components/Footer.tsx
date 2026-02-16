import { useTranslations } from "next-intl";
import { Dog } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" aria-label="Site footer" className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Dog className="w-6 h-6 text-amber-500" />
              <span className="text-lg font-bold text-white">
                Bay Area <span className="text-amber-500">Dog</span>
              </span>
            </div>
            <p className="text-sm max-w-xs">{t("tagline")}</p>
          </div>

          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-amber-400 transition-colors">{t("about")}</a>
            <a href="#" className="hover:text-amber-400 transition-colors">{t("contact")}</a>
            <a href="#" className="hover:text-amber-400 transition-colors">{t("privacy")}</a>
            <a href="#" className="hover:text-amber-400 transition-colors">{t("terms")}</a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs">
          &copy; {year} {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
