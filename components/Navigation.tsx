'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';
import MobileMenu from './MobileMenu';

export default function Navigation() {
  const pathname = usePathname();
  const isInfoPage = pathname === '/info';
    const isTributePageoPage = pathname === '/tributes';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 550) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { href: '/', label: 'Home', isActive: pathname === '/' },
    { href: '/tributes', label: 'Tributes', isActive: pathname === '/tributes' },
    { href: '/gallery', label: 'Gallery', isActive: pathname === '/gallery' },
    { href: '/info', label: 'Info', isActive: pathname === '/info' },
  ];

  return (
    <>
      <nav className={`${styles.nav} ${isInfoPage && !isScrolled ? styles.transparentNav : ''} ${isTributePageoPage && !isScrolled ? styles.transparentNav : ''}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/images/Logo.png"
              alt="PAULINE ADOBEA DADZAWA"
              width={420}
              height={221}
              priority
              style={{objectFit: 'contain'}}
            />
          </Link>
          <div className={styles.links}>
            {navigationLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={link.isActive ? styles.activeLink : ''}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button
            className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={navigationLinks}
      />
    </>
  );
}