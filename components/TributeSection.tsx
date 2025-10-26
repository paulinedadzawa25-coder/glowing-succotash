import React from "react";
import Image from "next/image";
import styles from "./TributeSection.module.css";

export default function TributeSection() {
  return (
    <section className={styles.tributeSection}>
      <div>
        <h2 className={styles.tributesTitle}>Your Tributes</h2>
        <div className={styles.tributeContent}>
          <div className={styles.tributeInfo}>
            <h3 className={styles.tributeFrom}>
              Tribute from<br />
              <span>Courage Dadzawa</span>
            </h3>
            <p className={styles.position}>Son, Graphic Communications Group Limited</p>
          </div>
          <div className={styles.tributeText}>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Zzril delenit augue duis dolore te feugait nulla facilisi.</p>
            <p>Lorem ipsum dolor sit amet, cons ectetuer. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>
          </div>
        </div>
        <div className={styles.navigation}>
          <button className={styles.navButton} aria-label="Previous tribute">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <a href="#" className={styles.readMore}>
            Read more tributes here
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <button className={styles.navButton} aria-label="Next tribute">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
