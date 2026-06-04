// pages/shop.tsx
import { Badge, Button, Container } from "react-bootstrap";
import styles from "./cta.module.scss";
import { FaArrowRight, FaMobileAlt, FaCheckCircle } from "react-icons/fa";

export default function CTA() {
  return (
    <>
      <section className={styles.cta}>
        <Container>
          <div className={styles.cta__inner}>
            <div className={styles.cta__glow1} />
            <div className={styles.cta__glow2} />
            <Badge className={styles.sectionBadge}>Get Started</Badge>
            <h2 className={styles.cta__headline}>
              Start Earning From Your
              <span className={styles.cta__accent}>Rooftop</span>
            </h2>
            <p className={styles.cta__sub}>
              Join Solarxen's growing energy network and help build a cleaner,
              smarter future while generating real value from your rooftop.
            </p>
            <div className={styles.cta__actions}>
              <Button className={styles.btn__primary}>
                Join Solarxen Network <FaArrowRight />
              </Button>
              <Button className={styles.btn__outline}>
                <FaMobileAlt /> Get Free Consultation
              </Button>
            </div>
            <div className={styles.cta__trust}>
              {[
                "Free Consultation",
                "No Hidden Fees",
                "24/7 Monitoring",
                "100% Certified",
              ].map((t, i) => (
                <div key={i} className={styles.cta__trustItem}>
                  <FaCheckCircle className={styles.cta__trustIcon} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
