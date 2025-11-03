'use client';

import React from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import styles from "./TributeSection.module.css";
import styless from './BrochureSection.module.css';

import { useEffect, useState } from 'react';
import type { Tribute } from '@/types/tribute';
import { scrollToElement } from '@/utils/scrollUtils';

async function getTributes(): Promise<Tribute[]> {
  try {
    const response = await fetch('/api/tributes');
    if (!response.ok) throw new Error('Failed to fetch tributes');
    const tributes: Tribute[] = await response.json();
    return tributes;
  } catch (error) {
    console.error('Error fetching tributes:', error);
    return [];
  }
}

export default function TributeSection() {
  const router = useRouter();
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<string>();

  const currentTribute = tributes[currentIndex];

  const goToNextTribute = () => {
    if (currentIndex < tributes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPreviousTribute = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  async function loadTributes(showLoading = true) {
    if (showLoading) setIsLoading(true);
    try {
      const allTributes = await getTributes();
      if (allTributes.length > 0) {
        setTributes(allTributes);
        setLastUpdateTime(new Date().toISOString());
      }
      setError(null);
    } catch (err) {
      setError('Failed to load tributes');
      console.error(err);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  }

  // Initial load
  useEffect(() => {
    loadTributes();
  }, []);

  // Set up automatic refresh every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      loadTributes(false); // Don't show loading state for auto-refresh
    }, 30000); // 30 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [tributes]); // Re-create interval when tributes change

  if (isLoading) {
    return (
      <section className={styles.brochureSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Your Tributes</h2>
          <div className={styles.loading}>Loading tribute...</div>
        </div>
      </section>
    );
  }

  if (error || tributes.length === 0) {
    return (
      <section className={styles.brochureSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Your Tributes</h2>
          <div className={styles.error}>
            {error || 'No tributes available yet. Be the first to share your memories.'}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.tributeSection}>
      <div>
        <h2 className={styles.tributesTitle}>Your Tributes</h2>
        
        <div className={styles.navigation}>
          <button 
            className={`${styles.navButton} ${currentIndex === 0 ? styles.disabled : ''}`}
            aria-label="Previous tribute"
            onClick={goToPreviousTribute}
            disabled={currentIndex === 0}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={styles.navText}>Previous</span>
          </button>
        <div className={styles.tributeContent}>
          <div className={styles.tributeInfo}>
            <h3 className={styles.tributeFrom}>
              Tribute from<br />
              <span>{currentTribute.name}</span>
            </h3>
            <p className={styles.position}>{currentTribute.relationship}</p>
            {currentTribute.organization && (
              <p className={styles.organization}>{currentTribute.organization}</p>
            )}
          </div>
          <div className={styles.tributeText}>
            {currentTribute.message.split('\n\n').map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
          <button 
            className={`${styles.navButton} ${currentIndex === tributes.length - 1 ? styles.disabled : ''}`}
            aria-label="Next tribute"
            onClick={goToNextTribute}
            disabled={currentIndex === tributes.length - 1}
          >
            <span className={styles.navText}>Next</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
        </div>
         <div className={styless.ctaWrapper}>
              <button 
                onClick={() => {
                  router.push('/#formSection');
                  setTimeout(() => {
                    scrollToElement('formSection');
                  }, 100);
                }} 
                className={styless.readMore}
              >
                <span className={styless.readMoreText}>Submit your tribute</span>
                <span className={styless.readMoreArrow}>→</span>
              </button>
              {lastUpdateTime && (
                <div className={styless.lastUpdate}>
                  Last updated: {new Date(lastUpdateTime).toLocaleTimeString()}
                </div>
              )}
            </div>
      </div>
    </section>
  );
}
