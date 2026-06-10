// lib/careersData.ts
// ── Single source of truth for all job listings ───────────────────────────
// Add new jobs here — page updates automatically.

export type Department =
  | "Engineering"
  | "Sales & Marketing"
  | "Operations"
  | "Finance"
  | "Customer Success"
  | "Design";

export type JobType = "Full-time" | "Part-time" | "Contract" | "Remote";

export type ExperienceLevel = "Entry Level" | "Mid Level" | "Senior" | "Lead";

export interface Job {
  id: number;
  slug: string;
  title: string;
  department: Department;
  type: JobType;
  level: ExperienceLevel;
  location: string; // e.g. "Dhaka, Bangladesh"
  salary: string; // e.g. "৳40,000 – ৳60,000 / month"
  posted: string; // Display string  e.g. "November 20, 2026"
  postedISO: string; // e.g. "2026-11-20"
  deadline: string; // e.g. "December 31, 2026"
  summary: string; // 1-2 lines — shown on card
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  tags: string[]; // skill tags shown on card
}

// ── Data ──────────────────────────────────────────────────────────────────
export const jobs: Job[] = [
  {
    id: 1,
    slug: "solar-sales-executive-dhaka",
    title: "Solar Sales Executive",
    department: "Sales & Marketing",
    type: "Full-time",
    level: "Mid Level",
    location: "Dhaka, Bangladesh",
    salary: "৳35,000 – ৳55,000 / month",
    posted: "November 20, 2026",
    postedISO: "2026-11-20",
    deadline: "December 31, 2026",
    summary:
      "Drive rooftop solar adoption by building relationships with homeowners and businesses across Dhaka division.",
    responsibilities: [
      "Identify and qualify leads for rooftop solar installations in assigned territories",
      "Conduct in-person and virtual consultations with prospective customers",
      "Prepare and present customized solar proposals and income projections",
      "Meet and exceed monthly installation targets and revenue goals",
      "Maintain accurate pipeline data in the CRM system",
      "Collaborate with the operations team to ensure smooth customer handover",
    ],
    requirements: [
      "2+ years of field sales or B2C sales experience",
      "Strong communication and interpersonal skills in Bengali and English",
      "Ability to work independently and manage a territory",
      "Basic understanding of solar energy or willingness to learn quickly",
      "Valid driving license and willingness to travel within Dhaka",
    ],
    niceToHave: [
      "Prior experience in renewable energy, real estate, or fintech sales",
      "Existing network of homeowners or SME contacts in Dhaka",
    ],
    tags: ["Sales", "B2C", "Solar", "CRM", "Bengali"],
  },
  {
    id: 2,
    slug: "iot-firmware-engineer",
    title: "IoT Firmware Engineer",
    department: "Engineering",
    type: "Full-time",
    level: "Senior",
    location: "Dhaka, Bangladesh",
    salary: "৳70,000 – ৳100,000 / month",
    posted: "November 18, 2026",
    postedISO: "2026-11-18",
    deadline: "December 28, 2026",
    summary:
      "Build and maintain the embedded firmware powering Solarxen's fleet of smart solar inverters and monitoring devices.",
    responsibilities: [
      "Design and develop firmware for Wi-Fi connected solar inverter monitoring units",
      "Implement reliable MQTT / HTTP data pipelines from device to cloud",
      "Optimize firmware for low-power operation and minimal data usage",
      "Write and maintain unit and integration tests for all firmware modules",
      "Collaborate with hardware engineers on PCB bring-up and validation",
      "Participate in OTA (over-the-air) update system design and rollout",
    ],
    requirements: [
      "3+ years of embedded C/C++ firmware development experience",
      "Experience with ESP32, STM32, or similar microcontroller platforms",
      "Strong understanding of MQTT, HTTP, and TCP/IP protocols",
      "Experience with FreeRTOS or similar RTOS environments",
      "Proficiency with debugging tools: JTAG, oscilloscope, logic analyzer",
    ],
    niceToHave: [
      "Experience with solar inverter or energy metering hardware",
      "Familiarity with AWS IoT Core or similar cloud IoT platforms",
      "Knowledge of Modbus or SunSpec protocols",
    ],
    tags: ["C/C++", "ESP32", "MQTT", "FreeRTOS", "IoT"],
  },
  {
    id: 3,
    slug: "backend-engineer-nodejs",
    title: "Backend Engineer (Node.js)",
    department: "Engineering",
    type: "Full-time",
    level: "Mid Level",
    location: "Dhaka, Bangladesh / Remote",
    salary: "৳55,000 – ৳80,000 / month",
    posted: "November 15, 2026",
    postedISO: "2026-11-15",
    deadline: "December 25, 2026",
    summary:
      "Design and build the APIs and data services powering Solarxen's customer dashboard, monitoring platform, and earnings engine.",
    responsibilities: [
      "Build and maintain RESTful APIs serving the Solarxen customer dashboard",
      "Design scalable data ingestion pipelines for real-time device telemetry",
      "Develop the earnings calculation and grid export tracking engine",
      "Write clean, well-tested code with unit and integration test coverage",
      "Participate in architecture decisions and code reviews",
      "Monitor and optimize system performance and reliability",
    ],
    requirements: [
      "3+ years of backend development experience with Node.js / TypeScript",
      "Strong understanding of REST API design and PostgreSQL",
      "Experience with time-series data or IoT telemetry pipelines",
      "Familiarity with AWS or similar cloud infrastructure",
      "Good understanding of authentication, security, and data privacy",
    ],
    niceToHave: [
      "Experience with InfluxDB or TimescaleDB for time-series data",
      "Prior work in energy, fintech, or IoT domains",
      "GraphQL or WebSocket experience",
    ],
    tags: ["Node.js", "TypeScript", "PostgreSQL", "AWS", "REST API"],
  },
  {
    id: 4,
    slug: "installation-operations-manager",
    title: "Installation Operations Manager",
    department: "Operations",
    type: "Full-time",
    level: "Senior",
    location: "Dhaka, Bangladesh",
    salary: "৳60,000 – ৳85,000 / month",
    posted: "November 12, 2026",
    postedISO: "2026-11-12",
    deadline: "December 20, 2026",
    summary:
      "Oversee Solarxen's rooftop installation operations across all active districts, ensuring quality, speed, and customer satisfaction.",
    responsibilities: [
      "Manage end-to-end installation scheduling across Dhaka, Chittagong, and expanding regions",
      "Coordinate with certified EPC partner teams to maintain quality and timelines",
      "Develop and enforce installation SOPs and quality checklists",
      "Track and report installation KPIs including completion rate, quality score, and NPS",
      "Handle escalations and complex installation scenarios",
      "Onboard and train new EPC partner organizations",
    ],
    requirements: [
      "4+ years of operations or project management experience",
      "Prior experience in construction, solar, telecom, or infrastructure deployment",
      "Strong organizational and team coordination skills",
      "Proficiency in project management tools (Asana, Jira, or similar)",
      "Excellent communication in Bengali and English",
    ],
    niceToHave: [
      "PMP or similar project management certification",
      "Prior experience managing distributed field teams",
      "Knowledge of solar PV system design and installation standards",
    ],
    tags: ["Operations", "Project Management", "Solar", "EPC", "Field Teams"],
  },
  {
    id: 5,
    slug: "customer-success-associate",
    title: "Customer Success Associate",
    department: "Customer Success",
    type: "Full-time",
    level: "Entry Level",
    location: "Dhaka, Bangladesh",
    salary: "৳22,000 – ৳32,000 / month",
    posted: "November 10, 2026",
    postedISO: "2026-11-10",
    deadline: "December 15, 2026",
    summary:
      "Be the first point of contact for Solarxen customers — helping them get the most from their solar installations and resolving issues quickly.",
    responsibilities: [
      "Handle inbound customer inquiries via phone, WhatsApp, and email",
      "Guide customers through dashboard onboarding and feature usage",
      "Coordinate with field teams to resolve installation and maintenance issues",
      "Log and track all customer interactions in the CRM system",
      "Identify patterns in customer issues and surface them to the product team",
      "Maintain a customer satisfaction (CSAT) score above team benchmark",
    ],
    requirements: [
      "Excellent communication skills in Bengali and English",
      "Patient, empathetic, and solution-oriented attitude",
      "Basic computer literacy and ability to learn new tools quickly",
      "Ability to work in a fast-paced, team-oriented environment",
    ],
    niceToHave: [
      "Prior experience in customer support or call center roles",
      "Familiarity with CRM tools like HubSpot or Zendesk",
    ],
    tags: ["Customer Support", "CRM", "WhatsApp", "Bengali", "Entry Level"],
  },
  {
    id: 6,
    slug: "digital-marketing-specialist",
    title: "Digital Marketing Specialist",
    department: "Sales & Marketing",
    type: "Full-time",
    level: "Mid Level",
    location: "Dhaka, Bangladesh / Remote",
    salary: "৳40,000 – ৳60,000 / month",
    posted: "November 8, 2026",
    postedISO: "2026-11-08",
    deadline: "December 10, 2026",
    summary:
      "Own Solarxen's digital marketing channels — driving awareness, leads, and conversions through content, SEO, and paid campaigns.",
    responsibilities: [
      "Plan and execute performance marketing campaigns on Facebook, Google, and YouTube",
      "Manage SEO strategy and content calendar for the Solarxen website and blog",
      "Create and optimize landing pages for lead generation campaigns",
      "Analyze campaign performance data and generate weekly reports",
      "Collaborate with the design team on ad creatives and social content",
      "Manage and grow Solarxen's social media presence across platforms",
    ],
    requirements: [
      "2+ years of digital marketing experience with proven ROI results",
      "Hands-on experience with Facebook Ads Manager and Google Ads",
      "Strong understanding of SEO, content marketing, and analytics",
      "Proficiency with Google Analytics, Search Console, and Meta Business Suite",
      "Excellent copywriting skills in Bengali and English",
    ],
    niceToHave: [
      "Experience marketing in the energy, fintech, or SaaS sector",
      "Video content creation or editing skills",
      "Knowledge of marketing automation tools",
    ],
    tags: ["Digital Marketing", "SEO", "Facebook Ads", "Google Ads", "Content"],
  },
  {
    id: 7,
    slug: "ui-ux-product-designer",
    title: "UI/UX Product Designer",
    department: "Design",
    type: "Full-time",
    level: "Mid Level",
    location: "Dhaka, Bangladesh / Remote",
    salary: "৳50,000 – ৳75,000 / month",
    posted: "November 5, 2026",
    postedISO: "2026-11-05",
    deadline: "December 5, 2026",
    summary:
      "Design intuitive, beautiful interfaces for Solarxen's customer dashboard, mobile app, and marketing website.",
    responsibilities: [
      "Own the end-to-end design process from research and wireframing to high-fidelity UI",
      "Design and maintain the Solarxen design system in Figma",
      "Collaborate closely with engineers to ensure pixel-perfect implementation",
      "Conduct user research and usability testing with customers",
      "Create motion and micro-interaction specs for key product moments",
      "Contribute to brand guidelines and visual identity standards",
    ],
    requirements: [
      "2+ years of product design experience with a strong portfolio",
      "Expert-level Figma skills including components, variants, and auto-layout",
      "Strong understanding of mobile-first design and accessibility standards",
      "Experience designing data-heavy dashboards or analytics interfaces",
      "Ability to communicate design rationale clearly to engineering and stakeholders",
    ],
    niceToHave: [
      "Experience with Lottie animations or Principle for prototyping",
      "Background in designing for energy, fintech, or IoT products",
      "Basic front-end HTML/CSS knowledge",
    ],
    tags: ["Figma", "UI/UX", "Dashboard Design", "Mobile", "Design System"],
  },
  {
    id: 8,
    slug: "finance-accounts-officer",
    title: "Finance & Accounts Officer",
    department: "Finance",
    type: "Full-time",
    level: "Mid Level",
    location: "Dhaka, Bangladesh",
    salary: "৳35,000 – ৳50,000 / month",
    posted: "November 2, 2026",
    postedISO: "2026-11-02",
    deadline: "November 30, 2026",
    summary:
      "Manage Solarxen's day-to-day financial operations including customer earnings payouts, vendor payments, and monthly reporting.",
    responsibilities: [
      "Process monthly customer earnings calculations and payout disbursements",
      "Manage accounts payable and receivable across vendor and partner relationships",
      "Prepare monthly financial statements and management reports",
      "Ensure compliance with Bangladesh tax regulations and filing requirements",
      "Support the finance team in budgeting and financial planning processes",
      "Maintain accurate financial records in the accounting system",
    ],
    requirements: [
      "Bachelor's degree in Finance, Accounting, or related field",
      "2+ years of accounting or finance operations experience",
      "Proficiency with accounting software (Tally, QuickBooks, or similar)",
      "Strong understanding of Bangladesh tax law and VAT regulations",
      "High attention to detail and accuracy in financial record-keeping",
    ],
    niceToHave: [
      "CA (partly qualified) or CMA certification",
      "Prior experience in a tech startup or energy company",
    ],
    tags: ["Finance", "Accounting", "Tally", "Payroll", "Tax"],
  },
];

// ── Helper functions ───────────────────────────────────────────────────────

/** All jobs sorted newest first */
export function getAllJobs(): Job[] {
  return [...jobs].sort(
    (a, b) => new Date(b.postedISO).getTime() - new Date(a.postedISO).getTime(),
  );
}

/** Filter by department — "all" returns everything */
export function getJobsByDepartment(dept: string): Job[] {
  if (dept === "all") return getAllJobs();
  return getAllJobs().filter((j) => j.department === dept);
}

/** Unique department list for filter pills */
export function getDepartments(): string[] {
  return Array.from(new Set(jobs.map((j) => j.department)));
}

/** Single job by slug */
export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}
