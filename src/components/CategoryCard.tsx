import { Link } from "@/i18n/navigation";
import type { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  cta: string;
  gradient: string;
}

export default function CategoryCard({ href, icon: Icon, title, description, cta, gradient }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-300"
    >
      <div className={`inline-flex p-3 rounded-xl ${gradient} mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>
      <span className="text-sm font-medium text-amber-600 group-hover:text-amber-500 transition-colors">
        {cta} &rarr;
      </span>
    </Link>
  );
}
