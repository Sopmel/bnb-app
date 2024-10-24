'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

import PropertyPage from '../../components/PropertyPage';
import PropertyCreateForm from '@/app/components/PropertyCreateForm';

const Profile = () => {
    const { userId } = useParams(); // Hämta ID från URL
    const [user, setUser] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [updateProperties, setUpdateProperties] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const adminStatus = localStorage.getItem('isAdmin') === 'true';
        setIsAdmin(adminStatus);

        if (userId) {
            const fetchUser = async () => {
                try {
                    const token = localStorage.getItem("token");
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
        setUpdateProperties((prev) => !prev); // ladda om PropertyPage-komponenten
    };

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            await axios.delete(`/api/admin/delete/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // egna konto
            if (userId === localStorage.getItem('userId')) {
                localStorage.removeItem('token');
                localStorage.removeItem('isAdmin');
                localStorage.removeItem('userId');
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
            const token = localStorage.getItem('token');
            if (!token) return;

            const action = user.isAdmin ? 'downgrade' : 'upgrade'; // Bestäm action baserat på status
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

                    {/* Settings Button - Positioned at top-left inside the profile section */}
                    <button onClick={toggleDropdown} className="focus:outline-none" style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '10px 15px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        alignSelf: 'flex-start' // Makes the button align at the top left
                    }}>
                        Settings <i className="fas fa-cog"></i>
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

                        {!isAdmin && userId === localStorage.getItem('userId') && (
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
                <PropertyPage update={updateProperties} />
                <PropertyCreateForm onCreate={refreshProperties} />
            </div>
        </div>
    );
};

export default Profile;
