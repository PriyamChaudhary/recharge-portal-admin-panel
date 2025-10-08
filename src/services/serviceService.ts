const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface ServiceItem {
  id: string;
  name: string;
  icon?: string;
  active: boolean;
  apiKey?: string;
  provider?: string;
  description?: string;
  percentageOffer?: number;
  route?: string;
  section?: string;
}

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
});

export const ServiceService = {
  list: async (): Promise<ServiceItem[]> => {
    const res = await fetch(`${API_BASE_URL}/service/admin`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch services");
    return res.json();
  },

  create: async (data: FormData): Promise<ServiceItem> => {
    const res = await fetch(`${API_BASE_URL}/service/create`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: data,
    });
    if (!res.ok) throw new Error("Failed to create service");
    return res.json();
  },

  update: async (id: string, data: FormData): Promise<ServiceItem> => {
    const res = await fetch(`${API_BASE_URL}/service/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: data,
    });
    if (!res.ok) throw new Error("Failed to update service");
    return res.json();
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/service/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete service");
  },
};
