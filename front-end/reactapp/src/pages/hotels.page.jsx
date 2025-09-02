import { useState } from "react";
import { PROPERTY, LOCATION } from "@/constents/constents";
import { PropertyTab } from "@/components/ui/PropertyTab";
import { LocationTab } from "@/components/ui/LocationTab";
import { useGetHotelsQuery } from "@/lib/api";
import { HotelCard } from "@/components/ui/HotelCard";
import { Skeleton } from "@/components/ui/skeleton";
const HotelsPage = () => {
  const { data: hotels, isLoading, isError, error } = useGetHotelsQuery();

  const property = PROPERTY;
  const locations = LOCATION;

  const [selectedProperty, setSelectedProperty] = useState("ALL");
  const handleSelectedProperty = (property) => {
    setSelectedProperty(property);
  };

  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const handleSelectedLocation = (location) => {
    setSelectedLocation(location);
  };

  const filteredHotels = hotels
    ? hotels.filter((hotel) => {
        const matchesLocation =
          selectedLocation === "ALL" ||
          hotel.location.toLowerCase().includes(selectedLocation.toLowerCase());

        const matchesProperty =
          selectedProperty === "ALL" ||
          hotel.propertyType.toLowerCase() === selectedProperty;

        return matchesLocation && matchesProperty;
      })
    : [];

  if (isLoading) {
    return (
      <div className=" w-[90vw] sm:w-[95vw] max-w-[1500px] mx-auto   my-5">
        <h1 className="text-[32px] font-bold mb-[8px] ">
          Top Trending Hotels Worldwide
        </h1>

        <p className="text-gray-700 mb-5">
          Discover the most trending hotels for an unforgettable experience
        </p>
        {/* <div className="flex gap-2 items-centers mb-4">
          {locations.map((location, Index) => (
            <LocationTab
              key={Index}
              name={location}
              handleSelectedLocation={handleSelectedLocation}
              selectedLocation={selectedLocation}
            />
          ))}
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 ">
          <div>Loading ....</div>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-[90vw] sm:w-[95vw] max-w-[1500px] mx-auto   my-5">
        <h1 className="text-[32px] font-bold mb-[8px] ">
          Top Trending Hotels Worldwide
        </h1>

        <p className="text-gray-700 mb-5">
          Discover the most trending hotels for an unforgettable experience
        </p>
        {/* <div className="flex gap-2 items-centers mb-4">
          {locations.map((location, Index) => (
            <LocationTab
              key={Index}
              name={location}
              handleSelectedLocation={handleSelectedLocation}
              selectedLocation={selectedLocation}
            />
          ))}
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 ">
          <div className="text-red-500">
            {error.message || error.error || "Something went wrong"}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className=" w-[90vw] sm:w-[95vw] max-w-[1500px] mx-auto   my-5">
      <h1 className="text-[32px] font-bold mb-[8px] ">
        Top Trending Hotels Worldwide
      </h1>

      <p className="text-gray-700 mb-5">
        Discover the most trending hotels for an unforgettable experience
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 max-w-[1200px] mx-auto lg:grid-cols-5 xl:flex justify-center gap-6 mb-12 ">
        {property.map((property, Index) => (
          <PropertyTab
            key={Index + 10}
            property={property}
            name={property.propertyType}
            handleSelectedProperty={handleSelectedProperty}
            selectedProperty={selectedProperty}
          />
        ))}
      </div>
      <div className="flex gap-2 items-centers mb-4  justify-center">
        {locations.map((location, Index) => (
          <LocationTab
            key={Index}
            name={location}
            handleSelectedLocation={handleSelectedLocation}
            selectedLocation={selectedLocation}
          />
        ))}
      </div>

      <div className="my-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 ">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))
        ) : (
          <div className="text-black-100 ">No Hotels Found</div>
        )}
      </div>
    </div>
  );
};

export default HotelsPage;
