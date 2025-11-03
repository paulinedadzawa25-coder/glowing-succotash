import { useState, useEffect } from 'react';
import { CldImage } from 'next-cloudinary';
import styles from './ImagePreview.module.css';

interface ImagePreviewProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ImagePreview = ({ images, currentIndex, onClose, onNext, onPrevious }: ImagePreviewProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrevious]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <button 
          className={`${styles.navButton} ${styles.prevButton}`} 
          onClick={onPrevious}
          disabled={currentIndex === 0}
        >
          ‹
        </button>
        <div className={styles.imageWrapper}>
          {isLoading && <div className={styles.loader}>Loading...</div>}
          <CldImage
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            width={1920}
            height={1080}
            crop="fill"
            gravity="auto"
            quality="auto"
            format="webp"
            onLoad={() => setIsLoading(false)}
            className={styles.previewImage}
            onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
            draggable={false}
            priority={true}
            preserveTransformations
            sizes="100vw"
          />
        </div>
        <button 
          className={`${styles.navButton} ${styles.nextButton}`} 
          onClick={onNext}
          disabled={currentIndex === images.length - 1}
        >
          ›
        </button>
        <div className={styles.counter}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;