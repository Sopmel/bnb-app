'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

type Property = {
    id: string;
    name: string;
    description: string;
    location: string;
    pricePerNight: number;
    availability: boolean;
};

export default function PropertyPage() {
    const { userId } = useParams();
    const [properties, setProperties] = useState<Property[]>([]);
    const [newProperty, setNewProperty] = useState<Omit<Property, 'id'>>({
        name: '',
        description: '',
        location: '',
        pricePerNight: 0,
        availability: true,
    });



    useEffect(() => {
        if (userId) {
            fetch(`/api/property?userId=${userId}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log('Fetched properties:', data); // Kolla vad som hämtas från API
                    setProperties(data);
                })
                .catch((error) => console.error('Error fetching properties:', error));
        }
    }, [userId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');  // Se till att userId hämtas korrekt

        if (!userId) {
            console.error("User ID is required to create a property.");
            return;
        }

        const response = await fetch('/api/property', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...newProperty,
                userId,  // Skicka med userId
            }),
        });

        if (!response.ok) {
            console.error('Failed to create property:', response.statusText);
            return;
        }

        const data = await response.json();
        console.log('Property created:', data);

        // Hämta och visa alla egendomar igen efter att en ny har skapats
        fetch(`/api/property?userId=${userId}`)
            .then((res) => res.json())
            .then((data) => setProperties(data));
    };


    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h1>Properties</h1>

            {/* Property List */}
            {Array.isArray(properties) ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {properties.map((property) => (
                        <li key={property.id} style={{
                            border: '1px solid #ccc',
                            padding: '15px',
                            marginBottom: '10px',
                            borderRadius: '5px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <strong>{property.name}</strong><br />
                            Location: {property.location}<br />
                            Price: {property.pricePerNight} SEK / night<br />
                            {property.description && <p>Description: {property.description}</p>}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Properties </p>
            )}

            <h2>Create New Property</h2>

            {/* Create Property Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newProperty.name}
                    onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
                    style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newProperty.description}
                    onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                    style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={newProperty.location}
                    onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                    style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                    type="number"
                    placeholder="Price per Night"
                    value={newProperty.pricePerNight}
                    onChange={(e) => setNewProperty({ ...newProperty, pricePerNight: parseFloat(e.target.value) })}
                    style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{
                    padding: '10px',
                    fontSize: '16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}>Create Property</button>
            </form>
        </div>
    );
}
