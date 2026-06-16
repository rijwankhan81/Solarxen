import Link from "next/link";
import styles from "./header.module.scss";
import { Container } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import NextImage from "@/hooks/NextImage";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants/navMenu";
import { companyNav } from "@/constants/companyNav";
export default function Header() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1199);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleClass = () => {
    setShow((prevState) => !prevState);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Generate your own electricity, reduce your monthly bills, and earn from excess energy exported to the grid."
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
                {isMobile
                  ? companyNav.map((item) => {
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
                    })
                  : null}
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
