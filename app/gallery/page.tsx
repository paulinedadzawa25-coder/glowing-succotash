import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import cloudinary from '@/lib/cloudinary-config';
import GalleryDisplay from '@/components/GalleryDisplay';

interface CloudinaryResource {
  secure_url: string;
  filename: string;
  public_id: string;
  width: number;
  height: number;
}

async function getImagesFromCloudinary(folderPath: string) {
  try {
    // Configure Cloudinary
    cloudinary.config({
      cloud_name: 'kojo',
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Search for images in the specified folder
    const result = await cloudinary.search
      .expression(`folder:memorial/${folderPath.replace(/['\s]/g, '_')}`)
      .sort_by('created_at', 'desc') // Sort by creation date to ensure consistent ordering
      .with_field('context')
      .max_results(500)
      .execute();

    return (result.resources as CloudinaryResource[]).map(resource => ({
      path: resource.secure_url,
      filename: resource.filename,
      publicId: resource.public_id,
      width: resource.width || 800,
      height: resource.height || 800
    }));
  } catch (error) {
    console.error(`Error fetching images from Cloudinary for ${folderPath}:`, error);
    return [];
  }
}

export default async function GalleryPage() {
  const categoryData = [
    {
      title: "Ado, Harry's Ado",
      folder: "Ado, Harry_s Ado",
    },
    {
      title: "Adobea, the friend",
      folder: "Adobea, the friend",
    },
    {
      title: "Mrs. Dadzawa, the public servant",
      folder: "Mrs. Dadzawa, the public servant",
    },
    {
      title: "Pauline, our matriarch",
      folder: "Pauline, our matriarch",
    }
  ];

  // Fetch all images in parallel and remove duplicates
  const categoriesWithImages = await Promise.all(
    categoryData.map(async (category) => {
      const images = await getImagesFromCloudinary(category.folder);
      // Filter out duplicates based on publicId
      const uniqueImages = images.filter((image, index, self) =>
        index === self.findIndex((i) => i.publicId === image.publicId)
      );
      return {
        ...category,
        images: uniqueImages
      };
    })
  );

  return <GalleryDisplay categories={categoriesWithImages} />;
}