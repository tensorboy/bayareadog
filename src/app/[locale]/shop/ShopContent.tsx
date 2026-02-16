"use client";

import { useTranslations, useLocale } from "next-intl";
import { ShoppingBag, MapPin, Star, ExternalLink, Scissors, Stethoscope, Store } from "lucide-react";

interface Shop {
  name: string;
  city: string;
  category: "pet-store" | "grooming" | "vet" | "training";
  rating: number;
  description: { en: string; zh: string };
  website: string;
  tags: string[];
  phone?: string;
  emergency?: boolean;
}

const shops: Shop[] = [
  {
    name: "Pet Food Express",
    city: "Multiple Locations",
    category: "pet-store",
    rating: 4.4,
    description: {
      en: "Bay Area's favorite pet store chain. Wide selection of food, toys, and supplies. Self-service dog wash available at most locations.",
      zh: "湾区最受欢迎的宠物店连锁。食品、玩具和用品种类丰富。大多数门店提供自助洗狗服务。",
    },
    website: "https://www.petfoodexpress.com",
    tags: ["Food", "Supplies", "Dog Wash"],
  },
  {
    name: "Jeffrey's Natural Pet Foods",
    city: "San Francisco",
    category: "pet-store",
    rating: 4.6,
    description: {
      en: "Independent pet store specializing in natural and holistic pet food. Knowledgeable staff who can help with dietary needs.",
      zh: "独立宠物店，专营天然和整体健康宠物食品。专业的工作人员可以帮助解决饮食需求。",
    },
    website: "https://www.jeffreysnaturalpet.com",
    tags: ["Natural", "Holistic", "Independent"],
  },
  {
    name: "Mud Puppies",
    city: "San Francisco",
    category: "grooming",
    rating: 4.5,
    description: {
      en: "Full-service grooming and self-service dog wash in the Mission. Also offers daycare and boarding. Clean, friendly atmosphere.",
      zh: "Mission区的全方位美容和自助洗狗服务。也提供日托和寄宿服务。干净、友好的氛围。",
    },
    website: "https://www.mudpuppiessf.com",
    tags: ["Grooming", "Dog Wash", "Daycare"],
  },
  {
    name: "VCA Bay Area Veterinary Specialists",
    city: "San Leandro",
    category: "vet",
    rating: 4.3,
    description: {
      en: "24-hour emergency vet and specialty hospital. Board-certified specialists in surgery, oncology, internal medicine, and more.",
      zh: "24小时急诊兽医和专科医院。有外科、肿瘤科、内科等经过认证的专科医生。",
    },
    website: "https://vcahospitals.com",
    tags: ["Emergency", "Specialist", "24-Hour"],
    phone: "(510) 483-4000",
    emergency: true,
  },
  {
    name: "Petco",
    city: "Multiple Locations",
    category: "pet-store",
    rating: 4.0,
    description: {
      en: "Large pet store chain with grooming services, vet clinics, and training classes. Good selection of basic supplies.",
      zh: "大型宠物店连锁，提供美容服务、兽医诊所和训练课程。基本用品选择丰富。",
    },
    website: "https://www.petco.com",
    tags: ["Supplies", "Grooming", "Vet Clinic"],
  },
  {
    name: "SAGE Veterinary Centers",
    city: "San Francisco",
    category: "vet",
    rating: 4.5,
    description: {
      en: "24/7 emergency and specialty veterinary hospital in the Mission Bay area. Advanced diagnostics, surgery, and critical care.",
      zh: "Mission Bay地区的24/7急诊和专科兽医医院。先进的诊断、手术和重症监护。",
    },
    website: "https://www.sagecenters.com",
    tags: ["Emergency", "24/7", "Specialty"],
    phone: "(415) 566-0531",
    emergency: true,
  },
  {
    name: "Grateful Dog Daycare & Grooming",
    city: "San Francisco",
    category: "grooming",
    rating: 4.4,
    description: {
      en: "Daycare with grooming services in the Bayview. Experienced handlers, indoor/outdoor play areas, and webcam monitoring.",
      zh: "Bayview区的日托和美容服务。经验丰富的护理人员、室内外游乐区和摄像头监控。",
    },
    website: "#",
    tags: ["Daycare", "Grooming", "Webcam"],
  },
  {
    name: "Andrea Arden Dog Training",
    city: "San Francisco",
    category: "training",
    rating: 4.7,
    description: {
      en: "Professional dog training with positive reinforcement methods. Puppy classes, obedience, behavior modification, and private sessions.",
      zh: "采用正向强化方法的专业狗狗训练。幼犬课程、服从训练、行为矫正和私人课程。",
    },
    website: "#",
    tags: ["Training", "Puppy Classes", "Private"],
  },
  {
    name: "Berkeley Humane",
    city: "Berkeley",
    category: "training",
    rating: 4.3,
    description: {
      en: "Community-based organization offering affordable training classes, behavior helpline, and low-cost vet services.",
      zh: "社区组织，提供实惠的训练课程、行为咨询热线和低价兽医服务。",
    },
    website: "https://berkeleyhumane.org",
    tags: ["Training", "Affordable", "Community"],
  },
];

const categoryIcons: Record<string, typeof Store> = {
  "pet-store": Store,
  grooming: Scissors,
  vet: Stethoscope,
  training: ShoppingBag,
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "pet-store": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-100" },
  grooming: { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-100" },
  vet: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-100" },
  training: { bg: "bg-green-50", text: "text-green-700", border: "border-green-100" },
};

export default function ShopContent() {
  const t = useTranslations("shop");
  const tc = useTranslations("categories.shop");
  const locale = useLocale();

  const categoryLabels: Record<string, string> = {
    "pet-store": t("petStore"),
    grooming: t("grooming"),
    vet: t("vet"),
    training: t("training"),
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-900 dark:to-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBag className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{tc("title")}</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">{tc("description")}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => {
            const colors = categoryColors[shop.category];
            return (
              <div
                key={shop.name}
                className="group rounded-2xl border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-600 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} ${colors.border} border font-medium`}>
                      {categoryLabels[shop.category]}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mt-2">
                      {shop.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {shop.city}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{shop.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {locale === "zh" ? shop.description.zh : shop.description.en}
                </p>

                {shop.emergency && shop.phone && (
                  <div className="flex items-center gap-2 mb-3 p-2 bg-red-50 rounded-lg">
                    <span className="text-xs font-medium text-red-700">{t("emergency24h")}</span>
                    <a href={`tel:${shop.phone}`} className="text-xs text-red-600 font-mono hover:underline">
                      {shop.phone}
                    </a>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {shop.tags.map((tag) => (
                      <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} ${colors.border} border`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {shop.website !== "#" && (
                    <a href={shop.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-500">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
