'use client';

import React, { useState } from 'react';
import { CldImage } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '../app/gallery/page.module.css';
import ScrollToTop from './ScrollToTop';
import ImagePreview from './ImagePreview';

interface GalleryDisplayProps {
  categories: Array<{
    title: string;
    folder: string;
    images: Array<{
      path: string;
      filename: string;
      publicId: string;
      width: number;
      height: number;
    }>;
  }>;
}

export default function GalleryDisplay({ categories }: GalleryDisplayProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Prevent right click on the entire gallery
  React.useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', preventDefault);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'PrintScreen' || (e.ctrlKey && (e.key === 'p' || e.key === 's'))) {
        e.preventDefault();
      }
    });

    return () => {
      document.removeEventListener('contextmenu', preventDefault);
    };
  }, []);

  const navigateToTributes = () => {
    router.push('/');
  };

  const handleImageClick = (categoryIndex: number, imageIndex: number) => {
    setSelectedCategory(categoryIndex);
    setSelectedImageIndex(imageIndex);
  };

  const handleClose = () => {
    setSelectedCategory(null);
    setSelectedImageIndex(null);
  };

  const handleNext = () => {
    if (selectedCategory === null || selectedImageIndex === null) return;
    const maxIndex = categories[selectedCategory].images.length - 1;
    if (selectedImageIndex < maxIndex) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (selectedCategory === null || selectedImageIndex === null) return;
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.heading}>Our fiery Adobea</h1>
          <div className={styles.divider}>
            <span className={styles.line}></span>
            <Image
              src="/images/LogoIcon.png"
              alt="Decorative icon"
              width={40}
              height={40}
              className={styles.symbol}
            />
            <span className={styles.line}></span>
          </div>
          <p className={styles.subHeading}>
            A life of strength, service, and grace<br />
            - fulfilled in God's divine purpose
          </p>
          <div className={styles.subtitleDivider}>
            <span className={styles.subtitleLine}></span>
          </div>

        </div>

        <div className={styles.galleryGrid}>
          {categories.map((category) => (
            <div key={category.title} className={styles.gallerySection}>
              <h2 className={styles.sectionTitle}>{category.title}</h2>
              <div className={styles.imageGrid}>
                {category.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={styles.imageWrapper}
                    onClick={() => handleImageClick(categories.indexOf(category), index)}
                  >
                    <CldImage
                      src={image.publicId}
                      alt={`${category.title} - ${image.filename}`}
                      width={400}
                      height={400}
                      crop="fill"
                      gravity="auto"
                      loading={index < 4 ? "eager" : "lazy"}
                      className={styles.image}
                      onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                      draggable={false}
                      priority={index < 4}
                      preserveTransformations
                      format="webp"
                      quality="auto"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {selectedCategory !== null && selectedImageIndex !== null && (
          <ImagePreview
            images={categories[selectedCategory].images.map(img => img.publicId)}
            currentIndex={selectedImageIndex}
            onClose={handleClose}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        )}

        <div className={styles.buttonContainer}>
          <button
            className={styles.submitButton}
             onClick={() => {
                // Push to home page with hash
                router.push('/#formSection', { scroll: false });
              }} 
          >
            Submit Tribute
            <span className={styles.arrow}>→</span>
          </button>
          <ScrollToTop />
        </div>
      </div>
    </main>
  );
}