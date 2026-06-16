// pages/press/index.tsx
// ── List page — pulls data from the same pressData.ts source ──────────────
import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import {
  FaArrowRight,
  FaDownload,
  FaEnvelope,
  FaCalendarAlt,
  FaNewspaper,
  FaFilter,
  FaBolt,
  FaChartLine,
  FaGlobeAsia,
  FaHome,
  FaLeaf,
  FaMapMarkerAlt,
  FaClock,
  FaPlay,
} from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";

import {
  getAllPressReleases,
  type PressRelease,
} from "@/constants/pressReleases";
import styles from "./PressMedia.module.scss";
import Footer from "@/layout/footer";
import CTA from "@/component/cta";
import Header from "@/layout/header";

interface Props {
  releases: PressRelease[];
}

// ── Category colour map (same pattern as single page) ─────────────────────
const CAT_COLOR: Record<string, string> = {
  green: styles.prCard__catGreen,
  blue: styles.prCard__catBlue,
  yellow: styles.prCard__catYellow,
  teal: styles.prCard__catTeal,
  leaf: styles.prCard__catLeaf,
};

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Company News", value: "Company News" },
  { label: "Partnerships", value: "Partnerships" },
  { label: "Product Updates", value: "Product Updates" },
  { label: "Expansion", value: "Expansion" },
  { label: "Sustainability", value: "Sustainability" },
];

// ── getStaticProps ─────────────────────────────────────────────────────────
export const getStaticProps: GetStaticProps<Props> = () => ({
  props: { releases: getAllPressReleases() },
});

function NewsroomVisual() {
  return (
    <div className={styles.newsroomViz}>
      {/* Main editorial card */}
      <div className={styles.newsroomViz__main}>
        <div className={styles.newsroomViz__imgArea}>
          <svg viewBox="0 0 360 200" className={styles.newsroomViz__imgSvg}>
            <defs>
              <linearGradient id="newsHeroGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E8F5EE" />
                <stop offset="100%" stopColor="#E3F2FD" />
              </linearGradient>
            </defs>
            <rect width="360" height="200" fill="url(#newsHeroGrad)" />
            {/* Sun */}
            <circle cx="310" cy="40" r="28" fill="#F9B233" opacity="0.85">
              <animate
                attributeName="r"
                values="25;30;25"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Ground */}
            <rect x="0" y="165" width="360" height="35" fill="#E8F5EE" />
            {/* Buildings row */}
            {[
              { x: 20, y: 80, w: 55, h: 85 },
              { x: 85, y: 55, w: 65, h: 110 },
              { x: 160, y: 70, w: 60, h: 95 },
              { x: 230, y: 90, w: 50, h: 75 },
              { x: 290, y: 100, w: 60, h: 65 },
            ].map((b, i) => (
              <g key={i}>
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  fill="white"
                  stroke="#E2E8F0"
                  strokeWidth="1"
                  rx="3"
                />
                {/* Solar panels on roof */}
                <rect
                  x={b.x + 4}
                  y={b.y - 7}
                  width={b.w - 8}
                  height={6}
                  fill="#0B6B3A"
                  rx="1"
                  opacity="0.85"
                />
                {/* Windows */}
                {[0, 1].map((row) =>
                  [0, 1].map((col) => (
                    <rect
                      key={`${row}-${col}`}
                      x={b.x + 8 + col * (b.w / 2 - 4)}
                      y={b.y + 18 + row * 20}
                      width={b.w / 2 - 12}
                      height={12}
                      fill={row === 0 ? "#E3F2FD" : "#FFF8E7"}
                      rx="1"
                      opacity="0.7"
                    />
                  )),
                )}
              </g>
            ))}
            {/* Energy flow dots */}
            {[100, 190, 260].map((cx, i) => (
              <circle key={i} r="3" fill="#F9B233" opacity="0.9">
                <animateMotion
                  dur={`${1.5 + i * 0.4}s`}
                  repeatCount="indefinite"
                  path={`M ${cx},72 L 310,40`}
                />
              </circle>
            ))}
            {/* Headline overlay */}
            <rect
              x="16"
              y="130"
              width="220"
              height="48"
              rx="10"
              fill="rgba(11,107,58,0.88)"
            />
            <text x="26" y="150" fontSize="9.5" fill="white" fontWeight="700">
              Solarxen Crosses 800
            </text>
            <text x="26" y="163" fontSize="9.5" fill="white" fontWeight="700">
              Connected Rooftops
            </text>
            <text x="26" y="174" fontSize="7.5" fill="rgba(255,255,255,0.7)">
              November 2025 · Company News
            </text>
          </svg>
        </div>
        <div className={styles.newsroomViz__meta}>
          <span className={styles.newsroomViz__tag}>📰 Featured Story</span>
          <span className={styles.newsroomViz__date}>
            <FaClock /> Nov 12, 2025{" "}
          </span>
        </div>
      </div>

      {/* Side mini cards */}
      <div className={styles.newsroomViz__side}>
        {[
          { icon: "🤝", label: "New Partnership", sub: "EPC Firms" },
          { icon: "📱", label: "App Launch", sub: "Dashboard" },
          { icon: "🌿", label: "420t CO₂", sub: "Eliminated" },
        ].map((c, i) => (
          <div key={i} className={styles.newsroomViz__sideCard}>
            <span className={styles.newsroomViz__sideIcon}>{c.icon}</span>
            <div>
              <strong>{c.label}</strong>
              <span>{c.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating stats */}
      <div className={styles.newsroomViz__float1}>
        <MdTrendingUp />
        <div>
          <strong>+127</strong>
          <span>This Month</span>
        </div>
      </div>
      <div className={styles.newsroomViz__float2}>
        <FaNewspaper />
        <div>
          <strong>24+</strong>
          <span>Media Mentions</span>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
const PressIndex: NextPage<Props> = ({ releases }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered =
    activeFilter === "all"
      ? releases
      : releases.filter((r) => r.category === activeFilter);

  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <Head>
        <title>Press &amp; Media | Solarxen</title>
        <meta
          name="description"
          content="Latest press releases, company announcements, and media resources from Solarxen Bangladesh."
        />
      </Head>
      <Header />
      <main className={styles.main}>
        {/* ── HERO ───────────────────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={styles.hero__bgGrid} />
          <div className={styles.hero__bgGlow1} />
          <div className={styles.hero__bgGlow2} />
          <Container>
            <Row className="align-items-center g-5">
              <Col lg={6} className={styles.hero__left}>
                <Badge className={styles.sectionBadge}>
                  <FaNewspaper /> Press &amp; Media
                </Badge>
                <h1 className={styles.hero__headline}>
                  Press &amp; Media
                  <br />
                  <span className={styles.hero__accent}>Center</span>
                </h1>
                <p className={styles.hero__sub}>
                  Stay updated with the latest Solarxen announcements,
                  milestones, media resources, and company news.
                </p>
                <div className={styles.hero__meta}>
                  {[
                    {
                      icon: <FaCalendarAlt />,
                      text: "Last updated Nov 12, 2025",
                    },
                    {
                      icon: <FaNewspaper />,
                      text: "24+ Media mentions in 2025",
                    },
                    {
                      icon: <FaGlobeAsia />,
                      text: "National coverage across Bangladesh",
                    },
                  ].map((m, i) => (
                    <div key={i} className={styles.hero__metaItem}>
                      <span className={styles.hero__metaIcon}>{m.icon}</span>
                      <span>{m.text}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.hero__actions}>
                  <Button className={styles.btn__primary}>
                    <FaDownload /> Download Media Kit
                  </Button>
                  <Link href="/contact" className={styles.btn__outline}>
                    <FaPlay /> Contact Media Team
                  </Link>
                </div>
              </Col>
              <Col lg={6}>
                <NewsroomVisual />
              </Col>
            </Row>
          </Container>
        </section>

        {/* ── PRESS RELEASES LIST ─────────────────────────────────────── */}
        <section className={styles.releases}>
          <Container>
            <div className={styles.sectionHeader}>
              <Badge className={styles.sectionBadge}>Newsroom</Badge>
              <h2 className={styles.sectionTitle}>Press Releases</h2>
              <p className={styles.sectionSub}>
                Official announcements, milestones, and company news from
                Solarxen
              </p>
            </div>

            {/* Filter bar */}
            <div className={styles.filterBar}>
              <div className={styles.filterBar__icon}>
                <FaFilter />
              </div>
              <div className={styles.filterBar__pills}>
                {FILTERS.map((f) => (
                  <button
                    key={f.value}
                    className={`${styles.filterPill} ${activeFilter === f.value ? styles.filterPill__active : ""}`}
                    onClick={() => {
                      setActiveFilter(f.value);
                      setVisibleCount(6);
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {visible.length === 0 ? (
              <div className={styles.releases__empty}>
                <FaNewspaper />
                <p>No press releases in this category yet.</p>
              </div>
            ) : (
              <Row className="g-4">
                {visible.map((pr) => (
                  <Col key={pr.id} xs={12} md={6} lg={4}>
                    <div
                      className={`${styles.prCard} ${styles[`prCard__${pr.catColor}`]}`}
                    >
                      <div className={styles.prCard__top}>
                        <time
                          dateTime={pr.dateISO}
                          className={styles.prCard__date}
                        >
                          <FaCalendarAlt /> {pr.date}
                        </time>
                        <Badge
                          className={`${styles.prCard__cat} ${CAT_COLOR[pr.catColor]}`}
                        >
                          {pr.category}
                        </Badge>
                      </div>
                      <h4 className={styles.prCard__headline}>{pr.headline}</h4>
                      <p className={styles.prCard__summary}>{pr.summary}</p>
                      <div className={styles.prCard__footer}>
                        {/* ✅ Dynamic link using slug */}
                        <Link
                          href={`/press-and-media/${pr.slug}`}
                          className={styles.prCard__readMore}
                        >
                          Read More <FaArrowRight />
                        </Link>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}

            {visibleCount < filtered.length && (
              <div className={styles.releases__loadMore}>
                <Button
                  className={styles.btn__outline}
                  onClick={() => setVisibleCount((v) => v + 3)}
                >
                  Load More Releases <FaArrowRight />
                </Button>
              </div>
            )}
          </Container>
        </section>

        <section className={styles.snapshot}>
          <Container>
            <div className={styles.sectionHeader}>
              <Badge className={styles.sectionBadge}>At a Glance</Badge>
              <h2 className={styles.sectionTitle}>About Solarxen</h2>
              <p className={styles.sectionSub}>
                Quick facts for journalists, analysts, and media professionals
              </p>
            </div>

            <div className={styles.snapshotGrid}>
              {[
                {
                  icon: <FaCalendarAlt />,
                  label: "Founded",
                  value: "2022",
                  sub: "Dhaka, Bangladesh",
                  color: "green",
                },
                {
                  icon: <FaMapMarkerAlt />,
                  label: "Headquarters",
                  value: "Dhaka",
                  sub: "Banani, Dhaka-1213",
                  color: "blue",
                },
                {
                  icon: <FaHome />,
                  label: "Active Rooftops",
                  value: "847+",
                  sub: "Across 38 districts",
                  color: "green",
                },
                {
                  icon: <FaBolt />,
                  label: "Total Installed Capacity",
                  value: "4.2 MW",
                  sub: "And growing monthly",
                  color: "yellow",
                },
                {
                  icon: <FaGlobeAsia />,
                  label: "Cities Served",
                  value: "38",
                  sub: "Target: all 64 by 2026",
                  color: "blue",
                },
                {
                  icon: <MdTrendingUp />,
                  label: "Network Growth",
                  value: "+18%",
                  sub: "Month-over-month",
                  color: "green",
                },
                {
                  icon: <FaLeaf />,
                  label: "CO₂ Eliminated",
                  value: "420t",
                  sub: "Equivalent to 19k trees",
                  color: "leaf",
                },
                {
                  icon: <FaChartLine />,
                  label: "Customer Earnings",
                  value: "৳12L+",
                  sub: "Total income generated",
                  color: "yellow",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className={`${styles.snapshotCard} ${styles[`snapshotCard--${s.color}`]}`}
                >
                  <div className={styles.snapshotCard__icon}>{s.icon}</div>
                  <div className={styles.snapshotCard__value}>{s.value}</div>
                  <div className={styles.snapshotCard__label}>{s.label}</div>
                  <div className={styles.snapshotCard__sub}>{s.sub}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
};

export default PressIndex;
