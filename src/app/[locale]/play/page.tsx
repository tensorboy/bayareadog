import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PawPrint, MapPin, Star, ExternalLink } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "categories.play" });
  return { title: t("title"), description: t("description") };
}

const places = [
  {
    name: "Point Isabel Dog Park",
    location: "Richmond",
    rating: 4.7,
    description: "Bay Area's largest off-leash dog park. Waterfront trails, dog wash station, and Mudpuppy's cafe nearby.",
    tags: ["Off-leash", "Waterfront", "Dog Wash"],
    website: "https://www.ebparks.org/parks/point-isabel",
  },
  {
    name: "Golden Gate Park Dog Play Areas",
    location: "San Francisco",
    rating: 4.5,
    description: "Multiple designated off-leash areas within the park. Great for socializing and training.",
    tags: ["Off-leash", "Multiple Areas", "Urban"],
    website: "https://sfrecpark.org/facilities/dog-play-areas",
  },
  {
    name: "Dolores Park",
    location: "San Francisco",
    rating: 4.4,
    description: "Iconic SF park with off-leash areas in the south end. Amazing city views, great for people-watching too.",
    tags: ["Off-leash", "Views", "Social"],
    website: "#",
  },
  {
    name: "Carmel Beach",
    location: "Carmel-by-the-Sea",
    rating: 4.9,
    description: "One of the most dog-friendly beaches in California. Off-leash, white sand, stunning coastline. Worth the drive.",
    tags: ["Off-leash", "Beach", "Day Trip"],
    website: "https://ci.carmel.ca.us/post/beaches",
  },
  {
    name: "Berkeley Marina Dog Park",
    location: "Berkeley",
    rating: 4.3,
    description: "Large open space at the marina with bay views. Off-leash, great for fetch and running.",
    tags: ["Off-leash", "Open Space", "Marina"],
    website: "#",
  },
  {
    name: "Montclair Dog Park",
    location: "Oakland",
    rating: 4.2,
    description: "Small but well-maintained neighborhood dog park with separate areas for small and large dogs.",
    tags: ["Fenced", "Separated Areas", "Neighborhood"],
    website: "#",
  },
];

export default async function PlayPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <PawPrint className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Play & Fun</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">
            Dog parks, beaches, events, and activities for you and your pup in the Bay Area.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map((place) => (
            <div
              key={place.name}
              className="group rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300"
            >
              <div className="h-36 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                <span className="text-5xl">🐾</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {place.name}
                  </h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{place.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  {place.location}
                </div>
                <p className="text-sm text-gray-600 mb-3">{place.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {place.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {place.website !== "#" && (
                    <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
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
