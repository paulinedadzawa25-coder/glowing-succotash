'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../app/gallery/page.module.css';
import ScrollToTop from './ScrollToTop';

interface GalleryDisplayProps {
  categories: Array<{
    title: string;
    folder: string;
    images: Array<{
      path: string;
      filename: string;
    }>;
  }>;
}

export default function GalleryDisplay({ categories }: GalleryDisplayProps) {
  const router = useRouter();

  const navigateToTributes = () => {
    router.push('/tributes');
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Our fiery Adobea</h1>
          <div className={styles.divider}>
            <span className={styles.line}></span>
            <Image
              src="/images/LogoIcon.png"
              alt="Decorative icon"
              width={40}
              height={40}
              className={styles.symbol}
            />
            <span className={styles.line}></span>
          </div>
          <p className={styles.subHeading}>
            A life of strength, service, and grace<br />
            - fulfilled in God's divine purpose
          </p>
          <div className={styles.subtitleDivider}>
            <span className={styles.subtitleLine}></span>
          </div>

        </div>

        <div className={styles.galleryGrid}>
          {categories.map((category) => (
            <section key={category.title} className={styles.gallerySection}>
              <h2 className={styles.sectionTitle}>{category.title}</h2>
              <div className={styles.imageGrid}>
                {category.images.map((image, index) => (
                  <div key={index} className={styles.imageWrapper}>
                    <Image
                      src={image.path}
                      alt={`${category.title} - ${image.filename}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 4}
                      className={styles.image}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className={styles.buttonContainer}>
          <button 
            className={styles.submitButton}
            onClick={navigateToTributes}
          >
            Submit Tribute
            <span className={styles.arrow}>→</span>
          </button>
          <ScrollToTop />
        </div>
      </div>
    </main>
  );
}