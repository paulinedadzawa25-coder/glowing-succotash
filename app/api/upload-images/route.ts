import { NextResponse } from 'next/server';
import { uploadImagesToCloudinary } from '../../../lib/imageUploader';

export async function POST() {
  try {
    await uploadImagesToCloudinary();
    return NextResponse.json({ success: true, message: 'Images uploaded successfully' });
  } catch (error) {
    console.error('Error uploading images:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to upload images' },
      { status: 500 }
    );
  }
}