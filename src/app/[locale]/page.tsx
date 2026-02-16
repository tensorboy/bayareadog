import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Mountain, UtensilsCrossed, PawPrint, ShoppingBag, GraduationCap } from "lucide-react";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import PlaceCard from "@/components/PlaceCard";
import Newsletter from "@/components/Newsletter";

const categories = [
  { href: "/trails", icon: Mountain, gradient: "bg-gradient-to-br from-green-500 to-emerald-600", key: "trails" },
  { href: "/eat", icon: UtensilsCrossed, gradient: "bg-gradient-to-br from-orange-500 to-red-500", key: "eat" },
  { href: "/play", icon: PawPrint, gradient: "bg-gradient-to-br from-blue-500 to-cyan-500", key: "play" },
  { href: "/shop", icon: ShoppingBag, gradient: "bg-gradient-to-br from-purple-500 to-pink-500", key: "shop" },
  { href: "/learn", icon: GraduationCap, gradient: "bg-gradient-to-br from-amber-500 to-yellow-500", key: "learn" },
] as const;

const placeKeys = ["fort_funston", "point_isabel", "lazy_dog", "marin_raw"] as const;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations();

  return (
    <>
      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.key}
              href={cat.href}
              icon={cat.icon}
              title={t(`categories.${cat.key}.title`)}
              description={t(`categories.${cat.key}.description`)}
              cta={t(`categories.${cat.key}.cta`)}
              gradient={cat.gradient}
            />
          ))}
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {t("featured.title")}
            </h2>
            <button className="text-sm font-medium text-amber-600 hover:text-amber-500">
              {t("featured.view_all")} &rarr;
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {placeKeys.map((key) => (
              <PlaceCard
                key={key}
                name={t(`places.${key}.name`)}
                location={t(`places.${key}.location`)}
                description={t(`places.${key}.description`)}
                tags={t(`places.${key}.tags`)}
              />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
