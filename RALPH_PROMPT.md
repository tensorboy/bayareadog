# Ralph Prompt: Bay Area Dog (bayarea.dog)

## Command

```bash
/ralph-loop "$(cat RALPH_PROMPT.md)" --max-iterations 100 --completion-promise "BAYAREADOG_COMPLETE"
```

---

## Project Context

You are building **bayarea.dog** — the ultimate guide for dog owners in the Bay Area (and eventually all of the US). The project is a Next.js 16 + React 19 + TypeScript + Tailwind v4 website with next-intl for i18n, supporting **ALL major world languages**.

### Supported Languages (ALL must be implemented)
EN, ZH, ES, JA, KO, FR, DE, PT, IT, RU, AR, HI, TH, VI, ID, TR, NL, PL, SV, DA, NB, FI, CS, HE, MS, TL, UK, RO, HU, EL

That's **30 languages**. 分两层:

**UI 层 (30 languages):** 导航、按钮、分类名、页面标题、meta description 等 UI 文本
- Complete message file in `src/messages/{locale}.json`
- Correct locale in `src/i18n/routing.ts`
- Sitemap entries for every locale × every page
- hreflang alternates for SEO

**内容层 (EN + ZH only):** Trail 描述、餐厅介绍、食谱正文、长文章等深度内容
- 只做英文和中文两种语言的内容正文
- 其他 28 种语言显示英文内容 + 本地化 UI

**Implementation strategy:**
- Phase 1-3: Core 5 languages (EN, ZH, ES, JA, KO) — UI + 内容
- Phase 4: Add next 10 (FR, DE, PT, IT, RU, AR, HI, TH, VI, ID) — UI only
- Phase 5: Add remaining 15 (TR, NL, PL, SV, DA, NB, FI, CS, HE, MS, TL, UK, RO, HU, EL) — UI only
- RTL support for AR and HE (right-to-left layout)

The repo is at: `/Users/wangpengan/Desktop/bayareadog`

## Ultimate Vision

**一个湾区养狗人离不开的网站。** 不只是一个列表，而是一个"今天带狗去哪"的决策引擎。打开网站第一眼就知道——这就是我需要的。

核心价值：**让湾区的狗狗家长们，一下子就知道哪里拿到最好的狗的资源。**

覆盖 **吃喝玩乐学** — 从 hiking trail 到生骨肉购买、从狗友好餐厅到急诊兽医。

## Architecture Constraint: 纯前端，无后端

**严格要求 (Phase 1-6)：**
- **NO backend** — 不要创建任何 API routes、server actions、或数据库
- **NO login/auth** — 不要任何用户登录、注册功能
- **NO database** — 所有数据都是静态的，hardcode 在代码中或 JSON 文件中
- 这是一个 **纯静态内容网站**，用 Next.js SSG (Static Site Generation)
- 所有数据放在 `src/data/` 目录下的 TypeScript/JSON 文件中
- Newsletter 表单只做 UI（跳转 Google Form 或 mailto:）
- 地图用 Leaflet + OpenStreetMap（免费，不需要 API key）或 iframe embed
- "Submit a Spot" 用 Google Form 外链

**Phase 7 (v2) 例外:** 允许 Vercel Serverless Functions 做 RSS CORS 代理和天气/AQI 数据获取，但不存储用户数据。

---

## Phase 1: Foundation & Core Experience (Iterations 1-20)

### 地图为核心的首页体验
- [ ] 首页 Hero 下方直接放一张湾区互动地图，上面标满了所有地点
- [ ] 🟢 绿色 pin = off-leash trail/park
- [ ] 🟡 黄色 pin = on-leash trail
- [ ] 🍽️ 橙色 pin = dog-friendly 餐厅
- [ ] 🦴 红色 pin = 生骨肉/宠物店
- [ ] 🏥 蓝色 pin = 兽医
- [ ] 点击任何 pin → 弹出信息卡片（名字、评分、类型、一键导航链接）
- [ ] 地图可以按类型筛选（只看 trails、只看餐厅等）
- [ ] 用 Leaflet + OpenStreetMap（免费，无 API key）

### "Today's Pick" 智能推荐
- [ ] 首页顶部有一个 "Today's Pick" 区域
- [ ] 根据当前季节/星期推荐不同的地方:
  - 工作日 → 附近短距离 trail
  - 周末 → 远一点的 day trip
  - 夏天 → 有水可以游泳的地方
  - 冬天/雨天 → 室内友好的地方
- [ ] "Random Adventure 🎲" 按钮 — 随机推荐一个地方

### UI/UX Excellence
- [ ] Design a proper SVG logo (dog silhouette + "Bay Area Dog" text)
- [ ] Favicon and apple-touch-icon (dog paw themed)
- [ ] Smooth scroll animations (fade-in on scroll)
- [ ] Dark mode toggle
- [ ] Pixel-perfect responsive: mobile, tablet, desktop
- [ ] Loading skeleton screens
- [ ] 404 page with cute lost-dog theme
- [ ] Breadcrumb navigation
- [ ] Back-to-top button
- [ ] Mobile bottom tab navigation (像 App 一样)

### SEO 基础
- [ ] 每页独立 `<title>` + `<meta description>` (随语言扩展逐步增加)
- [ ] JSON-LD: WebSite, Organization, BreadcrumbList
- [ ] Open Graph + Twitter Cards
- [ ] sitemap.xml 包含所有页面 × 当前已支持的语言
- [ ] robots.txt
- [ ] canonical URLs + hreflang alternates
- [ ] RTL stylesheet/layout for Arabic and Hebrew

**Verify:** `npm run build` zero errors. 浏览器打开每个页面检查。

---

## Phase 2: Deep Content — Trails (Iterations 21-35)

### Trail 攻略 (最核心的内容，每个 trail 都是一篇深度攻略)

每个 Trail 的数据模板:
```
Fort Funston ★★★★★
📍 San Francisco | 🐕 Off-Leash | 💪 Easy | 📏 1.5 miles
🅿️ 停车: 免费停车场，周末 10am 后难找位
💧 水源: 没有饮水点，自带水
⚠️ 注意: 悬崖边缘危险，看好小型犬
🌡️ 最佳时间: 下午 3-5 点（风小，光线好）
🐾 地面: 沙地为主，对关节友好
📸 拍照点: 悬崖顶部可以拍到整个海滩
🍽️ 附近吃饭: Outerlands (0.8mi), Java Beach Cafe (0.5mi)
🏥 附近兽医: VCA SF Veterinary Specialists (3.2mi)
```

- [ ] 至少 **25 个 Bay Area trails**，按区域分:
  - San Francisco (6+): Fort Funston, Crissy Field, Lands End, Golden Gate Park, Ocean Beach, McLaren Park
  - East Bay (5+): Point Isabel, Cesar Chavez Park, Tilden Park, Redwood Regional, Lake Chabot
  - South Bay (4+): Rancho San Antonio, Shoreline Park, Baylands, Stevens Creek
  - North Bay/Marin (5+): Muir Woods周边, Tennessee Valley, Rodeo Beach, China Camp, Ring Mountain
  - Peninsula (3+): Pacifica Dog Beach, Pulgas Ridge, Sawyer Camp Trail
  - Day Trips (2+): Carmel Beach, Point Reyes

- [ ] 每个 trail 有独立的 URL slug 页面: `/en/trails/fort-funston`
- [ ] 每个 trail 详情页包含:
  - 嵌入式地图显示位置
  - On-leash / Off-leash 清晰标注（大 badge）
  - 难度、距离、海拔
  - 停车信息、最佳时间
  - 水源、地面类型、安全提示
  - 附近的餐厅/兽医链接（内链策略）
  - 官方网站链接
  - 适合的狗狗类型（大型犬/小型犬/老年犬/幼犬）
  - EN + ZH 内容正文（其他语言 fallback 到英文）

- [ ] Trail 列表页:
  - 按区域筛选: SF, East Bay, South Bay, North Bay, Peninsula
  - 按 On-leash / Off-leash 筛选
  - 按难度筛选: Easy, Moderate, Hard
  - 按特征筛选: Beach, Forest, Waterfront, Hills
  - 排序: 评分、距离、名字
  - 地图视图 / 列表视图 切换

### 按狗狗类型推荐
- [ ] **大型犬推荐** — 空间大、可以跑的 trail
- [ ] **小型犬推荐** — 平坦、安全的步道
- [ ] **老年犬推荐** — 短距离、平坦、有阴凉
- [ ] **幼犬推荐** — 有围栏的公园
- [ ] **水狗推荐** — 可以游泳的海滩和湖泊
- [ ] **社交恐惧犬** — 人少狗少的隐藏步道

**Verify:** 25+ trails with complete data. Each has its own page. Filters work. Map shows all trails.

---

## Phase 3: Deep Content — Eat, Shop, Play (Iterations 36-50)

### Eat: 餐厅 + 生骨肉 (独特卖点)
- [ ] **15+ dog-friendly restaurants** with: name, address, website, patio info, dog menu, price range, area
- [ ] **生骨肉购买完全指南** (这是我们的差异化优势):
  - [ ] **价格对比表**:
    | 食材 | 99 Ranch | H Mart | Marin Raw | Costco |
    |------|---------|--------|-----------|--------|
    | 鸡爪 | $1.99/lb | $2.49/lb | $4.99/lb | N/A |
    | 鸡脖子 | $1.29/lb | $1.79/lb | $3.99/lb | N/A |
    | 牛骨 | $2.99/lb | $3.49/lb | $5.99/lb | $3.99/lb |
  - [ ] **按预算推荐**:
    - 省钱版 ($30/月): 99 Ranch 鸡架 + 鸡肝 + 蛋壳粉
    - 标准版 ($60/月): Marin Raw 混合骨 + 内脏 + 鱼油
    - 豪华版 ($100+/月): 有机草饲 + 野生三文鱼 + Balance IT
  - [ ] **10+ raw food 购买点** with 地址、链接、特色产品
  - [ ] **新手入门指南**: "第一次喂生骨肉，花 $30 就够了"
  - [ ] **食材地图**: 标注所有可以买到生骨肉原料的地方

- [ ] **5+ homemade dog food recipes**:
  - 鸡肉蔬菜饭（基础款）
  - 牛肉红薯饭（增肌款）
  - 三文鱼蓝莓饭（美毛款）
  - 火鸡南瓜饭（减肥款）
  - 羊肉胡萝卜饭（过敏狗专用）
  - 每个食谱有: 食材比例、营养分析、注意事项、Balance IT 补充剂建议

### Shop: 宠物服务
- [ ] **Pet stores** (5+): Pet Food Express, Jeffrey's, Petco, etc.
- [ ] **Grooming** (3+): with price range, specialties
- [ ] **Vets** (5+): including 24-hour emergency vets with phone numbers
- [ ] **Training** (3+): obedience, agility, puppy classes
- [ ] Each with: address, website, phone, hours, Google Maps link

### Play: 公园 & 活动
- [ ] **15+ dog parks and beaches** with: fenced/unfenced, small/large dog areas, amenities, hours
- [ ] **Dog meetup groups** directory (local Facebook/WhatsApp/WeChat groups)
- [ ] **Seasonal events** placeholder
- [ ] **Day Trip 专题页面**:
  - Carmel Dog Beach (最狗友好的海滩)
  - Point Reyes (步道天堂)
  - Lake Tahoe (夏天带狗游泳)
  - Mendocino (北加海岸线)

**Verify:** All data real and accurate. All links work. Build passes.

---

## Phase 4: Interactive Features & i18n Expansion (Iterations 51-65)

### Search
- [ ] Client-side full-text search across all content
- [ ] Search results page with category filters
- [ ] Search autocomplete suggestions
- [ ] Works in all languages

### 实用工具页面
- [ ] **狗狗急救卡** — 可打印的 PDF/页面:
  - 24小时急诊兽医电话
  - ASPCA 毒物控制热线: (888) 426-4435
  - 常见中毒症状
  - 急救步骤
- [ ] **遛狗装备清单** — hiking 该带什么
- [ ] **食物安全速查** — 能吃 ✅ / 不能吃 ❌ 速查表（可搜索）
- [ ] **体重食量计算器** — 输入狗的体重 → 算出每天该吃多少生骨肉
  - 肌肉肉: X g
  - 骨头: X g
  - 内脏: X g
  - 蔬菜: X g

### i18n 扩展: +10 languages
- [ ] 新增 10 种语言 UI 翻译: FR, DE, PT, IT, RU, AR, HI, TH, VI, ID
- [ ] 每种语言完整 `src/messages/{locale}.json`
- [ ] AR 阿拉伯语 RTL 布局适配 (dir="rtl", CSS mirror)
- [ ] 语言切换器更新，支持 15 种语言
- [ ] Sitemap 更新: 15 locales × all pages

### 社区感 (无后端实现)
- [ ] **"Dog of the Week"** — 首页展示一只湾区狗狗（hardcode, 手动更新）
- [ ] **"Submit a Spot"** — Google Form 链接，让用户推荐新地点
- [ ] **社群入口** — 微信群二维码、Facebook Group 链接、WhatsApp 群链接
- [ ] **Instagram feed embed** — 嵌入 #bayareadog 相关帖子

### 季节性内容
- [ ] 根据月份显示不同的 banner/tips:
  - 🌸 春天: 野花 trail、跳蚤季节
  - ☀️ 夏天: 防暑、最佳游泳点、热地面预警
  - 🍂 秋天: 秋色 trail、狗友好 pumpkin patch
  - 🌧️ 冬天: 雨天室内活动、泥巴 trail 预警

**Verify:** Search works. Tools calculate correctly. All features functional.

---

## Phase 5: SEO Nuclear Mode + i18n Final (Iterations 66-80)

### i18n 扩展: +15 languages (最终 30 languages)
- [ ] 新增 15 种语言 UI 翻译: TR, NL, PL, SV, DA, NB, FI, CS, HE, MS, TL, UK, RO, HU, EL
- [ ] HE 希伯来语 RTL 布局适配
- [ ] 语言切换器支持全部 30 种语言（分组显示或搜索）
- [ ] Sitemap 更新: 30 locales × all pages
- [ ] 验证所有 30 种语言页面可正常渲染

### 目标: Google 搜索 "Bay Area dog trails" 排名前列

- [ ] 每个 trail/restaurant/shop 有独立 URL slug 页面
- [ ] 每个详情页有独立 JSON-LD:
  - Trail → Place + GeoCoordinates + AggregateRating
  - Restaurant → LocalBusiness + GeoCoordinates + OpeningHours
  - Article → Article + datePublished + author
  - Recipe → Recipe + nutrition
  - FAQ → FAQPage
- [ ] **内链策略**: trail ↔ 附近餐厅 ↔ 附近兽医 互链
- [ ] URL 结构: `/en/trails/fort-funston` (clean slugs)
- [ ] 每页独特 H1 含关键词
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] **SEO 长文章** (每篇 1500+ 字, 能在 Google 排名):
  - "Best Off-Leash Dog Beaches in the Bay Area (2026 Guide)"
  - "Where to Buy Raw Dog Food in San Francisco — Complete Guide"
  - "10 Best Dog-Friendly Restaurants with Patios in Oakland"
  - "Fort Funston Dog Beach: The Complete Guide"
  - "How to Start Raw Feeding Your Dog: Bay Area Edition"
  - "Bay Area Dog Parks: On-Leash vs Off-Leash Complete List"
  - "Emergency Vet Guide: Bay Area 24-Hour Animal Hospitals"
- [ ] 每个分类页有 300+ 字 SEO 介绍文本
- [ ] Google Search Console 验证文件
- [ ] 每篇文章底部有 "Related Articles" 推荐

### 差异化 (为什么用我们不用 Yelp)
确保以下独家内容做到极致:
- [ ] 生骨肉价格对比表 — Yelp 没有
- [ ] On/Off-leash 详细标注 — Yelp 没有
- [ ] 中文原生支持 — Yelp 没有
- [ ] 按狗狗类型推荐 — Yelp 没有
- [ ] 自制狗饭食谱 — Yelp 没有
- [ ] 食量计算器 — Yelp 没有

**Verify:** Build passes. Check JSON-LD with Google Rich Results Test. Check sitemap completeness.

---

## Phase 6: Performance & Final Polish (Iterations 81-100)

### Performance
- [ ] Lighthouse > 90 all categories
- [ ] Image optimization (next/image, proper sizes)
- [ ] Code splitting — lazy load maps
- [ ] Minimize bundle size
- [ ] Preload critical resources

### Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Proper heading hierarchy
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Color contrast AA
- [ ] Skip-to-content link

### Final Polish
- [ ] Review EVERY page in EVERY language
- [ ] Fix ALL visual inconsistencies
- [ ] Mobile experience perfect on all pages
- [ ] All external links verified working
- [ ] Consistent spacing, typography, colors
- [ ] No placeholder text remaining
- [ ] No TODO comments in code

### Ship
- [ ] README.md: project overview, tech stack, setup, deploy guide, how to add content
- [ ] Git commit all changes
- [ ] Push to GitHub
- [ ] Document deployment steps for Vercel

**When ALL complete:** `<promise>BAYAREADOG_COMPLETE</promise>`

---

## Phase 7: Dog News Monitor & Social Sharing (v2 Roadmap — 不在 100 轮范围内)

> **注意:** 此 Phase 不在 100 轮迭代范围内。仅作为 v2 路线图记录。
> 完成 Phase 1-6 后再考虑实现。允许使用 Vercel Serverless Functions 做 RSS CORS 代理。
>
> **参考项目:** [worldmonitor](https://github.com/koala73/worldmonitor) — 新闻聚合 + Story 分享 + 仪表盘的模式

### 🐾 Dog News Feed (狗狗新闻聚合)
- [ ] **RSS 新闻聚合面板** — 聚合 20+ 狗狗相关 RSS/新闻源:
  - 本地新闻: SF Chronicle Pets, Bay Area News Group, Patch.com pet sections
  - 行业媒体: AKC News, ASPCA News, PetMD, The Bark Magazine
  - Reddit: r/dogs, r/bayarea (dog posts), r/rawpetfood
  - 宠物召回警告: FDA Pet Food Recalls RSS
  - 本地政府: SF Animal Care, Oakland Animal Services 公告
- [ ] **新闻分类标签**:
  - 🚨 紧急: 宠物食品召回、狗狗走失、疫情爆发
  - ⚠️ 重要: 新法规、公园关闭、活动取消
  - 📰 一般: 领养活动、新店开业、社区故事
  - 🎉 好消息: 领养成功、新公园开放、优惠活动
- [ ] **新闻时间线** — 可视化最近 7 天的狗狗相关事件

### 📱 Story / Post 分享系统 (参考 worldmonitor 的 StoryModal)
- [ ] **Trail Story 卡片生成器** — 用户选一个 trail → 自动生成精美分享图:
  ```
  ┌──────────────────────┐
  │  🐕 Bay Area Dog     │
  │                      │
  │  Fort Funston        │
  │  ★★★★★ Off-Leash    │
  │  📍 San Francisco    │
  │  📏 1.5 mi | Easy    │
  │                      │
  │  🌊 Beach · Sand     │
  │  🅿️ Free Parking     │
  │                      │
  │  bayarea.dog/trails  │
  └──────────────────────┘
  ```
  - Canvas 渲染成 1080×1920 图片 (Instagram Story 尺寸)
  - 一键分享到: Instagram, Twitter/X, WhatsApp, WeChat, Facebook, Telegram
  - 深度链接 — 分享图上的 URL 链接回对应页面
- [ ] **"我今天遛了" 打卡分享** — 选 trail + 选心情 → 生成分享卡
- [ ] **生骨肉价格举报** — 用户提交最新价格 (Google Form → 手动更新数据)

### 🗺️ 实时监控仪表盘 (参考 worldmonitor 的 Dashboard)
- [ ] **Bay Area Dog Dashboard 页面** `/en/monitor`:
  - 实时天气 widget — 今天适不适合遛狗？
  - 空气质量指数 (AQI) — 烟雾季节尤其重要
  - 公园关闭/开放状态 — 嵌入官方公告
  - 近期宠物食品召回列表
  - 附近走失狗狗信息
  - 即将到来的狗狗活动日历
- [ ] **地图实时图层** (参考 worldmonitor 的 30+ layers):
  - 🟢 可用公园 (正常开放)
  - 🔴 关闭公园 (维修/天气)
  - 🟡 走失狗狗最后出现位置
  - 🔵 本周活动 (领养日、遛狗聚会)
  - 🌡️ 热度图 — 哪些 trail 最近最多人去

### 💬 社区帖子功能 (无后端实现)
- [ ] **"最近去过" 经验分享墙** — 嵌入 GitHub Discussions 或 Giscus 评论
- [ ] **Trail 评论系统** — 每个 trail 页面底部嵌入 Giscus (基于 GitHub Discussions, 无需后端)
- [ ] **Instagram/小红书 UGC embed** — 嵌入 #bayareadog 标签的帖子
- [ ] **微信公众号文章 RSS 聚合** — 湾区养狗相关公众号

### 技术实现 (纯前端)
- **RSS 代理**: Vercel Serverless Functions (仅做 RSS 代理 + CORS，不存数据)
- **分享图**: Canvas API 渲染，无需后端
- **评论**: Giscus (GitHub Discussions API)
- **表单提交**: Google Form 外链
- **天气/AQI**: 免费 API (OpenWeatherMap, AirNow)

---

## Competitive Research (每轮迭代都要做)

**每次迭代开始时，花 10% 的时间做竞品研究：**

### 标杆网站 (随机挑一个研究)
1. **BringFido.com** — 搜索和地点展示
2. **AllTrails.com** — trail 卡片、地图、筛选器
3. **Yelp.com** — 评分、标签、列表设计
4. **DogFriendly.com** — 分类和内容结构
5. **Sniffspot.com** — 预订体验、地图设计
6. **BarkPost.com** — 内容策略、社区感
7. **Rover.com** — 信任感设计、本地化
8. **TheDodo.com** — 故事性内容
9. GitHub: "dog park finder", "pet friendly map", "trail guide nextjs"
10. **WorldMonitor.app** — 新闻聚合、Story 分享、实时监控仪表盘、RSS 架构、Canvas story 渲染

### 学什么 & 立即应用
- UI/UX 最佳实践 → 立即改进一个组件
- SEO 策略 → 立即应用到一个页面
- 内容结构 → 立即改进一个数据模板
- 记录在 `RESEARCH_LOG.md`

---

## Randomness: 每轮迭代引入随机性

1. **随机选一个竞品研究** — 不要每次看同一个网站
2. **随机选改进方向** — 不连续 3 轮做同一类任务:
   - UI 改了 → 下轮做内容或 SEO
   - 内容加了 → 下轮做功能或视觉
   - 功能做了 → 下轮做打磨或研究
3. **随机挑一个页面深度打磨** — 不要总从首页开始
4. **偶尔做惊喜功能**:
   - 天气 widget 嵌入
   - "Random Trail 🎲" 按钮
   - "距离我最近" 排序
   - Easter egg (Konami code)
   - 狗狗友好指数评分
   - 动态季节 banner

---

## Self-Verification: 每轮必须验证

### 1. Build
```bash
npm run build
```
零错误，否则修复。

### 2. 浏览器视觉检查
用浏览器打开以下页面并检查:
- `http://localhost:3000/en` — 英文首页
- `http://localhost:3000/zh` — 中文首页
- `http://localhost:3000/ar` — 阿拉伯语首页 (检查 RTL 布局)
- `http://localhost:3000/en/trails` — 步道页面
- `http://localhost:3000/en/eat` — 美食页面
- 随机抽查 2-3 种其他语言
- 本轮修改过的页面

检查: 渲染正确、布局无误、文字无乱码、响应式正常、RTL 语言方向正确。

### 3. 链接验证
新增的外部链接必须可访问。

### 4. 多语言验证 (30 languages)
- 切换语言后内容正确更新
- 每轮至少验证 5 种不同语言（包括 1 种 RTL 语言）
- 语言切换器能正确列出所有 30 种语言
- URL 结构正确: `/fr/trails`, `/de/eat`, `/ar/shop` etc.

**发现问题 → 立即修复 → 再 commit。**

---

## Rules for Every Iteration

1. `npm run build` — 每轮结束必须零错误
2. 浏览器打开验证 — 不能只看代码
3. Commit progress — 每个重要功能完成后提交
4. Read before write — 先读现有代码再改
5. **30 种语言同步** — EN 改了，所有其他语言也要同步更新。可以批量复制翻译文件结构，但必须确保每种语言的翻译准确。RTL 语言 (AR, HE) 需要特殊布局处理
6. 真实数据 — 真实地名、真实地址、真实链接
7. 链接必须可用 — 不要 placeholder 链接
8. 不要过度工程 — 简单、干净、能用
9. 卡住 5 轮 → 换方向 — 记录 blocker 去做别的
10. Mobile-first — 先做手机布局
11. SEO 每页必做 — title, description, structured data
12. 竞品研究 — 每轮开始搜索学习
13. 记录学习 — RESEARCH_LOG.md
14. 随机性 — 不要每轮做同样的事
15. **纯前端** — 零后端、零登录、零数据库

## If stuck after 90 iterations:
- 在 `TODO.md` 记录未完成的任务
- 列出尝试过的方法和失败原因
- 如果 80%+ 完成，仍然输出 completion promise
