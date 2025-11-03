import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(
  request: NextRequest,
  { params }: { params: { tributeId: string, mediaId: string } }
) {
  try {
    const { status, reason } = await request.json();
    const { tributeId, mediaId } = params;

    const client = await connectToDatabase();
    const db = client.db("elorm");

    // Update the specific media item's status
    const result = await db.collection("tributes").updateOne(
      { 
        "_id": new ObjectId(tributeId),
        "media.url": mediaId 
      },
      { 
        $set: { 
          "media.$.status": status,
          "media.$.approvedAt": status === 'approved' ? new Date().toISOString() : undefined,
          "media.$.rejectedReason": status === 'rejected' ? reason : undefined
        } 
      }
    );

    if (!result.matchedCount) {
      return NextResponse.json(
        { error: 'Tribute or media not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Error updating tribute media:', e);
    return NextResponse.json(
      { error: 'Failed to update tribute media' },
      { status: 500 }
    );
  }
}