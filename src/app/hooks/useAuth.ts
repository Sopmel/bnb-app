"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { decodeJWT } from '../utils/jwtDecoder';
import { getLocalStorageItem, setLocalStorageItem } from '../utils/localStorageUtil';

export function useAuth() {
    console.log('useAuth is called')
    const router = useRouter();

    useEffect(() => {
        const checkTokenExpiration = () => {
            const token = getLocalStorageItem('token');
            if (token) {
                const decodedToken: any = decodeJWT(token);

                if (!decodedToken) {
                    console.error('Failed to decode token');
                    router.push('/login'); // Om dekoderingen misslyckas, logga ut användaren
                    return;
                }

                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    // Om token har gått ut, logga ut användaren
                    setLocalStorageItem('token', '');
                    setLocalStorageItem('isAdmin', 'false');
                    setLocalStorageItem('userId', '');
                    router.push('/login');
                }
            }
        };

        checkTokenExpiration();
        window.addEventListener('focus', checkTokenExpiration);

        return () => window.removeEventListener('focus', checkTokenExpiration);
    }, [router]);
}

export default useAuth;