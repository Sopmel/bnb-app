"use client";

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
                console.log('Decoded token:', decodedToken);  // Logga ut token för felsökning

                // Hämta isAdmin från den dekoderade tokenen
                const isAdmin = decodedToken.isAdmin;
                console.log('isAdmin:', isAdmin);  // Kontrollera om isAdmin är true

                // Spara token och admin-status i localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');

                window.dispatchEvent(new Event('login'));  // Trigga login-event
                router.push('/');
            }
        } catch (err) {
            setError('Felaktig e-post eller lösenord.');
            console.error(err);
        }
    };

    return (
        <div className="container">
            <h1>Logga in</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>E-post</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Lösenord</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Logga in</button>
            </form>
        </div>
    );
};

export default Login;
