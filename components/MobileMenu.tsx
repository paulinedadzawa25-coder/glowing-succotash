'use client';

import React from 'react';
import Link from 'next/link';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{
    href: string;
    label: string;
    isActive?: boolean;
  }>;
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  return (
    <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
      <div className={styles.menuContent}>
        <nav className={styles.mobileNav}>
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`${styles.mobileLink} ${link.isActive ? styles.active : ''}`}
              onClick={onClose}
              style={{
                transitionDelay: `${index * 0.1}s`
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}