import { useEffect, useState } from 'react';
import Link from 'next/link';

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
    <ul style={styles.listContainer}>
        {notifications.map((notification) => (
            <li key={notification.id} style={styles.notificationItem(notification.read)}>
                <div style={styles.messageContainer}>
                    <p style={styles.message}>{notification.message}</p>
                    {notification.type === 'BOOKING_REQUEST' && notification.booking && (
                        <div>
                            <p style={styles.subText}>Property: {notification.booking.property.name}</p>
                            <Link href={`/message`} passHref>
                                <span style={styles.link}>View Booking</span>
                            </Link>
                        </div>
                    )}
                    {notification.type === 'MESSAGE' && notification.messageRef && (
                        <div>
                            <p style={styles.subText}>Message: {notification.messageRef.content}</p>
                            <Link href={`/message`} passHref>
                                <span style={styles.link}>View Message</span>
                            </Link>
                        </div>
                    )}
                </div>
                <div style={styles.statusContainer}>
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
                </div>
            </li>
        ))}
    </ul>
);

export default Notifications;

const styles = {
    listContainer: {
        maxHeight: '400px',
        overflowY: 'auto' as const,
        padding: '0',
        margin: '0',
    },
    notificationItem: (isRead: boolean) => ({
        display: 'flex',
        flexDirection: 'column' as const,
        backgroundColor: isRead ? '#f9f9f9' : '#e0f7fa',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '12px',
        border: isRead ? '1px solid #ccc' : '1px solid #00796b',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }),
    messageContainer: {
        marginBottom: '8px',
    },
    message: {
        fontSize: '16px',
        fontWeight: '600' as const,
        color: '#333',
    },
    subText: {
        fontSize: '14px',
        color: '#555',
        margin: '4px 0',
    },
    statusContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    status: (isRead: boolean) => ({
        fontSize: '13px',
        color: isRead ? '#757575' : '#00796b',
        fontStyle: 'italic' as const,
    }),
    button: {
        padding: '8px 16px',
        backgroundColor: '#00796b',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.3s',
    },
    link: {
        display: 'inline-block',
        marginTop: '4px',
        padding: '6px 12px',
        color: '#00796b',
        textDecoration: 'none',
        border: '1px solid #00796b',
        borderRadius: '4px',
        backgroundColor: '#e0f7fa',
        fontWeight: 'bold' as const,
        transition: 'background-color 0.3s, color 0.3s',
        cursor: 'pointer',
    } as const,
};
