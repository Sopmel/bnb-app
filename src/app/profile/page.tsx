"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";

const Profile = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const [showSettings, setShowSettings] = useState(false); // Hanterar visningen av inställningarna
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            const userIsAdmin = localStorage.getItem('isAdmin') === 'true';
            setIsAdmin(userIsAdmin);

            const fetchUserData = async () => {
                try {
                    const response = await axios.get('/api/user/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });
                    setUserData(response.data);
                } catch (error) {
                    console.error('failed to fetch userData', error);
                }
            };

            fetchUserData();
        }
    }, [router]);

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            await axios.delete("/api/user/delete", {
                headers: { Authorization: `Bearer ${token}` }
            });

            localStorage.removeItem('token');
            localStorage.removeItem('isAdmin');
            router.push('/login');
        } catch (error) {
            console.error('failed to delete user', error);
        }
    };

    const handleUpgradeToAdmin = async (userId: string) => {
        try {
            await axios.post(`/api/user/upgrade/${userId}`);
            alert('User upgraded to admin');
        } catch (error) {
            console.error('failed to upgrade user', error);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            await axios.delete(`/api/user/profile/${userId}`);
            alert('User deleted');
        } catch (error) {
            console.error('failed to delete user', error);
        }
    };

    const toggleSettings = () => {
        setShowSettings(!showSettings);  // Växla visningen av inställningar
    };

    return (
        <div className="container">
            <h1>Welcome to your profile!</h1>
            {userData && (
                <div>
                    <p>Name: {userData.name}</p>
                    <p>Email: {userData.email}</p>
                </div>
            )}

            {/* Inställningsikon */}
            <div className="settings-icon" onClick={toggleSettings}>
                <i className="fas fa-cog text-2xl cursor-pointer"></i>
            </div>

            {/* Visa eller dölj inställningsalternativ */}
            {showSettings && (
                <div className="options mt-4">
                    {!isAdmin ? (
                        <div>
                            <h2>User Settings</h2>
                            <button onClick={handleDeleteAccount} className="px-4 py-2 ">
                                Delete Account
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h2>Admin Settings</h2>
                            <button onClick={() => handleUpgradeToAdmin("USER_ID")} className=" px-4 py-2 ">
                                Upgrade to Admin
                            </button>
                            <button onClick={() => handleDeleteUser("USER_ID")} className=" px-4 py-2">
                                Delete User
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Profile;
