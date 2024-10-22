'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";

const AdminPage = () => {
    const router = useRouter();
    const [users, setUsers] = useState<any[]>([]); // Lagrar alla användare
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]); // Lagrar filtrerade användare
    const [searchTerm, setSearchTerm] = useState(''); // Hanterar sökfältets värde
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showUsers, setShowUsers] = useState(false); // Ny state för att visa/hide användarlistan

    // Kontrollera om användaren är admin
    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (!isAdmin) {
            router.push('/');  // Omdirigera om användaren inte är admin
        }
    }, [router]);

    // Hämta alla användare från backend när sidan laddas
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Ingen giltig token hittad.");
                    return;
                }

                const response = await axios.get("/api/admin/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUsers(response.data);
                setFilteredUsers(response.data); // Visa alla användare som standard
            } catch (err) {
                console.error("Misslyckades med att hämta användare", err);
                setError("Misslyckades med att hämta användare");
            }
        };

        fetchUsers();
    }, []);

    // Hantera ändring i sökfältet
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        // Filtrera användarlistan baserat på namn eller e-post
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(value) ||
            user.email.toLowerCase().includes(value)
        );
        setFilteredUsers(filtered);
    };

    const handleViewProfile = (userId: string) => {
        router.push(`/profile/${userId}`);
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}

            {/* Sökfält visas alltid */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search users"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border p-2 w-1/2 rounded-lg"
                />
            </div>

            {/* Knapp för att visa användarlistan */}
            <div className="text-center mb-6">
                <button
                    onClick={() => setShowUsers(!showUsers)} // Växla visning
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition"
                >
                    {showUsers ? 'Hide all users' : 'Show all users'}
                </button>
            </div>

            {/* Visa sökresultat separat (Sökresultatslistan) */}
            {searchTerm && (
                <div className="bg-green-100 p-4 rounded-lg mb-6 shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Search Results</h2>
                    <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-green-200">
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Admin Status</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="border-b">
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.isAdmin ? "Admin" : "User"}</td>
                                    <td className="px-4 py-2">
                                        <button onClick={() => handleViewProfile(user.id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                            View Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Visa alla användare (Show All Users-listan) */}
            {showUsers && (
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">All Users</h2>
                    <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Admin Status</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b">
                                    <td className="px-4 py-2">{user.name}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.isAdmin ? "Admin" : "User"}</td>
                                    <td className="px-4 py-2">
                                        <button onClick={() => handleViewProfile(user.id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                            View Profile
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
