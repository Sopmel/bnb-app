import { useEffect, useState } from 'react';
import axios from 'axios';
import { getLocalStorageItem } from '../utils/localStorageUtil';

type Booking = {
    id: string;
    property: {
        name: string;
        location: string;
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

            const response = await axios.post(`/api/bookings/cancel/${bookingId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert(response.data.message);
            // Uppdatera bokningslistan utan den avbokade bokningen
            setUserBookings(prevBookings => prevBookings.map(b =>
                b.id === bookingId ? { ...b, status: 'CANCELLED' } : b
            ));
        } catch (error) {
            console.error("Error cancelling booking:", error);
            alert("Error cancelling booking");
        }
    };

    return (
        <div>
            <h3>My Bookings</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {userBookings.map(booking => (
                    <li key={booking.id}>
                        <p><strong>Property:</strong> {booking.property.name}</p>
                        <p><strong>Check-In:</strong> {booking.checkInDate}</p>
                        <p><strong>Status:</strong> {booking.status}</p>
                        {booking.status !== 'CANCELLED' && (
                            <button onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserBookings;
