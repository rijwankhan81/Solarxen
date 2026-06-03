import Head from "next/head";
import styles from "./packages.module.scss";
import Header from "@/layout/header";
import Footer from "@/layout/footer";
import { Container } from "react-bootstrap";
import NextImage from "@/hooks/NextImage";
import Packages from "@/component/packages";
import { includedPackages } from "@/constants/includedPackage";
import CTA from "@/component/cta";

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

              <div className={styles.heroButtons}>
                <button className={styles.primaryBtn}>
                  Join Solarxen Network
                </button>

                <button className={styles.secondaryBtn}>
                  Explore Solar Packages
                </button>
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
            <div className={styles.sectionHeading}>
              <h2>What's Included With Every Package</h2>

              <p>
                We handle everything from installation to long-term monitoring.
              </p>
            </div>

            <div className={styles.featureGrid}>
              {includedPackages.map((item, index) => (
                <div className={styles.featureCard} key={index}>
                  <div className={styles.featureIcon}>{item.icon}</div>

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
