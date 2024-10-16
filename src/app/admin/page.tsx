"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
    const router = useRouter();

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (!isAdmin) {
            router.push('/');  // Omdirigera om användaren inte är admin
        }
    }, []);

    return <div>Välkommen till adminpanelen!</div>;
};

export default AdminPage;
