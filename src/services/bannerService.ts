const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface BannerItem {
  id: string;
  imageUrl: string;
  section: string;
  type: string;
  link: string;
}

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
});

export const BannerService = {
  list: async (): Promise<BannerItem[]> => {
    const res = await fetch(`${API_BASE_URL}/banner/list`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch banners");
    return res.json();
  },

  create: async (data: FormData): Promise<BannerItem> => {
    const res = await fetch(`${API_BASE_URL}/banner/create`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: data,
    });
    if (!res.ok) throw new Error("Failed to create banner");
    return res.json();
  },

  update: async (id: string, data: FormData): Promise<BannerItem> => {
    const res = await fetch(`${API_BASE_URL}/banner/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: data,
    });
    if (!res.ok) throw new Error("Failed to update banner");
    return res.json();
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/banner/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete banner");
  },
};
