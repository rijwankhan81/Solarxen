"use client";
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import {
  FaSolarPanel,
  FaBolt,
  FaLeaf,
  FaUsers,
  FaChartLine,
  FaMapMarkerAlt,
  FaBell,
  FaArrowRight,
  FaPlay,
  FaCheckCircle,
  FaGlobeAsia,
  FaWifi,
  FaHome,
  FaCoins,
  FaNetworkWired,
  FaRocket,
} from "react-icons/fa";
import {
  MdSolarPower,
  MdElectricBolt,
  MdMonitor,
  MdTrendingUp,
  MdHealthAndSafety,
  MdNotifications,
} from "react-icons/md";
import styles from "./energy.module.scss";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import Head from "next/head";
import CTA from "@/component/cta";
import Testimonials from "@/component/testimonials";
import BangladeshMap from "@/component/networkmap";

// ── Animated Counter Hook ──────────────────────────────────────────────────
function useCounter(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

// ── Intersection Observer Hook ─────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Stat Card ──────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  target: number;
  suffix: string;
  prefix?: string;
  color: "green" | "yellow" | "blue";
  inView: boolean;
  delay?: number;
}

function StatCard({
  icon,
  label,
  target,
  suffix,
  prefix = "",
  color,
  inView,
  delay = 0,
}: StatCardProps) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);
  const val = useCounter(target, 2000, started);
  return (
    <div className={`${styles.statCard} ${styles[`statCard--${color}`]}`}>
      <div className={styles.statCard__icon}>{icon}</div>
      <div className={styles.statCard__value}>
        {prefix}
        {val.toLocaleString()}
        {suffix}
      </div>
      <div className={styles.statCard__label}>{label}</div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function LiveEnergyNetwork() {
  // Stats section observer
  const { ref: statsRef, inView: statsInView } = useInView();
  // Impact section observer
  const { ref: impactRef, inView: impactInView } = useInView();
  // Growth section
  const { ref: growthRef, inView: growthInView } = useInView();

  // Navbar scroll state
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Growth chart bars
  const growthData = [
    { month: "Jan", rooftops: 120, energy: 85 },
    { month: "Feb", rooftops: 180, energy: 130 },
    { month: "Mar", rooftops: 260, energy: 195 },
    { month: "Apr", rooftops: 340, energy: 265 },
    { month: "May", rooftops: 480, energy: 370 },
    { month: "Jun", rooftops: 620, energy: 490 },
    // { month: "Jul", rooftops: 720, energy: 580 },
    // { month: "Aug", rooftops: 847, energy: 690 },
  ];
  const maxRooftops = Math.max(...growthData.map((d) => d.rooftops));

  return (
    <>
      <Head>
        <title>Live Energy Network</title>
      </Head>

      <div className={styles.page}>
        <Header />

        {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
        <section className={styles.hero} id="hero">
          <div className={styles.hero__bg}>
            <div className={styles.hero__bgGrid} />
            <div className={styles.hero__bgGlow1} />
            <div className={styles.hero__bgGlow2} />
          </div>
          <Container>
            <Row className="align-items-center g-5">
              <Col lg={6} className={styles.hero__content}>
                <Badge className={styles.hero__badge}>
                  <span className={styles.liveDot} /> Live Network — Bangladesh
                </Badge>
                <h1 className={styles.hero__headline}>
                  Connected Rooftops.
                  <br />
                  <span className={styles.hero__headlineAccent}>
                    Shared Energy Future.
                  </span>
                </h1>
                <p className={styles.hero__sub}>
                  Explore Solarxen's growing network of connected solar
                  installations generating clean electricity and creating value
                  across communities.
                </p>
                <div className={styles.hero__actions}>
                  <Button className={styles.btn__primary}>
                    Join the Network <FaArrowRight />
                  </Button>
                  <Button className={styles.btn__outline}>
                    <FaPlay /> Explore Packages
                  </Button>
                </div>
                <div className={styles.hero__quickStats}>
                  <div className={styles.hero__qs}>
                    <strong>847+</strong>
                    <span>Rooftops</span>
                  </div>
                  <div className={styles.hero__qsDivider} />
                  <div className={styles.hero__qs}>
                    <strong>4.2 MW</strong>
                    <span>Installed</span>
                  </div>
                  <div className={styles.hero__qsDivider} />
                  <div className={styles.hero__qs}>
                    <strong>৳12L+</strong>
                    <span>Earned</span>
                  </div>
                </div>
              </Col>

              <Col lg={6} className={styles.hero__visual}>
                <BangladeshMap />
              </Col>
            </Row>
          </Container>
        </section>

        {/* ── SECTION 2: LIVE NETWORK STATS ───────────────────────────────── */}
        <section className={styles.stats} id="network" ref={statsRef}>
          <Container>
            <div className={styles.sectionHeader}>
              <Badge className={styles.sectionBadge}> Data</Badge>
              <h2 className={styles.sectionTitle}>Network at a Glance</h2>
              <p className={styles.sectionSub}>
                Real-time numbers from Solarxen's connected rooftop ecosystem
              </p>
            </div>
            <Row className="g-4">
              {[
                {
                  icon: <FaHome />,
                  label: "Total Rooftops Connected",
                  target: 847,
                  suffix: "",
                  color: "green" as const,
                  delay: 0,
                },
                {
                  icon: <MdSolarPower />,
                  label: "Total Installed Capacity",
                  target: 42,
                  suffix: " MW",
                  color: "yellow" as const,
                  delay: 100,
                },
                {
                  icon: <FaBolt />,
                  label: "Energy Generated Today",
                  target: 18600,
                  suffix: " kWh",
                  color: "blue" as const,
                  delay: 200,
                },
                {
                  icon: <FaCoins />,
                  label: "Customer Earnings (৳)",
                  target: 1200000,
                  suffix: "+",
                  prefix: "৳",
                  color: "yellow" as const,
                  delay: 300,
                },
                {
                  icon: <FaLeaf />,
                  label: "CO₂ Emissions Reduced",
                  target: 420,
                  suffix: " Tons",
                  color: "green" as const,
                  delay: 400,
                },
                {
                  icon: <FaWifi />,
                  label: "Active Monitoring Units",
                  target: 812,
                  suffix: "",
                  color: "blue" as const,
                  delay: 500,
                },
              ].map((s, i) => (
                <Col key={i} xs={12} sm={6} lg={4}>
                  <StatCard {...s} inView={statsInView} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* ── SECTION 3: INTERACTIVE MAP ──────────────────────────────────── */}
        <section className={styles.mapSection} id="map">
          <Container>
            <Row className="align-items-center g-5">
              <Col lg={5}>
                <Badge className={styles.sectionBadge}>Interactive</Badge>
                <h2 className={styles.sectionTitle}>
                  Explore Our Energy Network
                </h2>
                <p className={styles.sectionSubLeft}>
                  See real-time solar installations across Bangladesh. Every dot
                  represents a rooftop powering homes and communities with clean
                  energy.
                </p>
                <div className={styles.mapLegend}>
                  <div className={styles.mapLegend__item}>
                    <span
                      className={`${styles.mapLegend__dot} ${styles["mapLegend__dot--green"]}`}
                    />
                    Active Installation
                  </div>
                  <div className={styles.mapLegend__item}>
                    <span
                      className={`${styles.mapLegend__dot} ${styles["mapLegend__dot--yellow"]}`}
                    />
                    High Production Zone
                  </div>
                  <div className={styles.mapLegend__item}>
                    <span
                      className={`${styles.mapLegend__dot} ${styles["mapLegend__dot--blue"]}`}
                    />
                    Grid Export Active
                  </div>
                </div>
                <div className={styles.mapCities}>
                  {[
                    "Dhaka",
                    "Chittagong",
                    "Rajshahi",
                    "Sylhet",
                    "Khulna",
                    "Barisal",
                  ].map((city, i) => (
                    <div key={i} className={styles.mapCityChip}>
                      <FaMapMarkerAlt /> {city}
                      <Badge bg="success" className="ms-1">
                        {[248, 156, 98, 87, 132, 76][i]}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Col>
              <Col lg={7}>
                <div className={styles.mapLargeWrapper}>
                  <BangladeshMap />
                  <div className={styles.mapControls}>
                    <button className={styles.mapControl}>+</button>
                    <button className={styles.mapControl}>−</button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ── SECTION 4: NETWORK IMPACT ───────────────────────────────────── */}
        <section className={styles.impact} id="impact" ref={impactRef}>
          <Container>
            <div className={styles.sectionHeader}>
              <Badge className={styles.sectionBadge}>Impact</Badge>
              <h2 className={styles.sectionTitle}>
                Every Rooftop Makes a Difference
              </h2>
              <p className={styles.sectionSub}>
                Together, Solarxen's network is creating measurable change
                across Bangladesh
              </p>
            </div>
            <Row className="g-4">
              {[
                {
                  icon: <FaBolt size={32} />,
                  color: "yellow",
                  value: "18,600 kWh",
                  label: "Clean Energy Generated Today",
                  desc: "Enough to power 1,860 Bangladeshi homes for a full day.",
                  progress: 74,
                },
                {
                  icon: <FaUsers size={32} />,
                  color: "green",
                  value: "3,200+",
                  label: "Families Supported",
                  desc: "Direct access to clean, affordable electricity for communities.",
                  progress: 62,
                },
                {
                  icon: <FaLeaf size={32} />,
                  color: "green",
                  value: "420 Tons",
                  label: "Carbon Reduction",
                  desc: "Equal to planting 19,000 trees. One rooftop at a time.",
                  progress: 88,
                },
                {
                  icon: <FaChartLine size={32} />,
                  color: "blue",
                  value: "64 Areas",
                  label: "Community Growth",
                  desc: "Expanding across 64 districts — bringing solar to every corner.",
                  progress: 52,
                },
              ].map((card, i) => (
                <Col key={i} xs={12} md={6} lg={3}>
                  <div
                    className={`${styles.impactCard} ${styles[`impactCard--${card.color}`]}`}
                  >
                    <div className={styles.impactCard__icon}>{card.icon}</div>
                    <div className={styles.impactCard__value}>{card.value}</div>
                    <div className={styles.impactCard__label}>{card.label}</div>
                    <p className={styles.impactCard__desc}>{card.desc}</p>
                    <div className={styles.impactCard__bar}>
                      <div
                        className={styles.impactCard__barFill}
                        style={{
                          width: impactInView ? `${card.progress}%` : "0%",
                        }}
                      />
                    </div>
                    <span className={styles.impactCard__pct}>
                      {card.progress}%
                    </span>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* ── SECTION 5: REAL-TIME MONITORING ─────────────────────────────── */}
        <section className={styles.monitoring} id="monitoring">
          <Container>
            <Row className="align-items-center g-5">
              <Col lg={6}>
                <Badge className={styles.sectionBadge}>24/7 Live</Badge>
                <h2 className={styles.sectionTitle}>
                  Monitored Around the Clock
                </h2>
                <p className={styles.sectionSubLeft}>
                  Solarxen continuously monitors every connected system through
                  smart inverters and digital tracking technology — so you never
                  miss a watt.
                </p>
                <div className={styles.monitoringFeatures}>
                  {[
                    {
                      icon: <MdElectricBolt />,
                      label: "Live Production Tracking",
                      value: "2.4 kW",
                      status: "green",
                    },
                    {
                      icon: <MdHealthAndSafety />,
                      label: "System Health Score",
                      value: "98%",
                      status: "green",
                    },
                    {
                      icon: <FaNetworkWired />,
                      label: "Grid Export Active",
                      value: "0.8 kW",
                      status: "blue",
                    },
                    {
                      icon: <MdTrendingUp />,
                      label: "Performance Index",
                      value: "Excellent",
                      status: "green",
                    },
                    {
                      icon: <MdNotifications />,
                      label: "Maintenance Alerts",
                      value: "0 Active",
                      status: "yellow",
                    },
                  ].map((f, i) => (
                    <div key={i} className={styles.monitorFeature}>
                      <div
                        className={`${styles.monitorFeature__icon} ${styles[`monitorFeature__icon--${f.status}`]}`}
                      >
                        {f.icon}
                      </div>
                      <div className={styles.monitorFeature__text}>
                        <span>{f.label}</span>
                        <strong>{f.value}</strong>
                      </div>
                      <div
                        className={`${styles.monitorFeature__dot} ${styles[`monitorFeature__dot--${f.status}`]}`}
                      />
                    </div>
                  ))}
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles.dashboardMock}>
                  <div className={styles.dashboardMock__header}>
                    <div className={styles.dashboardMock__title}>
                      <MdMonitor /> My Solar Dashboard
                    </div>
                    <Badge className={styles.liveBadge}>
                      <span className={styles.liveDot} /> Live
                    </Badge>
                  </div>
                  <div className={styles.dashboardMock__widgets}>
                    <div className={styles.widget}>
                      <div className={styles.widget__label}>
                        Today's Production
                      </div>
                      <div
                        className={
                          styles.widget__value +
                          " " +
                          styles["widget__value--green"]
                        }
                      >
                        18.4 kWh
                      </div>
                      <div className={styles.widget__bar}>
                        <div
                          className={styles.widget__barFill}
                          style={{ width: "74%" }}
                        />
                      </div>
                      <div className={styles.widget__sub}>
                        ↑ 12% vs yesterday
                      </div>
                    </div>
                    <div className={styles.widget}>
                      <div className={styles.widget__label}>
                        Monthly Savings
                      </div>
                      <div
                        className={
                          styles.widget__value +
                          " " +
                          styles["widget__value--yellow"]
                        }
                      >
                        ৳ 4,280
                      </div>
                      <div className={styles.widget__bar}>
                        <div
                          className={`${styles.widget__barFill} ${styles["widget__barFill--yellow"]}`}
                          style={{ width: "62%" }}
                        />
                      </div>
                      <div className={styles.widget__sub}>
                        ↑ 8% vs last month
                      </div>
                    </div>
                    <div className={styles.widget}>
                      <div className={styles.widget__label}>Grid Export</div>
                      <div
                        className={
                          styles.widget__value +
                          " " +
                          styles["widget__value--blue"]
                        }
                      >
                        6.2 kWh
                      </div>
                      <div className={styles.widget__bar}>
                        <div
                          className={`${styles.widget__barFill} ${styles["widget__barFill--blue"]}`}
                          style={{ width: "40%" }}
                        />
                      </div>
                      <div className={styles.widget__sub}>
                        Sent to grid today
                      </div>
                    </div>
                    <div className={styles.widget}>
                      <div className={styles.widget__label}>System Status</div>
                      <div
                        className={
                          styles.widget__value +
                          " " +
                          styles["widget__value--green"]
                        }
                      >
                        Optimal
                      </div>
                      <div className={styles.widget__statusRow}>
                        {["Inverter", "Panels", "Network", "Billing"].map(
                          (s) => (
                            <span key={s} className={styles.widget__statusChip}>
                              <FaCheckCircle className={styles.statusOk} /> {s}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={styles.dashboardMock__notification}>
                    <FaBell className={styles.notifIcon} />
                    <span>Your system generated a new daily record! 🎉</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ── SECTION 6: NETWORK GROWTH ───────────────────────────────────── */}
        <section className={styles.growth} id="growth" ref={growthRef}>
          <Container>
            <div className={styles.sectionHeader}>
              <Badge className={styles.sectionBadge}>Momentum</Badge>
              <h2 className={styles.sectionTitle}>Growing Every Month</h2>
              <p className={styles.sectionSub}>
                Solarxen's network is expanding rapidly — more rooftops, more
                energy, more impact
              </p>
            </div>
            <Row className="g-4 align-items-end">
              <Col lg={8}>
                <div className={styles.chartCard}>
                  <div className={styles.chartCard__header}>
                    <span>Rooftops Connected (2026)</span>
                    <div className={styles.chartLegend}>
                      <span className={styles.chartLegend__green}>
                        ● Rooftops
                      </span>
                      <span className={styles.chartLegend__yellow}>
                        ● Energy (MWh)
                      </span>
                    </div>
                  </div>
                  <div className={styles.chart}>
                    {growthData.map((d, i) => (
                      <div key={i} className={styles.chart__col}>
                        <div className={styles.chart__bars}>
                          <div
                            className={`${styles.chart__bar} ${styles["chart__bar--yellow"]}`}
                            style={{
                              height: growthInView
                                ? `${(d.energy / maxRooftops) * 100}%`
                                : "0%",
                              transitionDelay: `${i * 60}ms`,
                            }}
                          />
                          <div
                            className={`${styles.chart__bar} ${styles["chart__bar--green"]}`}
                            style={{
                              height: growthInView
                                ? `${(d.rooftops / maxRooftops) * 100}%`
                                : "0%",
                              transitionDelay: `${i * 60 + 30}ms`,
                            }}
                          />
                        </div>
                        <div className={styles.chart__label}>{d.month}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className={styles.growthMetrics}>
                  {[
                    {
                      icon: <FaHome />,
                      label: "New Rooftops This Month",
                      value: "+127",
                      trend: "+18%",
                    },
                    {
                      icon: <FaBolt />,
                      label: "Energy Growth MoM",
                      value: "+19%",
                      trend: "↑ trending",
                    },
                    {
                      icon: <FaGlobeAsia />,
                      label: "Districts Covered",
                      value: "38/64",
                      trend: "Expanding",
                    },
                  ].map((m, i) => (
                    <div key={i} className={styles.growthMetric}>
                      <div className={styles.growthMetric__icon}>{m.icon}</div>
                      <div>
                        <div className={styles.growthMetric__value}>
                          {m.value}
                        </div>
                        <div className={styles.growthMetric__label}>
                          {m.label}
                        </div>
                      </div>
                      <Badge className={styles.growthMetric__badge}>
                        {m.trend}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <Testimonials />

        {/* ── SECTION 8: WHY JOIN ──────────────────────────────────────────── */}
        <section className={styles.whyJoin}>
          <Container>
            <div className={styles.sectionHeader}>
              <Badge className={styles.sectionBadge}>Benefits</Badge>
              <h2 className={styles.sectionTitle}>
                Why Become Part of Solarxen?
              </h2>
              <p className={styles.sectionSub}>
                Six reasons why Bangladesh's smartest homes choose Solarxen
              </p>
            </div>
            <Row className="g-4">
              {[
                {
                  icon: <FaSolarPanel />,
                  title: "Generate Clean Energy",
                  desc: "Harness Bangladesh's abundant sunlight to power your home or business with zero emissions.",
                },
                {
                  icon: <FaCoins />,
                  title: "Earn Monthly Income",
                  desc: "Export surplus energy to the grid and receive consistent monthly income from your rooftop.",
                },
                {
                  icon: <MdMonitor />,
                  title: "Monitor Performance",
                  desc: "Track your system's health, output, and savings in real time from any device.",
                },
                {
                  icon: <FaLeaf />,
                  title: "Contribute to Sustainability",
                  desc: "Every kilowatt-hour you generate reduces Bangladesh's dependence on fossil fuels.",
                },
                {
                  icon: <FaUsers />,
                  title: "Join a Growing Community",
                  desc: "Become part of a network of 847+ connected rooftops across 38 districts.",
                },
                {
                  icon: <FaRocket />,
                  title: "Future-Ready Technology",
                  desc: "Smart inverters, AI diagnostics, and grid integration built for tomorrow's energy system.",
                },
              ].map((f, i) => (
                <Col key={i} xs={12} sm={6} lg={4}>
                  <div className={styles.featureCard}>
                    <div className={styles.featureCard__icon}>{f.icon}</div>
                    <h4 className={styles.featureCard__title}>{f.title}</h4>
                    <p className={styles.featureCard__desc}>{f.desc}</p>
                    <div className={styles.featureCard__arrow}>
                      <FaArrowRight />
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* ── SECTION 9: FUTURE OF ENERGY ─────────────────────────────────── */}
        <section className={styles.future}>
          <div className={styles.future__bg} />
          <Container>
            <Row className="align-items-center g-5">
              <Col lg={6}>
                <Badge
                  className={`${styles.sectionBadge} ${styles["sectionBadge--white"]}`}
                >
                  Vision
                </Badge>
                <h2
                  className={`${styles.sectionTitle} ${styles["sectionTitle--white"]}`}
                >
                  The Future Is Connected
                </h2>
                <p
                  className={`${styles.sectionSub} ${styles["sectionSub--white"]}`}
                >
                  Solarxen is building a nationwide network where rooftops
                  become active participants in energy production and community
                  growth — creating a smarter, cleaner Bangladesh for the next
                  generation.
                </p>
                <div className={styles.futureGoals}>
                  {[
                    {
                      icon: <FaHome />,
                      text: "10,000 Connected Rooftops by 2026",
                    },
                    {
                      icon: <FaBolt />,
                      text: "50 MW Installed Capacity Nationwide",
                    },
                    { icon: <FaGlobeAsia />, text: "All 64 Districts Covered" },
                    {
                      icon: <FaLeaf />,
                      text: "5,000 Tons CO₂ Eliminated Annually",
                    },
                  ].map((g, i) => (
                    <div key={i} className={styles.futureGoal}>
                      <div className={styles.futureGoal__icon}>{g.icon}</div>
                      <span>{g.text}</span>
                    </div>
                  ))}
                </div>
              </Col>
              <Col lg={6}>
                <div className={styles.futureViz}>
                  <div className={styles.futureViz__city}>
                    {/* Stylized city + solar graphic */}
                    <svg
                      viewBox="0 0 400 260"
                      className={styles.futureViz__svg}
                    >
                      {/* Sky gradient */}
                      <defs>
                        <linearGradient
                          id="skyGrad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#1E88E5"
                            stopOpacity="0.15"
                          />
                          <stop
                            offset="100%"
                            stopColor="#0B6B3A"
                            stopOpacity="0.05"
                          />
                        </linearGradient>
                      </defs>
                      <rect
                        width="400"
                        height="260"
                        fill="url(#skyGrad)"
                        rx="16"
                      />

                      {/* Sun */}
                      <circle
                        cx="340"
                        cy="50"
                        r="28"
                        fill="#F9B233"
                        opacity="0.9"
                      >
                        <animate
                          attributeName="r"
                          values="26;30;26"
                          dur="3s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                        <line
                          key={i}
                          x1={340 + Math.cos((angle * Math.PI) / 180) * 34}
                          y1={50 + Math.sin((angle * Math.PI) / 180) * 34}
                          x2={340 + Math.cos((angle * Math.PI) / 180) * 42}
                          y2={50 + Math.sin((angle * Math.PI) / 180) * 42}
                          stroke="#F9B233"
                          strokeWidth="2"
                          opacity="0.6"
                        />
                      ))}

                      {/* Buildings */}
                      {[
                        { x: 20, y: 140, w: 40, h: 120, solar: true },
                        { x: 70, y: 160, w: 35, h: 100, solar: true },
                        { x: 115, y: 120, w: 50, h: 140, solar: true },
                        { x: 175, y: 145, w: 38, h: 115, solar: true },
                        { x: 225, y: 130, w: 55, h: 130, solar: false },
                        { x: 290, y: 155, w: 42, h: 105, solar: true },
                        { x: 342, y: 165, w: 48, h: 95, solar: true },
                      ].map((b, i) => (
                        <g key={i}>
                          <rect
                            x={b.x}
                            y={b.y}
                            width={b.w}
                            height={b.h}
                            fill="white"
                            stroke="rgba(11,107,58,0.2)"
                            strokeWidth="1"
                            rx="2"
                          />
                          {/* windows */}
                          {[0, 1, 2].map((row) =>
                            [0, 1].map((col) => (
                              <rect
                                key={`w-${row}-${col}`}
                                x={b.x + 6 + col * (b.w / 2 - 4)}
                                y={b.y + 15 + row * 22}
                                width={b.w / 2 - 10}
                                height={12}
                                fill={row === 1 ? "#F9B233" : "#1E88E5"}
                                opacity="0.4"
                                rx="1"
                              />
                            )),
                          )}
                          {/* Solar panel on rooftop */}
                          {b.solar && (
                            <rect
                              x={b.x + 4}
                              y={b.y - 8}
                              width={b.w - 8}
                              height={7}
                              fill="#0B6B3A"
                              opacity="0.8"
                              rx="1"
                            />
                          )}
                        </g>
                      ))}

                      {/* Ground */}
                      <rect
                        x="0"
                        y="255"
                        width="400"
                        height="5"
                        fill="#0B6B3A"
                        opacity="0.2"
                      />

                      {/* Energy flow lines */}
                      {[
                        [140, 125, 340, 50],
                        [195, 143, 340, 50],
                        [315, 153, 340, 50],
                      ].map(([x1, y1, x2, y2], i) => (
                        <line
                          key={i}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#F9B233"
                          strokeWidth="1"
                          strokeDasharray="4,3"
                          opacity="0.5"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="0"
                            to="-14"
                            dur={`${1 + i * 0.3}s`}
                            repeatCount="indefinite"
                          />
                        </line>
                      ))}

                      {/* Network label */}
                      <rect
                        x="130"
                        y="220"
                        width="140"
                        height="22"
                        rx="11"
                        fill="#0B6B3A"
                        opacity="0.9"
                      />
                      <text
                        x="200"
                        y="235"
                        textAnchor="middle"
                        fontSize="10"
                        fill="white"
                        fontWeight="600"
                      >
                        Solarxen Smart Grid
                      </text>
                    </svg>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <CTA />
        <Footer />
      </div>
    </>
  );
}
