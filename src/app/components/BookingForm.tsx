import { useState, useEffect } from 'react';
import axios from 'axios';
import { getLocalStorageItem } from '../utils/localStorageUtil';

const BookingForm = ({ propertyId, pricePerNight, onTotalCostUpdate }: { propertyId: string; pricePerNight: number; onTotalCostUpdate: (cost: number) => void }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const calculateTotalCost = () => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
            const totalCost = nights * pricePerNight;
            onTotalCostUpdate(totalCost);
        } else {
            onTotalCostUpdate(0);
        }
    };

    useEffect(() => {
        calculateTotalCost();
    }, [startDate, endDate]);

    const handleBookingRequest = async () => {
        setIsSubmitting(true);
        try {
            const token = getLocalStorageItem("token");
            if (!token) {
                alert("Please log in to make a booking.");
                return;
            }

            await axios.post(`/api/bookings/request`, { propertyId, startDate, endDate }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Booking request sent!");
        } catch (error) {
            console.error("Error creating booking:", error);
            alert("Error creating booking");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md max-w-md w-full mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Boka Egendom</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">Startdatum:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">Slutdatum:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                onClick={handleBookingRequest}
                disabled={isSubmitting}
                className={`w-full py-2 mt-4 rounded-lg text-white font-semibold ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                    } transition duration-150`}
            >
                {isSubmitting ? "Behandlar..." : "Skicka Förfrågan"}
            </button>
        </div>
    );
};

export default BookingForm;
