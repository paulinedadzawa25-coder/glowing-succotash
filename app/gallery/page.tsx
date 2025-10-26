import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import fs from 'fs';
import path from 'path';

function getImagesFromFolder(folderName: string) {
  const publicDir = path.join(process.cwd(), 'public', 'images', folderName);
  
  try {
    const files = fs.readdirSync(publicDir);
    return files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      })
      .map(file => ({
        path: `/images/${folderName}/${file}`,
        filename: file
      }))
      .sort((a, b) => a.filename.localeCompare(b.filename)); // Sort images by filename
  } catch (error) {
    console.error(`Error reading directory ${folderName}:`, error);
    return [];
  }
}

import GalleryDisplay from '@/components/GalleryDisplay';

export default function GalleryPage() {
  const categories = [
    {
      title: "Ado, Harry's Ado",
      folder: "Ado, Harry_s Ado",
      images: getImagesFromFolder("Ado, Harry_s Ado")
    },
    {
      title: "Adobea, the friend",
      folder: "Adobea, the friend",
      images: getImagesFromFolder("Adobea, the friend")
    },
    {
      title: "Mrs. Dadzawa, the public servant",
      folder: "Mrs. Dadzawa, the public servant",
      images: getImagesFromFolder("Mrs. Dadzawa, the public servant")
    },
    {
      title: "Pauline, our matriarch",
      folder: "Pauline, our matriarch",
      images: getImagesFromFolder("Pauline, our matriarch")
    }
  ];

  return <GalleryDisplay categories={categories} />;
}