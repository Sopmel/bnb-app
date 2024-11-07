import axios from 'axios';
import { getLocalStorageItem } from './localStorageUtil';

export type NotificationType = 'BOOKING_REQUEST' | 'MESSAGE' | 'APPROVED' | 'DECLINED';

export const createNotification = async (
    userId: string,
    message: string,
    type: NotificationType,
    bookingId?: string,
    messageId?: string
) => {
    console.log("Skickar userId till createNotification:", userId);

    const token = getLocalStorageItem("token");
    if (!token) {
        console.error("User not authenticated");
        return;
    }

    try {
        await axios.post(
            '/api/notifications',
            JSON.stringify({ userId, message, type, bookingId, messageId }),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data);
        } else {
            console.error("Unknown error:", error);
        }
    }
};

