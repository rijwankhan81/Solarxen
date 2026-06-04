import Head from "next/head";
import styles from "./packages.module.scss";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import { Button, Col, Container, Row } from "react-bootstrap";
import NextImage from "@/hooks/NextImage";
import Packages from "@/component/packages";
import { includedPackages } from "@/constants/includedPackage";
import CTA from "@/component/cta";
import { FaArrowRight, FaPlay } from "react-icons/fa";

export default function PackagesPage() {
  return (
    <>
      <Head>
        <title>Packages | Solarxen</title>
      </Head>
      <Header />
      <main className={styles.main}>
        {/* HERO */}
        <section className={styles.hero}>
          <Container className={styles.container}>
            <div className={styles.heroContent}>
              <h1>
                Choose the Right <span>Solar Package</span>
                for Your Rooftop
              </h1>

              <p>
                Flexible rooftop solar solutions designed to generate clean
                electricity and long-term monthly income. Turn your unused space
                into a smart earning opportunity.
              </p>

              <div className={styles.hero__actions}>
                <Button className={styles.btn__primary}>
                  Join the Network <FaArrowRight />
                </Button>
                <Button className={styles.btn__outline}>
                  <FaPlay /> Explore Packages
                </Button>
              </div>
            </div>

            <div className={styles.chart}>
              <NextImage
                src="/images/pack-bnr.png"
                alt="solaxen packages"
                className={styles.image}
              />
            </div>
          </Container>
        </section>
        <Packages />
        {/*Included Package */}
        <section className={styles.IncludedPackage}>
          <Container className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                What's Included With Every Package
              </h2>

              <p className={styles.sectionSub}>
                We handle everything from installation to long-term monitoring.
              </p>
            </div>

            <Row className="g-4">
              {includedPackages.map((f, i) => (
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

        <CTA />
      </main>

      <Footer />
    </>
  );
}
