// lib/pressData.ts
// ── Single source of truth for all press releases ─────────────────────────
// Add new releases to this array — all pages update automatically.

export type PressCategory =
  | "Company News"
  | "Partnerships"
  | "Product Updates"
  | "Expansion"
  | "Sustainability";

export interface PressRelease {
  id: number;
  slug: string;
  category: PressCategory;
  catColor: "green" | "blue" | "yellow" | "teal" | "leaf";
  date: string; // Display string  e.g. "November 12, 2025"
  dateISO: string; // For <time> tag   e.g. "2025-11-12"
  headline: string;
  summary: string; // Short — used in list cards
  deck: string; // Italic intro paragraph in article
  readTime: string; // e.g. "5 min read"
  stats: {
    val: string;
    label: string;
    color: "green" | "yellow" | "blue" | "leaf";
  }[];
  body: PressBody[]; // Structured body blocks
  downloads: { label: string; size: string; icon: string }[];
  tags: string[];
}

// ── Body block types ───────────────────────────────────────────────────────
export type PressBody =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "pullQuote"; text: string; attribution: string }
  | { type: "highlight"; icon: string; title: string; text: string }
  | { type: "checklist"; title: string; items: string[] }
  | { type: "closing" }; // renders "###"

// ── Data ──────────────────────────────────────────────────────────────────
export const pressReleases: PressRelease[] = [
  // ── 1 ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    slug: "solarxen-crosses-800-rooftops-milestone",
    category: "Company News",
    catColor: "green",
    date: "November 12, 2025",
    dateISO: "2025-11-12",
    headline:
      "Solarxen Crosses 800 Connected Rooftops Milestone Across Bangladesh",
    summary:
      "Solarxen's rooftop solar network has reached a landmark 800+ connected installations, powering homes and businesses across 38 districts with clean energy and monthly income.",
    deck: "Solarxen's rooftop solar network has reached 800+ connected installations across 38 districts — marking a pivotal moment in Bangladesh's transition to distributed clean energy generation.",
    readTime: "5 min read",
    stats: [
      { val: "800+", label: "Rooftops Connected", color: "green" },
      { val: "4.2 MW", label: "Installed Capacity", color: "yellow" },
      { val: "420t", label: "CO₂ Eliminated", color: "leaf" },
      { val: "+18%", label: "Monthly Growth", color: "blue" },
    ],
    body: [
      {
        type: "paragraph",
        text: "<strong>DHAKA, Bangladesh — November 12, 2025</strong> — Solarxen, Bangladesh's fastest-growing rooftop solar income platform, today announced that its connected solar network has surpassed 800 active rooftop installations across 38 districts nationwide.",
      },
      {
        type: "paragraph",
        text: "The milestone represents a significant acceleration in Bangladesh's transition to distributed clean energy generation, with Solarxen's network now producing an estimated 18,600 kWh of clean electricity daily — enough to power approximately 1,860 average Bangladeshi households for a full day.",
      },
      { type: "heading", text: "Network Growth and Customer Impact" },
      {
        type: "paragraph",
        text: "Since its founding in 2022, Solarxen has grown from a small pilot program in Dhaka to a nationwide network spanning residential, commercial, and industrial properties. The company has connected an average of 127 new rooftops per month in the past quarter, representing an 18% month-over-month growth rate.",
      },
      {
        type: "paragraph",
        text: "Homeowners and businesses connected to the Solarxen network have collectively earned over ৳12 lakh in monthly income through energy savings and grid export payments — with individual customers earning between ৳2,000 and ৳6,000 per month depending on system size.",
      },
      {
        type: "pullQuote",
        text: "Every rooftop we connect is a family that reduces their electricity bill, earns monthly income, and contributes to a cleaner Bangladesh. Crossing 800 installations is more than a number — it is proof that the model works.",
        attribution: "CEO, Solarxen Bangladesh",
      },
      { type: "heading", text: "Geographic Expansion" },
      {
        type: "paragraph",
        text: "The 800-rooftop milestone spans eight major metropolitan areas and 30 surrounding districts. Dhaka and Chittagong account for approximately 48% of total installations, while secondary cities including Rajshahi, Sylhet, Khulna, and Barisal have seen accelerating adoption over the past six months.",
      },
      {
        type: "highlight",
        icon: "⚡",
        title: "Environmental Impact to Date",
        text: "Solarxen's network has eliminated 420 metric tonnes of CO₂ emissions since inception — equivalent to planting over 19,000 trees or removing approximately 90 cars from the road for a full year.",
      },
      { type: "heading", text: "Technology and Monitoring Infrastructure" },
      {
        type: "paragraph",
        text: "Each Solarxen installation is equipped with a Wi-Fi connected smart inverter that streams live performance data to Solarxen's cloud monitoring platform. The recently launched Solarxen mobile app gives customers real-time visibility into their energy production, grid export volume, and monthly earnings from any device.",
      },
      {
        type: "checklist",
        title: "Platform Capabilities",
        items: [
          "Real-time energy production monitoring across all connected rooftops",
          "Automated grid export tracking and monthly earnings calculation",
          "AI-powered performance anomaly detection and maintenance alerts",
          "Customer-facing mobile dashboard with live analytics",
          "Transparent monthly income reporting for all network members",
        ],
      },
      { type: "heading", text: "Looking Ahead" },
      {
        type: "paragraph",
        text: "Solarxen's roadmap for 2025 includes expanded commercial and industrial packages, a new partnership program for solar installers and EPC companies, and the launch of a rooftop solar financing product in collaboration with domestic financial institutions.",
      },
      { type: "closing" },
    ],
    downloads: [
      { label: "Full Press Release PDF", size: "284 KB", icon: "📄" },
      { label: "Media Kit 2025", size: "4.2 MB", icon: "📦" },
      { label: "Company Fact Sheet", size: "156 KB", icon: "📋" },
      { label: "Logo Pack (SVG/PNG)", size: "1.8 MB", icon: "🎨" },
    ],
    tags: ["milestone", "network", "growth", "bangladesh"],
  },

  // ── 2 ──────────────────────────────────────────────────────────────────
  {
    id: 2,
    slug: "solarxen-partners-epc-firms-installation-capacity",
    category: "Partnerships",
    catColor: "blue",
    date: "October 28, 2025",
    dateISO: "2025-10-28",
    headline:
      "Solarxen Partners with Three Major EPC Firms to Accelerate Installation Capacity",
    summary:
      "Strategic partnerships with leading engineering and construction companies will enable Solarxen to triple its monthly installation capacity heading into 2025.",
    deck: "Three strategic EPC partnerships will enable Solarxen to triple its monthly installation capacity, dramatically accelerating the expansion of Bangladesh's largest rooftop solar network.",
    readTime: "4 min read",
    stats: [
      { val: "3x", label: "Capacity Increase", color: "blue" },
      { val: "300+", label: "New Monthly Installs", color: "green" },
      { val: "Q1 2025", label: "Full Rollout", color: "yellow" },
      { val: "64", label: "Districts Target", color: "leaf" },
    ],
    body: [
      {
        type: "paragraph",
        text: "<strong>DHAKA, Bangladesh — October 28, 2025</strong> — Solarxen today announced strategic partnerships with three leading Engineering, Procurement & Construction (EPC) firms, a move that will triple the company's monthly rooftop installation capacity beginning Q1 2025.",
      },
      {
        type: "paragraph",
        text: "The partnerships — with firms operating across Dhaka, Chittagong, and Rajshahi divisions — will allow Solarxen to expand its certified installation network from 40 to over 120 active installation teams nationwide.",
      },
      { type: "heading", text: "Partnership Details" },
      {
        type: "paragraph",
        text: "Each EPC partner has completed Solarxen's rigorous technical certification program, covering system design standards, inverter configuration, safety protocols, and customer experience requirements. All partner installations are covered under Solarxen's standard monitoring and maintenance SLA.",
      },
      {
        type: "pullQuote",
        text: "These partnerships are not just about speed — they are about quality at scale. Every partner team is trained to deliver the same Solarxen standard that our customers expect.",
        attribution: "Head of Operations, Solarxen Bangladesh",
      },
      { type: "heading", text: "Impact on Expansion Timeline" },
      {
        type: "paragraph",
        text: "The expanded installation capacity will directly support Solarxen's target of reaching 2,500 connected rooftops by end of 2025 and coverage across all 64 Bangladesh districts by 2026.",
      },
      {
        type: "checklist",
        title: "Partner Certification Requirements",
        items: [
          "Solarxen system design and installation standards training",
          "Smart inverter configuration and commissioning certification",
          "Customer communication and handover protocol completion",
          "Safety and electrical compliance verification",
          "Minimum 10 supervised installations before independent deployment",
        ],
      },
      { type: "closing" },
    ],
    downloads: [
      { label: "Partnership Announcement PDF", size: "198 KB", icon: "📄" },
      { label: "EPC Program Overview", size: "876 KB", icon: "📋" },
    ],
    tags: ["partnerships", "epc", "expansion", "installation"],
  },

  // ── 3 ──────────────────────────────────────────────────────────────────
  {
    id: 3,
    slug: "solarxen-launches-realtime-dashboard-app",
    category: "Product Updates",
    catColor: "yellow",
    date: "October 5, 2025",
    dateISO: "2025-10-05",
    headline:
      "Solarxen Launches Real-Time Dashboard App for Rooftop Monitoring",
    summary:
      "The new Solarxen mobile app gives homeowners live visibility into their solar production, grid export, earnings, and system health — all from their phone.",
    deck: "Solarxen's new mobile dashboard puts live solar production data, earnings tracking, and system health monitoring directly in every customer's pocket.",
    readTime: "3 min read",
    stats: [
      { val: "Live", label: "Real-Time Data", color: "green" },
      { val: "iOS + Android", label: "Platforms", color: "blue" },
      { val: "847", label: "Active Users", color: "yellow" },
      { val: "99.8%", label: "Uptime", color: "leaf" },
    ],
    body: [
      {
        type: "paragraph",
        text: "<strong>DHAKA, Bangladesh — October 5, 2025</strong> — Solarxen today launched its customer-facing mobile dashboard application, available on both iOS and Android, giving all network members real-time visibility into their rooftop solar performance.",
      },
      { type: "heading", text: "Key Features" },
      {
        type: "checklist",
        title: "App Capabilities",
        items: [
          "Live production monitoring — see exactly how much your panels are generating right now",
          "Grid export tracking — monitor units sent to the national grid in real time",
          "Monthly earnings dashboard — transparent income reports updated daily",
          "System health score — instant alerts if performance drops below expected levels",
          "Historical analytics — week, month, and year-over-year production comparisons",
          "Maintenance request submission — report issues directly through the app",
        ],
      },
      {
        type: "pullQuote",
        text: "Transparency is at the heart of what Solarxen does. This app means every customer can see exactly what their rooftop is producing and exactly what they are earning — in real time, every day.",
        attribution: "CTO, Solarxen Bangladesh",
      },
      { type: "heading", text: "Availability" },
      {
        type: "paragraph",
        text: "The Solarxen Dashboard app is available immediately to all existing network members via the Google Play Store and Apple App Store. New customers will receive app access credentials upon installation completion.",
      },
      { type: "closing" },
    ],
    downloads: [
      { label: "Product Announcement PDF", size: "224 KB", icon: "📄" },
      { label: "App Screenshots Pack", size: "3.4 MB", icon: "🎨" },
    ],
    tags: ["product", "app", "technology", "monitoring"],
  },

  // ── 4 ──────────────────────────────────────────────────────────────────
  {
    id: 4,
    slug: "solarxen-expands-sylhet-rajshahi-divisions",
    category: "Expansion",
    catColor: "teal",
    date: "September 18, 2025",
    dateISO: "2025-09-18",
    headline: "Solarxen Expands Operations to Sylhet and Rajshahi Divisions",
    summary:
      "Following rapid growth in Dhaka and Chittagong, Solarxen is now accepting installation requests from homeowners and businesses in Sylhet and Rajshahi.",
    deck: "Solarxen's geographic footprint now covers four of Bangladesh's eight divisions, as the company accelerates its path to nationwide coverage by 2026.",
    readTime: "3 min read",
    stats: [
      { val: "4", label: "Divisions Active", color: "green" },
      { val: "38", label: "Districts Covered", color: "blue" },
      { val: "2026", label: "All 64 Districts", color: "yellow" },
      { val: "200+", label: "New Sites Planned", color: "leaf" },
    ],
    body: [
      {
        type: "paragraph",
        text: "<strong>DHAKA, Bangladesh — September 18, 2025</strong> — Solarxen today announced the formal expansion of its rooftop solar network into Sylhet and Rajshahi divisions, making the company's services available to homeowners and businesses across a significantly broader geographic footprint.",
      },
      { type: "heading", text: "Expansion Rationale" },
      {
        type: "paragraph",
        text: "Both Sylhet and Rajshahi divisions have demonstrated strong inbound demand from prospective customers over the past six months, with over 400 pre-registration inquiries received prior to today's announcement.",
      },
      {
        type: "highlight",
        icon: "🗺️",
        title: "Coverage Milestone",
        text: "With this expansion, Solarxen now operates across Dhaka, Chittagong, Sylhet, and Rajshahi divisions — covering approximately 62% of Bangladesh's total population.",
      },
      {
        type: "paragraph",
        text: "Khulna and Barisal divisions are scheduled to open for registrations in Q1 2025, with Mymensingh and Rangpur divisions following later in the year as Solarxen progresses toward its all-64-districts target.",
      },
      { type: "closing" },
    ],
    downloads: [
      { label: "Expansion Announcement PDF", size: "176 KB", icon: "📄" },
      { label: "Coverage Map", size: "890 KB", icon: "🗺️" },
    ],
    tags: ["expansion", "sylhet", "rajshahi", "geographic"],
  },

  // ── 5 ──────────────────────────────────────────────────────────────────
  {
    id: 5,
    slug: "solarxen-network-eliminates-420-tonnes-co2",
    category: "Sustainability",
    catColor: "leaf",
    date: "September 2, 2025",
    dateISO: "2025-09-02",
    headline:
      "Solarxen Network Eliminates 420 Tonnes of CO₂ in First Two Years",
    summary:
      "The Solarxen connected solar network has prevented 420 metric tonnes of carbon emissions since launch — equivalent to planting over 19,000 trees.",
    deck: "Two years after launch, Solarxen's connected rooftop network has eliminated 420 tonnes of carbon emissions — a milestone that underscores the environmental impact of distributed clean energy at scale.",
    readTime: "4 min read",
    stats: [
      { val: "420t", label: "CO₂ Eliminated", color: "leaf" },
      { val: "19,000+", label: "Trees Equivalent", color: "green" },
      { val: "90", label: "Cars Off Road / Year", color: "blue" },
      { val: "2 yrs", label: "Since Launch", color: "yellow" },
    ],
    body: [
      {
        type: "paragraph",
        text: "<strong>DHAKA, Bangladesh — September 2, 2025</strong> — Solarxen today released its second annual sustainability impact report, confirming that its connected rooftop solar network has eliminated 420 metric tonnes of CO₂ emissions since the company's founding in 2022.",
      },
      { type: "heading", text: "Environmental Impact Breakdown" },
      {
        type: "paragraph",
        text: "The 420-tonne figure represents verified emissions avoidance calculated against Bangladesh's grid emission factor of 0.6791 kg CO₂/kWh, as published by the Department of Environment. At current network scale, Solarxen's installations avoid an estimated 18 tonnes of CO₂ per day.",
      },
      {
        type: "highlight",
        icon: "🌿",
        title: "What 420 Tonnes of CO₂ Means",
        text: "420 tonnes of CO₂ is equivalent to planting 19,000 trees, removing 90 passenger vehicles from Bangladesh's roads for an entire year, or powering 1,500 Bangladeshi homes with clean electricity for 12 months.",
      },
      {
        type: "pullQuote",
        text: "Clean energy and economic opportunity are not a trade-off — they are the same thing. Every taka our customers earn is also a kilogram of CO₂ that Bangladesh did not emit.",
        attribution: "Head of Sustainability, Solarxen Bangladesh",
      },
      {
        type: "checklist",
        title: "Sustainability Commitments",
        items: [
          "Annual third-party verified carbon impact reporting",
          "10 trees planted for every new rooftop connected",
          "Zero-waste installation site policy",
          "End-of-life panel recycling program launching 2025",
          "Net-zero operations target by 2027",
        ],
      },
      { type: "closing" },
    ],
    downloads: [
      { label: "Sustainability Report 2025 PDF", size: "1.2 MB", icon: "📄" },
      { label: "Impact Infographic", size: "640 KB", icon: "🎨" },
      { label: "Carbon Methodology Note", size: "312 KB", icon: "📋" },
    ],
    tags: ["sustainability", "co2", "environment", "impact"],
  },

  // ── 6 ──────────────────────────────────────────────────────────────────
  {
    id: 6,
    slug: "solarxen-raises-seed-funding-rooftop-solar-network",
    category: "Company News",
    catColor: "green",
    date: "August 14, 2025",
    dateISO: "2025-08-14",
    headline:
      "Solarxen Raises Seed Funding to Expand Bangladesh's Rooftop Solar Network",
    summary:
      "Solarxen has closed a seed funding round to fuel nationwide expansion, technology development, and its growing network of connected rooftop installations.",
    deck: "Solarxen has closed its seed funding round, securing capital to accelerate nationwide expansion, deepen its technology platform, and scale the connected rooftop solar network across all 64 Bangladesh districts.",
    readTime: "4 min read",
    stats: [
      { val: "Seed", label: "Funding Round", color: "green" },
      { val: "2025", label: "Expansion Target", color: "blue" },
      { val: "3x", label: "Team Growth", color: "yellow" },
      { val: "64", label: "Districts by 2026", color: "leaf" },
    ],
    body: [
      {
        type: "paragraph",
        text: "<strong>DHAKA, Bangladesh — August 14, 2025</strong> — Solarxen today announced the close of its seed funding round, with participation from impact investors and climate-focused venture capital funds. The company is not disclosing the specific amount at this time.",
      },
      { type: "heading", text: "Use of Funds" },
      {
        type: "checklist",
        title: "Capital Allocation",
        items: [
          "Geographic expansion into six additional divisions by end of 2025",
          "Technology platform development — enhanced monitoring and analytics",
          "Team expansion across sales, operations, and engineering functions",
          "Rooftop solar financing product development",
          "EPC partner network certification and training program",
        ],
      },
      {
        type: "pullQuote",
        text: "This funding validates what we have always believed — that rooftop solar in Bangladesh is both a massive commercial opportunity and a genuine solution to the country's energy challenges.",
        attribution: "Founder & CEO, Solarxen Bangladesh",
      },
      { type: "closing" },
    ],
    downloads: [
      { label: "Funding Announcement PDF", size: "210 KB", icon: "📄" },
      { label: "Investor Fact Sheet", size: "445 KB", icon: "📋" },
    ],
    tags: ["funding", "investment", "growth", "company"],
  },

  // ── 7 ──────────────────────────────────────────────────────────────────
  {
    id: 7,
    slug: "solarxen-idcol-solar-financing-collaboration",
    category: "Partnerships",
    catColor: "blue",
    date: "July 29, 2025",
    dateISO: "2025-07-29",
    headline:
      "Solarxen and IDCOL Collaborate on Affordable Rooftop Solar Financing",
    summary:
      "A new financing collaboration will enable lower-income homeowners to access Solarxen's rooftop solar packages with flexible installment options.",
    deck: "A partnership with IDCOL will allow Solarxen to offer subsidized financing pathways, making rooftop solar income accessible to homeowners across all income segments in Bangladesh.",
    readTime: "3 min read",
    stats: [
      { val: "0%", label: "Interest Options", color: "green" },
      { val: "36mo", label: "Max Tenure", color: "blue" },
      { val: "50%", label: "Wider Reach", color: "yellow" },
      { val: "IDCOL", label: "Partner", color: "leaf" },
    ],
    body: [
      {
        type: "paragraph",
        text: "<strong>DHAKA, Bangladesh — July 29, 2025</strong> — Solarxen today announced a collaboration with IDCOL (Infrastructure Development Company Limited) to provide subsidized rooftop solar financing options for eligible homeowners across Bangladesh.",
      },
      {
        type: "paragraph",
        text: "The collaboration will offer qualified customers access to solar installation financing at concessional interest rates with tenures of up to 36 months, significantly lowering the barrier to entry for lower and middle-income households.",
      },
      {
        type: "highlight",
        icon: "🏠",
        title: "Who Benefits",
        text: "The financing program is designed for homeowners in peri-urban and rural areas who have suitable rooftop space but lack access to upfront capital for solar installation.",
      },
      { type: "closing" },
    ],
    downloads: [
      { label: "Partnership PDF", size: "188 KB", icon: "📄" },
      { label: "Financing Program Details", size: "322 KB", icon: "📋" },
    ],
    tags: ["partnerships", "financing", "idcol", "access"],
  },

  // ── 8 ──────────────────────────────────────────────────────────────────
  {
    id: 8,
    slug: "smart-inverter-integration-all-installations",
    category: "Product Updates",
    catColor: "yellow",
    date: "July 8, 2025",
    dateISO: "2025-07-08",
    headline:
      "Smart Inverter Integration Now Available for All Solarxen Installations",
    summary:
      "All new Solarxen installations now include Wi-Fi connected smart inverters with cloud analytics, enabling 24/7 remote performance monitoring.",
    deck: "Solarxen has standardized Wi-Fi connected smart inverters across all new installations, enabling live cloud monitoring and laying the foundation for future grid integration capabilities.",
    readTime: "3 min read",
    stats: [
      { val: "24/7", label: "Monitoring", color: "green" },
      { val: "Real-time", label: "Cloud Sync", color: "blue" },
      { val: "100%", label: "New Installs", color: "yellow" },
      { val: "<5min", label: "Alert Response", color: "leaf" },
    ],
    body: [
      {
        type: "paragraph",
        text: "<strong>DHAKA, Bangladesh — July 8, 2025</strong> — Solarxen today announced that all new rooftop installations will now include Wi-Fi connected smart inverters as standard equipment, enabling continuous cloud-based performance monitoring across the entire network.",
      },
      {
        type: "checklist",
        title: "Smart Inverter Capabilities",
        items: [
          "Live energy production data streamed every 60 seconds to Solarxen cloud",
          "Automatic fault detection with customer and team alerts",
          "Remote configuration and firmware updates without site visits",
          "Grid export metering integrated with earnings calculation engine",
          "Foundation for future VPP (Virtual Power Plant) participation",
        ],
      },
      { type: "closing" },
    ],
    downloads: [
      { label: "Product Update PDF", size: "195 KB", icon: "📄" },
      { label: "Smart Inverter Spec Sheet", size: "512 KB", icon: "📋" },
    ],
    tags: ["product", "inverter", "technology", "monitoring"],
  },

  // ── 9 ──────────────────────────────────────────────────────────────────
  {
    id: 9,
    slug: "solarxen-expands-khulna-barisal-q3-2025",
    category: "Expansion",
    catColor: "teal",
    date: "June 22, 2025",
    dateISO: "2025-06-22",
    headline: "Solarxen Announces Khulna and Barisal Expansion for Q3 2025",
    summary:
      "Continuing its national expansion strategy, Solarxen will begin accepting rooftop assessments in Khulna and Barisal divisions starting August 2025.",
    deck: "Solarxen's expansion into Khulna and Barisal divisions in Q3 2025 will bring the company's rooftop solar network to Bangladesh's coastal south, serving some of the country's most energy-underserved communities.",
    readTime: "3 min read",
    stats: [
      { val: "6", label: "Divisions by Q3", color: "green" },
      { val: "Aug 2025", label: "Go-Live Date", color: "blue" },
      { val: "150+", label: "Pre-Registrations", color: "yellow" },
      { val: "Coastal", label: "Focus Region", color: "leaf" },
    ],
    body: [
      {
        type: "paragraph",
        text: "<strong>DHAKA, Bangladesh — June 22, 2025</strong> — Solarxen today announced that it will formally launch operations in Khulna and Barisal divisions in August 2025, extending its rooftop solar network to Bangladesh's southern coastal regions.",
      },
      {
        type: "paragraph",
        text: "Both divisions have shown strong pre-registration interest, with over 150 homeowners and businesses signing up for priority assessment slots ahead of the official launch.",
      },
      {
        type: "highlight",
        icon: "🌊",
        title: "Coastal Energy Access",
        text: "Khulna and Barisal divisions are among Bangladesh's most energy-vulnerable regions, with frequent grid interruptions. Rooftop solar with battery backup options provides particular value for these communities.",
      },
      { type: "closing" },
    ],
    downloads: [
      { label: "Expansion Announcement PDF", size: "168 KB", icon: "📄" },
    ],
    tags: ["expansion", "khulna", "barisal", "coastal"],
  },
];

// ── Helper functions ───────────────────────────────────────────────────────

/** Get all press releases sorted newest first */
export function getAllPressReleases(): PressRelease[] {
  return [...pressReleases].sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime(),
  );
}

/** Get a single release by slug — returns undefined if not found */
export function getPressReleaseBySlug(slug: string): PressRelease | undefined {
  return pressReleases.find((p) => p.slug === slug);
}

/** Get all slugs — used by getStaticPaths */
export function getAllSlugs(): string[] {
  return pressReleases.map((p) => p.slug);
}

/** Get related releases (same category, excluding current, max 3) */
export function getRelatedReleases(
  current: PressRelease,
  count = 3,
): PressRelease[] {
  return (
    pressReleases
      .filter((p) => p.id !== current.id && p.category === current.category)
      .slice(0, count)
      // fallback: if not enough same-category, fill from others
      .concat(
        pressReleases
          .filter((p) => p.id !== current.id && p.category !== current.category)
          .slice(0, count),
      )
      .slice(0, count)
  );
}
