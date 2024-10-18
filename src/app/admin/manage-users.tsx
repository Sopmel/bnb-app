// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

// const AdminPanel = () => {
//     const [users, setUsers] = useState<any[]>([]); // Lagrar alla användare
//     const [filteredUsers, setFilteredUsers] = useState<any[]>([]); // Lagrar filtrerade användare
//     const [searchTerm, setSearchTerm] = useState(''); // Hanterar sökfältets värde
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     // Hämta alla användare från backend när komponenten laddas
//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) {
//                     setError("No valid token found.");
//                     return;
//                 }

//                 const response = await axios.get("/api/admin/users", {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 setUsers(response.data);
//                 setFilteredUsers(response.data); // Sätt alla användare som standard
//             } catch (err) {
//                 console.error("Failed to fetch users", err);
//                 setError("Failed to fetch users");
//             }
//         };

//         fetchUsers();
//     }, []);

//     // Uppgradera en användare till admin
//     const handleUpgradeToAdmin = async (userId: string) => {
//         try {
//             const token = localStorage.getItem("token");
//             if (!token) return;

//             await axios.post("/api/admin/upgrade", { userId }, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             setSuccess("User upgraded to admin.");
//             setUsers(users.map(user => user.id === userId ? { ...user, isAdmin: true } : user));
//             setFilteredUsers(filteredUsers.map(user => user.id === userId ? { ...user, isAdmin: true } : user));
//         } catch (error) {
//             console.error("Failed to upgrade user", error);
//             setError("Failed to upgrade user.");
//         }
//     };

//     // Radera en användare
//     const handleDeleteUser = async (userId: string) => {
//         try {
//             const token = localStorage.getItem("token");
//             if (!token) return;

//             await axios.delete(`/api/admin/delete/${userId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             setSuccess("User deleted.");
//             setUsers(users.filter(user => user.id !== userId));
//             setFilteredUsers(filteredUsers.filter(user => user.id !== userId));
//         } catch (error) {
//             console.error("Failed to delete user", error);
//             setError("Failed to delete user.");
//         }
//     };

//     // Hantera ändring i sökfältet
//     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const value = event.target.value.toLowerCase();
//         setSearchTerm(value);

//         // Filtrera användarlistan baserat på namn eller e-post
//         const filtered = users.filter(user =>
//             user.name.toLowerCase().includes(value) ||
//             user.email.toLowerCase().includes(value)
//         );
//         setFilteredUsers(filtered);
//     };

//     return (
//         <div className="container">
//             <h1>Admin Panel - Manage Users</h1>

//             {error && <p className="text-red-500">{error}</p>}
//             {success && <p className="text-green-500">{success}</p>}

//             {/* Sökfält */}
//             <input
//                 type="text"
//                 placeholder="Search by name or email"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 className="border p-2 w-full mb-4"
//             />

//             <table className="min-w-full table-auto mt-4">
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Admin Status</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredUsers.map(user => (
//                         <tr key={user.id}>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>{user.isAdmin ? "Admin" : "User"}</td>
//                             <td>
//                                 {!user.isAdmin && (
//                                     <button
//                                         onClick={() => handleUpgradeToAdmin(user.id)}
//                                         className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//                                     >
//                                         Upgrade to Admin
//                                     </button>
//                                 )}
//                                 <button
//                                     onClick={() => handleDeleteUser(user.id)}
//                                     className="bg-red-500 text-white px-4 py-2 rounded"
//                                 >
//                                     Delete User
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminPanel;
