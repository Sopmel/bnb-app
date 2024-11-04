"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

import PropertyPage from '../../components/PropertyPage';
import PropertyCreateForm from '@/app/components/PropertyCreateForm';
import MessageButton from '@/app/components/MessageButton';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils/localStorageUtil';

const Profile = () => {
    const { userId: userIdParam } = useParams(); // Hämta ID från URL
    const [user, setUser] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [updateProperties, setUpdateProperties] = useState(false);
    const [isLoggedinProfile, setIsLoggedinProfile] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    const router = useRouter();

    // Hantera potentiella `string[]` och konvertera till `string`
    const userId = Array.isArray(userIdParam) ? userIdParam[0] : userIdParam;

    useEffect(() => {
        // Hämta `userId` och `isAdmin` från `localStorage`
        const storedUserId = getLocalStorageItem("userId");
        setCurrentUserId(storedUserId);
        const adminStatus = getLocalStorageItem("isAdmin") === "true";
        setIsAdmin(adminStatus);

        if (userId && storedUserId === userId) {
            setIsLoggedinProfile(true);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                try {
                    const token = getLocalStorageItem("token");
                    if (!token) return;

                    const response = await axios.get(`/api/user/profile/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    setUser(response.data);
                } catch (error) {
                    console.error("Failed to load user profile", error);
                }
            };

            fetchUser();
        }
    }, [userId]);

    if (!user) return <p>Loading profile...</p>;

    const refreshProperties = () => {
        setUpdateProperties((prev) => !prev); // Ladda om PropertyPage-komponenten
    };

    const navigateToMessages = () => {
        router.push('/message'); // Navigera till meddelandesidan
    };

    const handleDeleteAccount = async () => {
        try {
            const token = getLocalStorageItem('token');
            if (!token) return;

            await axios.delete(`/api/admin/delete/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (userId === currentUserId) {
                setLocalStorageItem('token', '');
                setLocalStorageItem('isAdmin', 'false');
                setLocalStorageItem('userId', '');
                router.push('/login');
            } else {
                router.push('/admin');
            }
        } catch (error) {
            console.error('Failed to delete User', error);
        }
    };

    const handleToggleAdminStatus = async () => {
        try {
            const token = getLocalStorageItem('token');
            if (!token) return;

            const action = user.isAdmin ? 'downgrade' : 'upgrade';
            await axios.post(`/api/admin/upgrade/${userId}`, { action }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const message = user.isAdmin ? 'User downgraded to regular user' : 'User upgraded to Admin';
            alert(message);
            window.location.reload();
        } catch (error) {
            console.error('Failed to toggle user admin status', error);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div style={{ maxWidth: '900px', margin: 'auto', padding: '20px' }}>
            {/* Profile Information */}
            <div style={{
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                backgroundColor: '#f9f9f9',
                marginBottom: '20px',
                position: 'relative',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }}>{user.name}'s Profile</h1>

                    {/* MessageButton */}
                    {currentUserId && userId && currentUserId !== userId && (
                        <MessageButton senderId={currentUserId} receiverId={userId} />
                    )}

                    {isLoggedinProfile && (
                        <button onClick={navigateToMessages} style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            padding: '8px 15px',
                            borderRadius: '20px',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            cursor: 'pointer'
                        }}>
                            <i className="fas fa-envelope"></i> Go to Messages
                        </button>
                    )}

                    <button onClick={toggleDropdown} style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '8px 15px',
                        borderRadius: '20px',
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'pointer'
                    }}>
                        <i className="fas fa-cog"></i> Settings
                    </button>
                </div>

                {dropdownOpen && (
                    <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg">
                        {isAdmin && (
                            <>
                                <button
                                    onClick={handleToggleAdminStatus}
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                >
                                    {user.isAdmin ? 'Downgrade to user' : 'Upgrade to admin'}
                                </button>
                                <button onClick={handleDeleteAccount} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    Delete User
                                </button>
                            </>
                        )}

                        {!isAdmin && userId === currentUserId && (
                            <button onClick={handleDeleteAccount} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Delete Account
                            </button>
                        )}
                    </div>
                )}

                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Admin status:</strong> {user.isAdmin ? 'Admin' : 'Not Admin'}</p>
            </div>

            {/* Property Section */}
            <div style={{
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                backgroundColor: '#fff',
            }}>
                <PropertyPage update={updateProperties} isLoggedinProfile={isLoggedinProfile} isAdmin={isAdmin} />
                {isLoggedinProfile && <PropertyCreateForm onCreate={refreshProperties} />}
            </div>
        </div>
    );
};

export default Profile;
