import axios from 'axios';
import { mockWalletRequests, mockUsers } from '@/mocks/data';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

export interface WalletRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  paymentMode: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  walletBalance: number;
}

// ✅ Get all wallet requests
export const getWalletRequests = async (): Promise<WalletRequest[]> => {
  if (USE_MOCK) return mockWalletRequests;
  const res = await axios.get(`${API_BASE_URL}/send-to-bank/list`, {
    headers: { token: localStorage.getItem('admin_token') || '' },
  });
  return res.data;
};

// ✅ Get all users
export const getUsers = async (): Promise<User[]> => {
  if (USE_MOCK) return mockUsers;
  const res = await axios.get(`${API_BASE_URL}/users`, {
    headers: { token: localStorage.getItem('admin_token') || '' },
  });
  return res.data;
};

// ✅ Approve or reject a withdrawal request
export const updateWalletRequestStatus = async (
  requestId: string,
  status: 'ACCEPT' | 'DECLINE'
) => {
  if (USE_MOCK) return { success: true };
  return axios.put(
    `${API_BASE_URL}/send-to-bank/${requestId}`,
    { status },
    { headers: { token: localStorage.getItem('admin_token') || '' } }
  );
};

// ✅ Manual credit/debit wallet
export const manualWalletUpdate = async (
  userId: string,
  type: 'credit' | 'debit',
  amount: number,
  reason: string
) => {
  if (USE_MOCK) return { success: true };
  return axios.post(
    `${API_BASE_URL}/wallet/${type}`,
    { userId, amount, reason },
    { headers: { token: localStorage.getItem('admin_token') || '' } }
  );
};
