// pages/shop.tsx
import { Container } from "react-bootstrap";
import styles from "./cta.module.scss";

export default function CTA() {
  return (
    <>
      {/* CTA */}
      <section className={styles.cta}>
        <Container className={styles.container}>
          <h2>Start Earning From Your Rooftop</h2>

          <p>
            Join Solarxen’s growing clean energy network and turn your rooftop
            into a smart income generating asset.
          </p>

          <div className={styles.ctaButtons}>
            <button className={styles.primaryBtn}>Get Free Consultation</button>

            <button className={styles.secondaryBtn}>
              Explore Solar Packages
            </button>
          </div>
        </Container>
      </section>
    </>
  );
}
