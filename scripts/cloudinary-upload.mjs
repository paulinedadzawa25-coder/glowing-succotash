import { promises as fs } from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function uploadImagesToCloudinary() {
  const imageDirectories = [
    'Ado, Harry_s Ado',
    'Adobea, the friend',
    'Mrs. Dadzawa, the public servant',
    'Pauline, our matriarch'
  ];

  // Verify Cloudinary configuration
  console.log('Cloudinary Configuration:');
  console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
  console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✓ Set' : '✗ Missing');
  console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✓ Set' : '✗ Missing');

  for (const dir of imageDirectories) {
    console.log(`\nProcessing directory: ${dir}`);
    const dirPath = path.join(process.cwd(), 'public', 'images', dir);
    
    try {
      const files = await fs.readdir(dirPath);
      console.log(`Found ${files.length} files in ${dir}`);
      
      for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
          const filePath = path.join(dirPath, file);
          
          try {
            console.log(`\nUploading: ${file}`);
            
            // Get file stats
            const stats = await fs.stat(filePath);
            console.log(`File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
            
            // Upload to Cloudinary with full error tracking
            const result = await new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                {
                  folder: `memorial/${dir.replace(/['\s]/g, '_')}`,
                  public_id: path.parse(file).name,
                  use_filename: true,
                  unique_filename: false,
                  overwrite: true,
                  resource_type: 'auto',
                  quality: 'auto',
                  fetch_format: 'auto',
                },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                }
              );

              fs.readFile(filePath).then(buffer => {
                uploadStream.end(buffer);
              }).catch(reject);
            });
            
            console.log(`✅ Successfully uploaded ${file}`);
            console.log(`   URL: ${result.secure_url}`);
            console.log(`   Size: ${(result.bytes / 1024 / 1024).toFixed(2)} MB`);
            console.log(`   Format: ${result.format}`);
            console.log(`   Dimensions: ${result.width}x${result.height}`);
          } catch (error) {
            console.error(`❌ Error uploading ${file}:`);
            console.error('   Error details:', error);
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error processing directory ${dir}:`);
      console.error('   Error details:', error);
    }
  }
}

console.log('Starting image upload to Cloudinary...\n');
uploadImagesToCloudinary()
  .then(() => console.log('\n✨ Upload process completed'))
  .catch(error => {
    console.error('\n❌ Upload process failed:');
    console.error(error);
  });