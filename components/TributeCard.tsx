'use client';

import React from 'react';
import styles from './TributeCard.module.css';
import type { Tribute } from '@/types/tribute';

export default function TributeCard({ tribute }: { tribute: Tribute }) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.info}>
          <h3 className={styles.name}>{tribute.name}</h3>
          <p className={styles.relationship}>{tribute.relationship}</p>
        </div>
        <time className={styles.date}>{tribute.date}</time>
      </div>
      <div className={styles.content}>
        {tribute.title && <h4 className={styles.title}>{tribute.title}</h4>}
        <p className={styles.message}>{tribute.message}</p>
      </div>
    </article>
  );
}