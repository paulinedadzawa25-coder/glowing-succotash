import React from "react";
import Image from "next/image";
import styles from "./MemorialIntro.module.css";

export default function MemorialIntro() {
  return (
    <section className={styles.introSection}>
      <div className={styles.content}>
          <div className={styles.letterContainer}>
            <h2 className={styles.letterHeading}>Dear Family and Friends,</h2>
            <div className={styles.letter}>
              <p>
                As we remember and celebrate the life of our beloved Wife, Mother, Sister and Friend,
                we wish to share that the arrangements for her funeral will be guided entirely by her own
                clear and heartfelt instructions. In her final wishes, Adobea expressed a strong desire for
                a simple, quiet farewell. She intends that we focus not on ceremony, but on reflection,
                gratitude, and love. Out of deep respect for her values and intentions, our family is
                honouring her request by keeping the proceedings modest and sincere.
              </p>
              <p>
                Per her wishes, there will be a private burial, no one-week observation, no wake keeping,
                no laying in state, no wreaths and no other funeral rites. Thank you for joining us in
                honouring her in the way she wished to be remembered—with simplicity, dignity, and
                peace.
              </p>
              <p className={styles.signature}>With love, the Family.</p>
            </div>
          </div>        <div className={styles.imageSection}>
          <Image
            src="/images/IMG_8164.JPG"
            alt="Pauline Adobea Dadzawa"
            width={500}
            height={600}
            className={styles.mainImage}
            priority
          />
          <div className={styles.titleContainer}>
            <h1 className={styles.name}>Pauline Adobea Dadzawa</h1>
            <p className={styles.subtitle}>
              A life of strength, service, and grace – fulfilled in God&apos;s divine purpose
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
