import React, { useState } from 'react';
import { getLocalStorageItem } from '../utils/localStorageUtil';

type Property = {
    id: string;
    name: string;
    description: string;
    location: string;
    pricePerNight: number;
    availability: boolean;
    imageUrl?: string;
    destinationType?: string;
    propertyType?: string;
    maxGuests?: number;
};

export default function PropertyCreateForm({ onCreate }: { onCreate: () => void }) {
    const initialPropertyState = {
        name: '',
        description: '',
        location: '',
        pricePerNight: 0,
        availability: true,
        imageUrl: '',
        destinationType: '',
        propertyType: '',
        maxGuests: 1,
    };
    const [properties, setProperties] = useState<Property[]>([]);
    const [newProperty, setNewProperty] = useState<Omit<Property, 'id'>>(initialPropertyState);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userId = getLocalStorageItem('userId');
        if (!userId) {
            console.error("User ID is required to create a property.");
            return;
        }

        const response = await fetch('/api/property', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...newProperty,
                userId, // Send along userId
            }),
        });

        if (!response.ok) {
            console.error('Failed to create property:', response.statusText);
            return;
        }

        const data = await response.json();
        console.log('Property created:', data);

        onCreate();
        setNewProperty(initialPropertyState);

        // Reload properties after a new one is created
        fetch(`/api/property?userId=${userId}`)
            .then((res) => res.json())
            .then((data) => setProperties(data));
    };

    return (
        <>
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
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newProperty.imageUrl}
                    onChange={(e) => setNewProperty({ ...newProperty, imageUrl: e.target.value })}
                    style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <select
                    value={newProperty.destinationType}
                    onChange={(e) => setNewProperty({ ...newProperty, destinationType: e.target.value })}
                    style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="">Select Destination Type</option>
                    <option value="BEACH">Beach</option>
                    <option value="MOUNTAIN">Mountain</option>
                    <option value="CITY">City</option>
                    <option value="COUNTRYSIDE">Countryside</option>
                </select>
                <select
                    value={newProperty.propertyType}
                    onChange={(e) => setNewProperty({ ...newProperty, propertyType: e.target.value })}
                    style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    <option value="">Select Property Type</option>
                    <option value="APARTMENT">Apartment</option>
                    <option value="VILLA">Villa</option>
                    <option value="CABIN">Cabin</option>
                    <option value="HOTEL">Hotel</option>
                </select>
                <input
                    type="number"
                    placeholder="Max Guests"
                    value={newProperty.maxGuests}
                    onChange={(e) => setNewProperty({ ...newProperty, maxGuests: parseInt(e.target.value, 10) })}
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
        </>
    );
}
