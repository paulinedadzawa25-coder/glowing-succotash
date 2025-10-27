"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import styles from "./Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isOnTributesPage = pathname === '/tributes';

  useEffect(() => {
    const handleScroll = () => {
      // Use a smaller threshold for tributes page to make transition smoother
      const scrollThreshold = isOnTributesPage ? 50 : 100;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOnTributesPage]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isOnTributesPage ? styles.transparent : ''}`}>
      <div className={styles.headerContent}>
        <div className={styles.logoArea}>
          <img src="/images/adinkra.png" alt="Adinkra Symbol" className={styles.logoImg} />
          <span className={styles.logoText}>PAULINE ADOBEA DADZAWA</span>
        </div>
        <button className={styles.menuButton} onClick={toggleMenu} aria-label="Toggle menu">
          <div className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
          <Link href="/" legacyBehavior><a className={styles.active}>Home</a></Link>
          <Link href="/tributes" legacyBehavior><a>Tributes</a></Link>
          <Link href="/photos" legacyBehavior><a>Photos</a></Link>
          <Link href="/info" legacyBehavior><a>Info</a></Link>
        </nav>
      </div>
    </header>
  );
}
