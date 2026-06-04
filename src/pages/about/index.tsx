"use client";
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import {
  FaArrowRight,
  FaSolarPanel,
  FaLeaf,
  FaCoins,
  FaUsers,
  FaBolt,
  FaCheckCircle,
  FaPlay,
  FaHome,
  FaBuilding,
  FaMobileAlt,
  FaWifi,
  FaChartLine,
  FaShieldAlt,
  FaStar,
  FaQuoteLeft,
} from "react-icons/fa";
import {
  MdSolarPower,
  MdElectricBolt,
  MdMonitor,
  MdTrendingUp,
  MdSecurity,
} from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { BsGraphUpArrow } from "react-icons/bs";
import styles from "./about.module.scss";
import Footer from "@/layout/footer";
import Header from "@/layout/header";
import CTA from "@/component/cta";

// ── Animated Counter Hook ──────────────────────────────────────────────────
function useCounter(target: number, duration = 2200, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

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

// ── Stat Counter Card ──────────────────────────────────────────────────────
interface CounterCardProps {
  icon: React.ReactNode;
  target: number;
  suffix: string;
  prefix?: string;
  label: string;
  desc: string;
  color: "green" | "yellow" | "blue" | "teal";
  inView: boolean;
  delay?: number;
}
function CounterCard({
  icon,
  target,
  suffix,
  prefix = "",
  label,
  desc,
  color,
  inView,
  delay = 0,
}: CounterCardProps) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setGo(true), delay);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);
  const val = useCounter(target, 2200, go);
  return (
    <div className={`${styles.counterCard} ${styles[`counterCard--${color}`]}`}>
      <div className={styles.counterCard__icon}>{icon}</div>
      <div className={styles.counterCard__num}>
        {prefix}
        {val.toLocaleString()}
        {suffix}
      </div>
      <div className={styles.counterCard__label}>{label}</div>
      <p className={styles.counterCard__desc}>{desc}</p>
    </div>
  );
}

// ── Solar Rooftop Illustration SVG ─────────────────────────────────────────
function RooftopIllustration({
  type = "after",
}: {
  type?: "before" | "after";
}) {
  const hasSolar = type === "after";
  return (
    <svg viewBox="0 0 280 200" className={styles.rooftopSvg}>
      <defs>
        <linearGradient id={`sky-${type}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={hasSolar ? "#E8F5EE" : "#FFF8E7"} />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>
      {/* Sky */}
      <rect width="280" height="200" fill={`url(#sky-${type})`} rx="16" />

      {/* Sun / clouds */}
      {hasSolar ? (
        <circle cx="230" cy="36" r="22" fill="#F9B233" opacity="0.9">
          <animate
            attributeName="r"
            values="20;24;20"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      ) : (
        <>
          <ellipse
            cx="200"
            cy="42"
            rx="32"
            ry="18"
            fill="white"
            opacity="0.8"
          />
          <ellipse
            cx="220"
            cy="38"
            rx="22"
            ry="14"
            fill="white"
            opacity="0.9"
          />
        </>
      )}

      {/* Ground */}
      <rect
        x="0"
        y="160"
        width="280"
        height="40"
        fill={hasSolar ? "#E8F5EE" : "#F5F5F5"}
        rx="0"
      />
      <rect
        x="0"
        y="158"
        width="280"
        height="6"
        fill={hasSolar ? "#0B6B3A" : "#ccc"}
        opacity="0.2"
      />

      {/* House walls */}
      <rect
        x="60"
        y="100"
        width="160"
        height="60"
        fill="white"
        stroke="#E2E8F0"
        strokeWidth="1.5"
        rx="2"
      />

      {/* Roof base */}
      <polygon
        points="40,100 140,44 240,100"
        fill={hasSolar ? "#0B6B3A" : "#94A3B8"}
        opacity={hasSolar ? "0.9" : "0.6"}
      />

      {/* Solar panels on roof (after only) */}
      {hasSolar && (
        <g>
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <rect
                key={`p-${row}-${col}`}
                x={80 + col * 30 - row * 12}
                y={60 + row * 13 + col * 1}
                width={26}
                height={11}
                fill="#1A8A4A"
                stroke="#0B6B3A"
                strokeWidth="0.5"
                rx="1"
                transform={`rotate(-30, ${80 + col * 30 - row * 12 + 13}, ${60 + row * 13 + col + 5})`}
                opacity="0.9"
              />
            )),
          )}
        </g>
      )}

      {/* Windows */}
      <rect
        x="80"
        y="115"
        width="32"
        height="24"
        fill={hasSolar ? "#E3F2FD" : "#F0F4F8"}
        rx="2"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <rect x="96" y="115" width="1" height="24" fill="#E2E8F0" />
      <rect x="80" y="127" width="32" height="1" fill="#E2E8F0" />
      <rect
        x="170"
        y="115"
        width="32"
        height="24"
        fill={hasSolar ? "#E3F2FD" : "#F0F4F8"}
        rx="2"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <rect x="186" y="115" width="1" height="24" fill="#E2E8F0" />
      <rect x="170" y="127" width="32" height="1" fill="#E2E8F0" />

      {/* Door */}
      <rect
        x="120"
        y="128"
        width="40"
        height="32"
        fill={hasSolar ? "#C8E6C9" : "#E2E8F0"}
        rx="3"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <circle cx="155" cy="144" r="2" fill={hasSolar ? "#0B6B3A" : "#94A3B8"} />

      {/* Energy flow lines (after only) */}
      {hasSolar && (
        <>
          <line
            x1="140"
            y1="70"
            x2="140"
            y2="100"
            stroke="#F9B233"
            strokeWidth="1.5"
            strokeDasharray="4,3"
            opacity="0.7"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-14"
              dur="1s"
              repeatCount="indefinite"
            />
          </line>
          {/* Earnings badge */}
          <rect
            x="170"
            y="50"
            width="76"
            height="26"
            rx="13"
            fill="#0B6B3A"
            opacity="0.92"
          />
          <text
            x="208"
            y="67"
            textAnchor="middle"
            fontSize="9.5"
            fill="white"
            fontWeight="700"
          >
            ৳ +4,200/mo
          </text>
        </>
      )}

      {/* Label */}
      <rect
        x="8"
        y="8"
        width={hasSolar ? 52 : 46}
        height="20"
        rx="10"
        fill={hasSolar ? "#0B6B3A" : "#94A3B8"}
        opacity="0.9"
      />
      <text
        x={hasSolar ? 34 : 29}
        y="22"
        textAnchor="middle"
        fontSize="8.5"
        fill="white"
        fontWeight="700"
      >
        {hasSolar ? "AFTER" : "BEFORE"}
      </text>
    </svg>
  );
}

// ── Dashboard Preview Component ────────────────────────────────────────────
function DashboardPreview() {
  return (
    <div>
      <div className={styles.dashPreview__header}>
        <div className={styles.dashPreview__dots}>
          <span />
          <span />
          <span />
        </div>
        <span className={styles.dashPreview__title}>Solarxen Dashboard</span>
        <div className={styles.dashPreview__live}>
          <span className={styles.livePulse} /> Live
        </div>
      </div>
      <div className={styles.dashPreview}>
        <div className={styles.dashPreview__body}>
          {/* Top KPI row */}
          <div className={styles.dashPreview__kpis}>
            {[
              {
                label: "Today",
                value: "18.4 kWh",
                color: "green",
                icon: <FaBolt />,
              },
              {
                label: "Savings",
                value: "৳4,280",
                color: "yellow",
                icon: <FaCoins />,
              },
              {
                label: "Export",
                value: "6.2 kWh",
                color: "blue",
                icon: <MdElectricBolt />,
              },
            ].map((k, i) => (
              <div
                key={i}
                className={`${styles.dashKpi} ${styles[`dashKpi--${k.color}`]}`}
              >
                <span className={styles.dashKpi__icon}>{k.icon}</span>
                <div>
                  <div className={styles.dashKpi__value}>{k.value}</div>
                  <div className={styles.dashKpi__label}>{k.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Mini chart */}
          <div className={styles.dashChart}>
            <div className={styles.dashChart__title}>
              Production This Week (kWh)
            </div>
            <div className={styles.dashChart__bars}>
              {[65, 82, 70, 90, 78, 95, 74].map((h, i) => (
                <div key={i} className={styles.dashChart__barWrap}>
                  <div
                    className={styles.dashChart__bar}
                    style={{ height: `${h}%` }}
                  />
                  <span className={styles.dashChart__day}>
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Status row */}
          <div className={styles.dashStatus}>
            {["Inverter OK", "Network OK", "Grid Export", "No Alerts"].map(
              (s, i) => (
                <div key={i} className={styles.dashStatus__chip}>
                  <FaCheckCircle className={styles.dashStatus__icon} /> {s}
                </div>
              ),
            )}
          </div>

          {/* Notification */}
          <div className={styles.dashNotif}>
            🎉 New record! Your system generated 18.4 kWh today.
          </div>
        </div>

        {/* Phone mockup beside */}
        <div className={styles.dashPhone}>
          <div className={styles.dashPhone__screen}>
            <div className={styles.dashPhone__header}>
              <MdSolarPower /> My Solar
            </div>
            <div className={styles.dashPhone__value}>৳ 4,280</div>
            <div className={styles.dashPhone__label}>This Month's Savings</div>
            <div className={styles.dashPhone__bar}>
              <div className={styles.dashPhone__barFill} />
            </div>
            <div className={styles.dashPhone__stats}>
              <div>
                <strong>18.4</strong>
                <span>kWh Today</span>
              </div>
              <div>
                <strong>98%</strong>
                <span>Health</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function SolarxenHome() {
  const { ref: impactRef, inView: impactInView } = useInView();
  const [scrolled, setScrolled] = useState(false);
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Rotate story tab
  useEffect(() => {
    const t = setInterval(() => setActiveStory((p) => (p + 1) % 3), 4000);
    return () => clearInterval(t);
  }, []);

  const techFeatures = [
    {
      icon: <MdMonitor />,
      title: "Real-Time Dashboard",
      desc: "Monitor every watt produced, exported, and earned — live, from any device.",
      color: "green",
    },
    {
      icon: <FaWifi />,
      title: "Smart Inverter Connect",
      desc: "Wi-Fi connected inverters stream performance data 24/7 to Solarxen servers.",
      color: "blue",
    },
    {
      icon: <BsGraphUpArrow />,
      title: "Live Analytics Engine",
      desc: "AI-powered analytics detect drops, optimize output, and alert you instantly.",
      color: "yellow",
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile App",
      desc: "Track production, earnings, and system health from your phone — anytime.",
      color: "green",
    },
    {
      icon: <MdSecurity />,
      title: "Secure Data Network",
      desc: "End-to-end encrypted data pipeline keeps your installation data private.",
      color: "blue",
    },
    {
      icon: <FaChartLine />,
      title: "Earnings Reports",
      desc: "Transparent monthly reports showing your generation, export, and income.",
      color: "yellow",
    },
  ];

  const communityCards = [
    {
      icon: <FaHome />,
      title: "Homeowners",
      desc: "847 families across Bangladesh now earn monthly income from their rooftops.",
      value: "847+",
      tag: "Families",
    },
    {
      icon: <FaBuilding />,
      title: "Businesses",
      desc: "Small shops, factories, and offices reducing costs and earning from solar.",
      value: "312+",
      tag: "Businesses",
    },
    {
      icon: <FaLeaf />,
      title: "Environment",
      desc: "420 tons of CO₂ eliminated — equal to planting 19,000 trees.",
      value: "420t",
      tag: "CO₂ Saved",
    },
  ];

  return (
    <div className={styles.page}>
      <Header />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <section className={styles.hero} id="hero">
        {/* Background elements */}
        <div className={styles.hero__bgGrid} />
        <div className={styles.hero__bgGlow1} />
        <div className={styles.hero__bgGlow2} />
        <div className={styles.hero__bgOrb} />

        <Container className={styles.hero__container}>
          <Row className="align-items-center g-5">
            {/* Left Content */}
            <Col lg={6} className={styles.hero__left}>
              <div className={styles.hero__badgeRow}>
                <Badge className={styles.sectionBadge}>
                  <span className={styles.liveDot} /> Live Network — Bangladesh
                </Badge>
              </div>

              <h1 className={styles.hero__headline}>
                Building a Smarter
                <br />
                <span className={styles.hero__accentLine}>
                  Energy Future
                </span>{" "}
                for Every Rooftop
              </h1>

              <p className={styles.hero__sub}>
                Solarxen helps homeowners and businesses turn rooftop space into
                clean energy and long-term monthly income through a connected
                solar network.
              </p>

              <div className={styles.hero__checks}>
                {[
                  "Zero upfront cost options available",
                  "Monthly earnings from day one",
                  "24/7 smart monitoring included",
                ].map((c, i) => (
                  <div key={i} className={styles.hero__check}>
                    <FaCheckCircle className={styles.hero__checkIcon} />
                    <span>{c}</span>
                  </div>
                ))}
              </div>

              <div className={styles.hero__actions}>
                <Button className={styles.btn__primary}>
                  Join Solarxen Network <FaArrowRight />
                </Button>
                <Button className={styles.btn__outline}>
                  <FaPlay /> Explore Solar Packages
                </Button>
              </div>

              {/* Trust bar */}
              <div className={styles.hero__trust}>
                <div className={styles.hero__trustItem}>
                  <FaStar className={styles.hero__trustStar} />
                  <span>
                    <strong>4.9/5</strong> Customer Rating
                  </span>
                </div>
                <div className={styles.hero__trustDivider} />
                <div className={styles.hero__trustItem}>
                  <FaShieldAlt className={styles.hero__trustIcon} />
                  <span>
                    <strong>847+</strong> Connected Rooftops
                  </span>
                </div>
                <div className={styles.hero__trustDivider} />
                <div className={styles.hero__trustItem}>
                  <FaLeaf className={styles.hero__trustIcon} />
                  <span>
                    <strong>420t</strong> CO₂ Saved
                  </span>
                </div>
              </div>
            </Col>

            {/* Right Visual */}
            <Col lg={6} className={styles.hero__right}>
              <div className={styles.hero__visual}>
                {/* Main dashboard card */}
                <div className={styles.hero__dashCard}>
                  <div className={styles.hero__dashCardHeader}>
                    <MdSolarPower /> My Rooftop Dashboard
                    <span className={`${styles.liveBadge} ms-auto`}>
                      <span className={styles.liveDot} /> Live
                    </span>
                  </div>
                  <div className={styles.hero__dashCardStats}>
                    <div className={styles.hero__dashStat}>
                      <span
                        className={`${styles.hero__dashStatVal} ${styles["hero__dashStatVal--green"]}`}
                      >
                        18.4 kWh
                      </span>
                      <span>Today's Production</span>
                    </div>
                    <div className={styles.hero__dashStatDivider} />
                    <div className={styles.hero__dashStat}>
                      <span
                        className={`${styles.hero__dashStatVal} ${styles["hero__dashStatVal--yellow"]}`}
                      >
                        ৳ 4,280
                      </span>
                      <span>Monthly Savings</span>
                    </div>
                    <div className={styles.hero__dashStatDivider} />
                    <div className={styles.hero__dashStat}>
                      <span
                        className={`${styles.hero__dashStatVal} ${styles["hero__dashStatVal--blue"]}`}
                      >
                        6.2 kWh
                      </span>
                      <span>Grid Export</span>
                    </div>
                  </div>
                  {/* Mini sparkline */}
                  <div className={styles.hero__sparkline}>
                    <svg
                      viewBox="0 0 200 40"
                      className={styles.hero__sparklineSvg}
                    >
                      <polyline
                        points="0,30 28,22 56,26 84,12 112,18 140,8 168,14 200,6"
                        fill="none"
                        stroke="#0B6B3A"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polyline
                        points="0,30 28,22 56,26 84,12 112,18 140,8 168,14 200,6"
                        fill="url(#sparkFill)"
                        stroke="none"
                        opacity="0.15"
                      />
                      <defs>
                        <linearGradient
                          id="sparkFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#0B6B3A" />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className={styles.hero__sparklineLabels}>
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (d) => (
                          <span key={d}>{d}</span>
                        ),
                      )}
                    </div>
                  </div>
                </div>

                {/* Floating earnings card */}
                <div className={styles.hero__floatCard1}>
                  <FaCoins className={styles.hero__floatIcon} />
                  <div>
                    <strong>৳ 38,400</strong>
                    <span>Annual Earnings</span>
                  </div>
                </div>

                {/* Floating CO2 card */}
                <div className={styles.hero__floatCard2}>
                  <FaLeaf className={styles.hero__floatIcon2} />
                  <div>
                    <strong>1.2t CO₂</strong>
                    <span>Saved this year</span>
                  </div>
                </div>

                {/* Rooftop illustration below */}
                <div className={styles.hero__rooftopRow}>
                  <div className={styles.hero__rooftopItem}>
                    <RooftopIllustration type="after" />
                    <span className={styles.hero__rooftopLabel}>
                      Solar Rooftop
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2 — OUR STORY
      ═══════════════════════════════════════════════════════════════════ */}
      <section className={styles.story} id="story">
        <Container>
          <div className={styles.sectionHeader}>
            <Badge className={styles.sectionBadge}>Our Story</Badge>
            <h2 className={styles.sectionTitle}>Why Solarxen Exists</h2>
          </div>

          {/* Block 1 — Problem */}
          <Row className="align-items-center g-5 mb-5">
            <Col lg={5}>
              <div className={styles.story__visual}>
                <RooftopIllustration type="before" />
                <div className={styles.story__visualLabel}>
                  Wasted rooftop — missed opportunity every day
                </div>
              </div>
            </Col>
            <Col lg={7}>
              <div className={styles.story__block}>
                <div className={styles.story__tag}>The Problem</div>
                <h3 className={styles.story__blockTitle}>
                  Millions of rooftops sitting idle while energy costs rise
                </h3>
                <p className={styles.sectionSubLeft}>
                  Across Bangladesh, millions of homeowners and businesses pay
                  rising electricity bills every month — while the sun beats
                  down on unused rooftop space above them. Traditional energy
                  systems leave rooftop potential completely untapped.
                </p>
                <div className={styles.story__stat}>
                  <div className={styles.story__statItem}>
                    <strong>৳ 3,200+</strong>
                    <span>Average monthly electricity bill</span>
                  </div>
                  <div className={styles.story__statItem}>
                    <strong>90%</strong>
                    <span>Rooftops with zero solar utilization</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Block 2 — Solution */}
          <Row className="align-items-center g-5">
            <Col lg={7} className="order-lg-1 order-2">
              <div className={styles.story__block}>
                <div
                  className={`${styles.story__tag} ${styles["story__tag--green"]}`}
                >
                  The Solution
                </div>
                <h3 className={styles.story__blockTitle}>
                  Solarxen turns every rooftop into an income-generating asset
                </h3>
                <p className={styles.sectionSubLeft}>
                  Solarxen was created to help people unlock the hidden value of
                  their rooftops. Through solar energy generation, smart
                  monitoring, and transparent earning opportunities — we turn
                  underused space into a consistent monthly income source while
                  building a cleaner Bangladesh.
                </p>
                <div className={styles.story__pillars}>
                  {[
                    { icon: <MdSolarPower />, text: "Solar Installation" },
                    { icon: <MdMonitor />, text: "Smart Monitoring" },
                    { icon: <FaCoins />, text: "Monthly Earnings" },
                    { icon: <FaLeaf />, text: "Clean Energy" },
                  ].map((p, i) => (
                    <div key={i} className={styles.story__pillar}>
                      <span className={styles.story__pillarIcon}>{p.icon}</span>
                      <span>{p.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col lg={5} className="order-lg-2 order-1">
              <div className={styles.story__visual}>
                <RooftopIllustration type="after" />
                <div
                  className={`${styles.story__visualLabel} ${styles["story__visualLabel--green"]}`}
                >
                  Connected rooftop earning ৳4,200 every month
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3 — MISSION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className={styles.mission} id="mission">
        <div className={styles.mission__bg} />
        <Container>
          <div className={styles.sectionHeader}>
            <Badge
              className={`${styles.sectionBadge} ${styles["sectionBadge--white"]}`}
            >
              Mission
            </Badge>
            <h2
              className={`${styles.sectionTitle} ${styles["sectionTitle--white"]}`}
            >
              Our Mission
            </h2>
          </div>

          <div className={styles.mission__card}>
            <div className={styles.mission__quoteIcon}>
              <FaQuoteLeft />
            </div>
            <p className={styles.mission__statement}>
              To make clean energy ownership{" "}
              <span className={styles.mission__accent}>accessible</span>,{" "}
              <span className={styles.mission__accent}>profitable</span>, and{" "}
              <span className={styles.mission__accent}>transparent</span> for
              every household and business.
            </p>
            <div className={styles.mission__pillars}>
              {[
                {
                  icon: <FaHome />,
                  title: "Accessible",
                  desc: "No barriers to entry — solar for every income level with flexible financing.",
                },
                {
                  icon: <FaCoins />,
                  title: "Profitable",
                  desc: "Real, transparent monthly income from day one with clear reporting.",
                },
                {
                  icon: <FaShieldAlt />,
                  title: "Transparent",
                  desc: "Every unit generated, every taka earned — visible in real time.",
                },
              ].map((p, i) => (
                <div key={i} className={styles.mission__pillar}>
                  <div className={styles.mission__pillarIcon}>{p.icon}</div>
                  <h4 className={styles.mission__pillarTitle}>{p.title}</h4>
                  <p className={styles.mission__pillarDesc}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4 — VISION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className={styles.vision} id="vision">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={5}>
              <Badge className={styles.sectionBadge}>Vision 2030</Badge>
              <h2 className={styles.sectionTitle}>Our Vision</h2>
              <p className={styles.sectionSubLeft}>
                We envision a future where every rooftop becomes part of a
                connected clean-energy network that powers communities and
                creates sustainable income across all of Bangladesh.
              </p>

              <div className={styles.vision__goals}>
                {[
                  {
                    icon: <FaHome />,
                    value: "10,000",
                    label: "Connected Rooftops by 2026",
                  },
                  {
                    icon: <FaBolt />,
                    value: "50 MW",
                    label: "Installed Capacity Nationwide",
                  },
                  {
                    icon: <FaUsers />,
                    value: "64",
                    label: "Districts Covered",
                  },
                  {
                    icon: <FaLeaf />,
                    value: "5,000t",
                    label: "CO₂ Eliminated Annually",
                  },
                ].map((g, i) => (
                  <div key={i} className={styles.vision__goal}>
                    <div className={styles.vision__goalIcon}>{g.icon}</div>
                    <div>
                      <strong className={styles.vision__goalValue}>
                        {g.value}
                      </strong>
                      <span className={styles.vision__goalLabel}>
                        {g.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Col>

            <Col lg={7}>
              {/* Connected Bangladesh Network SVG */}
              <div className={styles.vision__mapCard}>
                <svg viewBox="0 0 400 320" className={styles.vision__svg}>
                  <defs>
                    <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#E8F5EE" />
                      <stop offset="100%" stopColor="#FFFFFF" />
                    </radialGradient>
                  </defs>
                  <rect width="400" height="320" fill="url(#mapGlow)" rx="20" />

                  {/* Bangladesh simplified outline */}
                  <path
                    d="M80,40 L100,32 L130,30 L170,32 L205,38 L235,48 L260,62 L272,84 L268,108 L255,132 L248,158 L240,178 L232,200 L218,220 L200,236 L182,244 L162,242 L140,236 L118,222 L98,204 L80,184 L64,160 L52,136 L46,110 L48,84 L56,62 Z"
                    fill="rgba(11,107,58,0.06)"
                    stroke="rgba(11,107,58,0.2)"
                    strokeWidth="1.5"
                  />

                  {/* City nodes */}
                  {[
                    { x: 168, y: 130, city: "Dhaka", r: 12, main: true },
                    { x: 118, y: 80, city: "Rajshahi", r: 8, main: false },
                    { x: 220, y: 68, city: "Sylhet", r: 7, main: false },
                    { x: 238, y: 168, city: "Chittagong", r: 9, main: false },
                    { x: 90, y: 168, city: "Khulna", r: 8, main: false },
                    { x: 155, y: 196, city: "Barisal", r: 7, main: false },
                    { x: 140, y: 106, city: "Mymensingh", r: 6, main: false },
                    { x: 196, y: 140, city: "Comilla", r: 7, main: false },
                  ].map((n, i) => (
                    <g key={i}>
                      {/* Pulse ring */}
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={n.r * 1.8}
                        fill="#0B6B3A"
                        opacity="0.08"
                      >
                        <animate
                          attributeName="r"
                          values={`${n.r * 1.4};${n.r * 2.2};${n.r * 1.4}`}
                          dur={`${2 + i * 0.3}s`}
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.1;0.02;0.1"
                          dur={`${2 + i * 0.3}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                      {/* Connection lines */}
                      {!n.main && (
                        <line
                          x1={168}
                          y1={130}
                          x2={n.x}
                          y2={n.y}
                          stroke="#0B6B3A"
                          strokeWidth="0.8"
                          strokeDasharray="4,3"
                          opacity="0.35"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="0"
                            to="-14"
                            dur={`${1.5 + i * 0.2}s`}
                            repeatCount="indefinite"
                          />
                        </line>
                      )}
                      {/* Energy dot on line */}
                      {!n.main && (
                        <circle r="2" fill="#F9B233" opacity="0.9">
                          <animateMotion
                            dur={`${2 + i * 0.4}s`}
                            repeatCount="indefinite"
                            path={`M 168,130 L ${n.x},${n.y}`}
                          />
                        </circle>
                      )}
                      {/* Main node */}
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={n.r}
                        fill={n.main ? "#0B6B3A" : "#1A8A4A"}
                        stroke="white"
                        strokeWidth="1.5"
                      />
                      {/* Label */}
                      <text
                        x={n.x}
                        y={n.y + n.r + 8}
                        textAnchor="middle"
                        fontSize="7"
                        fill="#1A2E20"
                        fontWeight="600"
                      >
                        {n.city}
                      </text>
                      {/* Panel icon */}
                      {n.main && (
                        <text
                          x={n.x}
                          y={n.y + 4}
                          textAnchor="middle"
                          fontSize="9"
                          fill="white"
                        >
                          ⚡
                        </text>
                      )}
                    </g>
                  ))}

                  {/* Year labels */}
                  <rect
                    x="290"
                    y="40"
                    width="90"
                    height="70"
                    rx="10"
                    fill="white"
                    stroke="#E2E8F0"
                    strokeWidth="1"
                  />
                  <text
                    x="335"
                    y="62"
                    textAnchor="middle"
                    fontSize="9"
                    fill="#0B6B3A"
                    fontWeight="700"
                  >
                    VISION 2030
                  </text>
                  <text
                    x="335"
                    y="78"
                    textAnchor="middle"
                    fontSize="8"
                    fill="#475569"
                  >
                    10,000 Rooftops
                  </text>
                  <text
                    x="335"
                    y="93"
                    textAnchor="middle"
                    fontSize="8"
                    fill="#475569"
                  >
                    50 MW Capacity
                  </text>
                  <text
                    x="335"
                    y="108"
                    textAnchor="middle"
                    fontSize="8"
                    fill="#475569"
                  >
                    All 64 Districts
                  </text>

                  {/* Live label */}
                  <rect
                    x="290"
                    y="130"
                    width="80"
                    height="22"
                    rx="11"
                    fill="#0B6B3A"
                  />
                  <text
                    x="330"
                    y="145"
                    textAnchor="middle"
                    fontSize="9"
                    fill="white"
                    fontWeight="700"
                  >
                    ● Network Live
                  </text>

                  {/* Stats at bottom */}
                  <rect
                    x="20"
                    y="272"
                    width="360"
                    height="36"
                    rx="10"
                    fill="#F0F4F8"
                  />
                  <text
                    x="80"
                    y="292"
                    textAnchor="middle"
                    fontSize="10"
                    fill="#0B6B3A"
                    fontWeight="800"
                  >
                    847
                  </text>
                  <text
                    x="80"
                    y="302"
                    textAnchor="middle"
                    fontSize="7"
                    fill="#475569"
                  >
                    Connected
                  </text>
                  <text
                    x="200"
                    y="292"
                    textAnchor="middle"
                    fontSize="10"
                    fill="#F9B233"
                    fontWeight="800"
                  >
                    4.2 MW
                  </text>
                  <text
                    x="200"
                    y="302"
                    textAnchor="middle"
                    fontSize="7"
                    fill="#475569"
                  >
                    Installed
                  </text>
                  <text
                    x="320"
                    y="292"
                    textAnchor="middle"
                    fontSize="10"
                    fill="#1E88E5"
                    fontWeight="800"
                  >
                    420t
                  </text>
                  <text
                    x="320"
                    y="302"
                    textAnchor="middle"
                    fontSize="7"
                    fill="#475569"
                  >
                    CO₂ Saved
                  </text>
                </svg>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5 — IMPACT METRICS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className={styles.impact} id="impact" ref={impactRef}>
        <Container>
          <div className={styles.sectionHeader}>
            <Badge className={styles.sectionBadge}>Real Impact</Badge>
            <h2 className={styles.sectionTitle}>
              Creating Impact Beyond Energy
            </h2>
            <p className={styles.sectionSub}>
              Numbers that tell the story of a growing clean-energy movement
              across Bangladesh
            </p>
          </div>
          <Row className="g-4">
            {[
              {
                icon: <FaHome size={28} />,
                target: 847,
                suffix: "+",
                label: "Rooftops Connected",
                desc: "Homes and businesses across 38 districts generating clean energy daily.",
                color: "green" as const,
                delay: 0,
              },
              {
                icon: <FaBolt size={28} />,
                target: 18600,
                suffix: " kWh",
                label: "Energy Generated Today",
                desc: "Enough to power 1,860 Bangladeshi homes for an entire day.",
                color: "yellow" as const,
                delay: 150,
              },
              {
                icon: <FaCoins size={28} />,
                target: 1200000,
                suffix: "+",
                prefix: "৳",
                label: "Customer Earnings",
                desc: "Real monthly income earned by Solarxen network members.",
                color: "blue" as const,
                delay: 300,
              },
              {
                icon: <FaLeaf size={28} />,
                target: 420,
                suffix: " Tons",
                label: "CO₂ Reduction",
                desc: "Carbon eliminated — equal to planting over 19,000 trees.",
                color: "teal" as const,
                delay: 450,
              },
            ].map((c, i) => (
              <Col key={i} xs={12} sm={6} lg={3}>
                <CounterCard {...c} inView={impactInView} />
              </Col>
            ))}
          </Row>

          {/* Bottom impact visual */}
          <div className={styles.impact__timeline}>
            {[
              {
                year: "2022",
                event: "Solarxen Founded",
                icon: <HiOutlineLightBulb />,
              },
              {
                year: "2023",
                event: "First 100 Rooftops",
                icon: <FaSolarPanel />,
              },
              { year: "2024", event: "847 Connected Sites", icon: <FaWifi /> },
              { year: "2025", event: "1 MW Milestone", icon: <FaBolt /> },
              {
                year: "2026",
                event: "Target: 2,500 Sites",
                icon: <MdTrendingUp />,
              },
            ].map((t, i) => (
              <div key={i} className={styles.impact__timelineItem}>
                <div className={styles.impact__timelineIcon}>{t.icon}</div>
                <div className={styles.impact__timelineLine} />
                <div className={styles.impact__timelineYear}>{t.year}</div>
                <div className={styles.impact__timelineEvent}>{t.event}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6 — TECHNOLOGY
      ═══════════════════════════════════════════════════════════════════ */}
      <section className={styles.technology} id="technology">
        <div className={styles.technology__bgLines} />
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={5}>
              <Badge className={styles.sectionBadge}>Technology</Badge>
              <h2 className={styles.sectionTitle}>
                Powered by Smart Energy Technology
              </h2>
              <p className={styles.sectionSubLeft}>
                Solarxen combines solar infrastructure, smart monitoring
                systems, connected inverters, and live analytics to provide
                complete visibility into energy production and earnings.
              </p>
              <div className={styles.tech__featureList}>
                {techFeatures.slice(0, 3).map((f, i) => (
                  <div
                    key={i}
                    className={`${styles.tech__feature} ${styles[`tech__feature--${f.color}`]}`}
                  >
                    <div className={styles.tech__featureIcon}>{f.icon}</div>
                    <div>
                      <strong>{f.title}</strong>
                      <span>{f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
            <Col lg={7}>
              <DashboardPreview />
            </Col>
          </Row>

          {/* Bottom 3 tech cards */}
          <Row className="g-4 mt-3">
            {techFeatures.slice(3).map((f, i) => (
              <Col key={i} xs={12} md={4}>
                <div
                  className={`${styles.tech__card} ${styles[`tech__card--${f.color}`]}`}
                >
                  <div className={styles.tech__cardIcon}>{f.icon}</div>
                  <h4 className={styles.tech__cardTitle}>{f.title}</h4>
                  <p className={styles.tech__cardDesc}>{f.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7 — COMMUNITY & SUSTAINABILITY
      ═══════════════════════════════════════════════════════════════════ */}
      <section className={styles.community} id="community">
        <Container>
          <div className={styles.sectionHeader}>
            <Badge className={styles.sectionBadge}>Community</Badge>
            <h2 className={styles.sectionTitle}>
              Building a Cleaner Tomorrow Together
            </h2>
            <p className={styles.sectionSub}>
              Every connected rooftop contributes to a more sustainable future
              while creating real economic value for local communities.
            </p>
          </div>

          <Row className="g-4 mb-5">
            {communityCards.map((c, i) => (
              <Col key={i} xs={12} md={4}>
                <div className={styles.community__card}>
                  <div className={styles.community__cardIcon}>{c.icon}</div>
                  <div className={styles.community__cardValue}>{c.value}</div>
                  <Badge className={styles.community__cardTag}>{c.tag}</Badge>
                  <h4 className={styles.community__cardTitle}>{c.title}</h4>
                  <p className={styles.community__cardDesc}>{c.desc}</p>
                </div>
              </Col>
            ))}
          </Row>

          {/* Sustainability pledge banner */}
          <div className={styles.community__pledge}>
            <div className={styles.community__pledgeBg} />
            <div className={styles.community__pledgeContent}>
              <div className={styles.community__pledgeLeft}>
                <FaLeaf className={styles.community__pledgeLeaf} />
                <div>
                  <h3 className={styles.community__pledgeTitle}>
                    Our Sustainability Pledge
                  </h3>
                  <p className={styles.community__pledgeDesc}>
                    For every new rooftop we connect, Solarxen plants 10 trees
                    in Bangladesh as part of our commitment to environmental
                    restoration.
                  </p>
                </div>
              </div>
              <div className={styles.community__pledgeStats}>
                {[
                  { value: "8,470", label: "Trees Planted" },
                  { value: "420t", label: "CO₂ Eliminated" },
                  { value: "38", label: "Districts Reached" },
                ].map((s, i) => (
                  <div key={i} className={styles.community__pledgeStat}>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial strip */}
          <div className={styles.community__testimonials}>
            {[
              {
                name: "Karim H.",
                loc: "Dhaka",
                quote:
                  "My bill dropped ৳3,200 every month. Best decision I made.",
                initials: "KH",
              },
              {
                name: "Sultana B.",
                loc: "Chittagong",
                quote:
                  "Our shop runs on solar and we earn from extra production too.",
                initials: "SB",
              },
              {
                name: "Rafiq A.",
                loc: "Rajshahi",
                quote:
                  "The Solarxen app shows exactly what my panels produce. Incredible.",
                initials: "RA",
              },
            ].map((t, i) => (
              <div
                key={i}
                className={`${styles.community__testimonial} ${activeStory === i ? styles["community__testimonial--active"] : ""}`}
                onClick={() => setActiveStory(i)}
              >
                <div className={styles.community__testimonialStars}>
                  {[...Array(5)].map((_, s) => (
                    <FaStar key={s} />
                  ))}
                </div>
                <p>"{t.quote}"</p>
                <div className={styles.community__testimonialAuthor}>
                  <div className={styles.community__testimonialAvatar}>
                    {t.initials}
                  </div>
                  <span>
                    <strong>{t.name}</strong> — {t.loc}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CTA />
      <Footer />
    </div>
  );
}
