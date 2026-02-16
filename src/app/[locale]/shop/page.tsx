import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ShoppingBag, MapPin, Star, ExternalLink } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "categories.shop" });
  return { title: t("title"), description: t("description") };
}

const shops = [
  {
    name: "Pet Food Express",
    location: "Multiple Locations",
    category: "Pet Store",
    rating: 4.4,
    description: "Bay Area's favorite pet store chain. Wide selection of food, toys, and supplies. Self-service dog wash available.",
    website: "https://www.petfoodexpress.com",
    tags: ["Food", "Supplies", "Dog Wash"],
  },
  {
    name: "Marin Raw",
    location: "San Rafael",
    category: "Raw Food",
    rating: 4.9,
    description: "Premium raw dog food and meaty bones. Locally sourced, hormone-free. The best raw food shop in the Bay Area.",
    website: "https://www.marinraw.com",
    tags: ["Raw Food", "Bones", "Local"],
  },
  {
    name: "Jeffrey's Natural Pet Foods",
    location: "San Francisco",
    category: "Pet Store",
    rating: 4.6,
    description: "Independent pet store specializing in natural and holistic pet food. Knowledgeable staff.",
    website: "https://www.jeffreysnaturalpet.com",
    tags: ["Natural", "Holistic", "Independent"],
  },
  {
    name: "Mud Puppies",
    location: "San Francisco",
    category: "Grooming",
    rating: 4.5,
    description: "Full-service grooming and self-service dog wash. Also offers daycare and boarding.",
    website: "https://www.mudpuppiessf.com",
    tags: ["Grooming", "Dog Wash", "Daycare"],
  },
  {
    name: "VCA Bay Area Veterinary Specialists",
    location: "San Leandro",
    category: "Vet",
    rating: 4.3,
    description: "24-hour emergency vet and specialty hospital. Board-certified specialists in surgery, oncology, and more.",
    website: "https://vcahospitals.com",
    tags: ["Emergency", "Specialist", "24-Hour"],
  },
  {
    name: "Petco",
    location: "Multiple Locations",
    category: "Pet Store",
    rating: 4.0,
    description: "Large pet store chain with grooming services, vet clinics, and training classes. Nationwide.",
    website: "https://www.petco.com",
    tags: ["Supplies", "Grooming", "Vet Clinic"],
  },
];

export default async function ShopPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <ShoppingBag className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Shop</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">
            Pet stores, raw food suppliers, grooming salons, and vet clinics in the Bay Area.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <div
              key={shop.name}
              className="group rounded-2xl border border-gray-100 bg-white p-6 hover:shadow-lg hover:border-purple-200 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">
                    {shop.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mt-2">
                    {shop.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {shop.location}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{shop.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{shop.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {shop.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={shop.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-500">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
