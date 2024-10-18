'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from "axios";

const Profile = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const [showSettings, setShowSettings] = useState(false);
    const router = useRouter();
    const { userId } = useParams();  // Hämta userId från URL:en

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            const userIsAdmin = localStorage.getItem('isAdmin') === 'true';
            setIsAdmin(userIsAdmin);

            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`/api/user/profile/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    setUserData(response.data);
                } catch (error) {
                    console.error('Failed to fetch userData', error);
                }
            };

            if (userId) {
                fetchUserData();  // Hämta endast data om userId finns
            }
        }
    }, [userId, router]);

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            await axios.delete("/api/admin/delete", {
                headers: { Authorization: `Bearer ${token}` }
            });

            localStorage.removeItem('token');
            localStorage.removeItem('isAdmin');
            router.push('/login');
        } catch (error) {
            console.error('Failed to delete account', error);
        }
    };

    const toggleSettings = () => {
        setShowSettings(!showSettings);  // Växla visningen av inställningar
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold">Welcome to your profile!</h1>
            {userData && (
                <div>
                    <p className="text-lg">Name: {userData.name}</p>
                    <p className="text-lg">Email: {userData.email}</p>
                </div>
            )}

            <div className="mt-4">
                <button onClick={toggleSettings} className="text-gray-800">
                    <i className="fas fa-cog text-2xl cursor-pointer"></i>
                </button>
            </div>

            {showSettings && (
                <div className="mt-4">
                    {!isAdmin ? (
                        <div>
                            <h2 className="text-lg font-semibold">User Settings</h2>
                            <button onClick={handleDeleteAccount} className="px-4 py-2 bg-red-500 text-white rounded">
                                Delete Account
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-lg font-semibold">Admin Settings</h2>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded">
                                Admin-specific Action
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;
