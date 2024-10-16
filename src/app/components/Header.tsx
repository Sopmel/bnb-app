'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Kontroll om användaren är inloggad och admin
    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
            const userIsAdmin = localStorage.getItem('isAdmin') === 'true';

            console.log('Token in Header:', token);  // Felsökning: Se om token finns
            console.log('isAdmin from localStorage in Header:', userIsAdmin);  // Felsökning: Se om isAdmin är true

            setIsLoggedIn(!!token);
            setIsAdmin(userIsAdmin);
        };
        checkLoginStatus();

        // Lyssna på login-händelse för att uppdatera UI
        window.addEventListener('login', checkLoginStatus);

        return () => {
            window.removeEventListener('login', checkLoginStatus);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        setIsLoggedIn(false);
        setIsAdmin(false);
        router.push('/login');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div>
                    <Link href="/">Bnb App</Link>
                </div>
                <div>
                    {isLoggedIn ? (
                        <div className="relative">
                            <button onClick={toggleDropdown} className="focus:outline-none">
                                <i className="fas fa-user-circle text-3xl"></i> {/* Använd en ikon */}
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                                    <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profil</Link>
                                    {isAdmin && (
                                        <Link href="/admin" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Admin Panel</Link>
                                    )}
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">Logga ut</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="mr-4">Logga in</Link>
                            <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Registrera</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
