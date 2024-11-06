import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PropertyActions from './PropertyActions';
import PropertyEditModal from './PropertyEditModal';
import BookingForm from './BookingForm';

type Property = {
    id: string;
    name: string;
    description: string;
    location: string;
    pricePerNight: number;
    availability: boolean;
    imageUrl?: string;
    userId?: string;
};

type EditableProperty = Omit<Property, 'id' | 'userId'>;

export default function PropertyPage({ update, isLoggedinProfile, isAdmin, currentUserId }: {
    update: boolean;
    isLoggedinProfile: boolean;
    isAdmin: boolean;
    currentUserId: string | null;
}) {
    const { userId } = useParams();
    const [properties, setProperties] = useState<Property[]>([]);
    const [propertyToEdit, setPropertyToEdit] = useState<Property | null>(null);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [totalCost, setTotalCost] = useState<number>(0);

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

    const handleOpenBookingForm = (property: Property) => {
        setSelectedProperty(property);
    };

    const handleCloseBookingForm = () => {
        setSelectedProperty(null);
    };

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

    const handleEditSubmit = async (updatedProperty: EditableProperty) => {
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

    const handleTotalCostUpdate = (cost: number) => {
        setTotalCost(cost);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Properties</h1>

            {/* Property List */}
            {Array.isArray(properties) ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden relative">
                            {property.imageUrl && (
                                <img
                                    src={property.imageUrl}
                                    alt={property.name}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
                                <p className="text-gray-600">{property.location}</p>
                                <p className="text-gray-900 font-semibold mt-2">
                                    {property.pricePerNight} SEK / night
                                </p>
                                <p className="text-gray-700 mt-4">{property.description}</p>

                                {/* Visa bokningsknappen bara om det inte är användarens egna profil */}
                                {property.userId !== currentUserId && (
                                    <button
                                        onClick={() => handleOpenBookingForm(property)}
                                        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Book this Property
                                    </button>
                                )}
                            </div>

                            {/* Visa redigera och radera knappar om användaren är ägare eller admin */}
                            {(property.userId === currentUserId || isAdmin) && (
                                <div className="absolute top-4 right-4 flex space-x-2 bg-white rounded-full p-2 shadow-md">
                                    <PropertyActions
                                        property={property}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600">No Properties</p>
            )}

            {/* Booking Form Modal */}
            {selectedProperty && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Booking for {selectedProperty.name}</h2>
                        <BookingForm
                            propertyId={selectedProperty.id}
                            pricePerNight={selectedProperty.pricePerNight}
                            onTotalCostUpdate={handleTotalCostUpdate}
                        />
                        <p className="text-lg font-semibold mt-4 text-center text-green-700">
                            Total kostnad: {totalCost.toLocaleString()} SEK
                        </p>
                        <button
                            onClick={handleCloseBookingForm}
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg w-full hover:bg-red-600 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Property Modal */}
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
