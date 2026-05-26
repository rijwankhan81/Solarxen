import { Container } from "react-bootstrap";
import styles from "./footer.module.scss";
import Link from "next/link";
import { FiFacebook } from "react-icons/fi";
import {
  FaEnvelope,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import NextImage from "@/hooks/NextImage";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants/navMenu";
import { contactInfo } from "@/constants/contactInfo";
import { companyNav } from "@/constants/companyNav";
export default function Footer() {
  const pathname = usePathname();

  return (
    <>
      <footer className={styles.footer}>
        <Container>
          <div className={styles.wrapper}>
            <div className={styles.inner_wrapper}>
              <Link className={styles.logo} href="/">
                <NextImage src="/images/logo.svg" alt="" />
              </Link>
              <p>
                Empowering Bangladesh with clean energy and financial
                opportunities through smart rooftop solar solutions.
              </p>
              <div className={styles.connect}>
                <ul>
                  <li>
                    <Link href="javascript:void(0)">
                      <FiFacebook />
                    </Link>
                  </li>
                  <li>
                    <Link href="javascript:void(0)">
                      <FaXTwitter />
                    </Link>
                  </li>
                  <li>
                    <Link href="javascript:void(0)">
                      <FaInstagram />
                    </Link>
                  </li>

                  <li>
                    <Link href="javascript:void(0)">
                      <FaLinkedinIn />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.footer_menu}>
              <h3>Platform</h3>
              <ul>
                {navItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.href} className={styles.navItem}>
                      <Link
                        href={item.href}
                        className={`${styles.nav_link} ${
                          isActive ? styles.active : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={styles.footer_menu}>
              <h3>Company</h3>
              <ul>
                {companyNav.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.href} className={styles.navItem}>
                      <Link
                        href={item.href}
                        className={`${styles.nav_link} ${
                          isActive ? styles.active : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.footer_menu}>
              <h3>Contact Information</h3>

              <ul>
                <li>
                  <FaMapMarkerAlt />
                  <span>{contactInfo.address}</span>
                </li>
                <li>
                  <FaPhoneAlt />
                  <span>{contactInfo.phone}</span>
                </li>

                <li>
                  <FaEnvelope />
                  <span>{contactInfo.email}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.footer_bootom}>
            <p className={styles.copyright}>
              © 2026 Solarxen. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
}
