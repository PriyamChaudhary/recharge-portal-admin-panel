import axios from 'axios';
import { mockKycRequests } from '@/mocks/data';

const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH === 'true';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type KYCStatus = 'pending' | 'verified' | 'rejected';

export interface KYCRequest {
  id: string;
  userName: string;
  userId: string;
  documentType: string;
  documentNumber: string;
  documentUrl: string;
  status: KYCStatus;
  submittedAt: string;
  comments?: string;
}

// Fetch all KYC requests
export const getKYCList = async (role?: string): Promise<KYCRequest[]> => {
  if (USE_MOCK) return mockKycRequests as KYCRequest[];

  const res = await axios.get(`${API_BASE_URL}/kyc/list`, {
    headers: { 'token': localStorage.getItem('admin_token') || '' },
    params: { role },
  });
  return res.data;
};

// Fetch new KYC submissions
export const getNewKYCList = async (): Promise<KYCRequest[]> => {
  if (USE_MOCK) {
    return mockKycRequests.filter(r => r.status === 'pending'); // ✅ OK, TS infers Promise automatically
  }

  const res = await axios.get(`${API_BASE_URL}/kyc/new-kyc-list`, {
    headers: { 'token': localStorage.getItem('admin_token') || '' },
  });
  return res.data;
};


// Approve or reject KYC
export const manageKYC = async (
  kycId: string,
  status: KYCStatus,
  reason?: string
): Promise<KYCRequest> => {
  if (USE_MOCK) {
    const updated = (mockKycRequests as KYCRequest[]).map(r =>
      r.id === kycId ? { ...r, status, comments: reason } : r
    );
    return updated.find(r => r.id === kycId)!;
  }

  const res = await axios.post(
    `${API_BASE_URL}/kyc/manage`,
    { kycId, status, reason },
    { headers: { 'token': localStorage.getItem('admin_token') || '' } }
  );
  return res.data;
};
