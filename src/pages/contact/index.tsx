"use client";

import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  BsTelephone,
  BsWhatsapp,
  BsEnvelope,
  BsCalendar2Check,
  BsArrowRight,
  BsCheckCircleFill,
  BsHouseDoor,
  BsGraphUp,
  BsBoxSeam,
  BsTools,
  BsDisplay,
  BsPeopleFill,
  BsGeoAlt,
  BsClock,
  BsChevronDown,
  BsSunFill,
  BsBuilding,
  BsPersonCheck,
  BsLightningChargeFill,
  BsBriefcase,
  BsCurrencyDollar,
  BsHammer,
  BsShieldCheck,
} from "react-icons/bs";
import styles from "./contact.module.scss";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import BangladeshMap from "@/component/networkmap";
import Head from "next/head";

// ── Types ─────────────────────────────────────────────────────────────────────
interface FaqItem {
  q: string;
  a: string;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  city: string;
  propertyType: string;
  rooftopSize: string;
  package: string;
  message: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const contactCards = [
  {
    icon: <BsTelephone />,
    title: "Phone Support",
    sub: "Call our energy advisors directly",
    link: "tel:+8801XXXXXXXXX",
    linkLabel: "+880 1XXX-XXXXXX",
  },
  {
    icon: <BsWhatsapp />,
    title: "WhatsApp Support",
    sub: "Chat with our team instantly",
    link: "https://wa.me/8801XXXXXXXXX",
    linkLabel: "Chat on WhatsApp",
  },
  {
    icon: <BsEnvelope />,
    title: "Email Us",
    sub: "Send your questions anytime",
    link: "mailto:hello@solarxen.com",
    linkLabel: "hello@solarxen.com",
  },
  {
    icon: <BsCalendar2Check />,
    title: "Schedule Consultation",
    sub: "Book a rooftop assessment online",
    link: "#form",
    linkLabel: "Book Now",
  },
];

const whyCards = [
  {
    icon: <BsHouseDoor />,
    color: "green",
    title: "Free Rooftop Assessment",
    desc: "Our experts visit your site and evaluate solar potential at zero cost.",
  },
  {
    icon: <BsGraphUp />,
    color: "yellow",
    title: "Estimated Income Projection",
    desc: "Get a clear monthly income estimate tailored to your rooftop size.",
  },
  {
    icon: <BsBoxSeam />,
    color: "blue",
    title: "Recommended Solar Package",
    desc: "We suggest the best-fit package for your energy needs and budget.",
  },
  {
    icon: <BsTools />,
    color: "green",
    title: "Installation Guidance",
    desc: "End-to-end support from planning to commissioning.",
  },
  {
    icon: <BsDisplay />,
    color: "yellow",
    title: "Smart Monitoring Demo",
    desc: "See how our real-time dashboard tracks your energy & earnings.",
  },
  {
    icon: <BsPersonCheck />,
    color: "blue",
    title: "Personalized Consultation",
    desc: "One-on-one session with a solar advisor, tailored to your goals.",
  },
];

const activeCities = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Cumilla",
  "Mymensingh",
];
const upcomingCities = [
  "Barishal",
  "Rangpur",
  "Jessore",
  "Cox's Bazar",
  "Narayanganj",
];

const faqs: FaqItem[] = [
  {
    q: "How much can I earn from Solarxen?",
    a: "Depending on your rooftop size and package, homeowners typically earn BDT 3,000–15,000/month. Our advisors provide a detailed income projection based on your specific property.",
  },
  {
    q: "How long does installation take?",
    a: "A standard residential installation takes 2–5 days after site assessment and approvals. Commercial projects may take 1–3 weeks depending on scale.",
  },
  {
    q: "Do you provide maintenance?",
    a: "Yes! All Solarxen installations come with a dedicated maintenance plan. Our monitoring system alerts our team to any performance issues automatically.",
  },
  {
    q: "Can businesses join Solarxen?",
    a: "Absolutely. We have tailored commercial packages for factories, warehouses, and offices — with dedicated account managers and faster ROI timelines.",
  },
  {
    q: "How do payouts work?",
    a: "Monthly earnings are calculated from your energy output data and transferred directly to your bank account or mobile wallet by the 5th of each month.",
  },
];

const partners = [
  {
    icon: <BsHammer />,
    title: "Solar Installers",
    desc: "Certified technicians & installation teams",
  },
  {
    icon: <BsBuilding />,
    title: "EPC Companies",
    desc: "Engineering, procurement & construction firms",
  },
  {
    icon: <BsHouseDoor />,
    title: "Property Developers",
    desc: "Builders & real estate developers",
  },
  {
    icon: <BsBriefcase />,
    title: "Businesses",
    desc: "Commercial & industrial property owners",
  },
  {
    icon: <BsCurrencyDollar />,
    title: "Energy Investors",
    desc: "Investors in clean energy infrastructure",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    city: "",
    propertyType: "",
    rooftopSize: "",
    package: "",
    message: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Contact Solarxen</title>
        <meta
          name="description"
          content="Get in touch with Solarxen for any inquiries or partnership opportunities."
        />
      </Head>
      <Header />
      <main className={styles.main}>
        {/* ── SECTION 1: HERO ─────────────────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={styles.heroGrid} />
          <Container>
            <Row className="align-items-center">
              <Col lg={6} className={styles.heroContent}>
                <div className={styles.heroBadge}>
                  <BsSunFill /> Contact Solarxen
                </div>
                <h1 className={styles.heroTitle}>
                  Let's Build Your <span>Solar Future</span> Together
                </h1>
                <p className={styles.heroSub}>
                  Whether you're looking to generate clean energy, earn monthly
                  income, or explore partnership opportunities — our team is
                  ready to help.
                </p>
                <div className={styles.heroActions}>
                  <Button href="#form" className={`btn ${styles.btn__primary}`}>
                    <BsCalendar2Check /> Get Free Consultation
                  </Button>
                  <Button
                    href="#form"
                    className={`btn ${styles.btnHeroOutline}`}
                  >
                    <BsHouseDoor /> Request Rooftop Assessment
                  </Button>
                </div>
              </Col>

              <Col lg={6} className={styles.heroVisual}>
                <div className="position-relative">
                  <div className={styles.heroFloatBadge}>
                    <BsCheckCircleFill className="me-1" /> 500+ Installations
                    Done
                  </div>
                  <div className={styles.heroCard}>
                    <div className={styles.heroCardTitle}>
                      <span>
                        <BsSunFill />
                      </span>
                      Live Solar Dashboard — Mirpur Residence
                    </div>
                    {[
                      ["Today's Generation", "18.4 kWh"],
                      ["Monthly Earnings", "BDT 9,200"],
                      ["CO₂ Offset", "142 kg"],
                      ["System Health", "✅ Optimal"],
                      ["Next Payout", "5 July 2025"],
                    ].map(([label, val]) => (
                      <div className={styles.heroStat} key={label}>
                        <span className="label">{label}</span>
                        <span className="val">{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`${styles.heroCard} mt-3`}>
                    <div className={styles.heroCardTitle}>
                      <span>
                        <BsPersonCheck />
                      </span>
                      Schedule a Free Assessment
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                        marginTop: "0.25rem",
                      }}
                    >
                      {[
                        "Mon 10AM",
                        "Tue 2PM",
                        "Wed 11AM",
                        "Thu 3PM",
                        "Fri 10AM",
                      ].map((slot) => (
                        <span
                          key={slot}
                          style={{
                            background: "rgba(249,178,51,0.12)",
                            color: "#F9B233",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            padding: "4px 10px",
                            borderRadius: 100,
                            cursor: "pointer",
                            border: "1px solid rgba(249,178,51,0.25)",
                          }}
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ── SECTION 2: QUICK CONTACT ─────────────────────────────────────────── */}
        <section className={styles.quickContact}>
          <Container>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <BsTelephone /> Get In Touch
              </span>
              <h2 className={styles.sectionTitle}>
                Choose How You'd Like to Connect
              </h2>
              <p className={styles.sectionSub}>
                Multiple ways to reach our expert team — pick what's easiest for
                you.
              </p>
            </div>
            <Row className="g-4">
              {contactCards.map((card, i) => (
                <Col sm={6} lg={3} key={i}>
                  <div className={styles.contactCard}>
                    <div className={styles.contactCardIcon}>{card.icon}</div>
                    <div className={styles.contactCardTitle}>{card.title}</div>
                    <div className={styles.contactCardSub}>{card.sub}</div>
                    <a href={card.link} className={styles.contactCardLink}>
                      {card.linkLabel} <BsArrowRight />
                    </a>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* ── SECTION 3: CONTACT FORM ──────────────────────────────────────────── */}
        <section className={styles.formSection} id="form">
          <Container>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <BsCalendar2Check /> Free Consultation
              </span>
              <h2 className={styles.sectionTitle}>
                Request Your Free Solar Consultation
              </h2>
              <p className={styles.sectionSub}>
                Fill in the form and our advisor will contact you within 24
                hours.
              </p>
            </div>
            <Row className="g-4 align-items-stretch">
              <Col lg={7}>
                <div className={styles.formWrap}>
                  {submitted ? (
                    <div className="text-center py-5">
                      <BsCheckCircleFill
                        style={{
                          fontSize: "3.5rem",
                          color: "#0B6B3A",
                          marginBottom: "1rem",
                        }}
                      />
                      <h4
                        style={{
                          fontFamily: "var(--font-display, sans-serif)",
                          fontWeight: 800,
                        }}
                      >
                        Thank You! We'll be in touch soon.
                      </h4>
                      <p style={{ color: "#475569", marginTop: "0.5rem" }}>
                        Your consultation request has been received. Our team
                        will reach out within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <Row className="g-3">
                        <Col md={6}>
                          <label className={styles.formLabel}>
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            className={`form-control ${styles.formControl}`}
                            placeholder="e.g. Rahman Ahmed"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={6}>
                          <label className={styles.formLabel}>
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            className={`form-control ${styles.formControl}`}
                            placeholder="+880 1XXX-XXXXXX"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={6}>
                          <label className={styles.formLabel}>
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            className={`form-control ${styles.formControl}`}
                            placeholder="you@email.com"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={6}>
                          <label className={styles.formLabel}>City *</label>
                          <input
                            type="text"
                            name="city"
                            required
                            className={`form-control ${styles.formControl}`}
                            placeholder="Your city"
                            value={formData.city}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={6}>
                          <label className={styles.formLabel}>
                            Property Type *
                          </label>
                          <select
                            name="propertyType"
                            required
                            className={`form-select ${styles.formSelect}`}
                            value={formData.propertyType}
                            onChange={handleChange}
                          >
                            <option value="">Select property type</option>
                            <option>Home</option>
                            <option>Apartment</option>
                            <option>Commercial Building</option>
                            <option>Factory</option>
                          </select>
                        </Col>
                        <Col md={6}>
                          <label className={styles.formLabel}>
                            Rooftop Size (Optional)
                          </label>
                          <input
                            type="text"
                            name="rooftopSize"
                            className={`form-control ${styles.formControl}`}
                            placeholder="e.g. 1200 sq ft"
                            value={formData.rooftopSize}
                            onChange={handleChange}
                          />
                        </Col>
                        <Col md={12}>
                          <label className={styles.formLabel}>
                            Interested Package
                          </label>
                          <select
                            name="package"
                            className={`form-select ${styles.formSelect}`}
                            value={formData.package}
                            onChange={handleChange}
                          >
                            <option value="">Select a package</option>
                            <option>Starter — 3 kW</option>
                            <option>Home Pro — 5 kW</option>
                            <option>Business — 10 kW</option>
                            <option>Industrial — 20 kW+</option>
                            <option>Not sure yet</option>
                          </select>
                        </Col>
                        <Col md={12}>
                          <label className={styles.formLabel}>Message</label>
                          <textarea
                            name="message"
                            rows={4}
                            className={`form-control ${styles.formControl}`}
                            placeholder="Tell us about your property, goals, or any questions..."
                            value={formData.message}
                            onChange={
                              handleChange as React.ChangeEventHandler<HTMLTextAreaElement>
                            }
                          />
                        </Col>
                        <Col md={12}>
                          <Button
                            type="submit"
                            className={`btn ${styles.btn__primary} w-100`}
                            style={{
                              justifyContent: "center",
                              fontSize: "1rem",
                              padding: "15px",
                            }}
                          >
                            <BsCalendar2Check /> Request Consultation
                          </Button>
                        </Col>
                      </Row>
                    </form>
                  )}
                </div>
              </Col>

              <Col lg={5}>
                <div className={styles.formSideInfo}>
                  <h3 className={styles.formSideTitle}>What Happens Next?</h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "0.88rem",
                      position: "relative",
                    }}
                  >
                    After submitting, here's your journey with Solarxen:
                  </p>
                  <ul className={styles.formSideList}>
                    {[
                      {
                        icon: "01",
                        title: "Advisor Calls You",
                        desc: "Within 24 hours, a solar expert reaches out to understand your needs.",
                      },
                      {
                        icon: "02",
                        title: "Free Site Assessment",
                        desc: "We visit your property to assess rooftop size, orientation & shading.",
                      },
                      {
                        icon: "03",
                        title: "Income Report",
                        desc: "You receive a personalised monthly income projection for free.",
                      },
                      {
                        icon: "04",
                        title: "Package & Proposal",
                        desc: "We present the best solar package with transparent pricing.",
                      },
                      {
                        icon: "05",
                        title: "Installation Day",
                        desc: "Our certified team installs your system in 2–5 days.",
                      },
                    ].map((step) => (
                      <li key={step.icon}>
                        <span className="icon">{step.icon}</span>
                        <div>
                          <strong>{step.title}</strong>
                          {step.desc}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ── SECTION 4: WHY CONTACT ───────────────────────────────────────────── */}
        <section className={styles.whySection}>
          <Container>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <BsShieldCheck /> Benefits
              </span>
              <h2 className={styles.sectionTitle}>What You'll Get</h2>
              <p className={styles.sectionSub}>
                Every consultation comes loaded with value — completely free.
              </p>
            </div>
            <Row className="g-4">
              {whyCards.map((card, i) => (
                <Col sm={6} lg={4} key={i}>
                  <div className={styles.whyCard}>
                    <div
                      className={`${styles.whyIcon} ${styles[`whyIcon--${card.color}` as keyof typeof styles]}`}
                    >
                      {card.icon}
                    </div>
                    <div className={styles.whyTitle}>{card.title}</div>
                    <div className={styles.whyDesc}>{card.desc}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* ── SECTION 5: COVERAGE ─────────────────────────────────────────────── */}
        <section className={styles.coverageSection}>
          <Container>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <BsGeoAlt /> Coverage
              </span>
              <h2 className={styles.sectionTitle}>
                Serving Homes and Businesses Across Bangladesh
              </h2>
              <p className={styles.sectionSub}>
                Rapidly expanding our network of installations and service
                points.
              </p>
            </div>
            <Row className="g-4 align-items-center">
              <Col lg={5}>
                <div className={styles.mapWrap}>
                  {/* Bangladesh SVG map placeholder */}
                  <BangladeshMap />
                </div>
              </Col>
              <Col lg={7}>
                <h4
                  style={{
                    fontWeight: 800,
                    marginBottom: "1rem",
                    color: "#1A2E20",
                  }}
                >
                  Active Service Cities
                </h4>
                <div className="mb-3">
                  {activeCities.map((city) => (
                    <span
                      key={city}
                      className={`${styles.cityChip} ${styles["cityChip--active"]}`}
                    >
                      <BsCheckCircleFill /> {city}
                    </span>
                  ))}
                </div>
                <h4
                  style={{
                    fontWeight: 800,
                    marginBottom: "1rem",
                    marginTop: "1.5rem",
                    color: "#1A2E20",
                  }}
                >
                  Expanding Soon
                </h4>
                <div>
                  {upcomingCities.map((city) => (
                    <span
                      key={city}
                      className={`${styles.cityChip} ${styles["cityChip--upcoming"]}`}
                    >
                      <BsLightningChargeFill /> {city}
                    </span>
                  ))}
                </div>
                <div
                  className="mt-4 p-3"
                  style={{ background: "#E8F5EE", borderRadius: 12 }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.875rem",
                      color: "#0B6B3A",
                      fontWeight: 600,
                    }}
                  >
                    📍 Not in your city yet? Register your interest — we'll
                    notify you when we launch near you.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ── SECTION 6: OFFICE ───────────────────────────────────────────────── */}
        <section className={styles.officeSection}>
          <Container>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionBadge}>
                <BsBuilding /> Our Office
              </span>
              <h2 className={styles.sectionTitle}>Visit Our Team</h2>
              <p className={styles.sectionSub}>
                We'd love to meet you in person. Come say hello!
              </p>
            </div>
            <Row className="g-4 align-items-stretch">
              <Col lg={5}>
                <div className={styles.officeCard}>
                  <h5 style={{ fontWeight: 800, marginBottom: "0.25rem" }}>
                    Solarxen Headquarters
                  </h5>
                  <p
                    style={{
                      color: "#475569",
                      fontSize: "0.875rem",
                      marginBottom: 0,
                    }}
                  >
                    Bangladesh's Leading Rooftop Solar Platform
                  </p>
                  <div className={styles.officeInfo}>
                    {[
                      {
                        icon: <BsGeoAlt />,
                        label: "Address",
                        val: "House 12, Road 4, Block C\nBashundhara R/A, Dhaka 1229",
                      },
                      {
                        icon: <BsTelephone />,
                        label: "Phone",
                        val: "+880 1XXX-XXXXXX\n+880 1XXX-XXXXXX",
                      },
                      {
                        icon: <BsEnvelope />,
                        label: "Email",
                        val: "hello@solarxen.com\nsupport@solarxen.com",
                      },
                      {
                        icon: <BsClock />,
                        label: "Business Hours",
                        val: "Sun – Thu: 9:00 AM – 6:00 PM\nFri – Sat: 10:00 AM – 2:00 PM",
                      },
                    ].map((row, i) => (
                      <div className={styles.officeInfoRow} key={i}>
                        <div className="iconBox">{row.icon}</div>
                        <div className="infoText">
                          <div className="infoLabel">{row.label}</div>
                          <div
                            className="infoVal"
                            style={{ whiteSpace: "pre-line" }}
                          >
                            {row.val}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
              <Col lg={7}>
                <div className={styles.mapEmbed}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14605.24789!2d90.4230!3d23.8103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7715a40c603%3A0xec01cd75f47b73c7!2sBashundhara%20Residential%20Area%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1680000000000"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Solarxen Office Map"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* ── SECTION 7: FAQ ──────────────────────────────────────────────────── */}
        <section className={styles.faqSection}>
          <Container>
            <Row className="justify-content-center">
              <Col lg={8}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionBadge}>
                    <BsCheckCircleFill /> FAQ
                  </span>
                  <h2 className={styles.sectionTitle}>
                    Frequently Asked Questions
                  </h2>
                  <p className={styles.sectionSub}>
                    Quick answers to the questions we hear most often.
                  </p>
                </div>
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className={`${styles.faqItem} ${openFaq === i ? styles.open : ""}`}
                  >
                    <button
                      className={`${styles.faqQuestion} ${openFaq === i ? styles.open : ""}`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                    >
                      {faq.q}
                      <span className={styles.faqIcon}>
                        <BsChevronDown />
                      </span>
                    </button>
                    <div
                      className={`${styles.faqAnswer} ${openFaq === i ? styles.open : ""}`}
                    >
                      <p>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </section>

        {/* ── SECTION 8: PARTNERSHIP ──────────────────────────────────────────── */}
        <section className={styles.partnerSection}>
          <Container>
            <div className={styles.sectionHeader}>
              <span
                className={`${styles.sectionBadge} ${styles["sectionBadge--white"]}`}
              >
                <BsPeopleFill /> Partnership
              </span>
              <h2
                className={`${styles.sectionTitle} ${styles["sectionTitle--white"]}`}
              >
                Partner With Solarxen
              </h2>
              <p
                className={`${styles.sectionSub} ${styles["sectionSub--white"]}`}
              >
                Join Bangladesh's fastest-growing solar platform and grow
                together.
              </p>
            </div>
            <Row className="g-4 mb-5 justify-content-center">
              {partners.map((p, i) => (
                <Col xs={6} sm={4} md={3} lg={2} key={i} className="d-flex">
                  <div className={styles.partnerCard}>
                    <div className={styles.partnerIcon}>{p.icon}</div>
                    <div className={styles.partnerCardTitle}>{p.title}</div>
                    <div className={styles.partnerCardDesc}>{p.desc}</div>
                  </div>
                </Col>
              ))}
            </Row>
            <div className="text-center">
              <Button href="#form" className={`btn ${styles.btnYellow}`}>
                <BsPeopleFill /> Become a Partner <BsArrowRight />
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
