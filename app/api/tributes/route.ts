import { NextResponse } from 'next/server';
import type { Tribute } from '@/types/tribute';
import { connectToDatabase } from '@/lib/mongodb'; // Named import
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
const cloudinaryUrl = process.env.CLOUDINARY_URL;
if (cloudinaryUrl) {
  cloudinary.config({ url: cloudinaryUrl });
} else if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function GET() {
  try {
    const client = await connectToDatabase(); // Use the named export
    const db = client.db();
    const rows = await db.collection('tributes').find().sort({ date: -1 }).toArray();
    
    const tributes: Tribute[] = rows.map((r: any) => ({
      id: String(r._id),
      name: r.name,
      title: r.title,
      relationship: r.relationship,
      message: r.message,
      email: r.email || '',
      date: r.date ? (typeof r.date === 'string' ? r.date : new Date(r.date).toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
      imageUrl: r.imageUrl,
    }));

    return NextResponse.json(tributes);
  } catch (error) {
    console.error('GET /api/tributes error:', error);
    return NextResponse.json({ error: 'Failed to fetch tributes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const name = (form.get('name') as string) || '';
    const title = (form.get('title') as string) || undefined;
    const relationship = (form.get('relationship') as string) || '';
    const message = (form.get('message') as string) || '';
    const email = (form.get('email') as string) || '';

    // Validation
    const errors: Record<string, string> = {};
    if (!name || name.trim().length < 2) errors.name = 'Name is required (min 2 characters).';
    if (!relationship || relationship.trim().length === 0) errors.relationship = 'Relationship is required.';
    if (!message || message.trim().length < 5) errors.message = 'Message is required (min 5 characters).';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) errors.email = 'Valid email is required.';

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

    let imageUrl: string | undefined;
    const file = form.get('file') as File | null;

    if (file && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) errors.file = 'File is too large. Max 5MB.';
      if (!ALLOWED_TYPES.includes(file.type)) errors.file = 'Unsupported file type. Allowed: jpeg, png, webp.';

      if (!errors.file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString('base64');
        const dataUri = `data:${file.type};base64,${base64}`;

        const uploadResult = await cloudinary.uploader.upload(dataUri, { 
          folder: 'tributes'
        });
        imageUrl = uploadResult.secure_url;
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: 'Validation failed', errors }, { status: 400 });
    }

    const client = await connectToDatabase(); // Use the named export
    const db = client.db();
    const now = new Date();
    
    const doc = {
      name: name.trim(),
      title: title?.trim(),
      relationship: relationship.trim(),
      message: message.trim(),
      email: email.trim(),
      imageUrl,
      date: now,
      createdAt: now,
    };

    const res = await db.collection('tributes').insertOne(doc);

    const newTribute: Tribute = {
      id: String(res.insertedId),
      name: name.trim(),
      title: title?.trim(),
      relationship: relationship.trim(),
      message: message.trim(),
      email: email.trim(),
      date: now.toISOString().split('T')[0],
      imageUrl,
    };

    return NextResponse.json(newTribute, { status: 201 });
  } catch (error) {
    console.error('POST /api/tributes error', error);
    return NextResponse.json({ error: 'Failed to submit tribute' }, { status: 500 });
  }
}