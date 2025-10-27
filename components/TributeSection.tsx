'use client';

import React from "react";
import Image from "next/image";
import styles from "./TributeSection.module.css";
import styless from './BrochureSection.module.css';

import { useEffect, useState } from 'react';
import type { Tribute } from '@/types/tribute';

async function getLatestTribute(): Promise<Tribute | null> {
  try {
    const response = await fetch('/api/tributes');
    if (!response.ok) throw new Error('Failed to fetch tributes');
    const tributes: Tribute[] = await response.json();
    return tributes[0] || null; // Return the first/latest tribute
  } catch (error) {
    console.error('Error fetching tribute:', error);
    return null;
  }
}

export default function TributeSection() {
   const [tribute, setTribute] = useState<Tribute | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState<string>('');

  async function loadTribute(showLoading = true) {
    if (showLoading) setIsLoading(true);
    try {
      const latest = await getLatestTribute();
      
      // Only update if we have a new tribute or different content
      if (latest && (!tribute || latest.id !== tribute.id)) {
        setTribute(latest);
        setLastUpdateTime(new Date().toISOString());
      }
      setError(null);
    } catch (err) {
      setError('Failed to load tribute');
      console.error(err);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  }

  // Initial load
  useEffect(() => {
    loadTribute();
  }, []);

  // Set up automatic refresh every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      loadTribute(false); // Don't show loading state for auto-refresh
    }, 30000); // 30 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [tribute]); // Re-create interval when tribute changes

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

  if (error || !tribute) {
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
          <button className={styles.navButton} aria-label="Previous tribute">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        <div className={styles.tributeContent}>
          <div className={styles.tributeInfo}>
            <h3 className={styles.tributeFrom}>
              Tribute from<br />
              <span>{tribute.name}</span>
            </h3>
            <p className={styles.position}>{tribute.relationship}</p>
          </div>
          <div className={styles.tributeText}>
            {tribute.message.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
          <button className={styles.navButton} aria-label="Next tribute">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
        </div>
         <div className={styless.ctaWrapper}>
              {/* <a href="/tributes" className={styless.readMore}>
                <span className={styless.readMoreText}>Read more tributes here</span>
                <span className={styless.readMoreArrow}>→</span>
              </a> */}
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
