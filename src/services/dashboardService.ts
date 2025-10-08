// src/services/dashboardService.ts
import api from "./api";

export interface DashboardStats {
  totalUsers: number;
  userGrowth: number;
  totalTransactions: number;
  transactionGrowth: number;
  totalRevenue: number;
  revenueGrowth: number;
  pendingKyc: number;
  kycGrowth: number;
}

export interface DashboardCharts {
  transactions: { month: string; value: number }[];
  walletLoads: { day: string; amount: number }[];
}

export const dashboardService = {
  getDashboardData: async (): Promise<{ stats: DashboardStats; charts: DashboardCharts }> => {
    const res = await api.get("/dashboard");
    return res.data;
  },
};
