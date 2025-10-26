import React from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import ScrollToTop from '../../components/ScrollToTop';

export default function InfoPage() {
  return (
    <main className={styles.main}>
      <div className={styles.heroImage}>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/IMG_8164.JPG"
            alt="Pauline Adobea Dadzawa"
            fill
            priority
            quality={100}
          />
        </div>
      </div>
      <div className={styles.container}>
        <section className={styles.announcementSection}>
          <h2 className={styles.sectionTitle}>Funeral Announcement</h2>
          <div className={styles.details}>
            <div className={styles.detailRow}>
              <span className={styles.label}>Date:</span>
              <span className={styles.value}>Saturday, 15th November, 2025</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Venue:</span>
              <div className={styles.valueColumn}>
                <span>Her residence at Ahwerase, on the Aburi Mountains (E2-1700-2273)</span>
                <span>Adjacent the Obosomase Presbyterian JHS</span>
              </div>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Time:</span>
              <span className={styles.value}>9am – 12pm</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Dress Code:</span>
              <span className={styles.value}>Black</span>
            </div>
            <div className={styles.privateNotice}>
              <strong style={{fontSize:20, fontWeight: 'bold'}}>There will be a private burial.</strong> There will be no one week observation, no 
              wake keeping, no laying in state and no other funeral rites.
            </div>
          </div>
        </section>

        <section className={styles.donationSection}>
          <h2 className={styles.sectionTitle}>Donation Details</h2>
          <p className={styles.donationText}>
            The family will graciously accept any gifts or donations made in honour of
            Pauline. These contributions will be dedicated to causes that reflect her values,
            passions, and enduring legacy. We hope that through these efforts, her spirit
            will continue to inspire and uplift others, just as she did in life.
          </p>
        </section>

        <section className={styles.contactSection}>
          <h2 className={styles.sectionTitle}>Contact Details</h2>
          <div className={styles.contacts}>
            <div className={styles.contactRow}>
              <span className={styles.contactName}>Sena Yawa Tabbicca</span>
              <span className={styles.contactNumber}>0242364545</span>
            </div>
            <div className={styles.contactRow}>
              <span className={styles.contactName}>Selorm Aku Dadzawa</span>
              <span className={styles.contactNumber}>0265780249</span>
            </div>
            <div className={styles.emailRow}>
              <span className={styles.labelEmail}>Email:</span>
              <a href="mailto:paulinedadzawa25@gmail.com" className={styles.emailLink}>
                paulinedadzawa25@gmail.com
              </a>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.submitButton}>
              Submit Tribute
              <span className={styles.arrow}>→</span>
            </button>
            <ScrollToTop />
          </div>
        </section>
      </div>
    </main>
  );
}