"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Använd useParams istället för useRouter
import axios from 'axios';

const Profile = () => {
    const { userId } = useParams(); // Hämta användarens ID från URL:en
    const [user, setUser] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

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
                    console.error("Misslyckades med att hämta användarens profil", error);
                }
            };

            fetchUser();
        }
    }, [userId]);

    if (!user) return <p>Laddar profil...</p>;

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
            console.error('Misslyckades med att radera användare', error);
        }
    };

    const handleUpgradeToAdmin = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            await axios.post(`/api/admin/upgrade/${userId}`, null, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Användaren uppgraderades till admin');
            window.location.reload();
        } catch (error) {
            console.error('Misslyckades med att uppgradera användaren', error);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div>
            <h1>{user.name}s Profil</h1>
            <p>Email: {user.email}</p>
            <p>Adminstatus: {user.isAdmin ? 'Ja' : 'Nej'}</p>

            {/* Inställningsikon */}
            <div className="relative">
                <button onClick={toggleDropdown} className="focus:outline-none">
                    <i className="fas fa-cog text-2xl"></i> {/* Inställningsikon */}
                </button>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                        {/* Alternativ för administratörer */}
                        {isAdmin && (
                            <>
                                {!user.isAdmin && (
                                    <button onClick={handleUpgradeToAdmin} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                        Uppgradera till admin
                                    </button>
                                )}
                                <button onClick={handleDeleteAccount} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    Radera konto (som admin)
                                </button>
                            </>
                        )}

                        {/* Alternativ för icke-admin (radera sitt eget konto) */}
                        {!isAdmin && userId === localStorage.getItem('userId') && (
                            <button onClick={handleDeleteAccount} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Radera mitt konto
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;

