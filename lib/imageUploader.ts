import { promises as fs } from 'fs';
import path from 'path';
import cloudinary from './cloudinary';

export async function uploadImagesToCloudinary() {
  const imageDirectories = [
    'Ado, Harry_s Ado',
    'Adobea, the friend',
    'MOMI',
    'Mrs. Dadzawa, the public servant',
    'Pauline, our matriarch'
  ];

  for (const dir of imageDirectories) {
    const dirPath = path.join(process.cwd(), 'ALL PICTURES', dir);
    try {
      const files = await fs.readdir(dirPath);
      
      for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
          const filePath = path.join(dirPath, file);
          
          try {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(filePath, {
              folder: `memorial/${dir}`,
              use_filename: true,
              unique_filename: false,
            });

            console.log(`Uploaded ${file} to Cloudinary: ${result.secure_url}`);
          } catch (error) {
            console.error(`Error uploading ${file}:`, error);
          }
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${dir}:`, error);
    }
  }
}

// Function to get Cloudinary URL for an image
export function getCloudinaryImageUrl(publicId: string) {
  return cloudinary.url(publicId, {
    quality: 'auto',
    fetch_format: 'auto',
    secure: true
  });
}