import Image from 'next/image';
import styles from './BrochureSection.module.css';

export default function BrochureSection() {
  return (
    <section className={styles.brochureSection}>
        <div className={styles.contentWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/image2.jpeg"
            alt="Our fiery Adobea"
            width={320}
            height={400}
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.subtitle}>Capturing the life of</div>
          <div className={styles.title}>our fiery Adobea</div>
          <a href="#" className={styles.downloadLink}>
            Click to download Brochure
            <span className={styles.arrow}>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}