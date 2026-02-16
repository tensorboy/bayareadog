import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { GraduationCap, BookOpen, UtensilsCrossed, Heart, Dumbbell } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "categories.learn" });
  return { title: t("title"), description: t("description") };
}

const articles = [
  {
    icon: UtensilsCrossed,
    category: "Nutrition",
    title: "Complete Guide to Raw Feeding (BARF Diet)",
    description: "Learn the 80-10-10 ratio: 80% muscle meat, 10% bone, 10% organ. Plus calcium-phosphorus ratios, supplementation, and transitioning tips.",
    color: "amber",
    links: [
      { label: "Balance IT Recipe Generator", url: "https://balance.it/recipes" },
      { label: "Raw Feeding Guide (Dealmoon)", url: "https://www.dealmoon.com/guide/926765" },
    ],
  },
  {
    icon: UtensilsCrossed,
    category: "Recipes",
    title: "Homemade Dog Food Recipes",
    description: "Vet-approved recipes with proper nutrition balance. Includes chicken & rice, beef & sweet potato, and fish & veggie options.",
    color: "orange",
    links: [
      { label: "Vet-Approved Recipes", url: "https://basepaws.com/dog-insider/vet-approved-homemade-dog-food-recipes" },
      { label: "AKC Ingredient Guide", url: "https://www.akc.org/expert-advice/nutrition/choosing-ingredients-homemade-dog-food/" },
    ],
  },
  {
    icon: Dumbbell,
    category: "Training",
    title: "Off-Leash Training Basics",
    description: "Essential recall training for Bay Area trails. Learn the 'come' command, emergency recall, and how to build reliable off-leash behavior.",
    color: "blue",
    links: [],
  },
  {
    icon: Heart,
    category: "Health",
    title: "Toxic Foods for Dogs",
    description: "Know what to avoid: grapes, onions, chocolate, xylitol, avocado, macadamia nuts, and more. Emergency vet contacts included.",
    color: "red",
    links: [
      { label: "ASPCA Toxic Foods List", url: "https://www.aspca.org/pet-care/animal-poison-control/people-foods-avoid-feeding-your-pets" },
    ],
  },
  {
    icon: BookOpen,
    category: "Guide",
    title: "New Dog Owner's Bay Area Checklist",
    description: "Everything you need: licenses, microchipping, vet selection, dog parks near you, and local dog community groups.",
    color: "green",
    links: [],
  },
  {
    icon: Heart,
    category: "Health",
    title: "Calcium Supplementation Guide",
    description: "Why homemade diets often lack calcium. How to use eggshell powder, Balance IT supplements, and bone meal correctly.",
    color: "purple",
    links: [
      { label: "Balance IT Supplements", url: "https://balance.it/" },
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

export default async function LearnPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <section className="bg-gradient-to-br from-amber-50 to-yellow-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-amber-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Learn</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl">
            Training tips, nutrition guides, homemade recipes, and health advice for your dog.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => {
            const colors = colorMap[article.color];
            const Icon = article.icon;
            return (
              <div
                key={article.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 rounded-lg ${colors.bg}`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} ${colors.border} border font-medium`}>
                    {article.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{article.description}</p>
                {article.links.length > 0 && (
                  <div className="space-y-1.5">
                    {article.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block text-sm ${colors.text} hover:underline`}
                      >
                        &rarr; {link.label}
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
