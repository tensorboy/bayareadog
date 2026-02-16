export interface RawFoodShop {
  slug: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  rating: number;
  description: { en: string; zh: string };
  website: string;
  specialty: string[];
  tags: string[];
}

export interface PriceComparison {
  item: string;
  itemZh: string;
  prices: Record<string, string | null>;
}

export const rawFoodShops: RawFoodShop[] = [
  {
    slug: "marin-raw",
    name: "Marin Raw",
    city: "San Rafael",
    lat: 37.9735,
    lng: -122.5311,
    rating: 4.9,
    description: {
      en: "Premium raw dog food and meaty bones from local farms. The best raw food shop in the Bay Area. Hormone-free, locally sourced.",
      zh: "来自本地农场的优质生狗粮和肉骨。湾区最好的生骨肉店。无激素，本地采购。",
    },
    website: "https://www.marinraw.com",
    specialty: ["Raw bones", "Organ meats", "Ground blends"],
    tags: ["Raw Food", "Premium", "Local"],
  },
  {
    slug: "99-ranch",
    name: "99 Ranch Market",
    city: "Multiple Locations",
    lat: 37.4008,
    lng: -121.9434,
    rating: 4.2,
    description: {
      en: "Asian supermarket with the cheapest raw meaty bones. Chicken frames, necks, feet, and organs at unbeatable prices. The budget-friendly choice for raw feeders.",
      zh: "亚洲超市，有最便宜的生骨肉。鸡架、鸡脖子、鸡爪和内脏价格无敌。生骨肉喂养的省钱首选。",
    },
    website: "https://www.99ranch.com",
    specialty: ["Chicken frames", "Chicken feet", "Pork bones", "Organs"],
    tags: ["Budget", "Asian Market", "Variety"],
  },
  {
    slug: "h-mart",
    name: "H Mart",
    city: "Multiple Locations",
    lat: 37.3494,
    lng: -121.9894,
    rating: 4.1,
    description: {
      en: "Korean supermarket with good selection of meaty bones and organs. Slightly pricier than 99 Ranch but often has different cuts.",
      zh: "韩国超市，有不错的肉骨和内脏选择。比大华贵一点，但经常有不同的切割方式。",
    },
    website: "https://www.hmart.com",
    specialty: ["Beef bones", "Pork neck", "Chicken gizzards"],
    tags: ["Korean Market", "Variety"],
  },
  {
    slug: "pet-food-express",
    name: "Pet Food Express",
    city: "Multiple Locations",
    lat: 37.7749,
    lng: -122.4194,
    rating: 4.4,
    description: {
      en: "Bay Area pet store chain carrying frozen raw food brands like Primal, Stella & Chewy's, and Northwest Naturals. Also has supplements.",
      zh: "湾区宠物店连锁，提供Primal、Stella & Chewy's和Northwest Naturals等冷冻生食品牌。也有营养补充剂。",
    },
    website: "https://www.petfoodexpress.com",
    specialty: ["Primal", "Stella & Chewy's", "Supplements"],
    tags: ["Pet Store", "Frozen Raw", "Supplements"],
  },
  {
    slug: "costco",
    name: "Costco",
    city: "Multiple Locations",
    lat: 37.7655,
    lng: -122.4039,
    rating: 4.0,
    description: {
      en: "Bulk beef bones, chicken thighs, and salmon at great prices. Best for buying large quantities of protein. Membership required.",
      zh: "批量牛骨、鸡腿和三文鱼，价格实惠。适合大量购买蛋白质。需要会员。",
    },
    website: "https://www.costco.com",
    specialty: ["Bulk chicken", "Beef bones", "Salmon"],
    tags: ["Bulk", "Budget", "Membership"],
  },
];

export const priceComparison: PriceComparison[] = [
  { item: "Chicken Feet", itemZh: "鸡爪", prices: { "99 Ranch": "$1.99/lb", "H Mart": "$2.49/lb", "Marin Raw": "$4.99/lb", Costco: null } },
  { item: "Chicken Necks", itemZh: "鸡脖子", prices: { "99 Ranch": "$1.29/lb", "H Mart": "$1.79/lb", "Marin Raw": "$3.99/lb", Costco: null } },
  { item: "Chicken Frames", itemZh: "鸡架", prices: { "99 Ranch": "$0.99/lb", "H Mart": "$1.49/lb", "Marin Raw": "$2.99/lb", Costco: null } },
  { item: "Beef Bones", itemZh: "牛骨", prices: { "99 Ranch": "$2.99/lb", "H Mart": "$3.49/lb", "Marin Raw": "$5.99/lb", Costco: "$3.99/lb" } },
  { item: "Chicken Liver", itemZh: "鸡肝", prices: { "99 Ranch": "$1.49/lb", "H Mart": "$1.99/lb", "Marin Raw": "$3.49/lb", Costco: "$2.29/lb" } },
  { item: "Pork Neck Bones", itemZh: "猪颈骨", prices: { "99 Ranch": "$1.69/lb", "H Mart": "$2.19/lb", "Marin Raw": null, Costco: null } },
  { item: "Ground Beef", itemZh: "牛肉馅", prices: { "99 Ranch": "$4.99/lb", "H Mart": "$5.49/lb", "Marin Raw": "$6.99/lb", Costco: "$4.49/lb" } },
  { item: "Whole Sardines", itemZh: "整条沙丁鱼", prices: { "99 Ranch": "$3.99/lb", "H Mart": "$4.49/lb", "Marin Raw": "$7.99/lb", Costco: null } },
];

export const budgetPlans = [
  {
    tier: "budget",
    titleEn: "Budget Plan",
    titleZh: "省钱版",
    priceEn: "$30/month",
    descEn: "99 Ranch chicken frames + chicken liver + eggshell powder for calcium",
    descZh: "大华鸡架 + 鸡肝 + 蛋壳粉补钙",
  },
  {
    tier: "standard",
    titleEn: "Standard Plan",
    titleZh: "标准版",
    priceEn: "$60/month",
    descEn: "Marin Raw mixed bones + organs + fish oil supplement",
    descZh: "Marin Raw 混合骨 + 内脏 + 鱼油",
  },
  {
    tier: "premium",
    titleEn: "Premium Plan",
    titleZh: "豪华版",
    priceEn: "$100+/month",
    descEn: "Organic grass-fed + wild salmon + Balance IT supplements",
    descZh: "有机草饲 + 野生三文鱼 + Balance IT 补充剂",
  },
];
