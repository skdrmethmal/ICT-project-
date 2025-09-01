import { HotelCard } from "./HotelCard";
import { LocationTab } from "./LocationTab";
import { useState, useEffect, forwardRef } from "react";
import { Button } from "./button.jsx";
import { getHotels } from "@/lib/api/hotels.jsx";
import { useSelector } from "react-redux";
import { setUser } from "@/lib/features/userSlice";
import { useDispatch } from "react-redux";
import { useGetHotelsQuery, useGetHotelBySearchQuery } from "@/lib/api";
import { Showcase } from "./Showcase";
import { PropertyTab } from "./PropertyTab";
import { ClockFading } from "lucide-react";
import { Link } from "react-router";
import { PROPERTY, LOCATION } from "@/constents/constents";
import { LandingReviews } from "./LandingReviews";

const HotelListing = forwardRef(
  (
    {
      scrollToSearch,
      scrollToHotelList,
      numberOfHotels,
      isNumberOfHotelsLoading,
      isNumberOfHotelsError,
    },
    ref
  ) => {
    // const [hotels, setHotels] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [isError, setIsError] = useState(false);
    // const [error, setError] = useState("");
    // // Fetching hotels data from the API when the component mounts
    // useEffect(() => {
    //   getHotels()
    //     .then((hotels) => {
    //       setHotels(hotels);
    //     })
    //     .catch((error) => {
    //       setIsError(true);
    //       setError(error.message);
    //     })
    //     .finally(() => {
    //       setIsLoading(false);
    //     });
    // }, []);

    const searchValue = useSelector((state) => state.search.value);

    // const { data: hotels, isLoading, isError } = useGetHotelsQuery();

    const {
      data: hotels,
      isLoading,
      isError,
      error,
    } = useGetHotelBySearchQuery({ query: searchValue });

    // const userSlice = useSelector((state) => state.user);
    // const dispatch = useDispatch();

    const locations = LOCATION;

    const property = PROPERTY;

    const [selectedProperty, setSelectedProperty] = useState("ALL");
    const handleSelectedProperty = (property) => {
      setSelectedProperty(property);
    };

    const [selectedLocation, setSelectedLocation] = useState("ALL");

    const handleSelectedLocation = (location) => {
      setSelectedLocation(location);
    };

    // const filteredHotels =
    //   selectedLocation === "ALL"
    //     ? hotels
    //     : hotels.filter(({ hotel }) => {
    //         return hotel.location
    //           .toLowerCase()
    //           .includes(selectedLocation.toLowerCase());
    //       });

    //Filtering hotels based on selected location
    const filteredHotels = hotels
      ? hotels.filter(({ hotel }) => {
          const matchesLocation =
            selectedLocation === "ALL" ||
            hotel.location
              .toLowerCase()
              .includes(selectedLocation.toLowerCase());

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
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:flex justify-center gap-6 mb-12 ">
          {property.map((property, Index) => (
            <PropertyTab
              key={Index + 10}
              property={property}
              name={property.propertyType}
              handleSelectedProperty={handleSelectedProperty}
              selectedProperty={selectedProperty}
              scrollToHotelList={scrollToHotelList}
            />
          ))}
        </div>
        <h1 className="text-[32px] font-bold mb-[8px] " ref={ref}>
          Top Trending Hotels Worldwide
        </h1>

        <p className="text-gray-700 mb-5">
          Discover the most trending hotels for an unforgettable experience
        </p>
        {/* <div>Hello,{userSlice.user.name} </div>
      <Button
        onClick={() => {
          dispatch(setUser({ name: "Deshapriya" }));
        }}
      >
        Click Me
      </Button> */}
        <div className="flex gap-2 items-centers mb-4">
          {locations.map((location, Index) => (
            <LocationTab
              key={Index}
              name={location}
              handleSelectedLocation={handleSelectedLocation}
              selectedLocation={selectedLocation}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 ">
          {filteredHotels.length > 0 ? (
            filteredHotels.length > 12 ? (
              filteredHotels
                .splice(0, 12)
                .map(({ hotel, confidence }) => (
                  <HotelCard
                    key={hotel._id}
                    hotel={hotel}
                    confidence={confidence}
                  />
                ))
            ) : (
              filteredHotels.map(({ hotel, confidence }) => (
                <HotelCard
                  key={hotel._id}
                  hotel={hotel}
                  confidence={confidence}
                />
              ))
            )
          ) : (
            <div className="text-black-100 mt-10 flex items-center ">
              <span>
                <ClockFading className="w-4 h-4 mr-2" />
              </span>
              <span>No {selectedProperty}s Found</span>
            </div>
          )}
        </div>
        <div className="w-full  mt-10 p-4 flex justify-center">
          <Button variant="outline" asChild className="rounded-full">
            <Link to="/all-hotels">View All Hotels</Link>
          </Button>
        </div>
        <Showcase
          scrollToSearch={scrollToSearch}
          numberOfHotels={numberOfHotels}
          isNumberOfHotelsLoading={isNumberOfHotelsLoading}
          isNumberOfHotelsError={isNumberOfHotelsError}
        />
        <LandingReviews />
      </div>
    );
  }
);

export { HotelListing };
