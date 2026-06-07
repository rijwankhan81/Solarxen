// pages/press/[slug].tsx
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import {
  FaArrowLeft,
  FaArrowRight,
  FaEnvelope,
  FaCalendarAlt,
  FaCheckCircle,
  FaWhatsapp,
  FaQuoteLeft,
} from "react-icons/fa";
import { MdSolarPower } from "react-icons/md";

import {
  getAllSlugs,
  getPressReleaseBySlug,
  getRelatedReleases,
  type PressRelease,
  type PressBody,
} from "@/constants/pressReleases";
import styles from "./PressReleaseSingle.module.scss";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import CTA from "@/component/cta";

// ── Props ──────────────────────────────────────────────────────────────────
interface Props {
  release: PressRelease;
  related: PressRelease[];
}

// ── getStaticPaths ─────────────────────────────────────────────────────────
export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllSlugs().map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
  // fallback: "blocking"  ← use this if you later add a CMS / DB
};

// ── getStaticProps ─────────────────────────────────────────────────────────
export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  const slug = params?.slug as string;
  const release = getPressReleaseBySlug(slug);

  // Should never happen with fallback:false, but TS guard
  if (!release) return { notFound: true };

  return {
    props: {
      release,
      related: getRelatedReleases(release, 3),
    },
    // revalidate: 60,  ← uncomment when you move to ISR / CMS
  };
};

// ── Category colour map ────────────────────────────────────────────────────
const CAT_COLOR: Record<string, string> = {
  green: styles.catBadge__green,
  blue: styles.catBadge__blue,
  yellow: styles.catBadge__yellow,
  teal: styles.catBadge__teal,
  leaf: styles.catBadge__leaf,
};

// ── Body block renderer ────────────────────────────────────────────────────
function BodyBlock({ block }: { block: PressBody }) {
  switch (block.type) {
    case "paragraph":
      return <p dangerouslySetInnerHTML={{ __html: block.text }} />;

    case "heading":
      return <h2>{block.text}</h2>;

    case "pullQuote":
      return (
        <blockquote className={styles.pullQuote}>
          <FaQuoteLeft className={styles.pullQuote__icon} />
          <p>{block.text}</p>
          <footer>
            <strong>{block.attribution}</strong>
          </footer>
        </blockquote>
      );

    case "highlight":
      return (
        <div className={styles.highlight}>
          <span className={styles.highlight__icon}>{block.icon}</span>
          <div>
            <strong>{block.title}</strong>
            <p>{block.text}</p>
          </div>
        </div>
      );

    case "checklist":
      return (
        <div className={styles.checklist}>
          <div className={styles.checklist__title}>{block.title}</div>
          {block.items.map((item, i) => (
            <div key={i} className={styles.checklist__item}>
              <FaCheckCircle className={styles.checklist__icon} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      );

    case "closing":
      return <div className={styles.closing}>###</div>;

    default:
      return null;
  }
}

// ══════════════════════════════════════════════════════════════════════════
//  PAGE COMPONENT
// ══════════════════════════════════════════════════════════════════════════
const PressReleaseSingle: NextPage<Props> = ({ release, related }) => {
  return (
    <>
      <Head>
        <title>{release.headline} | Solarxen Press</title>
        <meta name="description" content={release.summary} />
        <meta property="og:title" content={release.headline} />
        <meta property="og:description" content={release.deck} />
        <meta property="og:type" content="article" />
        <meta name="article:published_time" content={release.dateISO} />
      </Head>
      <Header />
      <main className={styles.main}>
        {/* ── Breadcrumb ─────────────────────────────────────────────── */}
        <div className={styles.breadcrumb}>
          <Container>
            <div className={styles.breadcrumb__inner}>
              <Link href="/press-and-media" className={styles.breadcrumb__link}>
                <FaArrowLeft /> Press &amp; Media
              </Link>
              <span className={styles.breadcrumb__sep}>/</span>
              <span className={styles.breadcrumb__crumb}>Press Releases</span>
              <span className={styles.breadcrumb__sep}>/</span>
              <span
                className={`${styles.breadcrumb__crumb} ${styles.breadcrumb__crumb__truncate}`}
              >
                {release.headline}
              </span>
            </div>
          </Container>
        </div>

        {/* ── Article ────────────────────────────────────────────────── */}
        <section className={styles.article}>
          <Container>
            <Row className="g-5">
              {/* ── Main column ──────────────────────────────────────── */}
              <Col lg={8}>
                {/* Header */}
                <div className={styles.article__header}>
                  <div className={styles.article__meta}>
                    <Badge
                      className={`${styles.catBadge} ${CAT_COLOR[release.catColor]}`}
                    >
                      {release.category}
                    </Badge>
                    <time
                      dateTime={release.dateISO}
                      className={styles.article__date}
                    >
                      <FaCalendarAlt /> {release.date}
                    </time>
                    <span className={styles.article__readTime}>
                      {release.readTime}
                    </span>
                  </div>

                  <h1 className={styles.article__headline}>
                    {release.headline}
                  </h1>

                  <p className={styles.article__deck}>{release.deck}</p>
                </div>

                {/* Stats strip — driven by data */}
                <div className={styles.statsStrip}>
                  {release.stats.map((s, i) => (
                    <div
                      key={i}
                      className={`${styles.statPill} ${styles[`statPill__${s.color}`]}`}
                    >
                      <strong>{s.val}</strong>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Body blocks — driven by data */}
                <div className={styles.article__body}>
                  {release.body.map((block, i) => (
                    <BodyBlock key={i} block={block} />
                  ))}

                  {/* About boilerplate — same for every release */}
                  <div className={styles.about}>
                    <div className={styles.about__title}>About Solarxen</div>
                    <p>
                      Solarxen is Bangladesh's leading rooftop solar income
                      platform, helping homeowners and businesses generate clean
                      electricity and earn monthly income from their rooftops.
                      Founded in 2022 and headquartered in Dhaka, Solarxen
                      operates a connected network of 800+ solar installations
                      across 38 districts.
                    </p>
                    <p>
                      For media inquiries:{" "}
                      <a href="mailto:media@solarxen.com">media@solarxen.com</a>
                    </p>
                  </div>
                </div>

                {/* Back link */}
                <div className={styles.backLink}>
                  <Link href="/press-and-media" className={styles.backLink__a}>
                    <FaArrowLeft /> Back to all press releases
                  </Link>
                </div>
              </Col>

              {/* ── Sidebar ───────────────────────────────────────────── */}
              <Col lg={4}>
                <aside className={styles.sidebar}>
                  {/* Media contact */}
                  <div className={styles.sidebar__card}>
                    <div className={styles.sidebar__cardTitle}>
                      <FaEnvelope /> Media Contact
                    </div>
                    <div className={styles.sidebar__mediaContact}>
                      <div className={styles.sidebar__avatar}>SC</div>
                      <div>
                        <strong>Solarxen Communications</strong>
                        <span>Press &amp; Media Relations</span>
                      </div>
                    </div>
                    <div className={styles.sidebar__contactRow}>
                      <FaEnvelope />
                      <a href="mailto:media@solarxen.com">media@solarxen.com</a>
                    </div>
                    <div className={styles.sidebar__contactRow}>
                      <FaWhatsapp />
                      <a href="#">+880 1800-SOLARXEN</a>
                    </div>
                    <Button
                      className={`${styles.btn__primary} w-100 mt-3`}
                      style={{
                        justifyContent: "center",
                        fontSize: "0.88rem",
                        padding: "12px",
                      }}
                    >
                      <FaEnvelope /> Contact Media Team
                    </Button>
                  </div>

                  {/* Quick facts — driven by data */}
                  <div className={styles.sidebar__card}>
                    <div className={styles.sidebar__cardTitle}>
                      <MdSolarPower /> Quick Facts
                    </div>
                    <div className={styles.sidebar__facts}>
                      {[
                        { label: "Release Date", val: release.date },
                        { label: "Category", val: release.category },
                        { label: "Read Time", val: release.readTime },
                        { label: "Language", val: "English " },
                      ].map((f, i) => (
                        <div key={i} className={styles.sidebar__fact}>
                          <span>{f.label}</span>
                          <strong>{f.val}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA card */}
                  <div
                    className={`${styles.sidebar__card} ${styles.sidebar__card__green}`}
                  >
                    <MdSolarPower className={styles.sidebar__ctaLogo} />
                    <div className={styles.sidebar__ctaTitle}>
                      Join the Solarxen Network
                    </div>
                    <p className={styles.sidebar__ctaDesc}>
                      Earn monthly income from your rooftop. Free consultation,
                      no commitment.
                    </p>
                    <Button
                      className={`${styles.btn__primaryWhite} w-100`}
                      style={{
                        justifyContent: "center",
                        fontSize: "0.88rem",
                        padding: "12px",
                      }}
                    >
                      Get Free Consultation <FaArrowRight />
                    </Button>
                  </div>
                </aside>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ── Related releases — driven by data ──────────────────────── */}
        {related.length > 0 && (
          <section className={styles.related}>
            <Container>
              <div className={styles.related__header}>
                <div>
                  <Badge className={styles.sectionBadge}>More News</Badge>
                  <h2 className={styles.related__title}>
                    Related Press Releases
                  </h2>
                </div>
                <Link href="/press" className={styles.related__viewAll}>
                  View All <FaArrowRight />
                </Link>
              </div>
              <Row className="g-4">
                {related.map((r) => (
                  <Col key={r.id} xs={12} md={4}>
                    <div
                      className={`${styles.relatedCard} ${styles[`relatedCard__${r.catColor}`]}`}
                    >
                      <div className={styles.relatedCard__top}>
                        <time
                          dateTime={r.dateISO}
                          className={styles.relatedCard__date}
                        >
                          <FaCalendarAlt /> {r.date}
                        </time>
                        <Badge
                          className={`${styles.catBadge} ${CAT_COLOR[r.catColor]}`}
                        >
                          {r.category}
                        </Badge>
                      </div>
                      <h4 className={styles.relatedCard__headline}>
                        {r.headline}
                      </h4>
                      <p className={styles.relatedCard__summary}>{r.summary}</p>
                      <Link
                        href={`/press/${r.slug}`}
                        className={styles.relatedCard__cta}
                      >
                        Read More <FaArrowRight />
                      </Link>
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
          </section>
        )}

        <CTA />
      </main>
      <Footer />
    </>
  );
};

export default PressReleaseSingle;
