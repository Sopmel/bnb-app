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

    // Uppgradera en användare till admin
    const handleUpgradeToAdmin = async (userId: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            await axios.post("/api/admin/upgrade", { userId }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSuccess("Användaren uppgraderades till admin.");
            setUsers(users.map(user => user.id === userId ? { ...user, isAdmin: true } : user));
            setFilteredUsers(filteredUsers.map(user => user.id === userId ? { ...user, isAdmin: true } : user));
        } catch (error) {
            console.error("Misslyckades med att uppgradera användaren", error);
            setError("Misslyckades med att uppgradera användaren.");
        }
    };

    // Radera en användare
    const handleDeleteUser = async (userId: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            await axios.delete(`/api/admin/delete/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSuccess("Användaren raderades.");
            setUsers(users.filter(user => user.id !== userId));
            setFilteredUsers(filteredUsers.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Misslyckades med att radera användaren", error);
            setError("Misslyckades med att radera användaren.");
        }
    };

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

    return (
        <div className="container">
            <h1>Admin Panel - Hantera användare</h1>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            {/* Sökfält */}
            <input
                type="text"
                placeholder="Sök på namn eller e-post"
                value={searchTerm}
                onChange={handleSearchChange}
                className="border p-2 w-full mb-4"
            />

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
                                {!user.isAdmin && (
                                    <button
                                        onClick={() => handleUpgradeToAdmin(user.id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Uppgradera till admin
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Radera användare
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
