"use client";

import { useState } from "react";

type SearchAndFilterProps = {
    onSearch: (searchTerm: string) => void;
    onDestinationTypeChange: (destinationType: string) => void;
    onPropertyTypeChange: (propertyType: string) => void;
    onPriceSortChange: (sortOrder: "asc" | "desc" | "") => void;
};

const destinationTypes = ["SUN", "SNOW", "BEACH", "MOUNTAIN", "CITY", "COUNTRYSIDE"];
const propertyTypes = ["APARTMENT", "HOUSE", "CABIN", "VILLA", "BUNGALOW"];

export default function SearchAndFilter({
    onSearch,
    onDestinationTypeChange,
    onPropertyTypeChange,
    onPriceSortChange,
}: SearchAndFilterProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDestination, setSelectedDestination] = useState("");
    const [selectedPropertyType, setSelectedPropertyType] = useState("");
    const [priceSortOrder, setPriceSortOrder] = useState<"asc" | "desc" | "">("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleDestinationTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedDestination(value);
        onDestinationTypeChange(value);
    };

    const handlePropertyTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedPropertyType(value);
        onPropertyTypeChange(value);
    };

    const handlePriceSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as "asc" | "desc" | "";
        setPriceSortOrder(value);
        onPriceSortChange(value);
    };

    return (
        <section className="py-6 px-8 bg-gray-100 text-gray-800 w-full flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Sök och Filtrera</h2>
            <div className="w-full flex flex-col md:flex-row items-center gap-6 justify-center">
                <input
                    type="text"
                    placeholder="Sök efter namn eller beskrivning..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="flex-1 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <select
                    value={selectedDestination}
                    onChange={handleDestinationTypeChange}
                    className="p-3 rounded-lg border border-gray-300 shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                    <option value="">Alla destinationstyper</option>
                    {destinationTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                <select
                    value={selectedPropertyType}
                    onChange={handlePropertyTypeChange}
                    className="p-3 rounded-lg border border-gray-300 shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                    <option value="">Alla fastighetstyper</option>
                    {propertyTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                <select
                    value={priceSortOrder}
                    onChange={handlePriceSortChange}
                    className="p-3 rounded-lg border border-gray-300 shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                    <option value="">Sortera efter pris</option>
                    <option value="asc">Pris: Lågt till Högt</option>
                    <option value="desc">Pris: Högt till Lågt</option>
                </select>
            </div>
        </section>
    );
}
