'use client';

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import MemorialIntro from "../components/MemorialIntro";
import BrochureSection from "../components/BrochureSection";
import TributeSection from "../components/TributeSection";
import TributeForm from "../components/TributeForm";
import MemorialFooter from "../components/MemorialFooter";
import RotatingQuotes from "../components/RotatingQuotes";
import styles from "./page.module.css";
import styless from "./gallery/page.module.css";
import { handleHashNavigation } from "../utils/scrollUtils";

export default function Home() {
  useEffect(() => {
    // Wait for the page to fully load before handling hash navigation
    setTimeout(() => {
      handleHashNavigation();
    }, 500);
  }, []);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <MemorialIntro />
          <div className={styles.heroSection}>
            {/* <Image
              src="/images/Landingpage1.png"
              alt="Pauline Adobea Dadzawa"
              objectFit="contain"
              objectPosition=""
              quality={100}
              priority
              width={1600}
              height={900}
              className={styles.heroImage}
            /> */}
          </div>

          <section className={styles.bannerSection}>
            <div className={styles.bannerInner}>
              <div className={styles.bannerRemember}>REMEMBERING THE LIFE OF</div>
              <h1 className={styles.bannerName}>Pauline<br />Adobea Dadzawa</h1>

              <div className={styless.divider}>
                <span className={styless.line}></span>
                <Image
                  src="/images/LogoIcon.png"
                  alt="Decorative icon"
                  width={40}
                  height={40}
                  className={styless.symbol}
                />
                <span className={styless.line}></span>
              </div>




              <p className={styles.bannerSubtitle}>
                A life of strength, service, and grace
                <br />
                – fulfilled in God’s divine purpose
              </p>
              <div className={styless.subtitleDivider}>
                <span className={styless.subtitleLine}></span>
              </div>
            </div>
          </section>

          <section className={styles.quoteSection}>
            <div className={styles.quoteInner}>
              <div className={styles.quoteImageWrap}>
                <Image
                  src="/images/IMG_8166.jpg"
                  alt="Pauline speaking"
                  width={260}
                  height={260}
                  className={styles.quoteImage}
                />
              </div>

              <div className={styles.quoteContent}>
                <h3 className={styles.quoteHeading}>Pauline always said...</h3>
                <div className={styles.quoteContentInner}>
                  <RotatingQuotes />
                  <Link href="/brochure" className={styles.quoteCta}>
                    <span className={styles.ctaText}>Click to view Brochure</span>
                    <span className={styles.ctaIcon} aria-hidden>➔</span>
                  </Link>
                </div>
              </div>
            </div>

          </section>

          <TributeSection />
          <div id="submit-tribute">
            <TributeForm />
          </div>
        </div>
      </main>
    </>
  );
}
