// src/services/userService.ts
import api from "./api"; // Make sure api.ts handles base URL and headers

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  createdAt: string;
  ipAddress: string;
  address: string;
  status: "active" | "suspended";
  mpin: string;
  walletBalance: number;
  referredBy?: string;
}

export const userService = {
  listUsers: async (filter?: { phone?: string; otp?: string }): Promise<User[]> => {
    const res = await api.post("/user/list", filter || {});
    return res.data;
  },

  updateStatus: async (userId: string, status: "active" | "suspended") => {
    const res = await api.patch("/user/status-update", { userId, status });
    return res.data;
  },

  addReferral: async (userId: string, referralId: string) => {
    const res = await api.post("/admin/add-refer", { userId, referalId: referralId });
    return res.data;
  },
};
