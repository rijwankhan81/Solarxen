import Head from "next/head";
import styles from "./how-it-works.module.scss";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import { Container } from "react-bootstrap";
import { processData } from "@/constants/processData";
import { features } from "@/constants/HIW-features";
import { FaChartLine, FaMoneyBillWave, FaBolt } from "react-icons/fa";
import NextImage from "@/hooks/NextImage";

export default function HowItWorks() {
  return (
    <>
      <Head>
        <title>How It Works | Solarxen</title>
      </Head>
      <Header />
      <main className={styles.main}>
        {/* HERO */}
        <section className={styles.hero}>
          <Container className={styles.container}>
            <div className={styles.heroContent}>
              <h1>
                How <span>Solarxen</span>
                <br />
                Works
              </h1>

              <p>
                A simple smart energy platform that helps you generate
                electricity and earn monthly income from your rooftop.
              </p>

              <div className={styles.heroButtons}>
                <button className={styles.primaryBtn}>
                  Join Solarxen Network
                </button>

                <button className={styles.secondaryBtn}>
                  Explore Solar Packages
                </button>
              </div>

              <div className={styles.heroTags}>
                <span>Zero Upfront Cost</span>
                <span>Government Backed</span>
              </div>
            </div>

            <div className={styles.chart}>
              <NextImage
                src="/images/graph-chart.svg"
                alt="Solar House"
                className={styles.image}
              />
            </div>
          </Container>
        </section>

        {/* PROCESS */}
        <section className={styles.process}>
          <Container className={styles.container}>
            {" "}
            <div className={styles.sectionHeading}>
              <h2>Simple Path to Earning</h2>

              <p>
                Turn your empty rooftop into a smart, income generating asset in
                five easy steps.
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

        {/* ANALYTICS */}
        <section className={styles.analytics}>
          <Container className={styles.container}>
            <div className={styles.analyticsCard}>
              <div className={styles.analyticsHeader}>
                <div>
                  <h3>System Analytics</h3>
                  <p>Updated just now</p>
                </div>

                <span>Online</span>
              </div>

              <div className={styles.analyticsStats}>
                <div>
                  <p>Total Yield</p>
                  <h2>845 kWh</h2>
                </div>

                <div>
                  <p>Earned (MTD)</p>
                  <h2>৳8,240</h2>
                </div>
              </div>

              <div className={styles.analyticsChart}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>

              <div className={styles.analyticsFooter}>
                <strong>Peak Efficiency Reached</strong>
                <p>Your system is currently exporting 2.1kW to the grid.</p>
              </div>
            </div>

            <div className={styles.analyticsContent}>
              <h2>Track Everything in Real-Time</h2>

              <p>
                Our smart digital platform gives you complete transparency over
                your energy production and earnings, right from your phone.
              </p>

              <div className={styles.analyticsList}>
                <div>
                  <FaChartLine />
                  <div>
                    <h4>Live Electricity Generation</h4>
                    <p>
                      Watch your panels produce clean energy second by second.
                    </p>
                  </div>
                </div>

                <div>
                  <FaMoneyBillWave />
                  <div>
                    <h4>Monthly Income Tracking</h4>
                    <p>
                      See exactly how much you're earning from grid exports.
                    </p>
                  </div>
                </div>

                <div>
                  <FaBolt />
                  <div>
                    <h4>Smart Inverter Monitoring</h4>
                    <p>
                      Automated health checks and maintenance alerts keep you
                      online.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* WHY */}
        <section className={styles.why}>
          <Container className={styles.container}>
            <div className={styles.sectionHeading}>
              <h2>Why This Model Works</h2>

              <p>
                A sustainable ecosystem designed for normal people to
                participate in the energy transition.
              </p>
            </div>

            <div className={styles.featureGrid}>
              {features.map((item, index) => (
                <div className={styles.featureCard} key={index}>
                  <div className={styles.featureIcon}>{item.icon}</div>

                  <h3>{item.title}</h3>

                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <Container className={styles.container}>
            <h2>Start Earning From Your Rooftop</h2>

            <p>
              Join Solarxen’s growing clean energy network and turn your rooftop
              into a smart income generating asset.
            </p>

            <div className={styles.ctaButtons}>
              <button className={styles.primaryBtn}>
                Get Free Consultation
              </button>

              <button className={styles.secondaryBtn}>
                Explore Solar Packages
              </button>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
