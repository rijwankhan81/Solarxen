// pages/shop.tsx
import { Container } from "react-bootstrap";
import { FaHandSparkles } from "react-icons/fa";
import { GiWheat, GiKnifeFork } from "react-icons/gi";
import styles from "./page.module.scss";

export default function Choose() {
  return (
    <>
      <section className={styles.whychoose}>
        <Container className={styles.container}>
          <div className={styles.head}>
            <h2>why choose us</h2>
            <h3>EXCEPTIONAL quality</h3>
          </div>
          <div className={styles.row}>
            <div className={styles.item}>
              <div className={styles.icon}>
                <GiWheat />
              </div>
              <h2>Farm Fresh Quality</h2>
              <p>
                Sourced directly from trusted farms for the best taste and
                freshness.
              </p>
            </div>

            <div className={styles.item}>
              <div className={styles.icon}>
                <FaHandSparkles />
              </div>
              <h2>Hygienic Processing</h2>
              <p>Processed in clean, temperature-controlled environments.</p>
            </div>

            <div className={styles.item}>
              <div className={styles.icon}>
                <GiKnifeFork />
              </div>
              <h2>Expert Cuts</h2>
              <p>Perfectly cut by professionals for your cooking needs.</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
