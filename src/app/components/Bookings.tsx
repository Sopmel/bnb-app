import { useEffect, useState } from 'react';
import axios from 'axios';
import UserBookings from './UserBookings';
import BookingRequests from './BookingRequests';

type BookedProperty = {
    id: string;
    name: string;
    location: string;
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
    status: 'PENDING' | 'APPROVED' | 'DECLINED';
};

const Bookings = ({ userId }: { userId: string }) => {
    const [bookedProperties, setBookedProperties] = useState<BookedProperty[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookedProperties = async () => {
            try {
                const token = localStorage.getItem("token");
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

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '20px' }}>Bookings Overview</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <section style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.5rem', borderBottom: '2px solid #ccc', paddingBottom: '5px', marginBottom: '15px' }}>
                    My Booked Travels
                </h3>
                <UserBookings userId={userId} />
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.5rem', borderBottom: '2px solid #ccc', paddingBottom: '5px', marginBottom: '15px' }}>
                    My Booked Properties
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {bookedProperties.length > 0 ? bookedProperties.map(property => (
                        <li key={property.id} style={cardStyle}>
                            <p style={propertyTextStyle}><strong>Property:</strong> {property.name}</p>
                            <p style={propertyTextStyle}><strong>Location:</strong> {property.location}</p>
                            <p style={propertyTextStyle}><strong>Check-In:</strong> {new Date(property.checkInDate).toLocaleDateString()}</p>
                            <p style={propertyTextStyle}><strong>Check-Out:</strong> {new Date(property.checkOutDate).toLocaleDateString()}</p>
                            <p style={propertyTextStyle}><strong>Total Price:</strong> {property.totalPrice} SEK</p>
                            <p style={{ ...propertyTextStyle, color: statusColors[property.status] }}>
                                <strong>Status:</strong> {property.status}
                            </p>
                        </li>
                    )) : (
                        <p>No booked properties found.</p>
                    )}
                </ul>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.5rem', borderBottom: '2px solid #ccc', paddingBottom: '5px', marginBottom: '15px' }}>
                    Booking Requests
                </h3>
                <BookingRequests />
            </section>
        </div>
    );
};

// Styling för kort
const cardStyle = {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '15px',
    backgroundColor: '#f9f9f9',
};

// Styling för text inom kort
const propertyTextStyle = {
    fontSize: '1rem',
    marginBottom: '8px',
};

// Färgkarta för status
const statusColors = {
    PENDING: '#ff9800',  // Orange
    APPROVED: '#4caf50', // Grön
    DECLINED: '#f44336'  // Röd
};

export default Bookings;
