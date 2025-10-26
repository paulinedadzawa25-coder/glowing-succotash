'use client';

import React, { useState } from 'react';
import styles from './HamburgerMenu.module.css';

interface HamburgerMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function HamburgerMenu({ isOpen, toggleMenu }: HamburgerMenuProps) {
  return (
    <button 
      className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}