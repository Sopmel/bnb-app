import { useEffect, useState } from 'react';
import axios from 'axios';
import UserBookings from './UserBookings';
import BookingRequests from './BookingRequests';
import { getLocalStorageItem } from '../utils/localStorageUtil';

type BookedProperty = {
    id: string;
    property: {
        id: string;
        name: string;
        location: string;
        imageUrl?: string;
        pricePerNight: number;
        user: {
            name: string;
            email: string;
        };
    };
    user: {
        name: string;
        email: string;
    };
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
    status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'CANCELLED';
};



const Bookings = ({ userId }: { userId: string }) => {
    const [bookedProperties, setBookedProperties] = useState<BookedProperty[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookedProperties = async () => {
            try {
                const token = getLocalStorageItem("token");
                if (!token) {
                    setError("User not authenticated");
                    return;
                }

                const response = await axios.get('/api/bookings/bookedProperties', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookedProperties(response.data);
            } catch (error) {
                setError("Failed to load booked properties");
                console.error("Error loading booked properties:", error);
            }
        };

        fetchBookedProperties();
    }, [userId]);

    const handleCancelBooking = async (bookingId: string) => {
        try {
            const token = getLocalStorageItem("token");
            if (!token) {
                alert("You need to be logged in to cancel a booking.");
                return;
            }

            await axios.delete(`/api/bookings/cancel/${bookingId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setBookedProperties(prevProperties =>
                prevProperties.filter(property => property.id !== bookingId)
            );

            alert("Booking has been cancelled.");
        } catch (error) {
            setError("Failed to cancel the booking.");
            console.error("Error cancelling booking:", error);
        }
    };

    const statusColors = {
        PENDING: 'bg-yellow-300 text-yellow-800',
        APPROVED: 'bg-green-300 text-green-800',
        DECLINED: 'bg-red-300 text-red-800',
        CANCELLED: 'bg-gray-300 text-gray-800'
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Bookings Overview</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <section className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">My Booked Travels</h3>
                <UserBookings userId={userId} />
            </section>

            <section className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">My Booked Properties</h3>
                {bookedProperties.length === 0 ? (
                    <p className="text-center text-gray-600">No booked properties found.</p>
                ) : (
                    <ul className="space-y-4">
                        {bookedProperties.map((property) => (
                            <li key={property.id} className="p-4 rounded-lg shadow-md flex flex-col sm:flex-row bg-white overflow-hidden">
                                {property.property.imageUrl && (
                                    <img
                                        src={property.property.imageUrl}
                                        alt={property.property.name}
                                        className="w-full sm:w-1/3 h-48 object-cover"
                                    />
                                )}
                                <div className="flex-1 p-4">
                                    <p className="text-lg font-semibold">{property.property.name}</p>
                                    <p className="text-sm text-gray-600">{property.property.location}</p>
                                    <p className="text-sm text-gray-500">Booked by: {property.user.name} ({property.user.email})</p>
                                    <p className="mt-2"><strong>Check-In:</strong> {new Date(property.checkInDate).toLocaleDateString()}</p>
                                    <p><strong>Check-Out:</strong> {new Date(property.checkOutDate).toLocaleDateString()}</p>
                                    <p><strong>Total Price:</strong> {property.totalPrice} SEK</p>
                                </div>
                                <div className="p-4 flex flex-col items-center justify-between">
                                    <span className={`px-3 py-1 rounded-full font-semibold ${statusColors[property.status]}`}>
                                        {property.status}
                                    </span>
                                    {property.status !== 'CANCELLED' && (
                                        <button
                                            onClick={() => handleCancelBooking(property.id)}
                                            className="mt-4 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            Cancel Booking
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}

                    </ul>
                )}
            </section>

            <section className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Booking Requests</h3>
                <BookingRequests />
            </section>
        </div>
    );
};

export default Bookings;
