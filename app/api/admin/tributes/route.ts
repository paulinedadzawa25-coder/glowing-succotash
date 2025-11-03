import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db("elorm");
    
    // Get all tributes with media, sorted by date
    const tributes = await db.collection("tributes")
      .find({ "media": { $exists: true } })
      .sort({ date: -1 })
      .toArray();

    return NextResponse.json(tributes);
  } catch (e) {
    console.error('Error fetching tributes:', e);
    return NextResponse.json({ error: 'Failed to fetch tributes' }, { status: 500 });
  }
}