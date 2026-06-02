"use client";

import { Container } from "react-bootstrap";
import {
  FaBolt,
  FaChartLine,
  FaLeaf,
  FaShieldAlt,
  FaSolarPanel,
  FaHandshake,
  FaLightbulb,
  FaGlobeAsia,
} from "react-icons/fa";
import styles from "./about.module.scss";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import CTA from "@/component/cta";
import NextImage from "@/hooks/NextImage";

const valueData = [
  {
    icon: <FaSolarPanel />,
    title: "Generate Clean Power",
    desc: "Transform unused rooftop space into productive solar energy infrastructure.",
  },
  {
    icon: <FaBolt />,
    title: "Export To The Grid",
    desc: "Feed excess electricity into the grid through approved energy programs.",
  },
  {
    icon: <FaChartLine />,
    title: "Earn Monthly Income",
    desc: "Receive recurring payouts based on your exported electricity.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Monitor Everything",
    desc: "Track production, exports, and earnings through a smart dashboard.",
  },
];

const valuesData = [
  {
    icon: <FaHandshake />,
    title: "Transparency",
    desc: "Clear reporting, earnings visibility, and trustworthy operations.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Reliability",
    desc: "Professional installation and long-term support for every system.",
  },
  {
    icon: <FaLightbulb />,
    title: "Innovation",
    desc: "Smart technology powering modern renewable energy infrastructure.",
  },
  {
    icon: <FaLeaf />,
    title: "Sustainability",
    desc: "Creating environmental and financial value together.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <Container>
            <div className={styles.heroContent}>
              <span className={styles.badge}>About Solarxen</span>

              <h1>
                Empowering Rooftops.
                <br />
                Creating Clean Energy Income.
              </h1>

              <p>
                Solarxen is building Bangladesh's next-generation distributed
                energy network by helping homeowners and businesses transform
                unused rooftop space into reliable sources of clean electricity
                and recurring income.
              </p>

              <div className={styles.heroStats}>
                <div>
                  <h3>500+</h3>
                  <span>Active Rooftops</span>
                </div>

                <div>
                  <h3>৳12M+</h3>
                  <span>Monthly Payouts</span>
                </div>

                <div>
                  <h3>12.5 MW</h3>
                  <span>Connected Capacity</span>
                </div>

                <div>
                  <h3>2,840+</h3>
                  <span>Tons CO₂ Saved</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Mission */}
        <section className={styles.section}>
          <Container>
            <div className={styles.missionGrid}>
              <div className={styles.missionCard}>
                <NextImage
                  src="/images/rooftops.jpg"
                  alt="Solar House"
                  className={styles.image}
                />
              </div>

              <div>
                <span className={styles.label}>Our Mission</span>

                <h2>
                  Making Solar Energy Accessible, Profitable, and Transparent
                </h2>

                <p>
                  At Solarxen, our mission is simple: make solar energy
                  accessible, profitable, and transparent for everyone.
                </p>

                <p>
                  We believe every rooftop in Bangladesh has the potential to
                  become a clean energy asset. Through smart technology,
                  reliable infrastructure, and transparent earnings, we help
                  individuals and businesses participate in the country's energy
                  future while generating sustainable income.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Value */}
        <section className={styles.sectionGray}>
          <Container>
            <div className={styles.heading}>
              <span>A Smarter Energy Ecosystem</span>

              <h2>How Solarxen Creates Value</h2>
            </div>

            <div className={styles.valueGrid}>
              {valueData.map((item, index) => (
                <div className={styles.valueCard} key={index}>
                  <div className={styles.icon}>{item.icon}</div>

                  <h3>{item.title}</h3>

                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Challenge */}
        <section className={styles.section}>
          <Container>
            <div className={styles.challengeGrid}>
              <div>
                <span className={styles.label}>
                  Why Bangladesh Needs Solarxen
                </span>

                <h2>Solving Real Energy Challenges</h2>

                <p>
                  Bangladesh's demand for electricity continues to grow every
                  year. At the same time, thousands of rooftops remain
                  underutilized.
                </p>

                <p>
                  Solarxen bridges this gap by connecting clean energy
                  generation with smart digital infrastructure, helping reduce
                  grid pressure while creating new financial opportunities for
                  citizens.
                </p>
              </div>

              <div className={styles.challengeCards}>
                <div>Growing Energy Demand</div>
                <div>Rooftop Utilization</div>
                <div>Grid Stability</div>
                <div>Renewable Adoption</div>
              </div>
            </div>
          </Container>
        </section>

        {/* Values */}
        <section className={styles.sectionGray}>
          <Container>
            <div className={styles.heading}>
              <span>Core Values</span>

              <h2>What Drives Solarxen</h2>
            </div>

            <div className={styles.valueGrid}>
              {valuesData.map((item, index) => (
                <div className={styles.valueCard} key={index}>
                  <div className={styles.icon}>{item.icon}</div>

                  <h3>{item.title}</h3>

                  <p>{item.desc}</p>
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
}
