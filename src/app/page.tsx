"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { decodeJWT } from "./utils/jwtDecoder";
import { getLocalStorageItem, setLocalStorageItem } from "./utils/localStorageUtil";
import axios from "axios";
import Link from "next/link";
import SearchAndFilter from "./components/SearchAndFilter";
import PropertyDetail from "./components/PropertDetail";

type Property = {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  imageUrl?: string;
  userId?: string;
  user?: {
    id: string;
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
  const [priceSortOrder, setPriceSortOrder] = useState<"asc" | "desc" | "">("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null); // State för vald fastighet
  const [isModalOpen, setIsModalOpen] = useState(false); // State för modalens synlighet

  useEffect(() => {
    //hämtar token från local storage och kollar om det är giltigt
    const checkTokenExpiration = () => {
      const token = getLocalStorageItem("token");
      if (token) {
        const decodedToken = decodeJWT(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          setIsLoggedIn(true);
          const storedUserId = getLocalStorageItem("userId");
          if (storedUserId) {
            setUserId(storedUserId);
          } else {
            console.error("User ID is missing in local storage.");
          }
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
      console.log("Fetched properties:", response.data);
      setNewestProperties(response.data);
    } catch (error) {
      console.error("Failed to load properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [searchTerm, selectedDestination, selectedPropertyType, priceSortOrder]);

  const handleSearch = (term: string) => setSearchTerm(term);
  const handleDestinationTypeChange = (type: string) => setSelectedDestination(type);
  const handlePropertyTypeChange = (type: string) => setSelectedPropertyType(type);
  const handlePriceSortChange = (order: "asc" | "desc" | "") => setPriceSortOrder(order);

  const handleOpenModal = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
    setIsModalOpen(false);
  };

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
        onPriceSortChange={handlePriceSortChange}
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
                {property.user && (
                  <p className="text-sm text-gray-500">
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
                <button
                  onClick={() => handleOpenModal(property)}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg self-start"
                >
                  Visa mer
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visa mer Modal */}
      {isModalOpen && selectedProperty && (
        <PropertyDetail property={selectedProperty} onClose={handleCloseModal} />
      )}

    </div>
  );
}
