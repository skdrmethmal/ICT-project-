import { HotelCard } from "./HotelCard";
import { LocationTab } from "./LocationTab";
import { useState, useEffect } from "react";
import { Button } from "./button.jsx";
import { getHotels } from "@/lib/api/hotels.jsx";
import { useSelector } from "react-redux";
import { setUser } from "@/lib/features/userSlice";
import { useDispatch } from "react-redux";
import { useGetHotelsQuery, useGetHotelBySearchQuery } from "@/lib/api";
import { Showcase } from "./Showcase";
import { PropertyTab } from "./PropertyTab";

const HotelListing = ({ scrollToSearch }) => {
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

  const locations = ["ALL", "France", "Australia", "Japan", "Italy"];

  const property = [
    {
      propertyType: "ALL",
      image:
        "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595549020.jpeg?k=f5df2d3dc0000073bef517b0cab9593036f3f1aafa2421df31a6538a8c56b834&o=",
    },
    {
      propertyType: "hotel",
      image:
        "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o=",
    },
    {
      propertyType: "apartment",
      image:
        "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595548591.jpeg?k=01741bc3aef1a5233dd33794dda397083092c0215b153915f27ea489468e57a2&o=",
    },
    {
      propertyType: "hostel",
      image:
        "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550415.jpeg?k=8967853a074040381dfa25a568e6c780e309b529e0c144995c5bbc9644721eca&o=",
    },
    {
      propertyType: "villa",
      image:
        "https://q-xx.bstatic.com/xdata/images/hotel/263x210/620168315.jpeg?k=300d8d8059c8c5426ea81f65a30a7f93af09d377d4d8570bda1bd1f0c8f0767f&o=",
    },
    {
      propertyType: "cabin",
      image:
        "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595549239.jpeg?k=ad5273675c516cc1efc6cba2039877297b7ad2b5b3f54002c55ea6ebfb8bf949&o=",
    },
  ];

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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:flex justify-center gap-6 mb-12 ">
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
        {filteredHotels.length > 0 ? (
          filteredHotels.map(({ hotel, confidence }) => (
            <HotelCard key={hotel._id} hotel={hotel} confidence={confidence} />
          ))
        ) : (
          <div className="text-black-100 ">No Hotels Found</div>
        )}
      </div>
      <Showcase scrollToSearch={scrollToSearch} />
    </div>
  );
};

export { HotelListing };
