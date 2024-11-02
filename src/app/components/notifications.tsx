import { useEffect, useState } from 'react';


type Notification = {
    id: string;
    message: string;
    read: boolean;
    type: 'BOOKING_REQUEST' | 'MESSAGE';
    booking?: {
        id: string;
        property: { name: string };
    };
    messageRef?: {
        id: string;
        content: string;
    };
};

type NotificationsProps = {
    notifications: Notification[];
    markAsRead: (id: string) => void;
};

const Notifications = ({ notifications, markAsRead }: NotificationsProps) => (
    <ul style={{ maxHeight: '300px', overflowY: 'auto', padding: '0', margin: '0' }}>
        {notifications.map((notification) => (
            <li key={notification.id} style={styles.notificationItem(notification.read)}>
                <p style={styles.message}>{notification.message}</p>
                {notification.type === 'BOOKING_REQUEST' && notification.booking && (
                    <div>
                        <p style={styles.subText}>Property: {notification.booking.property.name}</p>
                        <p style={styles.subText}>Booking ID: {notification.booking.id}</p>
                    </div>
                )}
                {notification.type === 'MESSAGE' && notification.messageRef && (
                    <div>
                        <p style={styles.subText}>Message: {notification.messageRef.content}</p>
                        <p style={styles.subText}>Message ID: {notification.messageRef.id}</p>
                    </div>
                )}
                <p style={styles.status(notification.read)}>
                    {notification.read ? 'Status: Read' : 'Status: Unread'}
                </p>
                {!notification.read && (
                    <button
                        onClick={() => markAsRead(notification.id)}
                        style={styles.button}
                    >
                        Mark as Read
                    </button>
                )}
            </li>
        ))}
    </ul>
);

export default Notifications;

const styles = {
    notificationItem: (isRead: boolean) => ({
        backgroundColor: isRead ? '#f0f4f8' : '#e6f7ff',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '10px',
        border: isRead ? '1px solid #d3d3d3' : '1px solid #1890ff',
        color: '#333',
        fontSize: '14px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }),
    message: {
        fontWeight: 'bold' as const,
        color: '#333',
    },
    subText: {
        fontSize: '13px',
        color: '#555',
        margin: '4px 0',
    },
    status: (isRead: boolean) => ({
        fontSize: '13px',
        color: isRead ? '#999' : '#007bff',
        margin: '6px 0',
        fontStyle: 'italic' as const,
    }),
    button: {
        marginTop: '10px',
        padding: '6px 12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px',
    },
};
