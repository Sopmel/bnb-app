'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PropertyActions from './PropertyActions'; // Importera den nya komponenten
import PropertyEditModal from './PropertyEditModal'; // Importera EditPropertyModal

type Property = {
    id: string;
    name: string;
    description: string;
    location: string;
    pricePerNight: number;
    availability: boolean;
};

export default function PropertyPage({ update }: { update: boolean }) {
    const { userId } = useParams();
    const [properties, setProperties] = useState<Property[]>([]);
    const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null);

    useEffect(() => {
        if (userId) {
            fetch(`/api/property?userId=${userId}`)
                .then((res) => res.json())
                .then((data) => {
                    setProperties(data);
                })
                .catch((error) => console.error('Error fetching properties:', error));
        }
    }, [userId, update]);

    const handleEdit = (property: Property) => {
        setPropertyToEdit(property);
    };

    const handleDelete = async (propertyId: string) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;

        const response = await fetch(`/api/property/${propertyId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setProperties((prevProperties) => prevProperties.filter((p) => p.id !== propertyId));
        } else {
            console.error('Failed to delete property');
        }
    };

    const handleEditSubmit = async (updatedProperty: Omit<Property, 'id'>) => {
        if (!propertyToEdit) return;

        const response = await fetch(`/api/property/${propertyToEdit.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProperty),
        });

        if (response.ok) {
            const updatedProp = await response.json();
            setProperties((prevProperties) =>
                prevProperties.map((p) => (p.id === updatedProp.id ? updatedProp : p))
            );
            setPropertyToEdit(null);
        } else {
            console.error('Failed to update property');
        }
    };

    const closeModal = () => {
        setPropertyToEdit(null);
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
                            backgroundColor: '#f9f9f9',
                            position: 'relative'
                        }}>
                            <strong>{property.name}</strong><br />
                            Location: {property.location}<br />
                            Price: {property.pricePerNight} SEK / night<br />
                            {property.description && <p>Description: {property.description}</p>}

                            {/* PropertyActions-komponenten används här */}
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                display: 'flex',
                                gap: '10px'
                            }}>
                                <PropertyActions
                                    property={property}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Properties</p>
            )}

            {/* Edit Property Popup Modal */}
            {propertyToEdit && (
                <PropertyEditModal
                    property={propertyToEdit}
                    onClose={closeModal}
                    onSubmit={handleEditSubmit}
                />
            )}
        </div>
    );
}
