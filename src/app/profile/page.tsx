"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Profile = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, []);

    return <div>Welcome to your profile!</div>;
};

export default Profile;
