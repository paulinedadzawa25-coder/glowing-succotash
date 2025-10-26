import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <h2 className={styles.name}>Pauline Adobea Dadzawa</h2>
          <p className={styles.subtitle}>A life of strength, service, and grace – fulfilled in God&apos;s divine purpose</p>
        </div>

        <div className={styles.linksContainer}>
          <div className={styles.linkSection}>
            <h3>Celebration of Life</h3>
            <Link href="/brochure">Brochure</Link>
            <Link href="/life">Capturing Pauline&apos;s Life</Link>
          </div>

          <div className={styles.linkSection}>
            <h3>Quick Links</h3>
            <Link href="/tributes">Your Tribute</Link>
            <Link href="/gallery">Gallery</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}