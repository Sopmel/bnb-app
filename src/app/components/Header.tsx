"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Notifications from './notifications';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/localStorageUtil';

type Notification = {
    id: string;
    message: string;
    read: boolean;
    type: 'BOOKING_REQUEST' | 'MESSAGE';
    bookingId?: string;
    messageId?: string;
};

const Header = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Kontrollera inloggningsstatus
    useEffect(() => {
        const checkLoginStatus = () => {
            const token = getLocalStorageItem('token');
            const userIsAdmin = getLocalStorageItem('isAdmin') === 'true';
            const storedUserId = getLocalStorageItem('userId');

            setIsLoggedIn(!!token);
            setIsAdmin(userIsAdmin);
            if (storedUserId) {
                setUserId(storedUserId);
            }
        };

        checkLoginStatus();
        window.addEventListener('login', checkLoginStatus);
        return () => {
            window.removeEventListener('login', checkLoginStatus);
        };
    }, []);

    // Hämta notifikationer
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = getLocalStorageItem('token');
                if (!token) return;

                const response = await axios.get('/api/notifications', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const fetchedNotifications = response.data.map((notification: any) => ({
                    ...notification,
                    type: notification.type,
                    bookingId: notification.bookingId,
                    messageId: notification.messageId,
                }));

                setNotifications(response.data);
                setUnreadCount(response.data.filter((n: Notification) => !n.read).length);
                console.log("Fetched notifications:", fetchedNotifications);
            } catch (error) {
                console.error('Failed to load notifications', error);
            }
        };

        if (isLoggedIn) {
            fetchNotifications();
        }
    }, [isLoggedIn]);

    // Markera som läst
    const markAsRead = async (notificationId: string) => {
        try {
            const token = getLocalStorageItem('token');

            await axios.patch(`/api/notifications/${notificationId}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });

            await axios.delete(`/api/notifications/${notificationId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
            setUnreadCount((prev) => prev - 1);

        } catch (error) {
            setError("Failed to mark notification as read and delete it");
            console.error("Error marking notification as read and deleting:", error);
        }
    };

    const handleLogout = () => {
        setLocalStorageItem('token', '');
        setLocalStorageItem('isAdmin', 'false');
        setLocalStorageItem('userId', '');
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUserId(null);
        router.push('/login');
    };

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const toggleNotificationDropdown = () => setNotificationDropdownOpen(!notificationDropdownOpen);

    return (
        <header className="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link href="/" className="text-yellow-400 hover:text-yellow-300 transition-colors">Airbnb</Link>
                </div>
                <div className="flex items-center gap-4">
                    {/* Notifikationer */}
                    {isLoggedIn && (
                        <div className="relative">
                            <button onClick={toggleNotificationDropdown} className="focus:outline-none">
                                <i className="fas fa-bell text-xl"></i>
                                {unreadCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>
                            {notificationDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl p-4 z-50">
                                    <h4 className="font-bold mb-2 text-gray-700">Notifikationer</h4>
                                    <Notifications notifications={notifications} markAsRead={markAsRead} />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Profil och adminpanel */}
                    {isLoggedIn ? (
                        <div className="relative">
                            <button onClick={toggleDropdown} className="focus:outline-none">
                                <i className="fas fa-user-circle text-2xl"></i>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-20">
                                    <div className="py-2">
                                        {userId && (
                                            <>
                                                <Link href={`/profile/${userId}`} onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                                    Profil
                                                </Link>
                                                <Link href="/message" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                                    Meddelanden/Bokningar
                                                </Link>
                                            </>
                                        )}
                                        {isAdmin && (
                                            <Link href="/admin" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Admin Panel</Link>
                                        )}
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Logga Ut</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link href="/login" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">Logga In</Link>
                            <Link href="/register" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">Registrera</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
