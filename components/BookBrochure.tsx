'use client';

import { useState } from 'react';
import Image from "next/image";
import styles from "./BookBrochure.module.css";

interface PageProps {
  pageNumber: number;
  content: React.ReactNode;
}

const Page = ({ pageNumber, content }: PageProps) => (
  <div className={styles.page}>
    <div className={styles.pageContent}>
      {content}
    </div>
    <div className={styles.pageNumber}>{pageNumber}</div>
  </div>
);

export default function BookBrochure() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 6; // Update this based on your content

  const pages = [
    // Page 1 & 2 (Cover and Title)
    <div key="cover" className={styles.doublePage}>
      <div className={`${styles.page} ${styles.coverPage}`}>
        <div className={styles.coverContent}>
          <h1 className={styles.coverTitle}>In Loving Memory</h1>
          <h2 className={styles.coverSubtitle}>Mrs. Pauline Adobea Dadzawa</h2>
          <div className={styles.coverDivider}>
            <Image
              src="/images/LogoIcon.png"
              alt="Decorative icon"
              width={50}
              height={50}
              className={styles.coverSymbol}
            />
          </div>
          <p className={styles.coverDates}>1960 - 2025</p>
        </div>
      </div>
      <Page
        pageNumber={2}
        content={
          <div className={styles.titlePage}>
            <h2 className={styles.programTitle}>Order of Service</h2>
            <div className={styles.programDetails}>
              <h3>Friday, November 3rd, 2025</h3>
              <div className={styles.timeLocation}>
                <p><strong>Filing Past:</strong> 7:00 AM - 8:45 AM</p>
                <p><strong>Pre-burial Service:</strong> 9:00 AM - 10:30 AM</p>
                <p><strong>Burial Service:</strong> 10:45 AM - 11:30 AM</p>
                <p><strong>Venue:</strong> Christ The King Catholic Church</p>
              </div>
            </div>
          </div>
        }
      />
    </div>,

    // Page 3 & 4 (Biography)
    <div key="bio" className={styles.doublePage}>
      <Page
        pageNumber={3}
        content={
          <div className={styles.bioPage}>
            <h2 className={styles.sectionTitle}>Biography</h2>
            <div className={styles.bioContent}>
              <p>A woman of remarkable grace, unwavering integrity, and profound wisdom, 
              Pauline Adobea Dadzawa lived a life dedicated to service, family, and God.</p>
              <p>Her journey began at Agona Swedru in the Central Region of Ghana, where she was born 
              to Mr. Daniel Kwesi Dadzawa and Mrs. Grace Adwoa Addobea.</p>
            </div>
          </div>
        }
      />
      <Page
        pageNumber={4}
        content={
          <div className={styles.bioPage}>
            <div className={styles.bioContent}>
              <p>Growing up in a Christian home, she learned early the values of faith, hard work, 
              and compassion.</p>
              <p>Pauline's career in public service spanned decades, marked by her commitment to 
              electoral integrity and democratic principles. As a Commissioner at the Electoral Commission 
              of Ghana, she played a pivotal role in shaping the nation's democratic journey.</p>
            </div>
          </div>
        }
      />
    </div>,

    // Page 5 & 6 (Tributes)
    <div key="tributes" className={styles.doublePage}>
      <Page
        pageNumber={5}
        content={
          <div className={styles.tributePage}>
            <h2 className={styles.sectionTitle}>Family Tributes</h2>
            <div className={styles.tributeContent}>
              <div className={styles.tribute}>
                <h3>Children's Tribute</h3>
                <p>"Our mother was our guiding light, our constant source of wisdom and love. 
                Her strength shaped us, her faith inspired us, and her love sustained us."</p>
              </div>
            </div>
          </div>
        }
      />
      <Page
        pageNumber={6}
        content={
          <div className={styles.tributePage}>
            <div className={styles.tributeContent}>
              <div className={styles.tribute}>
                <h3>Siblings' Tribute</h3>
                <p>"Pauline was not just our sister; she was our role model, our confidante, 
                and our strongest supporter."</p>
              </div>
            </div>
          </div>
        }
      />
    </div>
  ];

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(pages.length - 1, prev + 1));
  };

  return (
    <div className={styles.bookContainer}>
      <div className={styles.navigationControls}>
        <button 
          onClick={handlePrevPage} 
          className={`${styles.navButton} ${currentPage === 0 ? styles.disabled : ''}`}
          disabled={currentPage === 0}
        >
          ←
        </button>
        <span className={styles.pageIndicator}>
          Pages {currentPage * 2 + 1}-{Math.min((currentPage * 2) + 2, totalPages)} of {totalPages}
        </span>
        <button 
          onClick={handleNextPage}
          className={`${styles.navButton} ${currentPage === pages.length - 1 ? styles.disabled : ''}`}
          disabled={currentPage === pages.length - 1}
        >
          →
        </button>
      </div>
      
      <div className={styles.book}>
        <div 
          className={styles.pagesContainer}
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {pages}
        </div>
      </div>
    </div>
  );
}