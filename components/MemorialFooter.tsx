import React from "react";
import styles from "./MemorialFooter.module.css";

export default function MemorialFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerMain}>
        <div className={styles.footerName}>Pauline Adobea Dadzawa</div>
        <div className={styles.footerPurpose}>A life of strength, service, and grace – fulfilled in God’s divine purpose</div>
      </div>
      <div className={styles.footerLinks}>
        <div>
          <strong>Celebration of Life</strong><br />
          Brochure<br />
          Capturing 's Life
        </div>
        <div>
          <strong>Quick Links</strong><br />
          Your Tribute<br />
          Photos
        </div>
      </div>
    </footer>
  );
}
