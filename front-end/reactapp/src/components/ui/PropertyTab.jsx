import React from "react";
import capitalize from "capitalize";

export const PropertyTab = ({
  property,
  name,
  handleSelectedProperty,
  selectedProperty,
  scrollToHotelList,
}) => {
  const handleClick = () => {
    handleSelectedProperty(property.propertyType);
    if (typeof scrollToHotelList === "function") {
      scrollToHotelList();
    }
  };
  if (selectedProperty === property.propertyType) {
    return (
      <>
        <div
          className=" relative rounded-lg mx-auto  md:w-[210px] md:h-[210px] shadow-md overflow-hidden cursor-pointer "
          onClick={handleClick}
        >
          <img
            src={property.image}
            alt={property.propertyType}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/0 flex items-center justify-center p-8 text-white text-center">
            <h2 className="text-2xl font-bold max-w-md leading-snug">
              {property.propertyType.toUpperCase()}
            </h2>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div
        className=" relative rounded-lg mx-auto md:w-[200px] md:h-[200px] shadow-md overflow-hidden cursor-pointer "
        onClick={handleClick}
      >
        <img
          src={property.image}
          alt={property.propertyType}
          className="w-full h-full object-cover rounded-lg "
        />
        <div className="absolute inset-0 bg-black/40 flex items-center hover:bg-black/0 justify-center p-8 text-white text-center">
          <h2 className="text-2xl font-bold max-w-md leading-snug">
            {property.propertyType.toUpperCase()}
          </h2>
        </div>
      </div>
    </>
  );
};
