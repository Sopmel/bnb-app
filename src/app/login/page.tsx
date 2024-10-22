'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { decodeJWT } from '../utils/jwtDecoder';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const { token } = response.data;

                // Dekodera JWT-token
                const decodedToken: any = decodeJWT(token);

                // Hämta isAdmin från den dekoderade tokenen
                const isAdmin = decodedToken.isAdmin;

                const userId = decodedToken.userId;

                // Spara token och admin-status i localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
                localStorage.setItem('userId', userId);

                window.dispatchEvent(new Event('login'));  // Trigga login-event
                router.push('/');
            }
        } catch (err) {
            setError('Felaktig e-post eller lösenord.');
            console.error(err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Logga in</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-2">E-post</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ange din e-post"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Lösenord</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Ange ditt lösenord"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Logga in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
