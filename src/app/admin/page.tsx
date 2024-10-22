"use client";

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
        <div className="container">
            <h1>Admin Panel</h1>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            {/* Sökfält visas alltid */}
            <input
                type="text"
                placeholder="search users"
                value={searchTerm}
                onChange={handleSearchChange}
                className="border p-2 w-full mb-4"
            />

            {/* Knapp för att visa användarlistan */}
            <button
                onClick={() => setShowUsers(!showUsers)} // Växla visning
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            >
                {showUsers ? 'Hide all users' : 'Show all users'}
            </button>

            {/* Visa sökresultat separat (Sökresultatslistan) */}
            {searchTerm && (
                <div style={{ backgroundColor: '#d4edda', padding: '1rem', borderRadius: '8px' }}>
                    <h2>Sökresultat</h2>
                    <table className="min-w-full table-auto mt-4">
                        <thead>
                            <tr>
                                <th>Namn</th>
                                <th>E-post</th>
                                <th>Adminstatus</th>
                                <th>Handlingar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? "Admin" : "Användare"}</td>
                                    <td>
                                        <button onClick={() => handleViewProfile(user.id)}
                                            className="px-4 py-2 rounded"> Visa Profil </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Visa alla användare (Show All Users-listan) */}
            {showUsers && (
                <div>
                    <table className="min-w-full table-auto mt-4">
                        <thead>
                            <tr>
                                <th>Namn</th>
                                <th>E-post</th>
                                <th>Adminstatus</th>
                                <th>Handlingar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? "Admin" : "Användare"}</td>
                                    <td>
                                        <button onClick={() => handleViewProfile(user.id)}
                                            className="px-4 py-2 rounded"> Visa Profil </button>
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
