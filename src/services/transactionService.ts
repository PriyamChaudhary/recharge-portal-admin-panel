import axios from 'axios';
import { mockTransactions } from '@/mocks/data';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: string;
  service: string;
  amount: number;
  commission: number;
  status: 'success' | 'pending' | 'failed' | 'refunded';
  createdAt: string;
}

// ✅ Get all transactions
export const getTransactions = async (): Promise<Transaction[]> => {
  if (USE_MOCK) return mockTransactions as Transaction[];
  const token = localStorage.getItem('admin_token') || '';
  const res = await axios.get(`${API_BASE_URL}/api/admin/txn-list`, {
    headers: { token },
  });
  return res.data;
};

// ✅ Update transaction status (mock/manual)
export const updateTransactionStatus = async (
  transactionId: string,
  status: 'success' | 'pending' | 'failed' | 'refunded'
) => {
  if (USE_MOCK) return { success: true };
  const token = localStorage.getItem('admin_token') || '';
  return axios.put(
    `${API_BASE_URL}/api/admin/txn-list/${transactionId}`,
    { status },
    { headers: { token } }
  );
};
