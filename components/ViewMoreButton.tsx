'use client';

import { useState } from 'react';
import styles from './ViewMoreButton.module.css';

interface ViewMoreButtonProps {
  onViewMore: () => void;
}

export default function ViewMoreButton({ onViewMore }: ViewMoreButtonProps) {
  return (
    <button 
      className={styles.viewMoreButton}
      onClick={onViewMore}
    >
      View More Categories
    </button>
  );
}