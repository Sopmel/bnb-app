import { useEffect, useState } from 'react';
import axios from 'axios';

type BookingRequest = {
    id: string;
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
    status: 'PENDING' | 'APPROVED' | 'DECLINED';
    user: { id: string; name: string };
};

const BookingRequests = () => {
    const [requests, setRequests] = useState<BookingRequest[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRequests = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("User not authenticated");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('/api/bookings/request', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRequests(response.data);
            } catch (error) {
                setError("Failed to load booking requests");
                console.error("Error loading booking requests:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const createNotification = async (userId: string, message: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            await axios.post('/api/notifications', { userId, message }, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            console.error("Error creating notification:", error);
        }
    };

    const handleApprove = async (bookingId: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            await axios.post('/api/bookings/approve', { bookingId }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Uppdatera status och skapa en notifikation för användaren
            setRequests(requests.map(req => req.id === bookingId ? { ...req, status: 'APPROVED' } : req));
            const booking = requests.find(req => req.id === bookingId);
            if (booking) {
                await createNotification(booking.user.id, `Your booking for ${booking.totalPrice} SEK has been approved.`);
            }
        } catch (error) {
            setError("Error approving booking");
            console.error("Error approving booking:", error);
        }
    };

    const handleDecline = async (bookingId: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            await axios.post('/api/bookings/decline', { bookingId }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Uppdatera status och skapa en notifikation för användaren
            setRequests(requests.map(req => req.id === bookingId ? { ...req, status: 'DECLINED' } : req));
            const booking = requests.find(req => req.id === bookingId);
            if (booking) {
                await createNotification(booking.user.id, `Your booking request for ${booking.totalPrice} SEK was declined.`);
            }
        } catch (error) {
            setError("Error declining booking");
            console.error("Error declining booking:", error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Booking Requests</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {requests.length > 0 ? requests.map(request => (
                        <li key={request.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                            <p><strong>Guest:</strong> {request.user.name}</p>
                            <p><strong>Check-In:</strong> {new Date(request.checkInDate).toLocaleDateString()}</p>
                            <p><strong>Check-Out:</strong> {new Date(request.checkOutDate).toLocaleDateString()}</p>
                            <p><strong>Total Price:</strong> {request.totalPrice} SEK</p>
                            <p><strong>Status:</strong> {request.status}</p>
                            {request.status === 'PENDING' && (
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => handleApprove(request.id)} style={{ backgroundColor: 'green', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>
                                        Approve
                                    </button>
                                    <button onClick={() => handleDecline(request.id)} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', borderRadius: '5px' }}>
                                        Decline
                                    </button>
                                </div>
                            )}
                        </li>
                    )) : (
                        <p>No pending booking requests.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default BookingRequests;
