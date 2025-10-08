// src/services/adminService.ts
import api from "./api";

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  department: string;
  employeeId: string;
  role: string;
  lastLogin: string;
  accountCreated: string;
  status: string;
}

export interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface MpinData {
  mpin: string;
}

export const adminService = {
  // Get Admin Profile
  login: async (phone: string, otp: string) => {
    const res = await api.post("/login", { phone, otp });
    return res.data;
  },
  getProfile: async (): Promise<ProfileData> => {
    const res = await api.get("/profile-admin");
    return res.data;
  },

  // Update Admin Profile
  updateProfile: async (profileData: ProfileData): Promise<ProfileData> => {
    const res = await api.put("/profile-admin", profileData);
    return res.data;
  },

  // Refresh token
  refreshToken: async (refreshToken: string) => {
    const res = await api.post("/refresh-token", { refreshToken });
    return res.data;
  },

  // Change Password
  changePassword: async (data: PasswordData) => {
    const res = await api.post("/change-password", data);
    return res.data;
  },

  // Change MPIN
  changeMpin: async (data: MpinData) => {
    const res = await api.post("/change-mpin", data);
    return res.data;
  },

  // Fetch activity logs
  getActivityLogs: async () => {
    const res = await api.get("/activity-logs");
    return res.data;
  },

  // Fetch permissions
  getPermissions: async () => {
    const res = await api.get("/permissions");
    return res.data;
  },
};
