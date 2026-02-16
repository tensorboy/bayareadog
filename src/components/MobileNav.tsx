"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Home, Mountain, UtensilsCrossed, ShoppingBag, MoreHorizontal } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, key: "home" },
  { href: "/trails", icon: Mountain, key: "trails" },
  { href: "/eat", icon: UtensilsCrossed, key: "eat" },
  { href: "/shop", icon: ShoppingBag, key: "shop" },
  { href: "/play", icon: MoreHorizontal, key: "more" },
] as const;

export default function MobileNav() {
  const t = useTranslations("mobileNav");
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-gray-200 dark:border-slate-700 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 w-full py-1 rounded-lg transition-colors ${
                isActive ? "text-amber-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{t(item.key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
