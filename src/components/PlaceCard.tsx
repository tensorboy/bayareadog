import { MapPin, Star } from "lucide-react";

interface PlaceCardProps {
  name: string;
  location: string;
  description: string;
  tags: string;
  rating?: number;
}

export default function PlaceCard({ name, location, description, tags, rating = 4.5 }: PlaceCardProps) {
  const tagList = tags.split(",");

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg hover:border-amber-200 transition-all duration-300">
      <div className="h-40 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
        <span className="text-6xl">🐕</span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
          <MapPin className="w-3.5 h-3.5" />
          {location}
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {tagList.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
