export interface TributeMedia {
  url: string;
  type: 'image' | 'video';
  status: 'pending' | 'approved' | 'rejected';
  approvedAt?: string;
  rejectedReason?: string;
}

export interface Tribute {
  id: string;
  name: string;
  title?: string;
  relationship: string;
  organization?: string;
  message: string;
  email: string;
  date: string;
  media?: TributeMedia[];
  status: 'pending' | 'approved' | 'rejected';
}