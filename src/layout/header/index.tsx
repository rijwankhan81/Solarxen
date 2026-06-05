import Link from "next/link";
import styles from "./header.module.scss";
import { Container } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import NextImage from "@/hooks/NextImage";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants/navMenu";
export default function Header() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  const toggleClass = () => {
    setShow((prevState) => !prevState);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Solarxen is a smart energy platform that allows you to earn from your rooftop by installing solar panels. Generate power and receive monthly income through our innovative platform."
        />
        <link rel="icon" href="/images/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header id="header" className={styles.header}>
        <div className={styles.wrapper}>
          <Container className={styles.container}>
            <div className={styles.nav}>
              <div className={styles.logo}>
                <Link className={styles.navLink} href="/">
                  <NextImage src={"/images/logo.svg"} alt={""} />
                </Link>
              </div>
              <ul className={`${show ? styles.show : ""} ${styles.menu}`}>
                {navItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <li
                      key={item.href}
                      className={styles.navItem}
                      onClick={toggleClass}
                    >
                      <Link
                        href={item.href}
                        className={`${styles.navLink} ${
                          isActive ? styles.active : ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className={styles.btns}>
                <div className={styles.btn}>
                  <a className={styles.login} href="">
                    Login
                  </a>
                </div>
                <div className={styles.btn}>
                  <a className={styles.get} href="/contact">
                    Get Started
                  </a>
                </div>
                <div className={styles.hamMenu} onClick={toggleClass}>
                  <GiHamburgerMenu />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
    </>
  );
}
