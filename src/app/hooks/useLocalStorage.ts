import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: string | null = null) {
    const [storedValue, setStoredValue] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const item = localStorage.getItem(key);
            setStoredValue(item ?? initialValue);
        }
    }, [key, initialValue]);

    const setValue = (value: string) => {
        if (typeof window !== "undefined" && value !== null) {
            localStorage.setItem(key, value);
            setStoredValue(value);
        }
    };

    return [storedValue, setValue] as const;
}

export default useLocalStorage;
