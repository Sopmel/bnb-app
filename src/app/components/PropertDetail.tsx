"use client";

import React, { useState } from "react";
import BookingForm from "./BookingForm";
import { getLocalStorageItem } from "../utils/localStorageUtil";
import Link from "next/link";

type Property = {
    id: string;
    name: string;
    description: string;
    location?: string;
    pricePerNight: number;
    imageUrl?: string;
    userId?: string;
    user?: {
        id: string;
        name: string;
    };
    propertyType?: string;
    maxGuests?: number;
};

type PropertyDetailsModalProps = {
    property: Property;
    onClose: () => void;
};

export default function PropertyDetailsModal({ property, onClose }: PropertyDetailsModalProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(!!getLocalStorageItem("token"));
    const [totalCost, setTotalCost] = useState<number>(0);

    const handleTotalCostUpdate = (cost: number) => {
        setTotalCost(cost);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 overflow-hidden">
            <div className="bg-white text-gray-800 p-6 md:p-8 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] relative overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-200 focus:outline-none text-2xl"
                >
                    &times;
                </button>
                <div className="flex flex-col items-center md:items-start space-y-4">
                    <h2 className="text-3xl font-bold text-center md:text-left">{property.name}</h2>
                    {property.imageUrl && (
                        <img
                            src={property.imageUrl}
                            alt={property.name}
                            className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                    )}
                    <div className="w-full">
                        <p className="text-lg text-gray-700"><strong>Plats:</strong> {property.location}</p>
                        <p className="text-xl font-semibold text-gray-800">
                            {property.pricePerNight.toLocaleString()} SEK / natt
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">{property.description}</p>
                        {property.propertyType && (
                            <p className="text-lg text-gray-700"><strong>Typ:</strong> {property.propertyType}</p>
                        )}
                        {property.maxGuests && (
                            <p className="text-lg text-gray-700"><strong>Max antal gäster:</strong> {property.maxGuests}</p>
                        )}
                        {property.user && (
                            <p className="text-sm text-gray-500 mt-4">
                                Ägare:{" "}
                                {isLoggedIn ? (
                                    <Link href={`/profile/${property.userId}`} className="text-blue-500 hover:underline">
                                        {property.user.name}
                                    </Link>
                                ) : (
                                    property.user.name
                                )}
                            </p>
                        )}
                    </div>
                    {isLoggedIn ? (
                        <div className="w-full">
                            <BookingForm
                                propertyId={property.id}
                                pricePerNight={property.pricePerNight}
                                onTotalCostUpdate={handleTotalCostUpdate} />

                            <p className="text-lg font-semibold mt-4 text-center text-green-700">
                                Total kostnad: {totalCost.toLocaleString()} SEK
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-700 mt-6 text-center">Logga in för att göra en bokning.</p>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 w-full"
                >
                    Stäng
                </button>
            </div>
        </div>
    );
}
