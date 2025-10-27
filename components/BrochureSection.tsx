'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './BrochureSection.module.css';
import type { Tribute } from '@/types/tribute';
import styless from "./TributeSection.module.css";

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

export default function BrochureSection() {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<string>('');

  async function loadTributes(showLoading = true) {
    if (showLoading) setIsLoading(true);
    try {
      const fetchedTributes = await getTributes();
      if (fetchedTributes.length > 0) {
        setTributes(fetchedTributes);
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

  // Auto-scroll to next tribute every 5 seconds if there are multiple tributes
  useEffect(() => {
    if (tributes.length <= 1) return;

    const scrollInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tributes.length);
    }, 5000); // 5 seconds interval

    return () => clearInterval(scrollInterval);
  }, [tributes.length]);

  // Initial load
  useEffect(() => {
    loadTributes();
  }, []);

  // Periodic refresh for new tributes
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      loadTributes(false);
    }, 30000); // 30 seconds

    return () => clearInterval(refreshInterval);
  }, []);

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

  const currentTribute = tributes[currentIndex];

  return (
    <section className={styles.brochureSection}>
      <div className={styles.container}>
        <h2 className={styless.tributesTitle}>Your Tributes</h2>
        <div className={styless.tributeContent}>
          <div className={styless.tributeInfo}>
            <h3 className={styless.tributeFrom}>
              Tribute from<br />
              <span className={styles.tributeAuthor}>{currentTribute.name}</span>
            </h3>
            <div className={styless.position}>{currentTribute.relationship}</div>
            <div className={styles.circleIcon}>
              <Image
                src="/images/LogoIcon.png"
                alt="Icon"
                width={24}
                height={24}
                className={styles.icon}
              />
            </div>
            {tributes.length > 1 && (
              <div className={styles.tributeIndicators}>
                {tributes.map((_, index) => (
                  <span
                    key={index}
                    className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                  />
                ))}
              </div>
            )}
          </div>
          <div className={styles.tributeText}>
            {currentTribute.message.split('\n\n').map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
            <div className={styles.ctaWrapper}>
              <a href="/tributes" className={styles.readMore}>
                <span className={styles.readMoreText}>Read more tributes here</span>
                <span className={styles.readMoreArrow}>→</span>
              </a>
              {lastUpdateTime && (
                <div className={styles.lastUpdate}>
                  Last updated: {new Date(lastUpdateTime).toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
