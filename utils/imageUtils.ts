import fs from 'fs';
import path from 'path';

export function getImagesFromFolder(folderName: string) {
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
      .slice(0, 8); // Limit to 8 images per category
  } catch (error) {
    console.error(`Error reading directory ${folderName}:`, error);
    return [];
  }
}

export function getCategoryImages() {
  const categories = [
    {
      title: "Ado, Harry's Ado",
      folder: "Ado, Harry_s Ado"
    },
    {
      title: "Adobea, the friend",
      folder: "Adobea, the friend"
    },
    {
      title: "Mrs. Dadzawa, the public servant",
      folder: "Mrs. Dadzawa, the public servant"
    },
    {
      title: "Pauline, our matriarch",
      folder: "Pauline, our matriarch"
    }
  ];

  return categories.map(category => ({
    ...category,
    images: getImagesFromFolder(category.folder)
  }));
}