import { ObjectId } from 'mongodb';

export interface AdminUser {
  _id?: ObjectId;
  username: string;
  email: string;
  role: 'admin';
  createdAt: Date;
}

export interface MediaApproval {
  _id?: ObjectId;
  mediaId: string;
  tributeId: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: Date;
  rejectedReason?: string;
  createdAt: Date;
}

export interface AdminAction {
  _id?: ObjectId;
  adminId: string;
  action: 'approve' | 'reject' | 'login' | 'logout';
  targetId?: string;
  details?: string;
  createdAt: Date;
}