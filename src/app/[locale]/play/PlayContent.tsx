"use client";

import { useTranslations, useLocale } from "next-intl";
import { PawPrint, MapPin, Star, ExternalLink } from "lucide-react";

interface DogPark {
  name: string;
  city: string;
  rating: number;
  description: { en: string; zh: string };
  tags: string[];
  website: string;
  fenced: boolean;
  separateAreas: boolean;
}

const dogParks: DogPark[] = [
  {
    name: "Point Isabel Dog Park",
    city: "Richmond",
    rating: 4.7,
    description: {
      en: "Bay Area's largest off-leash dog park. Waterfront trails, dog wash station, and Mudpuppy's cafe nearby. Over 23 acres of open space.",
      zh: "湾区最大的放绳狗公园。海滨步道、洗狗站，附近有Mudpuppy's咖啡馆。超过23英亩的开放空间。",
    },
    tags: ["Off-leash", "Waterfront", "Dog Wash"],
    website: "https://www.ebparks.org/parks/point-isabel",
    fenced: false,
    separateAreas: false,
  },
  {
    name: "Golden Gate Park Dog Play Areas",
    city: "San Francisco",
    rating: 4.5,
    description: {
      en: "Multiple designated off-leash areas within the park. Great for socializing and training. Beautiful scenery year-round.",
      zh: "公园内多个指定的放绳区域。非常适合社交和训练。全年美丽的景色。",
    },
    tags: ["Off-leash", "Multiple Areas", "Urban"],
    website: "https://sfrecpark.org/facilities/dog-play-areas",
    fenced: false,
    separateAreas: true,
  },
  {
    name: "Dolores Park",
    city: "San Francisco",
    rating: 4.4,
    description: {
      en: "Iconic SF park with off-leash areas in the south end. Amazing city views, great for people-watching too. Very social atmosphere.",
      zh: "旧金山标志性公园，南端有放绳区域。惊人的城市景观，也很适合看人。非常社交的氛围。",
    },
    tags: ["Off-leash", "Views", "Social"],
    website: "#",
    fenced: false,
    separateAreas: false,
  },
  {
    name: "Carmel Beach",
    city: "Carmel-by-the-Sea",
    rating: 4.9,
    description: {
      en: "One of the most dog-friendly beaches in California. Off-leash, white sand, stunning coastline. Worth the 2-hour drive from the Bay Area.",
      zh: "加州最狗友好的海滩之一。放绳、白沙、令人惊叹的海岸线。从湾区开车2小时值得一去。",
    },
    tags: ["Off-leash", "Beach", "Day Trip"],
    website: "https://ci.carmel.ca.us/post/beaches",
    fenced: false,
    separateAreas: false,
  },
  {
    name: "Berkeley Marina Dog Park",
    city: "Berkeley",
    rating: 4.3,
    description: {
      en: "Large open space at the marina with bay views. Off-leash, great for fetch and running. Windy but beautiful on clear days.",
      zh: "码头的大片开放空间，有海湾景色。放绳，非常适合捡球和跑步。晴天时风大但美丽。",
    },
    tags: ["Off-leash", "Open Space", "Marina"],
    website: "#",
    fenced: false,
    separateAreas: false,
  },
  {
    name: "Montclair Dog Park",
    city: "Oakland",
    rating: 4.2,
    description: {
      en: "Well-maintained neighborhood dog park with separate areas for small and large dogs. Good shade and benches for owners.",
      zh: "维护良好的社区狗公园，有小型犬和大型犬的分区。为主人提供良好的遮阳和长椅。",
    },
    tags: ["Fenced", "Separated Areas", "Neighborhood"],
    website: "#",
    fenced: true,
    separateAreas: true,
  },
  {
    name: "Cesar Chavez Park",
    city: "Berkeley",
    rating: 4.6,
    description: {
      en: "Beautiful waterfront park at the Berkeley Marina with expansive off-leash areas. Stunning views of the Golden Gate Bridge and SF skyline.",
      zh: "伯克利码头美丽的海滨公园，有宽阔的放绳区域。可以看到金门大桥和旧金山天际线的壮丽景色。",
    },
    tags: ["Off-leash", "Waterfront", "Views"],
    website: "https://www.cityofberkeley.info/Parks_Rec_Waterfront/Parks/Cesar_Chavez_Park.aspx",
    fenced: false,
    separateAreas: false,
  },
  {
    name: "Mitchell Park Dog Park",
    city: "Palo Alto",
    rating: 4.1,
    description: {
      en: "Fenced dog park in Palo Alto with separate small and large dog areas. Water fountains for dogs and shaded benches.",
      zh: "帕洛阿尔托的围栏狗公园，有小型犬和大型犬分区。有狗狗饮水器和遮阳长椅。",
    },
    tags: ["Fenced", "Separated Areas", "Water"],
    website: "#",
    fenced: true,
    separateAreas: true,
  },
  {
    name: "Fort Funston",
    city: "San Francisco",
    rating: 4.8,
    description: {
      en: "Legendary off-leash beach with sandy cliffs and ocean views. Dogs can run free on the beach. One of SF's most iconic dog spots.",
      zh: "传奇的放绳海滩，有沙崖和海景。狗狗可以在海滩上自由奔跑。旧金山最标志性的遛狗地点之一。",
    },
    tags: ["Off-leash", "Beach", "Iconic"],
    website: "https://www.nps.gov/goga/planyourvisit/fortfunston.htm",
    fenced: false,
    separateAreas: false,
  },
  {
    name: "Stern Grove Dog Play Area",
    city: "San Francisco",
    rating: 4.0,
    description: {
      en: "Quiet off-leash area in a beautiful eucalyptus grove. Less crowded than other SF dog parks. Great for dogs who prefer calm environments.",
      zh: "美丽的桉树林中安静的放绳区域。比旧金山其他狗公园人少。非常适合喜欢安静环境的狗狗。",
    },
    tags: ["Off-leash", "Quiet", "Shaded"],
    website: "#",
    fenced: false,
    separateAreas: false,
  },
];

export default function PlayContent() {
  const t = useTranslations("play");
  const tc = useTranslations("categories.play");
  const locale = useLocale();

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <PawPrint className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{tc("title")}</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">{tc("description")}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <PawPrint className="w-6 h-6 text-blue-500" />
          {t("dogParksTitle")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{t("dogParksSubtitle")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dogParks.map((park) => (
            <div
              key={park.name}
              className="group rounded-2xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-300"
            >
              <div className="h-32 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center relative">
                <span className="text-5xl">🐾</span>
                <div className="absolute top-3 right-3 flex gap-1.5">
                  {park.fenced && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/90 text-blue-700 font-medium">
                      {t("fenced")}
                    </span>
                  )}
                  {park.separateAreas && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/90 text-green-700 font-medium">
                      {t("separateAreas")}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {park.name}
                  </h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{park.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  {park.city}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {locale === "zh" ? park.description.zh : park.description.en}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {park.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {park.website !== "#" && (
                    <a href={park.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
