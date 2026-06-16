// pages/index.tsx
"use client";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import {
  FaArrowRight,
  FaBolt,
  FaCoins,
  FaMobileAlt,
  FaCheckCircle,
  FaPlay,
  FaHome,
  FaShieldAlt,
  FaRocket,
  FaArrowDown,
  FaBroadcastTower,
  FaChartLine,
  FaMapMarkedAlt,
  FaMoneyBillWave,
  FaSolarPanel,
  FaTachometerAlt,
  FaTools,
  FaUserCheck,
  FaPiggyBank,
  FaStore,
  FaGift,
  FaHandHoldingUsd,
  FaLeaf,
  FaNetworkWired,
} from "react-icons/fa";
import {
  MdSolarPower,
  MdElectricBolt,
  MdMonitor,
  MdSettingsInputAntenna,
} from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import styles from "@/styles/Home.module.scss";
import Packages from "@/component/packages";
import CTA from "@/component/cta";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Link from "next/link";

// ── InView Hook ────────────────────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Energy Flow Diagram (Section 4 visual) ─────────────────────────────────
function EnergyFlowDiagram({ active }: { active: boolean }) {
  const steps = [
    {
      icon: <FaHome />,
      label: "Power Home/Business",
      desc: "Priority 1: Your energy first",
    },
    {
      icon: <MdMonitor />,
      label: "Monitor Performance",
      desc: "Live tracking & data logging",
    },
    {
      icon: <MdElectricBolt />,
      label: "Export Excess Energy",
      desc: "Surplus sent to the grid",
    },
    {
      icon: <FaCoins />,
      label: "Track Savings & Earnings",
      desc: "Net metering credits",
    },
  ];
  return (
    <div className={styles.flowDiagram}>
      {steps.map((s, i) => (
        <div key={i} className={styles.flowDiagram__step}>
          <div
            className={`${styles.flowDiagram__num} ${active ? styles["flowDiagram__num--active"] : ""}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            {i + 1}
          </div>
          <div className={styles.flowDiagram__card}>
            <div className={styles.flowDiagram__icon}>{s.icon}</div>
            <div>
              <strong>{s.label}</strong>
              <span>{s.desc}</span>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className={styles.flowDiagram__arrow}>
              <FaArrowDown />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Hero Visual — Dashboard + Sun + Energy flow SVG ───────────────────────
function HeroVisual() {
  return (
    <div className={styles.heroVisual}>
      <div className={styles.heroVisual__card}>
        <div className={styles.heroVisual__header}>
          <MdSolarPower className={styles.heroVisual__headerLogo} />
          <span>Live Energy Overview</span>
          <span className={styles.liveBadge}>
            <span className={styles.liveDot} />
            Live
          </span>
        </div>

        {/* SVG illustration */}
        <svg viewBox="0 0 320 200" className={styles.heroVisual__svg}>
          <defs>
            <linearGradient id="hvSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8F5EE" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
          <rect width="320" height="200" fill="url(#hvSky)" rx="14" />

          {/* Sun */}
          <circle cx="266" cy="38" r="22" fill="#F9B233" opacity="0.9">
            <animate
              attributeName="r"
              values="20;24;20"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Ground */}
          <rect x="0" y="165" width="320" height="35" fill="#E8F5EE" />

          {/* House with panels */}
          <rect
            x="30"
            y="100"
            width="140"
            height="65"
            fill="white"
            stroke="#E2E8F0"
            strokeWidth="1.5"
            rx="2"
          />
          <polygon
            points="10,100 100,52 190,100"
            fill="#0B6B3A"
            opacity="0.88"
          />
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={48 + col * 26 - row * 11}
                y={64 + row * 11 + col}
                width={22}
                height={9}
                fill="#1A8A4A"
                stroke="#0B6B3A"
                strokeWidth="0.4"
                rx="1"
                transform={`rotate(-30, ${48 + col * 26 - row * 11 + 11}, ${64 + row * 11 + col + 4})`}
                opacity="0.9"
              />
            )),
          )}
          {/* windows + door */}
          <rect
            x="46"
            y="118"
            width="26"
            height="20"
            fill="#E3F2FD"
            rx="2"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          <rect
            x="138"
            y="118"
            width="26"
            height="20"
            fill="#E3F2FD"
            rx="2"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          <rect
            x="86"
            y="128"
            width="36"
            height="37"
            fill="#C8E6C9"
            rx="3"
            stroke="#E2E8F0"
            strokeWidth="1"
          />

          {/* Energy line to grid tower */}
          <line
            x1="190"
            y1="95"
            x2="240"
            y2="120"
            stroke="#F9B233"
            strokeWidth="1.5"
            strokeDasharray="4,3"
            opacity="0.8"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-14"
              dur="1s"
              repeatCount="indefinite"
            />
          </line>

          {/* Grid tower */}
          <line
            x1="240"
            y1="120"
            x2="240"
            y2="165"
            stroke="#94A3B8"
            strokeWidth="3"
          />
          <line
            x1="222"
            y1="135"
            x2="258"
            y2="135"
            stroke="#94A3B8"
            strokeWidth="2"
          />
          <line
            x1="226"
            y1="148"
            x2="254"
            y2="148"
            stroke="#94A3B8"
            strokeWidth="2"
          />
          <circle cx="240" cy="120" r="6" fill="#1E88E5" />
          <text
            x="240"
            y="180"
            textAnchor="middle"
            fontSize="8"
            fill="#475569"
            fontWeight="700"
          >
            GRID
          </text>

          {/* Export badge */}
          <rect
            x="198"
            y="78"
            width="78"
            height="24"
            rx="12"
            fill="#0B6B3A"
            opacity="0.92"
          />
          <text
            x="237"
            y="94"
            textAnchor="middle"
            fontSize="9"
            fill="white"
            fontWeight="700"
          >
            Export: 2.4 kW
          </text>

          {/* House label */}
          <rect
            x="20"
            y="36"
            width="76"
            height="24"
            rx="12"
            fill="#1E88E5"
            opacity="0.92"
          />
          <text
            x="58"
            y="52"
            textAnchor="middle"
            fontSize="9"
            fill="white"
            fontWeight="700"
          >
            Home: 3.8 kW
          </text>
        </svg>

        {/* Stats row */}
        <div className={styles.heroVisual__stats}>
          <div className={styles.heroVisual__stat}>
            <span
              className={`${styles.heroVisual__statVal} ${styles["heroVisual__statVal--green"]}`}
            >
              6.2 kW
            </span>
            <span className={styles.heroVisual__statLabel}>
              Total Generated
            </span>
          </div>
          <div className={styles.heroVisual__statDiv} />
          <div className={styles.heroVisual__stat}>
            <span
              className={`${styles.heroVisual__statVal} ${styles["heroVisual__statVal--blue"]}`}
            >
              3.8 kW
            </span>
            <span className={styles.heroVisual__statLabel}>Used at Home</span>
          </div>
          <div className={styles.heroVisual__statDiv} />
          <div className={styles.heroVisual__stat}>
            <span
              className={`${styles.heroVisual__statVal} ${styles["heroVisual__statVal--yellow"]}`}
            >
              2.4 kW
            </span>
            <span className={styles.heroVisual__statLabel}>Exported</span>
          </div>
        </div>

        {/* Earnings footer */}
        <div className={styles.heroVisual__footer}>
          <FaCoins className={styles.heroVisual__footerIcon} />
          <span>
            This month's net metering credit: <strong>৳3,840</strong>
          </span>
        </div>
      </div>

      {/* Floating bill card */}
      <div className={styles.heroVisual__float1}>
        <FaArrowDown className={styles.heroVisual__float1Icon} />
        <div>
          <strong>-62%</strong>
          <span>Electricity Bill</span>
        </div>
      </div>

      {/* Floating app card */}
      <div className={styles.heroVisual__float2}>
        <FaMobileAlt className={styles.heroVisual__float2Icon} />
        <div>
          <strong>Live App</strong>
          <span>Monitor anytime</span>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════
const HomePage: NextPage = () => {
  const { ref: flowRef, inView: flowInView } = useInView(0.3);

  // ── "Why Solarxen" — 6 updated cards ─────────────────────────────────────
  const whyCards = [
    {
      icon: <FaBolt />,
      title: "Lower Electricity Bills",
      desc: "Generate your own clean energy and reduce monthly electricity costs.",
      color: "green",
    },
    {
      icon: <FaCoins />,
      title: "Earn from Excess Power",
      desc: "Export surplus electricity to the grid and receive energy credits or earnings.",
      color: "yellow",
    },
    {
      icon: <MdMonitor />,
      title: "Real-Time Monitoring",
      desc: "Track production, consumption, exports, and savings anytime.",
      color: "blue",
    },
    {
      icon: <MdSettingsInputAntenna />,
      title: "Smart Energy Management",
      desc: "Automated monitoring and intelligent energy flow management.",
      color: "green",
    },
    {
      icon: <FaShieldAlt />,
      title: "Reliable Maintenance",
      desc: "Ongoing support and system health monitoring.",
      color: "blue",
    },
    {
      icon: <FaRocket />,
      title: "Future-Ready Platform",
      desc: "Built for smart grids, carbon credits, and future energy innovations.",
      color: "yellow",
    },
  ];

  return (
    <>
      <Head>
        <title>
          Solarxen — Power Your Home, Lower Your Bills, Earn from Excess Energy
        </title>
        <meta
          name="description"
          content="Generate clean electricity with a Solarxen rooftop solar package. Use energy in your home or business first, then automatically export excess power to the grid and earn through net metering."
        />
      </Head>
      <Header />
      <main className={styles.main}>
        {/* ═══════════════════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════════════════ */}
        <section className={styles.hero}>
          <div className={styles.hero__bgGrid} />
          <div className={styles.hero__bgGlow1} />
          <div className={styles.hero__bgGlow2} />

          <Container>
            <Row className="align-items-center g-5">
              <Col lg={6} className={styles.hero__left}>
                <Badge className={styles.sectionBadge}>
                  <span className={styles.liveDot} /> Net Metering Enabled
                </Badge>

                <h1 className={styles.hero__headline}>
                  Power Your Home.
                  <br />
                  Lower Your Bills.
                  <br />
                  <span className={styles.hero__accent}>
                    Earn from Excess Energy.
                  </span>
                </h1>

                <p className={styles.hero__sub}>
                  Solarxen is a rooftop solar platform where customers purchase
                  a Solarxen solar package and install it on their homes or
                  businesses. The system prioritizes self-consumption, meaning
                  generated electricity is used by the customer first. Any
                  excess electricity is exported to the national grid through
                  net metering.
                </p>

                <div className={styles.hero__actions}>
                  <Button className={styles.btn__primary}>
                    Get Free Consultation <FaArrowRight />
                  </Button>

                  <Link href="/how-it-works" className={styles.btn__outline}>
                    <FaPlay /> See How It Works
                  </Link>
                </div>

                {/* quick trust row */}
                <div className={styles.hero__trust}>
                  <div className={styles.hero__trustItem}>
                    <FaCheckCircle className={styles.hero__trustIcon} />
                    <span>Free Site Assessment</span>
                  </div>
                  <div className={styles.hero__trustItem}>
                    <FaCheckCircle className={styles.hero__trustIcon} />
                    <span>Net Metering Setup Included</span>
                  </div>
                  <div className={styles.hero__trustItem}>
                    <FaCheckCircle className={styles.hero__trustIcon} />
                    <span>24/7 Smart Monitoring</span>
                  </div>
                </div>
              </Col>

              <Col lg={6}>
                <HeroVisual />
              </Col>
            </Row>
          </Container>
        </section>
        <section className={styles.featureSection}>
          <Container>
            <Badge className={styles.sectionBadge}>Key features</Badge>
            <div className={styles.monitorSection__features}>
              {[
                {
                  icon: <FaSolarPanel />,
                  label: "Rooftop solar package management",
                },
                { icon: <FaUserCheck />, label: "Customer onboarding and KYC" },
                {
                  icon: <FaMapMarkedAlt />,
                  label: "Site and inverter registration",
                },
                {
                  icon: <FaBroadcastTower />,
                  label: "Real-time inverter and energy monitoring",
                },
                {
                  icon: <FaChartLine />,
                  label: "Energy production, consumption, and export analytics",
                },
                {
                  icon: <FaMoneyBillWave />,
                  label: "Monthly earnings/credit dashboard",
                },
                {
                  icon: <FaPiggyBank />,
                  label: "ROI and lifetime savings tracking",
                },
                { icon: <FaTools />, label: "Maintenance ticket system" },
                {
                  icon: <FaTachometerAlt />,
                  label:
                    "Admin dashboard for monitoring all connected solar systems",
                },
              ].map((f, i) => (
                <div key={i} className={styles.monitorSection__feature}>
                  <span className={styles.monitorSection__featureIcon}>
                    {f.icon}
                  </span>
                  {f.label}
                </div>
              ))}
            </div>
            <Badge className={styles.sectionBadge}>
              Future Phases may Include
            </Badge>
            <div className={styles.monitorSection__features}>
              {[
                {
                  icon: <FaHandHoldingUsd />,
                  label: "Solar Financing",
                },
                { icon: <FaGift />, label: "Rewards & Incentives" },
                {
                  icon: <FaLeaf />,
                  label: "Carbon Credit Management",
                },
                {
                  icon: <FaNetworkWired />,
                  label: "Virtual Power Plant (VPP)",
                },
                {
                  icon: <FaStore />,
                  label: "Energy Marketplace",
                },
              ].map((f, i) => (
                <div key={i} className={styles.monitorSection__feature}>
                  <span className={styles.monitorSection__featureIcon}>
                    {f.icon}
                  </span>
                  {f.label}
                </div>
              ))}
            </div>
          </Container>
        </section>
        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 — SAVE MORE EVERY MONTH
        ═══════════════════════════════════════════════════════════════ */}
        <section className={styles.saveSection}>
          <Container>
            <Row className="align-items-center g-5">
              <Col lg={6} className="order-lg-1 order-2">
                <Badge className={styles.sectionBadge}>Savings</Badge>
                <h2 className={styles.sectionTitle}>Save More Every Month</h2>
                <p className={styles.sectionSubLeft}>
                  Reduce dependence on expensive grid electricity and lower your
                  monthly energy bills. Every unit your rooftop generates is a
                  unit you don't have to buy from the grid.
                </p>

                {/* Bill comparison bars */}
                <div className={styles.billCompare}>
                  <div className={styles.billCompare__row}>
                    <span className={styles.billCompare__label}>
                      Before Solarxen
                    </span>
                    <div className={styles.billCompare__track}>
                      <div
                        className={`${styles.billCompare__fill} ${styles["billCompare__fill--gray"]}`}
                        style={{ width: "100%" }}
                      />
                    </div>
                    <span className={styles.billCompare__value}>৳6,200</span>
                  </div>
                  <div className={styles.billCompare__row}>
                    <span className={styles.billCompare__label}>
                      After Solarxen
                    </span>
                    <div className={styles.billCompare__track}>
                      <div
                        className={`${styles.billCompare__fill} ${styles["billCompare__fill--green"]}`}
                        style={{ width: "38%" }}
                      />
                    </div>
                    <span
                      className={`${styles.billCompare__value} ${styles["billCompare__value--green"]}`}
                    >
                      ৳2,360
                    </span>
                  </div>
                </div>

                <div className={styles.saveSection__badge}>
                  <FaArrowDown />
                  <div>
                    <strong>Save up to 62%</strong>
                    <span>on your monthly electricity bill</span>
                  </div>
                </div>
              </Col>

              <Col lg={6} className="order-lg-2 order-1">
                <div className={styles.saveSection__visual}>
                  <svg
                    viewBox="0 0 320 260"
                    className={styles.saveSection__svg}
                  >
                    <defs>
                      <linearGradient id="saveGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E8F5EE" />
                        <stop offset="100%" stopColor="#FFFFFF" />
                      </linearGradient>
                    </defs>
                    <rect
                      width="320"
                      height="260"
                      fill="url(#saveGrad)"
                      rx="16"
                    />

                    {/* Coin stack growing */}
                    {[
                      { y: 200, w: 60, opacity: 0.5 },
                      { y: 175, w: 80, opacity: 0.65 },
                      { y: 150, w: 100, opacity: 0.8 },
                      { y: 120, w: 130, opacity: 1 },
                    ].map((c, i) => (
                      <g key={i}>
                        <ellipse
                          cx={160}
                          cy={c.y}
                          rx={c.w / 2}
                          ry="14"
                          fill="#F9B233"
                          opacity={c.opacity}
                        />
                        <ellipse
                          cx={160}
                          cy={c.y - 4}
                          rx={c.w / 2}
                          ry="14"
                          fill="#FFD774"
                          opacity={c.opacity}
                        />
                      </g>
                    ))}

                    {/* Up arrow */}
                    <path
                      d="M250,180 L250,90 M232,108 L250,90 L268,108"
                      stroke="#0B6B3A"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.4;1;0.4"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </path>

                    {/* Down arrow for bill */}
                    <path
                      d="M70,80 L70,170 M52,152 L70,170 L88,152"
                      stroke="#94A3B8"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.5"
                    />

                    {/* Labels */}
                    <rect
                      x="20"
                      y="20"
                      width="100"
                      height="28"
                      rx="14"
                      fill="#94A3B8"
                      opacity="0.85"
                    />
                    <text
                      x="70"
                      y="38"
                      textAnchor="middle"
                      fontSize="10"
                      fill="white"
                      fontWeight="700"
                    >
                      Bill ↓ 62%
                    </text>

                    <rect
                      x="200"
                      y="20"
                      width="100"
                      height="28"
                      rx="14"
                      fill="#0B6B3A"
                      opacity="0.92"
                    />
                    <text
                      x="250"
                      y="38"
                      textAnchor="middle"
                      fontSize="10"
                      fill="white"
                      fontWeight="700"
                    >
                      Savings ↑
                    </text>

                    <text
                      x="160"
                      y="240"
                      textAnchor="middle"
                      fontSize="11"
                      fill="#0B6B3A"
                      fontWeight="800"
                    >
                      ৳3,840 saved this month
                    </text>
                  </svg>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 — EARN FROM EXCESS ENERGY
        ═══════════════════════════════════════════════════════════════ */}
        <section className={styles.earnSection}>
          <Container>
            <Row className="align-items-center g-5">
              <Col lg={6}>
                <div className={styles.earnSection__visual}>
                  <svg
                    viewBox="0 0 320 260"
                    className={styles.earnSection__svg}
                  >
                    <defs>
                      <linearGradient id="earnGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#E8F5EE" />
                        <stop offset="100%" stopColor="#FFF8E7" />
                      </linearGradient>
                    </defs>
                    <rect
                      width="320"
                      height="260"
                      fill="url(#earnGrad)"
                      rx="16"
                    />

                    {/* House */}
                    <rect
                      x="30"
                      y="120"
                      width="110"
                      height="70"
                      fill="white"
                      stroke="#E2E8F0"
                      strokeWidth="1.5"
                      rx="3"
                    />
                    <polygon
                      points="15,120 85,75 155,120"
                      fill="#0B6B3A"
                      opacity="0.88"
                    />
                    {[0, 1].map((row) =>
                      [0, 1, 2].map((col) => (
                        <rect
                          key={`${row}-${col}`}
                          x={36 + col * 24 - row * 9}
                          y={84 + row * 11}
                          width={20}
                          height={8}
                          fill="#1A8A4A"
                          stroke="#0B6B3A"
                          strokeWidth="0.4"
                          rx="1"
                          transform={`rotate(-25, ${36 + col * 24 - row * 9 + 10}, ${84 + row * 11 + 4})`}
                          opacity="0.9"
                        />
                      )),
                    )}
                    <rect
                      x="48"
                      y="138"
                      width="22"
                      height="18"
                      fill="#E3F2FD"
                      rx="2"
                    />
                    <rect
                      x="95"
                      y="148"
                      width="28"
                      height="32"
                      fill="#C8E6C9"
                      rx="2"
                    />

                    {/* Transmission line with energy flow */}
                    <line
                      x1="155"
                      y1="115"
                      x2="250"
                      y2="100"
                      stroke="#F9B233"
                      strokeWidth="2"
                      strokeDasharray="6,4"
                      opacity="0.8"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="-20"
                        dur="1.2s"
                        repeatCount="indefinite"
                      />
                    </line>
                    <circle r="4" fill="#F9B233">
                      <animateMotion
                        dur="1.5s"
                        repeatCount="indefinite"
                        path="M155,115 L250,100"
                      />
                    </circle>

                    {/* Grid / national grid icon */}
                    <circle
                      cx="255"
                      cy="95"
                      r="34"
                      fill="#1E88E5"
                      opacity="0.12"
                    >
                      <animate
                        attributeName="r"
                        values="30;38;30"
                        dur="2.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx="255"
                      cy="95"
                      r="24"
                      fill="#1E88E5"
                      opacity="0.9"
                    />
                    <text
                      x="255"
                      y="100"
                      textAnchor="middle"
                      fontSize="11"
                      fill="white"
                    >
                      ⚡
                    </text>
                    <text
                      x="255"
                      y="140"
                      textAnchor="middle"
                      fontSize="9"
                      fill="#475569"
                      fontWeight="700"
                    >
                      National Grid
                    </text>

                    {/* Net metering badge */}
                    <rect
                      x="60"
                      y="200"
                      width="200"
                      height="40"
                      rx="14"
                      fill="#0B6B3A"
                      opacity="0.92"
                    />
                    <text
                      x="160"
                      y="218"
                      textAnchor="middle"
                      fontSize="10.5"
                      fill="white"
                      fontWeight="800"
                    >
                      Net Metering Active
                    </text>
                    <text
                      x="160"
                      y="232"
                      textAnchor="middle"
                      fontSize="8.5"
                      fill="rgba(255,255,255,0.8)"
                    >
                      Exported: 2.4 kW · Credit: ৳3,840
                    </text>
                  </svg>
                </div>
              </Col>
              <Col lg={6}>
                <Badge className={styles.sectionBadge}>Net Metering</Badge>
                <h2 className={styles.sectionTitle}>Earn from Excess Energy</h2>
                <p className={styles.sectionSubLeft}>
                  When your solar system generates more power than you use,
                  Solarxen helps export the surplus to the grid through net
                  metering — turning unused energy into real monthly credits or
                  earnings.
                </p>

                <div className={styles.earnSection__steps}>
                  {[
                    {
                      icon: <FaBolt />,
                      title: "Generate",
                      desc: "Your panels produce clean electricity all day",
                    },
                    {
                      icon: <FaHome />,
                      title: "Use First",
                      desc: "Power is consumed by your home or business first",
                    },
                    {
                      icon: <MdElectricBolt />,
                      title: "Export Surplus",
                      desc: "Leftover energy flows automatically to the grid",
                    },
                    {
                      icon: <FaCoins />,
                      title: "Earn Credits",
                      desc: "Receive monthly credits or payouts via net metering",
                    },
                  ].map((s, i) => (
                    <div key={i} className={styles.earnSection__step}>
                      <div className={styles.earnSection__stepIcon}>
                        {s.icon}
                      </div>
                      <div>
                        <strong>{s.title}</strong>
                        <span>{s.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 — MONITOR EVERYTHING IN REAL TIME
        ═══════════════════════════════════════════════════════════════ */}
        <section className={styles.monitorSection}>
          <Container>
            <Row className="align-items-center g-5">
              <Col lg={6}>
                <Badge className={styles.sectionBadge}>Live Monitoring</Badge>
                <h2 className={styles.sectionTitle}>
                  Monitor Everything in Real Time
                </h2>
                <p className={styles.sectionSubLeft}>
                  The Solarxen mobile app provides real-time monitoring,
                  including energy generation, consumption, grid export,
                  estimated earnings/credits, bill savings, system health, and
                  lifetime performance.
                </p>
                <div className={styles.monitorSection__features}>
                  {[
                    { icon: <FaBolt />, label: "Live Generation" },
                    { icon: <FaHome />, label: "Home Consumption" },
                    { icon: <MdElectricBolt />, label: "Grid Export" },
                    { icon: <FaCoins />, label: "Savings & Earnings" },
                    { icon: <MdMonitor />, label: "System Health" },
                    { icon: <BsGraphUpArrow />, label: "Performance Trends" },
                  ].map((f, i) => (
                    <div key={i} className={styles.monitorSection__feature}>
                      <span className={styles.monitorSection__featureIcon}>
                        {f.icon}
                      </span>
                      {f.label}
                    </div>
                  ))}
                </div>
                <Button className={styles.btn__primary}>
                  <FaMobileAlt /> Explore the App
                </Button>
              </Col>
              <Col lg={6}>
                {/* Phone mockup */}
                <div className={styles.phoneMock}>
                  <div className={styles.phoneMock__screen}>
                    <div className={styles.phoneMock__header}>
                      <MdSolarPower /> Solarxen
                      <span className={styles.liveBadge}>
                        <span className={styles.liveDot} />
                        Live
                      </span>
                    </div>

                    <div className={styles.phoneMock__bigStat}>
                      <span>Current Generation</span>
                      <strong>
                        6.2 <small>kW</small>
                      </strong>
                    </div>

                    <div className={styles.phoneMock__grid}>
                      {[
                        { label: "Consumption", val: "3.8 kW", color: "blue" },
                        { label: "Export", val: "2.4 kW", color: "yellow" },
                        {
                          label: "Today's Savings",
                          val: "৳420",
                          color: "green",
                        },
                        { label: "System Health", val: "98%", color: "green" },
                      ].map((s, i) => (
                        <div key={i} className={styles.phoneMock__gridItem}>
                          <span>{s.label}</span>
                          <strong
                            className={styles[`phoneMock__gridVal--${s.color}`]}
                          >
                            {s.val}
                          </strong>
                        </div>
                      ))}
                    </div>

                    {/* mini chart */}
                    <div className={styles.phoneMock__chart}>
                      <div className={styles.phoneMock__chartTitle}>
                        Today's Production (kWh)
                      </div>
                      <div className={styles.phoneMock__chartBars}>
                        {[30, 45, 60, 80, 95, 85, 70, 55, 40, 25].map(
                          (h, i) => (
                            <div
                              key={i}
                              className={styles.phoneMock__chartBar}
                              style={{ height: `${h}%` }}
                            />
                          ),
                        )}
                      </div>
                    </div>

                    <div className={styles.phoneMock__notif}>
                      <FaCheckCircle /> System running optimally
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <Packages />

        {/* ═══════════════════════════════════════════════════════════════
            WHY SOLARXEN — 6 CARDS
        ═══════════════════════════════════════════════════════════════ */}
        <section className={styles.whySection}>
          <Container>
            <div className={styles.sectionHeader}>
              <Badge className={styles.sectionBadge}>Why Solarxen</Badge>
              <h2 className={styles.sectionTitle}>Why Choose Solarxen</h2>
              <p className={styles.sectionSub}>
                Everything you need for a smarter, more profitable rooftop — all
                in one platform
              </p>
            </div>
            <Row className="g-4">
              {whyCards.map((c, i) => (
                <Col key={i} xs={12} sm={6} lg={4}>
                  <div
                    className={`${styles.whyCard} ${styles[`whyCard--${c.color}`]}`}
                  >
                    <div className={styles.whyCard__icon}>{c.icon}</div>
                    <h4 className={styles.whyCard__title}>{c.title}</h4>
                    <p className={styles.whyCard__desc}>{c.desc}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
