// pages/shop.tsx
import { Badge, Col, Container, Row } from "react-bootstrap";
import styles from "./testimonials.module.scss";
import { FaStar, FaSolarPanel, FaCoins } from "react-icons/fa";

export default function Testimonials() {
  return (
    <>
      <section className={styles.community} id="community">
        <Container>
          <div className={styles.sectionHeader}>
            <Badge className={styles.sectionBadge}>Real Stories</Badge>
            <h2 className={styles.sectionTitle}>Powered by People</h2>
            <p className={styles.sectionSub}>
              Real homeowners and businesses sharing their Solarxen experience
            </p>
          </div>
          <Row className="g-4">
            {[
              {
                name: "Karim Hossain",
                location: "Dhaka, Mirpur",
                type: "Homeowner",
                quote:
                  "My electricity bill dropped by ৳3,200 every month. I never thought solar would work this well in Bangladesh.",
                kw: "5 kW",
                savings: "৳38,400/yr",
                initials: "KH",
                color: "green",
              },
              {
                name: "Sultana Begum",
                location: "Chittagong",
                type: "Small Business",
                quote:
                  "Our shop runs all day on solar. We export the extra and earn money. It feels amazing to contribute to clean energy.",
                kw: "10 kW",
                savings: "৳72,000/yr",
                initials: "SB",
                color: "yellow",
              },
              {
                name: "Rafiq Ahmed",
                location: "Rajshahi",
                type: "Homeowner",
                quote:
                  "The Solarxen app shows me exactly what my panels produce. It's like having a power plant on my roof.",
                kw: "3 kW",
                savings: "৳21,600/yr",
                initials: "RA",
                color: "blue",
              },
              {
                name: "Nadia Islam",
                location: "Sylhet",
                type: "NGO / Community",
                quote:
                  "We powered our community center and save thousands. Solarxen made it simple, affordable, and transparent.",
                kw: "15 kW",
                savings: "৳96,000/yr",
                initials: "NI",
                color: "green",
              },
            ].map((t, i) => (
              <Col key={i} xs={12} md={6} lg={3}>
                <div
                  className={`${styles.testimonialCard} ${styles[`testimonialCard--${t.color}`]}`}
                >
                  <div className={styles.testimonialCard__stars}>
                    {[...Array(5)].map((_, s) => (
                      <FaStar key={s} />
                    ))}
                  </div>
                  <p className={styles.testimonialCard__quote}>"{t.quote}"</p>
                  <div className={styles.testimonialCard__footer}>
                    <div
                      className={`${styles.testimonialCard__avatar} ${styles[`testimonialCard__avatar--${t.color}`]}`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.location}</span>
                    </div>
                  </div>
                  <div className={styles.testimonialCard__stats}>
                    <span>
                      <FaSolarPanel /> {t.kw}
                    </span>
                    <span>
                      <FaCoins /> {t.savings}
                    </span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}
