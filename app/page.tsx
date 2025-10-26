import Image from "next/image";
import Header from "../components/Header";
import MemorialIntro from "../components/MemorialIntro";
import BrochureSection from "../components/BrochureSection";
import TributeSection from "../components/TributeSection";
import TributeForm from "../components/TributeForm";
import MemorialFooter from "../components/MemorialFooter";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.heroImageWrapper}>
            <Image
              src="/images/image1.jpeg"
              alt="Pauline Adobea Dadzawa"
              fill
              quality={100}
              priority
              className={styles.heroImage}
            />
            <div className={styles.heroOverlay}>
              <div className={styles.rememberText}>
                REMEMBERING THE LIFE OF
              </div>
            </div>
          </div>
        </section>
        <div className={styles.container}>
          <MemorialIntro />
          <BrochureSection />
          <TributeSection />
          <TributeForm />
        </div>
      </main>
    </>
  );
}
