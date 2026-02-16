export interface FoodItem {
  name: string;
  nameZh: string;
  safe: "yes" | "no" | "caution";
  category: "fruit" | "vegetable" | "protein" | "dairy" | "grain" | "other";
  note: string;
  noteZh: string;
}

export const foodSafety: FoodItem[] = [
  // Fruits
  { name: "Apple (no seeds)", nameZh: "苹果（去籽）", safe: "yes", category: "fruit", note: "Rich in fiber and vitamins. Remove seeds and core first.", noteZh: "富含纤维和维生素。先去掉籽和果核。" },
  { name: "Banana", nameZh: "香蕉", safe: "yes", category: "fruit", note: "Good source of potassium. High in sugar, feed in moderation.", noteZh: "钾的良好来源。糖分较高，适量喂食。" },
  { name: "Blueberries", nameZh: "蓝莓", safe: "yes", category: "fruit", note: "Excellent antioxidant superfood for dogs.", noteZh: "狗狗的超级抗氧化食物。" },
  { name: "Watermelon (no seeds)", nameZh: "西瓜（去籽）", safe: "yes", category: "fruit", note: "Hydrating treat. Remove seeds and rind.", noteZh: "补水零食。去掉籽和皮。" },
  { name: "Strawberries", nameZh: "草莓", safe: "yes", category: "fruit", note: "Contains antioxidants and vitamin C. Feed in moderation.", noteZh: "含抗氧化物和维生素C。适量喂食。" },
  { name: "Grapes / Raisins", nameZh: "葡萄 / 葡萄干", safe: "no", category: "fruit", note: "TOXIC! Can cause kidney failure. Even small amounts are dangerous.", noteZh: "有毒！可导致肾衰竭。即使少量也很危险。" },
  { name: "Avocado", nameZh: "牛油果", safe: "no", category: "fruit", note: "Contains persin which is toxic to dogs. Pit is a choking hazard.", noteZh: "含有对狗有毒的过氧化物。果核有窒息风险。" },
  { name: "Cherries", nameZh: "樱桃", safe: "no", category: "fruit", note: "Pits, stems, and leaves contain cyanide. The flesh is okay in small amounts.", noteZh: "果核、茎和叶含有氰化物。少量果肉可以。" },
  { name: "Mango (no pit)", nameZh: "芒果（去核）", safe: "yes", category: "fruit", note: "Remove the pit first. High in vitamins A, B6, C, and E.", noteZh: "先去核。富含维生素A、B6、C和E。" },
  { name: "Pineapple", nameZh: "菠萝", safe: "yes", category: "fruit", note: "Small amounts are fine. Contains bromelain which aids digestion.", noteZh: "少量可以。含有助消化的菠萝蛋白酶。" },
  { name: "Oranges", nameZh: "橙子", safe: "caution", category: "fruit", note: "Flesh is okay in small amounts. High sugar and citric acid may cause upset stomach.", noteZh: "少量果肉可以。高糖和柠檬酸可能导致胃部不适。" },
  { name: "Tomatoes (ripe)", nameZh: "番茄（成熟的）", safe: "caution", category: "fruit", note: "Ripe tomatoes are generally fine. Green parts contain solanine which is toxic.", noteZh: "成熟番茄一般可以。绿色部分含有有毒的茄碱。" },

  // Vegetables
  { name: "Carrots", nameZh: "胡萝卜", safe: "yes", category: "vegetable", note: "Great low-calorie snack. Good for dental health.", noteZh: "很好的低卡零食。对牙齿健康有好处。" },
  { name: "Sweet Potatoes", nameZh: "红薯", safe: "yes", category: "vegetable", note: "Cooked sweet potatoes are excellent. Rich in fiber and beta-carotene.", noteZh: "煮熟的红薯非常好。富含纤维和β-胡萝卜素。" },
  { name: "Green Beans", nameZh: "四季豆", safe: "yes", category: "vegetable", note: "Plain, cooked green beans are a healthy treat.", noteZh: "清水煮的四季豆是健康的零食。" },
  { name: "Broccoli", nameZh: "西兰花", safe: "caution", category: "vegetable", note: "Safe in small amounts. Large amounts can cause gastric irritation.", noteZh: "少量安全。大量可能导致胃部刺激。" },
  { name: "Pumpkin", nameZh: "南瓜", safe: "yes", category: "vegetable", note: "Excellent for digestive health. Use plain, cooked pumpkin.", noteZh: "对消化健康很好。使用清水煮的南瓜。" },
  { name: "Spinach", nameZh: "菠菜", safe: "caution", category: "vegetable", note: "Small amounts are fine. High in oxalic acid which can affect kidneys over time.", noteZh: "少量可以。含较高草酸，长期可能影响肾脏。" },
  { name: "Onions", nameZh: "洋葱", safe: "no", category: "vegetable", note: "TOXIC! Can cause anemia by destroying red blood cells. All forms are dangerous.", noteZh: "有毒！破坏红细胞可导致贫血。任何形式都危险。" },
  { name: "Garlic", nameZh: "大蒜", safe: "no", category: "vegetable", note: "TOXIC! 5x more potent than onions. Can cause anemia.", noteZh: "有毒！毒性是洋葱的5倍。可导致贫血。" },
  { name: "Mushrooms (wild)", nameZh: "野生蘑菇", safe: "no", category: "vegetable", note: "Wild mushrooms can be fatal. Store-bought plain mushrooms are generally safe.", noteZh: "野生蘑菇可能致命。商店买的普通蘑菇一般安全。" },
  { name: "Celery", nameZh: "芹菜", safe: "yes", category: "vegetable", note: "Good for freshening breath. Cut into small pieces to prevent choking.", noteZh: "有助于清新口气。切小块防止噎到。" },
  { name: "Corn (off the cob)", nameZh: "玉米（脱粒）", safe: "yes", category: "vegetable", note: "Kernels are fine. Never give the cob — it's a choking/blockage hazard.", noteZh: "玉米粒可以。绝不要给玉米芯——有窒息/堵塞风险。" },
  { name: "Peas", nameZh: "豌豆", safe: "yes", category: "vegetable", note: "Fresh, frozen, or thawed are all fine. Avoid canned with added sodium.", noteZh: "新鲜、冷冻或解冻的都可以。避免罐头加钠的。" },

  // Proteins
  { name: "Chicken (cooked, boneless)", nameZh: "鸡肉（煮熟去骨）", safe: "yes", category: "protein", note: "Excellent lean protein. Never give cooked bones — they can splinter.", noteZh: "优质瘦肉蛋白。绝不要给煮熟的骨头——会碎裂。" },
  { name: "Salmon (cooked)", nameZh: "三文鱼（煮熟）", safe: "yes", category: "protein", note: "Rich in omega-3. Must be fully cooked — raw salmon can contain parasites.", noteZh: "富含omega-3。必须完全煮熟——生三文鱼可能含寄生虫。" },
  { name: "Eggs (cooked)", nameZh: "鸡蛋（煮熟）", safe: "yes", category: "protein", note: "Complete protein source. Cooked eggs are safer than raw.", noteZh: "完整蛋白质来源。煮熟的鸡蛋比生的更安全。" },
  { name: "Raw Bones", nameZh: "生骨头", safe: "caution", category: "protein", note: "Raw meaty bones can be part of a raw diet. Supervise always. Never give cooked bones.", noteZh: "生肉骨头可以是生骨肉饮食的一部分。始终监督。绝不给煮熟的骨头。" },
  { name: "Turkey (plain, cooked)", nameZh: "火鸡肉（清煮）", safe: "yes", category: "protein", note: "Good lean protein. Remove skin and bones. Avoid seasoned meat.", noteZh: "良好的瘦蛋白。去皮去骨。避免调味的肉。" },
  { name: "Liver", nameZh: "肝脏", safe: "caution", category: "protein", note: "Nutritious but high in vitamin A. Should be <5% of diet to avoid toxicity.", noteZh: "营养丰富但维生素A含量高。应少于饮食的5%以避免中毒。" },

  // Dairy
  { name: "Plain Yogurt", nameZh: "原味酸奶", safe: "caution", category: "dairy", note: "Small amounts of plain, unsweetened yogurt are fine. Many dogs are lactose intolerant.", noteZh: "少量原味无糖酸奶可以。许多狗有乳糖不耐受。" },
  { name: "Cheese", nameZh: "奶酪", safe: "caution", category: "dairy", note: "Small amounts of low-fat cheese are okay. Watch for lactose intolerance.", noteZh: "少量低脂奶酪可以。注意乳糖不耐受。" },
  { name: "Milk", nameZh: "牛奶", safe: "caution", category: "dairy", note: "Many dogs are lactose intolerant. Can cause diarrhea and vomiting.", noteZh: "许多狗有乳糖不耐受。可能导致腹泻和呕吐。" },
  { name: "Ice Cream", nameZh: "冰淇淋", safe: "no", category: "dairy", note: "Too much sugar and dairy. Many contain xylitol which is toxic.", noteZh: "糖分和乳制品过多。许多含有有毒的木糖醇。" },

  // Grains
  { name: "Rice (cooked)", nameZh: "米饭（煮熟）", safe: "yes", category: "grain", note: "Plain white or brown rice is great for upset stomachs.", noteZh: "清水白米或糙米对肠胃不适很好。" },
  { name: "Oatmeal", nameZh: "燕麦", safe: "yes", category: "grain", note: "Cooked, plain oatmeal is a good source of fiber.", noteZh: "煮熟的原味燕麦是良好的纤维来源。" },
  { name: "Bread (plain)", nameZh: "面包（原味）", safe: "caution", category: "grain", note: "Small amounts of plain bread are fine. No nutritional benefit.", noteZh: "少量原味面包可以。没有营养价值。" },
  { name: "Pasta (plain, cooked)", nameZh: "意面（原味煮熟）", safe: "yes", category: "grain", note: "Plain cooked pasta is fine in moderation.", noteZh: "原味煮熟的意面适量可以。" },

  // Other
  { name: "Chocolate", nameZh: "巧克力", safe: "no", category: "other", note: "TOXIC! Contains theobromine. Dark chocolate is most dangerous. Call vet immediately if ingested.", noteZh: "有毒！含有可可碱。黑巧克力最危险。如果误食立即打电话给兽医。" },
  { name: "Xylitol (sweetener)", nameZh: "木糖醇（甜味剂）", safe: "no", category: "other", note: "EXTREMELY TOXIC! Found in sugar-free gum, candy, peanut butter. Can be fatal.", noteZh: "极度有毒！存在于无糖口香糖、糖果、花生酱中。可能致命。" },
  { name: "Peanut Butter (xylitol-free)", nameZh: "花生酱（无木糖醇）", safe: "yes", category: "other", note: "Great treat! ALWAYS check the label — some brands contain xylitol.", noteZh: "很好的零食！一定要看标签——有些品牌含有木糖醇。" },
  { name: "Honey", nameZh: "蜂蜜", safe: "caution", category: "other", note: "Small amounts are fine. High in sugar. Not for puppies or diabetic dogs.", noteZh: "少量可以。糖分高。不适合幼犬或糖尿病犬。" },
  { name: "Coconut", nameZh: "椰子", safe: "yes", category: "other", note: "Coconut flesh and oil are safe in moderation. Good for coat health.", noteZh: "椰肉和椰子油适量安全。对毛发健康有好处。" },
  { name: "Macadamia Nuts", nameZh: "澳洲坚果", safe: "no", category: "other", note: "TOXIC! Can cause vomiting, weakness, and hyperthermia.", noteZh: "有毒！可导致呕吐、虚弱和高热。" },
  { name: "Almonds", nameZh: "杏仁", safe: "no", category: "other", note: "Not toxic but hard to digest. Can cause choking and GI blockage.", noteZh: "不算有毒但难消化。可能导致窒息和胃肠堵塞。" },
  { name: "Caffeine / Coffee", nameZh: "咖啡因 / 咖啡", safe: "no", category: "other", note: "TOXIC! Stimulates the nervous system. Can cause restlessness, rapid breathing, seizures.", noteZh: "有毒！刺激神经系统。可导致烦躁、呼吸急促、抽搐。" },
  { name: "Alcohol", nameZh: "酒精", safe: "no", category: "other", note: "EXTREMELY TOXIC! Even small amounts can cause vomiting, diarrhea, coma, or death.", noteZh: "极度有毒！即使少量也可导致呕吐、腹泻、昏迷或死亡。" },
  { name: "Cooked Bones", nameZh: "煮熟的骨头", safe: "no", category: "other", note: "Can splinter and cause internal injuries or blockage. Always give raw bones only.", noteZh: "会碎裂并导致内伤或堵塞。只能给生骨头。" },
  { name: "Salt (excessive)", nameZh: "盐（过量）", safe: "no", category: "other", note: "Excessive salt can cause sodium ion poisoning. Symptoms: vomiting, diarrhea, seizures.", noteZh: "过量盐可导致钠离子中毒。症状：呕吐、腹泻、抽搐。" },
];
