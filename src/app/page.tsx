"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decodeJWT } from "./utils/jwtDecoder";
import { getLocalStorageItem, setLocalStorageItem } from "./utils/localStorageUtil";
import axios from "axios";
import SearchAndFilter from "./components/SearchAndFilter"; // Importera SearchAndFilter-komponenten

type Property = {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  imageUrl?: string;
  user?: {
    name: string;
  };
};

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [newestProperties, setNewestProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [priceSortOrder, setPriceSortOrder] = useState<"asc" | "desc" | "">(""); // Ny state för pris-sortering

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = getLocalStorageItem("token");
      if (token) {
        const decodedToken = decodeJWT(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          setIsLoggedIn(true);
          setUserId(getLocalStorageItem("userId"));
        } else {
          setIsLoggedIn(false);
          setUserId(null);
          setLocalStorageItem("token", "");
          setLocalStorageItem("isAdmin", "false");
          setLocalStorageItem("userId", "");
        }
      } else {
        setIsLoggedIn(false);
        setUserId(null);
      }
    };

    checkTokenExpiration();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("/api/property/home", {
        params: {
          search: searchTerm || undefined,
          destinationType: selectedDestination || undefined,
          propertyType: selectedPropertyType || undefined,
          priceSortOrder: priceSortOrder || undefined,
        },
      });
      setNewestProperties(response.data);
    } catch (error) {
      console.error("Failed to load properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [searchTerm, selectedDestination, selectedPropertyType, priceSortOrder]);

  // Hanteringsfunktioner för sök och filter
  const handleSearch = (term: string) => setSearchTerm(term);
  const handleDestinationTypeChange = (type: string) => setSelectedDestination(type);
  const handlePropertyTypeChange = (type: string) => setSelectedPropertyType(type);
  const handlePriceSortChange = (order: "asc" | "desc" | "") => setPriceSortOrder(order); // Hanterare för pris-sortering

  return (
    <div className="relative min-h-screen flex flex-col text-white">
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center flex-1 w-full text-white"
        style={{
          backgroundImage: "url('/assets/bg-bnb.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh",
        }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full absolute"></div>
        <div className="relative z-10 text-center p-8">
          <h1 className="text-5xl font-bold mb-4">
            {isLoggedIn ? "Välkommen tillbaka!" : "Välkommen till Airbnb!"}
          </h1>
          <p className="text-lg mb-6">
            {isLoggedIn
              ? "Upptäck nya destinationer och hantera dina bokningar"
              : "Hitta unika boenden och upplev oförglömliga stunder"}
          </p>

          <button
            onClick={() => (isLoggedIn ? router.push(`/profile/${userId}`) : router.push("/search"))}
            className="bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-6 rounded-lg text-lg"
          >
            {isLoggedIn ? "View Profile" : "Start Exploring"}
          </button>
        </div>
      </section>

      {/* Sök- och filtersektion */}
      <SearchAndFilter
        onSearch={handleSearch}
        onDestinationTypeChange={handleDestinationTypeChange}
        onPropertyTypeChange={handlePropertyTypeChange}
        onPriceSortChange={handlePriceSortChange} // Lägg till pris-sortering
      />

      {/* Newest Properties Section */}
      <section className="flex flex-col items-center py-16 px-8 bg-gray-100 text-gray-900">
        <h2 className="text-3xl font-semibold mb-8">Nyaste tillagda boenden</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          {newestProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {property.imageUrl && (
                <img src={property.imageUrl} alt={property.name} className="w-full h-48 object-cover" />
              )}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-gray-800">{property.name}</h3>
                <p className="text-gray-600 line-clamp-3">{property.description}</p>
                <p className="text-gray-900 font-semibold mt-2">
                  Pris per natt: {property.pricePerNight} kr
                </p>
                {property.user && <p className="text-sm text-gray-500">Ägare: {property.user.name}</p>}
                <button
                  onClick={() => router.push(`/property/${property.id}`)}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg self-start"
                >
                  Visa mer
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full flex gap-6 items-center justify-center py-4 bg-gray-800 text-gray-300">
        footer
      </footer>
    </div>
  );
}
