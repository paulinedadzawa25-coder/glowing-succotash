import Image from "next/image";
import Header from "../components/Header";
import MemorialIntro from "../components/MemorialIntro";
import BrochureSection from "../components/BrochureSection";
import TributeSection from "../components/TributeSection";
import TributeForm from "../components/TributeForm";
import MemorialFooter from "../components/MemorialFooter";
import styles from "./page.module.css";
import styless from "./gallery/page.module.css";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <MemorialIntro />
          <div className={styles.heroSection}>
            <Image
              src="/images/Landingpage.png"
              alt="Pauline Adobea Dadzawa"
              width={1600}
              height={900}
              quality={100}
              priority
              className={styles.heroImage}
            />
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
                  width={280}
                  height={280}
                  className={styles.quoteImage}
                />
              </div>

              <div className={styles.quoteContent}>
                <h2 className={styles.quoteHeading}>Pauline always said...</h2>
                <blockquote className={styles.quoteText}>
                  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh"
                </blockquote>

                <div className={styles.quoteCta}>
                  <div className={styles.ctaText}>Click to view Brochure</div>
                  <div className={styles.ctaArrow}>
                    <Image
                      src="/images/arrow-right.svg"
                      alt="Arrow right"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>          <BrochureSection />
          <TributeSection />
          <TributeForm />
        </div>
      </main>
    </>
  );
}
