// src/services/notificationService.ts

export interface Notification {
  title: string;
  message: string;
  type: 'push' | 'sms' | 'email' | 'banner';
  audience: 'all' | 'single';
  targetUser?: string;
  scheduled: boolean;
  scheduleDate?: string;
  scheduleTime?: string;
  bannerImage?: File | null;
  bannerLink?: string;
  bannerSection?: 'top' | 'middle' | 'bottom' | 'sidebar';
}

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN;

export const NotificationService = {
  // Fetch all notifications (admin)
  getAdminNotifications: async (): Promise<Notification[]> => {
    const res = await fetch(`${API_BASE}/api/notification/list/admin`, {
      headers: { token: ADMIN_TOKEN }
    });
    if (!res.ok) throw new Error('Failed to fetch admin notifications');
    return res.json();
  },

  // Push/send a notification (admin)
  pushNotification: async (notification: Notification): Promise<Notification> => {
    const body: any = {
      title: notification.title,
      content: notification.message
    };

    // Optional fields
    if (notification.audience === 'single') body.targetUser = notification.targetUser;
    if (notification.scheduled) {
      body.scheduleDate = notification.scheduleDate;
      body.scheduleTime = notification.scheduleTime;
    }
    if (notification.type === 'banner') {
      body.bannerLink = notification.bannerLink;
      body.bannerSection = notification.bannerSection;
      // Banner image handling can be added later using FormData
    }

    const res = await fetch(`${API_BASE}/api/notification/push`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: ADMIN_TOKEN
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error('Failed to push notification');
    return res.json();
  }
};
