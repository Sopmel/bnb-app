import React from 'react';

type Property = {
    id: string;
    name: string;
    description: string;
    location: string;
    pricePerNight: number;
    availability: boolean;
};

type EditPropertyModalProps = {
    property: Property | null;
    onClose: () => void;
    onSubmit: (updatedProperty: Omit<Property, 'id'>) => void;
};

const PropertyEditModal = ({ property, onClose, onSubmit }: EditPropertyModalProps) => {
    const [editProperty, setEditProperty] = React.useState<Omit<Property, 'id'>>({
        name: property?.name || '',
        description: property?.description || '',
        location: property?.location || '',
        pricePerNight: property?.pricePerNight || 0,
        availability: property?.availability || true,
    });

    if (!property) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(editProperty);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                width: '400px',
                maxHeight: '90vh',
                overflowY: 'auto',
            }}>
                <h2>Edit Property</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={editProperty.name}
                        onChange={(e) => setEditProperty({ ...editProperty, name: e.target.value })}
                        style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={editProperty.description}
                        onChange={(e) => setEditProperty({ ...editProperty, description: e.target.value })}
                        style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={editProperty.location}
                        onChange={(e) => setEditProperty({ ...editProperty, location: e.target.value })}
                        style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="number"
                        placeholder="Price per Night"
                        value={editProperty.pricePerNight}
                        onChange={(e) => setEditProperty({ ...editProperty, pricePerNight: parseFloat(e.target.value) })}
                        style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button type="button" onClick={onClose} style={{
                            padding: '10px',
                            fontSize: '16px',
                            backgroundColor: '#ccc',
                            color: 'black',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}>Cancel</button>
                        <button type="submit" style={{
                            padding: '10px',
                            fontSize: '16px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PropertyEditModal;
