"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import ScrollToTop from '@/components/ScrollToTop';
import type { Tribute } from '@/types/tribute';
import { scrollToElement } from '@/utils/scrollUtils';

export default function TributesPage() {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Handle scroll to form section after navigation
    if (window.location.hash === '#formSection') {
      setTimeout(() => {
        scrollToElement('formSection');
      }, 500); // Give more time for the page to fully load
    }
  }, []); // Run once when component mounts

  useEffect(() => {
    const fetchTributes = async () => {
      try {
        const res = await fetch('/api/tributes', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setTributes(data);
        }
      } catch (err) {
        console.error('Failed to load tributes:', err);
      }
    };

    fetchTributes();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.heroSection}>
        <Image
          src="/images/Tributeimg.png"
          alt="Pauline Adobea Dadzawa"
          fill
          priority
          quality={100}
          className={styles.heroImage}
        />
      </div>

      <div className={styles.contentContainer}>
        <h1 className={styles.pageTitle}>Your Tributes</h1>
        <div className={styles.titleUnderline}></div>

        <div className={styles.brochureSection}>
          <div className={styles.brochureContent}>
            <p className={styles.capture}>Capturing the life of</p>
            <h2 className={styles.script}>our fiery Adobea</h2>
            <Link href="/brochure" className={styles.brochureLink}>
              Click to view Brochure
              <span className={styles.brochureArrow}>⟶</span>
            </Link>
          </div>

          <div className={styles.brochureImageWrapper}>
            <Image
              src="/images/Tributeimg1.jpeg"
              alt="Pauline Adobea Dadzawa"
              width={260}
              height={320}
              className={styles.brochureImage}
              objectFit="cover"
            />
          </div>
        </div>

        <div className={styles.tributesSection}>
          <h2 className={styles.sectionTitle}>Tributes</h2>
          <div className={styles.titleUnderline}></div>

          <div className={styles.tributesList}>
            {tributes.length === 0 ? (
              <div className={styles.empty}>No tributes yet. Be the first to submit.</div>
            ) : (
              tributes.map((t, idx) => (
                <React.Fragment key={t.id}>
                  <article className={styles.tribute}>
                    <div className={styles.tributeHeader}>
                      <div className={styles.tributeLabel}>Tribute from</div>
                      <div className={styles.tributeAuthor}>
                        <div className={styles.tributeName}>{t.name}</div>
                        <div className={styles.tributeRelation}>{t.relationship}</div>
                      </div>
                    </div>
                    <div className={styles.tributeContent}>
                      <p>{t.message}</p>
                    </div>
                  </article>
                  {idx < tributes.length - 1 && <div className={styles.tributeDivider} />}
                </React.Fragment>
              ))
            )}
          </div>

          <div className={styles.actionsRow}>
            <button 
              onClick={() => {
                // Push to home page with hash
                router.push('/#formSection', { scroll: false });
              }} 
              className={styles.submitButton}>
              Submit Tribute
              <span className={styles.submitArrow}>⟶</span>
            </button>

            {/* <div className={styles.scrollTopWrapper}>
              <ScrollToTop />
            </div> */}
            <ScrollToTop />
          </div>
        </div>
      </div>
    </main>
  );
}



