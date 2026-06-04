import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Header from "@/layout/header";
import NextImage from "@/hooks/NextImage";
import Footer from "@/layout/footer";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { features } from "@/constants/features";
import { processData } from "@/constants/processData";
import Packages from "@/component/packages";
import { FaArrowRight, FaPlay } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Head>
        <title>Solarxen</title>
      </Head>
      <Header />
      <main className={styles.main}>
        {/* HERO */}
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
                  <span className={styles.liveDot} /> Smart Energy Platform For
                  Bangladesh
                </Badge>
                <h1 className={styles.hero__headline}>
                  Earn from Your{" "}
                  <span className={styles.hero__headlineAccent}>Rooftop</span>{" "}
                  with Solarxen
                </h1>
                <p className={styles.hero__sub}>
                  Install solar, generate power, and receive monthly income
                  through our smart energy platform.
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
                    <strong>3.2 kW</strong>
                    <span>Live Generation</span>
                  </div>
                  <div className={styles.hero__qsDivider} />
                  <div className={styles.hero__qs}>
                    <strong>৳12L+</strong>
                    <span>Earned</span>
                  </div>
                </div>
              </Col>

              <Col lg={6} className={styles.hero__visual}>
                <div className={styles.heroImage}>
                  <NextImage
                    src="/images/hm-bn.jpg"
                    alt="Solar House"
                    className={styles.image}
                  />

                  <div className={styles.floatingCardTop}>
                    <p>Monthly Earning</p>
                    <h3>৳14,500</h3>
                    <span>+12% this month</span>
                  </div>

                  <div className={styles.floatingCardBottom}>
                    <p>Live Generation</p>
                    <h3>3.2 kW</h3>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* PROCESS */}
        <section className={styles.process}>
          <Container className={styles.container}>
            {" "}
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>How Solarxen Works</h2>
              <p className={styles.sectionSub}>
                A simple, transparent process from installation to your first
                monthly payout.
              </p>
            </div>
            <div className={styles.processGrid}>
              {processData.map((item) => (
                <div className={styles.processCard} key={item.id}>
                  <div className={styles.processIcon}>{item.icon}</div>

                  <h3>{item.title}</h3>

                  <p>{item.desc}</p>
                </div>
              ))}
            </div>{" "}
          </Container>
        </section>

        <Packages />

        {/* DASHBOARD */}
        <section className={styles.dashboard}>
          <Container className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Platform Impact Dashboard</h2>
              <p className={styles.sectionSub}>
                Real time statistics from the Solarxen community network.
              </p>
            </div>
            <div className={styles.dashboardStats}>
              <div className={styles.dashboardCard}>
                <span>Total Connected</span>
                <h3>12.5 MW</h3>
                <p>4% this month</p>
              </div>

              <div className={styles.dashboardCard}>
                <span>Units Generated</span>
                <h3>4.2M kWh</h3>
                <p>12% this month</p>
              </div>

              <div className={styles.dashboardCard}>
                <span>Customer Earnings</span>
                <h3>৳45M+</h3>
                <p>Paid out</p>
              </div>

              <div className={styles.dashboardCard}>
                <span>CO₂ Saved</span>
                <h3>2,840 Tons</h3>
                <p>Environmental Impact</p>
              </div>
            </div>
            <div className={styles.chart}>
              <div className={styles.chartLine}>
                <NextImage
                  src="/images/dash-grp.svg"
                  alt="Solar House"
                  className={styles.image}
                />
              </div>
            </div>{" "}
          </Container>
        </section>

        {/* WHY US */}

        <section className={styles.whyUs}>
          <Container>
            <div className={styles.sectionHeader}>
              <Badge className={styles.sectionBadge}>Benefits</Badge>
              <h2 className={styles.sectionTitle}>Why Choose Solarxen?</h2>
              <p className={styles.sectionSub}>
                We make rooftop solar easy, profitable, and worry free.
              </p>
            </div>
            <Row className="g-4">
              {features.map((f, i) => (
                <Col key={i} xs={12} sm={6} lg={4} xl={3}>
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
      </main>
      <Footer />
    </>
  );
}
