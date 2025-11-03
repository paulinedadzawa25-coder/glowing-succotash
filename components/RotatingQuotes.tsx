'use client';

import { useState, useEffect } from 'react';
import styles from './RotatingQuotes.module.css';

const quotes = [
    "Changing your mind isn't weakness. Only a fool doesn't change his mind.",
    "No matter how small your income, save something. Even if you make one Cedi, save fifty Pesewas.",
    "People will disappoint you. Don't put your full trust in anyone. The arm of flesh will fail you.",
    "Learn a second language. You'll be surprised how many doors it opens.",
    "At work, don't just blend in. Make sure you're visible. Let people know what you bring to the table.",
    "Dress well, always. It's better to be the best-dressed in the room. You never know who you'll meet.",
    "There's never an excuse for a man to hit a woman. Period.",
    "Learning doesn't stop after school. Keep studying, keep growing. There is no end to learning.",
    "Marriage is good, but it's not everything. Never lose yourself completely to please any man."
];

export default function RotatingQuotes() {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeOut(true); // Start fade out
            setTimeout(() => {
                setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
                setFadeOut(false); // Start fade in
            }, 500); // Wait for fade out animation to complete
        }, 5000); // Change quote every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <blockquote className={`${styles.quoteText} ${fadeOut ? styles.fadeOut : ''}`}>
            {quotes[currentQuoteIndex]}
        </blockquote>
    );
}