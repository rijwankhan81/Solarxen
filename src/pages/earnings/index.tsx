"use client";

import { Accordion, Button, Container } from "react-bootstrap";

import styles from "./earnings.module.scss";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import CTA from "@/component/cta";
import { faqData } from "@/constants/faqData";
import { useState, useMemo } from "react";
import Head from "next/head";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import Testimonials from "@/component/testimonials";
import Link from "next/link";

export default function Earnings() {
  const [capacity, setCapacity] = useState(5);
  const [usage, setUsage] = useState(200);

  const calculations = useMemo(() => {
    const generation = capacity * 120;
    const exportUnits = Math.max(generation - usage, 0);

    const monthlyIncome = exportUnits * 13;
    const annualIncome = monthlyIncome * 12;

    return {
      generation,
      exportUnits,
      monthlyIncome,
      annualIncome,
    };
  }, [capacity, usage]);
  return (
    <>
      <Head>
        <title>Earnings | Solarxen</title>
      </Head>
      <Header />
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <Container>
            <div className={styles.heroContent}>
              <span className={styles.badge}> Live Earning Platform</span>

              <h1>See How Your Rooftop Can Generate Income</h1>

              <p>
                Understand how rooftop solar can reduce electricity costs and
                generate additional value through excess energy exports.
              </p>

              <div className={styles.hero__actions}>
                <Button className={styles.btn__primary}>
                  Calculate My Earnings <FaArrowRight />
                </Button>
                <Link href="/packages" className={styles.btn__outline}>
                  <FaPlay /> Explore Packages
                </Link>
              </div>
            </div>
          </Container>
        </section>
        <section className={styles.calculatorSection}>
          <Container>
            <div className={styles.calculatorGrid}>
              {/* Left Side */}
              <div className={styles.leftContent}>
                <h2>See Your Potential Monthly Earnings</h2>

                <p>
                  Adjust the sliders to estimate how much you could earn by
                  exporting clean energy to the grid.
                </p>

                <div className={styles.calculatorCard}>
                  {/* Capacity */}
                  <div className={styles.sliderGroup}>
                    <div className={styles.sliderHeader}>
                      <span>System Capacity (kW)</span>

                      <strong>{capacity} kW</strong>
                    </div>

                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={capacity}
                      onChange={(e) => setCapacity(Number(e.target.value))}
                    />

                    <div className={styles.rangeLabels}>
                      <span>1 kW</span>
                      <span>20 kW</span>
                    </div>
                  </div>

                  {/* Usage */}
                  <div className={styles.sliderGroup}>
                    <div className={styles.sliderHeader}>
                      <span>Your Monthly Usage (Units)</span>

                      <strong>{usage} Units</strong>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="10"
                      value={usage}
                      onChange={(e) => setUsage(Number(e.target.value))}
                    />

                    <p className={styles.helperText}>
                      Lower usage means more energy exported for income.
                    </p>
                  </div>

                  <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                      <span>Est. Generation ☀️</span>

                      <h4>{calculations.generation}</h4>

                      <small>units/mo</small>
                    </div>

                    <div className={styles.statCard}>
                      <span>Grid Export 🔄</span>

                      <h4>{calculations.exportUnits}</h4>

                      <small>units/mo</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className={styles.rightContent}>
                <h3>Financial Projection</h3>

                <div className={styles.projectionCard}>
                  <span>Estimated Monthly Payout</span>

                  <h2>
                    ৳{calculations.monthlyIncome.toLocaleString()}{" "}
                    <small>/month</small>
                  </h2>

                  <div className={styles.annualProjection}>
                    <span>Annual Projection</span>

                    <strong>
                      ৳{calculations.annualIncome.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div className={styles.chartCard}>
                  <h5>5-Year Cumulative Earning</h5>

                  <div className={styles.chart}>
                    <div className={styles.chartArea}></div>
                  </div>

                  <div className={styles.chartLabels}>
                    <span>Year 1</span>
                    <span>Year 2</span>
                    <span>Year 3</span>
                    <span>Year 4</span>
                    <span>Year 5</span>
                  </div>

                  <p className={styles.disclaimer}>
                    *Estimates based on average sunlight hours in Bangladesh and
                    current grid export rates. Actual results may vary.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
        <Testimonials />
        <section className={styles.faqSection}>
          <Container>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                Frequently Asked Questions
              </h2>

              <p className={styles.sectionDescription}>
                Everything you need to know about our solar packages.
              </p>
            </div>

            <div className={styles.faqWrapper}>
              <Accordion flush>
                {faqData.map((item, index) => (
                  <Accordion.Item
                    key={index}
                    eventKey={String(index)}
                    className={styles.accordionItem}
                  >
                    <Accordion.Header>{item.question}</Accordion.Header>

                    <Accordion.Body>{item.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </div>
          </Container>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
}
