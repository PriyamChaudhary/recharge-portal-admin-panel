import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Admin token stored in localStorage or context
const getAdminToken = () => localStorage.getItem("admin_token") || "";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${getAdminToken()}`,
  },
});

export interface Affiliate {
  id: string;
  name: string;
  description: string;
  link: string;
  section: string;
  imageUrl?: string;
}

// Create Affiliate
export const createAffiliate = async (data: FormData) => {
  const res = await axiosInstance.post("/affiliate/create", data);
  return res.data;
};

// Update Affiliate
export const updateAffiliate = async (id: string, data: FormData) => {
  const res = await axiosInstance.patch(`/affiliate/update/${id}`, data);
  return res.data;
};

// Delete Affiliate
export const removeAffiliate = async (id: string) => {
  const res = await axiosInstance.delete(`/affiliate/remove/${id}`);
  return res.data;
};

// List Affiliates
export const listAffiliates = async (): Promise<Affiliate[]> => {
  const res = await axiosInstance.get("/affiliate/list");
  return res.data;
};
