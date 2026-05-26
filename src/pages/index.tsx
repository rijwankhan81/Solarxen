import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Header from "@/layout/header";
import NextImage from "@/hooks/NextImage";
import Footer from "@/layout/footer";
import { Container } from "react-bootstrap";
import { features } from "@/constants/features";
import { packages } from "@/constants/packages";
import { processData } from "@/constants/processData";
import Packages from "@/component/packages";

export default function Home() {
  return (
    <>
      <Head>
        <title>Solarxen</title>
      </Head>
      <Header />
      <main className={styles.main}>
        {/* HERO */}
        <section className={styles.hero}>
          <Container className={styles.container}>
            <div className={styles.heroContent}>
              <span className={styles.badge}>
                Smart Energy Platform For Bangladesh
              </span>

              <h1>
                Earn from Your <br />
                <span>Rooftop</span> with Solarxen
              </h1>

              <p>
                Install solar, generate power, and receive monthly income
                through our smart energy platform.
              </p>

              <div className={styles.heroButtons}>
                <button className={styles.primaryBtn}>
                  Join Solarxen Network
                </button>

                <button className={styles.secondaryBtn}>
                  Explore Solar Packages
                </button>
              </div>

              <div className={styles.stats}>
                <div>
                  <h3>500+</h3>
                  <p>Active Roofs</p>
                </div>

                <div>
                  <h3>৳12M+</h3>
                  <p>Monthly Payouts</p>
                </div>

                <div>
                  <h3>3.2 kW</h3>
                  <p>Live Generation</p>
                </div>
              </div>
            </div>

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
          </Container>
        </section>

        {/* PROCESS */}
        <section className={styles.process}>
          <Container className={styles.container}>
            {" "}
            <div className={styles.sectionHeading}>
              <h2>How Solarxen Works</h2>
              <p>
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
            <div className={styles.sectionHeading}>
              <h2>Platform Impact Dashboard</h2>

              <p>Real time statistics from the Solarxen community network.</p>
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
              <div className={styles.chartLine}></div>
            </div>{" "}
          </Container>
        </section>

        {/* WHY US */}
        <section className={styles.whyUs}>
          <Container className={styles.container}>
            {" "}
            <div className={styles.sectionHeading}>
              <h2>Why Choose Solarxen?</h2>

              <p>We make rooftop solar easy, profitable, and worry free.</p>
            </div>
            <div className={styles.featureGrid}>
              {features.map((item, index) => (
                <div className={styles.featureCard} key={index}>
                  <div className={styles.featureIcon}>{item.icon}</div>

                  <h3>{item.title}</h3>

                  <p>{item.desc}</p>
                </div>
              ))}
            </div>{" "}
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
