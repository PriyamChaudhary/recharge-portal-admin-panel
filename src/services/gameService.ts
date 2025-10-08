const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface GameItem {
  id: string;
  imageUrl: string;
  name: string;
  link: string;
}

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("adminToken") || ""}`,
});

export const GameService = {
  list: async (): Promise<GameItem[]> => {
    const res = await fetch(`${API_BASE_URL}/game/list`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch games");
    return res.json();
  },

  create: async (data: FormData): Promise<GameItem> => {
    const res = await fetch(`${API_BASE_URL}/game/create`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: data,
    });
    if (!res.ok) throw new Error("Failed to create game");
    return res.json();
  },

  update: async (id: string, data: FormData): Promise<GameItem> => {
    const res = await fetch(`${API_BASE_URL}/game/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: data,
    });
    if (!res.ok) throw new Error("Failed to update game");
    return res.json();
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/game/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete game");
  },
};
