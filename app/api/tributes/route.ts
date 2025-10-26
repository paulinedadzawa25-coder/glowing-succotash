import { NextResponse } from 'next/server';
import type { Tribute } from '@/types/tribute';

// This would typically come from a database
const tributes: Tribute[] = [
  {
    id: '1',
    name: 'Sedem Dadzawa',
    relationship: 'Son, GRA',
    message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Zzril delenit augue duis dolore te feugait nulla facilisi.',
    date: '2025-10-26',
  },
  {
    id: '2',
    name: 'Selorm Dadzawa',
    relationship: 'Daughter',
    message: 'Lorem ipsum dolor sit amet, consectetuer. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
    date: '2025-10-25',
  },
  {
    id: '3',
    name: 'Justice Dadzawa',
    relationship: 'Son',
    message: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.',
    date: '2025-10-24',
  }
];

export async function GET() {
  return NextResponse.json(tributes);
}

export async function POST(request: Request) {
  try {
    const tribute = await request.json();
    // In a real application, you would save this to your database
    // For now, we'll just return the tribute with a fake ID
    const newTribute = {
      ...tribute,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
    };
    
    return NextResponse.json(newTribute);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit tribute' },
      { status: 500 }
    );
  }
}