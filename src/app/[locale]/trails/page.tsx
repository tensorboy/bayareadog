import { useTranslations } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import TrailsList from "./TrailsList";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "categories.trails" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

const trails = [
  {
    id: "fort-funston",
    name: "Fort Funston",
    location: "San Francisco",
    lat: 37.7146,
    lng: -122.5025,
    leash: "off-leash" as const,
    difficulty: "easy" as const,
    distance: "1.5 miles",
    rating: 4.8,
    description: "Iconic off-leash beach with stunning ocean views, sandy cliffs, and paragliders overhead. Dogs love running on the wide sandy beach.",
    descriptionZh: "标志性的放绳海滩，壮丽的海景、沙崖和滑翔伞。狗狗们喜欢在宽阔的沙滩上奔跑。",
    tags: ["Beach", "Off-leash", "Scenic", "Sandy"],
    website: "https://www.nps.gov/goga/planyourvisit/fortfunston.htm",
  },
  {
    id: "point-isabel",
    name: "Point Isabel Regional Shoreline",
    location: "Richmond",
    lat: 37.8990,
    lng: -122.3265,
    leash: "off-leash" as const,
    difficulty: "easy" as const,
    distance: "2.5 miles",
    rating: 4.7,
    description: "The largest off-leash dog park in the Bay Area with waterfront trails, Bay views, and a dog wash station. Home to Mudpuppy's tub & scrub.",
    descriptionZh: "湾区最大的放绳狗公园，拥有海滨步道、湾景和狗狗洗浴站。",
    tags: ["Off-leash", "Waterfront", "Dog Wash", "Large"],
    website: "https://www.ebparks.org/parks/point-isabel",
  },
  {
    id: "rancho-san-antonio",
    name: "Rancho San Antonio",
    location: "Cupertino",
    lat: 37.3321,
    lng: -122.0988,
    leash: "on-leash" as const,
    difficulty: "moderate" as const,
    distance: "4.5 miles",
    rating: 4.5,
    description: "Beautiful South Bay trails through rolling hills and oak woodlands. On-leash required but well worth it for the scenery and wildlife.",
    descriptionZh: "美丽的南湾步道，穿越起伏的山丘和橡树林。需要牵绳但风景和野生动物值得一去。",
    tags: ["On-leash", "Hills", "Nature", "South Bay"],
    website: "https://www.openspace.org/preserves/rancho-san-antonio",
  },
  {
    id: "crissy-field",
    name: "Crissy Field",
    location: "San Francisco",
    lat: 37.8035,
    lng: -122.4644,
    leash: "off-leash" as const,
    difficulty: "easy" as const,
    distance: "1.8 miles",
    rating: 4.6,
    description: "Flat waterfront trail with Golden Gate Bridge views. Off-leash area on the west beach. Great for dogs who love water.",
    descriptionZh: "平坦的海滨步道，可以看到金门大桥。西海滩有放绳区域，适合喜欢水的狗狗。",
    tags: ["Off-leash", "Beach", "Golden Gate", "Flat"],
    website: "https://www.parksconservancy.org/parks/crissy-field",
  },
  {
    id: "land-end",
    name: "Lands End Trail",
    location: "San Francisco",
    lat: 37.7879,
    lng: -122.5068,
    leash: "on-leash" as const,
    difficulty: "moderate" as const,
    distance: "3.4 miles",
    rating: 4.7,
    description: "Dramatic coastal trail with views of the Golden Gate Bridge, Marin Headlands, and rocky shoreline. On-leash required.",
    descriptionZh: "壮观的海岸步道，可以看到金门大桥、马林岬角和岩石海岸线。需要牵绳。",
    tags: ["On-leash", "Coastal", "Scenic", "Historic"],
    website: "https://www.nps.gov/goga/planyourvisit/landsend.htm",
  },
  {
    id: "cesar-chavez",
    name: "Cesar Chavez Park",
    location: "Berkeley",
    lat: 37.8707,
    lng: -122.3154,
    leash: "off-leash" as const,
    difficulty: "easy" as const,
    distance: "2.0 miles",
    rating: 4.4,
    description: "Hilltop park at the Berkeley Marina with panoramic Bay views. Off-leash in designated areas. Great for kite flying too.",
    descriptionZh: "伯克利码头的山顶公园，可以俯瞰海湾全景。指定区域可以放绳。也适合放风筝。",
    tags: ["Off-leash", "Marina", "Views", "East Bay"],
    website: "https://berkeleyca.gov/community-recreation/parks-recreation/parks/cesar-chavez-park",
  },
  {
    id: "muir-woods",
    name: "Muir Woods",
    location: "Mill Valley",
    lat: 37.8912,
    lng: -122.5717,
    leash: "on-leash" as const,
    difficulty: "moderate" as const,
    distance: "3.0 miles",
    rating: 4.3,
    description: "Famous redwood forest. Dogs allowed on-leash on some trails outside the main canyon. Check current rules before visiting.",
    descriptionZh: "著名的红杉森林。狗狗可以牵绳在主峡谷外的部分步道行走。去之前请查看最新规定。",
    tags: ["On-leash", "Redwoods", "Forest", "Marin"],
    website: "https://www.nps.gov/muwo/index.htm",
  },
  {
    id: "dog-beach-pacifica",
    name: "Pacifica State Beach (Dog Beach)",
    location: "Pacifica",
    lat: 37.6127,
    lng: -122.4945,
    leash: "off-leash" as const,
    difficulty: "easy" as const,
    distance: "1.0 mile",
    rating: 4.6,
    description: "Popular off-leash beach where dogs can swim and play in the waves. Beautiful sunset spot. Can get crowded on weekends.",
    descriptionZh: "热门的放绳海滩，狗狗可以游泳和在浪中玩耍。美丽的日落景点。周末可能很拥挤。",
    tags: ["Off-leash", "Beach", "Swimming", "Sunset"],
    website: "https://www.parks.ca.gov/?page_id=524",
  },
];

export default async function TrailsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TrailsList trails={trails} />;
}
