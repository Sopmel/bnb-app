import { useEffect, useState } from 'react';
import axios from 'axios';
import { getLocalStorageItem } from '../utils/localStorageUtil';

type Booking = {
    id: string;
    property: {
        name: string;
        location: string;
        imageUrl?: string;
        user: {
            name: string;
            email: string;
        };
    };
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
    status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'CANCELLED';
};

const UserBookings = ({ userId }: { userId: string }) => {
    const [userBookings, setUserBookings] = useState<Booking[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                const token = getLocalStorageItem("token");
                if (!token) {
                    setError("User not authenticated");
                    return;
                }

                const response = await axios.get('/api/bookings/MyBookings', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserBookings(response.data);
            } catch (error) {
                setError("Failed to load user bookings");
            }
        };

        fetchUserBookings();
    }, [userId]);

    const handleCancelBooking = async (bookingId: string) => {
        try {
            const token = getLocalStorageItem("token");
            if (!token) {
                alert("Please log in to cancel the booking.");
                return;
            }

            const response = await axios.delete(`/api/bookings/cancel/${bookingId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert(response.data.message);
            setUserBookings(prevBookings => prevBookings.filter(b => b.id !== bookingId));
        } catch (error) {
            console.error("Error cancelling booking:", error);
            alert("Error cancelling booking");
        }
    };

    const statusColors = {
        PENDING: 'bg-yellow-300 text-yellow-800',
        APPROVED: 'bg-green-300 text-green-800',
        DECLINED: 'bg-red-300 text-red-800',
        CANCELLED: 'bg-gray-300 text-gray-800'
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">My Bookings</h3>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {userBookings.length === 0 ? (
                <p className="text-center text-gray-600">You have no bookings at the moment.</p>
            ) : (
                <ul className="space-y-4">
                    {userBookings.map(booking => (
                        <li
                            key={booking.id}
                            className="p-4 rounded-lg shadow-md flex flex-col sm:flex-row bg-white overflow-hidden"
                        >
                            {booking.property.imageUrl && (
                                <img
                                    src={booking.property.imageUrl}
                                    alt={booking.property.name}
                                    className="w-full sm:w-1/3 h-48 object-cover"
                                />
                            )}
                            <div className="flex-1 p-4">
                                <p className="text-lg font-semibold">{booking.property.name}</p>
                                <p className="text-sm text-gray-600">{booking.property.location}</p>
                                <p className="mt-2 text-sm"><strong>Owned by:</strong> {booking.property.user.name} ({booking.property.user.email})</p>
                                <p className="mt-2"><strong>Check-In:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                                <p><strong>Check-Out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                                <p><strong>Total Price:</strong> {booking.totalPrice} SEK</p>
                            </div>
                            <div className="p-4 flex flex-col items-center justify-between">
                                <span className={`px-3 py-1 rounded-full font-semibold ${statusColors[booking.status]}`}>
                                    {booking.status}
                                </span>
                                {booking.status !== 'CANCELLED' && (
                                    <button
                                        onClick={() => handleCancelBooking(booking.id)}
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
        </div>
    );
};

export default UserBookings;
