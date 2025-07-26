import { HotelCard } from "./HotelCard";
import { LocationTab } from "./LocationTab";
import { useState, useEffect } from "react";
import { Button } from "./button.jsx";
import { getHotels } from "@/lib/api/hotels.jsx";
import { useSelector } from "react-redux";
import { setUser } from "@/lib/features/userSlice";
import { useDispatch } from "react-redux";
import { useGetHotelsQuery, useGetHotelBySearchQuery } from "@/lib/api";

const HotelListing = () => {
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
  } = useGetHotelBySearchQuery({ query: searchValue });

  // const userSlice = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  const locations = ["ALL", "France", "Australia", "Japan", "Italy"];

  const [selectedLocation, setSelectedLocation] = useState("ALL");

  const handleSelectedLocation = (location) => {
    setSelectedLocation(location);
  };

  //Filtering hotels based on selected location
  const filteredHotels =
    selectedLocation === "ALL"
      ? hotels
      : hotels.filter(({ hotel }) => {
          return hotel.location
            .toLowerCase()
            .includes(selectedLocation.toLowerCase());
        });

  if (isLoading) {
    return (
      <div className=" w-[90vw] sm:w-[95vw] max-w-[1800px] mx-auto   my-5">
        <h1 className="text-[32px] font-bold mb-[8px] ">
          Top Trending Hotels Worldwide
        </h1>

        <p className="text-gray-700 mb-5">
          Discover the most trending hotels for an unforgettable experience
        </p>
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
          <div>Loading ....</div>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className=" w-[90vw] sm:w-[95vw] max-w-[1800px] mx-auto   my-5">
        <h1 className="text-[32px] font-bold mb-[8px] ">
          Top Trending Hotels Worldwide
        </h1>

        <p className="text-gray-700 mb-5">
          Discover the most trending hotels for an unforgettable experience
        </p>
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
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }
  return (
    <div className=" w-[90vw] sm:w-[95vw] max-w-[1800px] mx-auto   my-5">
      <h1 className="text-[32px] font-bold mb-[8px] ">
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
        {filteredHotels.map(({ hotel, confidence }) => (
          <HotelCard key={hotel._id} hotel={hotel} confidence={confidence} />
        ))}
      </div>
    </div>
  );
};

export { HotelListing };
