# Bay Area Dog

The ultimate guide for dog owners in the Bay Area. Covers trails, dog-friendly restaurants, raw feeding resources, pet shops, parks, and learning tools — all in 30 languages.

**Live site:** [bayarea.dog](https://bayarea.dog)

## Tech Stack

- **Framework:** Next.js 16 (App Router, Static Site Generation)
- **UI:** React 19, TypeScript, Tailwind CSS v4
- **i18n:** next-intl (30 locales)
- **Maps:** Leaflet + OpenStreetMap (no API key needed)
- **Icons:** Lucide React
- **Deployment:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/
│   └── [locale]/           # Locale-based routing (30 languages)
│       ├── layout.tsx       # Root layout with i18n, dark mode, hreflang
│       ├── page.tsx         # Homepage (map, Today's Pick, categories)
│       ├── trails/          # Trail listings + detail pages
│       │   └── [slug]/      # Individual trail pages (25+ trails)
│       ├── eat/             # Dog-friendly restaurants + raw feeding guide
│       ├── play/            # Dog parks, beaches, day trips
│       ├── shop/            # Pet stores, vets, groomers, trainers
│       ├── learn/           # Recipes, articles, tips
│       ├── guides/
│       │   └── [slug]/      # Long-form SEO articles (7 guides)
│       ├── tools/
│       │   ├── food-safety/      # Toxic food checker
│       │   ├── food-calculator/  # Raw feeding portion calculator
│       │   ├── emergency-card/   # Printable emergency vet card
│       │   └── hiking-checklist/ # Trail packing checklist
│       ├── search/          # Client-side full-text search
│       └── not-found.tsx    # 404 page
├── components/
│   ├── Header.tsx           # Sticky header with nav + language switcher
│   ├── Footer.tsx           # Site footer
│   ├── MobileNav.tsx        # Bottom tab navigation (mobile)
│   ├── BackToTop.tsx        # Scroll-to-top button
│   ├── ThemeToggle.tsx      # Dark mode toggle
│   ├── MapView.tsx          # Leaflet map (lazy loaded)
│   └── ...                  # Page-specific content components
├── data/
│   ├── trails.ts            # 25+ trail entries with full metadata
│   ├── restaurants.ts       # 15+ dog-friendly restaurants
│   ├── parks.ts             # 15+ dog parks and beaches
│   ├── shops.ts             # Pet stores, vets, groomers, trainers
│   ├── recipes.ts           # 5 homemade dog food recipes
│   ├── articles.ts          # 7 long-form SEO articles
│   └── foodSafety.ts        # 80+ food safety entries
├── i18n/
│   ├── routing.ts           # Locale configuration (30 locales)
│   ├── navigation.ts        # Localized Link/usePathname/useRouter
│   └── request.ts           # Server-side locale setup
└── messages/
    ├── en.json              # English (full UI + content)
    ├── zh.json              # Chinese (full UI + content)
    └── ...                  # 28 more locale files (UI translations)
```

## Supported Languages (30)

| Tier | Languages | Coverage |
|------|-----------|----------|
| Full (UI + Content) | English, Chinese | Complete translations |
| UI Only | Spanish, Japanese, Korean, French, German, Portuguese, Italian, Russian, Arabic*, Hindi, Thai, Vietnamese, Indonesian, Turkish, Dutch, Polish, Swedish, Danish, Norwegian, Finnish, Czech, Hebrew*, Malay, Filipino, Ukrainian, Romanian, Hungarian, Greek | UI strings localized; content in English |

\* Arabic and Hebrew use RTL layout.

## Adding Content

### Add a new trail

1. Add the trail object to `src/data/trails.ts`
2. Include: name, slug, coordinates, region, leash policy, difficulty, distance, elevation, description, parking, water, tips, best time, terrain, photo spots, nearby restaurants/vets
3. The trail detail page generates automatically from the slug

### Add a new restaurant

Add the restaurant object to `src/data/restaurants.ts` with name, slug, address, coordinates, website, patio info, dog menu details, price range, and area.

### Add a new article

1. Add the article to `src/data/articles.ts` with title, slug, description, content (1500+ words), category, date, and read time
2. The guide page generates automatically at `/guides/{slug}`

### Add a new language

1. Create `src/messages/{locale}.json` (copy structure from `en.json`)
2. Add the locale code to `src/i18n/routing.ts` locales array
3. Add the locale display name to `src/components/Header.tsx` localeNames
4. For RTL languages, update the `dir` condition in `src/app/[locale]/layout.tsx`

## Features

- Interactive Leaflet map with color-coded pins (trails, restaurants, shops, vets)
- Today's Pick recommendations based on day of week and season
- Client-side search across all content
- Dark mode with system preference detection
- Seasonal banners (spring flowers, summer heat, fall colors, winter rain)
- Food safety checker (80+ foods, searchable)
- Raw feeding calculator (BARF 80-10-10 ratio)
- Printable emergency vet card
- Hiking packing checklist
- JSON-LD structured data on every page (WebSite, Place, Article, FAQPage, BreadcrumbList)
- Sitemap with 30 locales x all pages
- WCAG 2.1 AA accessibility (skip-to-content, ARIA labels, keyboard nav)

## Deployment

### Vercel (recommended)

1. Push the repo to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Framework preset: Next.js (auto-detected)
4. No environment variables needed (pure static site)
5. Deploy

The site generates ~1265 static pages across 30 locales. Build time is under 2 minutes.

### Other platforms

Run `npm run build` to generate a static export. The output in `.next/` can be served by any platform that supports Next.js.

## Architecture Decisions

- **Pure frontend:** No backend, no database, no auth. All data is static TypeScript/JSON.
- **SSG:** Every page is statically generated at build time for maximum performance.
- **Lazy map:** The Leaflet map is loaded via `next/dynamic` to avoid blocking initial render.
- **Two-tier i18n:** UI strings in 30 languages; deep content (trail descriptions, articles) in English and Chinese only, with English fallback for other locales.

## License

All rights reserved.
