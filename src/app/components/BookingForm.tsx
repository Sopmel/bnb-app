import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ propertyId }: { propertyId: string }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [cost, setCost] = useState<number | null>(null);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const createNotification = async (userId: string, message: string, type: 'BOOKING_REQUEST' | 'MESSAGE', bookingId?: string, messageId?: string) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            await axios.post('/api/notifications', {
                userId,
                message,
                type,
                bookingId,
                messageId,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            console.error("Error creating notification:", error);
        }
    };


    const handleBookingRequest = async () => {
        if (isSubmitting) return; // Förhindra dubbelklick
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please log in to make a booking.");
                return;
            }

            const response = await axios.post(`/api/bookings/request`, {
                propertyId,
                startDate,
                endDate,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setCost(response.data.cost);
            alert(`Offert: ${response.data.cost} SEK`);

            // Skapa en notifikation för egendomens ägare
            const { ownerId, bookingId } = response.data;
            if (ownerId && bookingId) {
                await createNotification(
                    ownerId,
                    `New booking request for property with ID ${propertyId}.`,
                    'BOOKING_REQUEST',
                    bookingId  // Koppla notisen till bokningen
                );
            }
        } catch (error) {
            console.error("Error creating booking:", error);
            alert("Error creating booking");
        }
    };


    return (
        <>
            <div>
                <h2>Book Property</h2>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <button onClick={handleBookingRequest} disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Send Request"}
                </button>
                {cost !== null && <p>Total cost: {cost} SEK</p>}
            </div>
        </>
    );
};

export default BookingForm;
