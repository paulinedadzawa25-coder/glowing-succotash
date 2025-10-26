import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import ScrollToTop from '@/components/ScrollToTop';
import Link from 'next/link';

export default function TributesPage() {
  return (
    <main className={styles.main}>
      <div className={styles.heroSection}>
        <Image
          src="/images/Tribute img.png"
          alt="Pauline Adobea Dadzawa"
          fill
          priority
          quality={100}
          className={styles.heroImage}
        />
      </div>
      <div className={styles.titleSection}>
        <h1 className={styles.pageTitle}>Your Tributes</h1>
        <div className={styles.titleUnderline}></div>
      </div>

      <section className={styles.tributesSection}>
        <h2 className={styles.sectionTitle}>Tributes</h2>
        <div className={styles.tributesList}>
          <article className={styles.tribute}>
            <div className={styles.tributeHeader}>
              <h3 className={styles.tributeFrom}>Tribute from</h3>
              <p className={styles.tributeName}>Sedem Dadzawa</p>
              <p className={styles.tributeRelation}>Son, GRA</p>
            </div>
            <div className={styles.tributeContent}>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Zzril delenit augue duis dolore te feugait nulla facilisi.</p>
              <p>Lorem ipsum dolor sit amet, cons ectetuer. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
            </div>
          </article>

          <div className={styles.tributeDivider} />

          <article className={styles.tribute}>
            <div className={styles.tributeHeader}>
              <h3 className={styles.tributeFrom}>Tribute from</h3>
              <p className={styles.tributeName}>Sena Dadzawa</p>
              <p className={styles.tributeRelation}>Daughter, Cocoaboa</p>
            </div>
            <div className={styles.tributeContent}>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
              <p>Ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Zzril delenit augue duis dolore te feugait nulla facilisi.</p>
            </div>
          </article>
        </div>

        <Link href="/submit-tribute" className={styles.submitButton}>
          Submit Tribute
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>

        <ScrollToTop />
      </section>
    </main>
  );
}