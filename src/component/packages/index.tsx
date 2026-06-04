// pages/shop.tsx
import { Container } from "react-bootstrap";
import styles from "./packages.module.scss";
import { packages } from "@/constants/packages";

export default function Packages() {
  return (
    <>
      {/* PACKAGES */}
      <section className={styles.packages}>
        <Container className={styles.container}>
          {" "}
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Transparent Solar Packages</h2>
            <p className={styles.sectionSub}>
              Choose the right capacity for your rooftop and start earning.
            </p>
          </div>
          <div className={styles.packageGrid}>
            {packages.map((item, index) => (
              <div
                key={index}
                className={`${styles.packageCard} ${
                  item.active ? styles.activeCard : ""
                }`}
              >
                {item.active && (
                  <span className={styles.popular}>MOST POPULAR</span>
                )}

                <h3>{item.title}</h3>

                <p>{item.subtitle}</p>

                <h1>{item.price}</h1>

                <div className={styles.packageInfo}>
                  <div>
                    <span>Estimated Capacity</span>
                    <strong>{item.capacity}</strong>
                  </div>

                  <div>
                    <span>Monthly Generation</span>
                    <strong>{item.generation}</strong>
                  </div>

                  <div>
                    <span>Expected Monthly Earning</span>
                    <strong>{item.earning}</strong>
                  </div>
                </div>

                <ul>
                  <li>Installation Included</li>
                  <li>Smart Monitoring</li>
                  <li>Priority Support</li>
                </ul>

                <button>Get Consultation</button>
              </div>
            ))}
          </div>{" "}
        </Container>
      </section>
    </>
  );
}
