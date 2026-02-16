"use client";

import { useTranslations } from "next-intl";
import { UtensilsCrossed, MapPin, Star, ExternalLink, Bone } from "lucide-react";

const restaurants = [
  {
    name: "Lazy Dog Restaurant & Bar",
    location: "Multiple Locations",
    type: "restaurant" as const,
    rating: 4.5,
    description: "Dog-friendly patio dining with a dedicated dog menu including grilled hamburger patty and brown rice.",
    website: "https://www.lazydogrestaurants.com",
    tags: ["Patio", "Dog Menu", "American"],
  },
  {
    name: "Zazie",
    location: "San Francisco",
    type: "restaurant" as const,
    rating: 4.7,
    description: "Charming French bistro with a dog-friendly back patio. They bring water bowls and treats for your pup.",
    website: "https://www.zaziesf.com",
    tags: ["French", "Brunch", "Patio"],
  },
  {
    name: "Drake's Dealership",
    location: "Oakland",
    type: "restaurant" as const,
    rating: 4.4,
    description: "Massive outdoor beer garden that's very dog-friendly. Great craft beer and pizza.",
    website: "https://drfranklincraft.com/drakes-dealership",
    tags: ["Beer Garden", "Pizza", "Outdoor"],
  },
  {
    name: "The Parkway",
    location: "El Cerrito",
    type: "restaurant" as const,
    rating: 4.3,
    description: "Sports bar with dog-friendly patio. Casual vibe, burgers, and craft beer.",
    website: "#",
    tags: ["Sports Bar", "Burgers", "Patio"],
  },
];

const rawFoodShops = [
  {
    name: "Marin Raw",
    location: "San Rafael",
    type: "raw-food" as const,
    rating: 4.9,
    description: "The Bay Area's premier raw dog food shop. Locally sourced, hormone-free chicken feet, necks, beef ribs, duck feet, turkey necks, and more.",
    website: "https://www.marinraw.com/collections/food",
    tags: ["Raw Bones", "Local", "Organic", "Bulk"],
  },
  {
    name: "99 Ranch Market (大华超市)",
    location: "Multiple Locations",
    type: "raw-food" as const,
    rating: 4.5,
    description: "Best budget option for raw meaty bones. Chicken feet ~$1.99/lb, duck necks, pork bones, beef bones. Multiple Bay Area locations.",
    website: "https://www.99ranch.com",
    tags: ["Budget", "Asian Market", "Chicken Feet", "Bones"],
  },
  {
    name: "Pet Food Express",
    location: "Multiple Locations",
    type: "raw-food" as const,
    rating: 4.3,
    description: "Carries various raw food brands including Primal, Stella & Chewy's, and Northwest Naturals.",
    website: "https://www.petfoodexpress.com",
    tags: ["Commercial Raw", "Brands", "Supplements"],
  },
  {
    name: "H Mart (韩亚超市)",
    location: "Multiple Locations",
    type: "raw-food" as const,
    rating: 4.4,
    description: "Korean supermarket with great selection of organ meats, bones, and affordable raw feeding ingredients.",
    website: "https://www.hmart.com",
    tags: ["Budget", "Organs", "Korean Market", "Bones"],
  },
  {
    name: "Costco",
    location: "Multiple Locations",
    type: "raw-food" as const,
    rating: 4.2,
    description: "Great for bulk protein - chicken leg quarters, ground turkey, beef. Best prices for muscle meat in large quantities.",
    website: "https://www.costco.com",
    tags: ["Bulk", "Muscle Meat", "Budget", "Chicken"],
  },
];

export default function EatContent() {
  const t = useTranslations("categories.eat");

  return (
    <div>
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <UtensilsCrossed className="w-8 h-8 text-orange-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{t("title")}</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">{t("description")}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <UtensilsCrossed className="w-6 h-6 text-orange-500" />
          Dog-Friendly Restaurants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {restaurants.map((place) => (
            <PlaceItem key={place.name} {...place} />
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Bone className="w-6 h-6 text-amber-600" />
          Raw Food & Bones
        </h2>
        <p className="text-gray-600 mb-6">Where to buy raw meaty bones and ingredients for homemade dog food in the Bay Area.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rawFoodShops.map((place) => (
            <PlaceItem key={place.name} {...place} />
          ))}
        </div>
      </section>
    </div>
  );
}

function PlaceItem({
  name,
  location,
  rating,
  description,
  website,
  tags,
  type,
}: {
  name: string;
  location: string;
  rating: number;
  description: string;
  website: string;
  tags: string[];
  type: "restaurant" | "raw-food";
}) {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-6 hover:shadow-lg hover:border-orange-200 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <MapPin className="w-3.5 h-3.5" />
            {location}
          </div>
        </div>
        <div className="flex items-center gap-1 text-amber-500">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs px-2 py-0.5 rounded-full border ${
                type === "raw-food"
                  ? "bg-amber-50 text-amber-700 border-amber-100"
                  : "bg-orange-50 text-orange-700 border-orange-100"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-600 hover:text-orange-500 transition-colors flex items-center gap-1 text-sm"
        >
          Visit <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
