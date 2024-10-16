"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/register', {
                name,
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 201) {
                router.push('/login');  // Omdirigera till login
            }
        } catch (err) {
            setError('registration failed');
            console.error(err);
        }
    };

    return (
        <div className="container">
            <h1>Registrera dig</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Namn</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">Registrera</button>
            </form>
        </div>
    );
};

export default Register;
