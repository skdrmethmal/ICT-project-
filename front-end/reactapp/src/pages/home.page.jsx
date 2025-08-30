import React from "react";
import { Hero } from "@/components/ui/Hero";
import { HotelListing } from "@/components/ui/HotelListing";
import { useRef } from "react";

function HomePage() {
  const searchRef = useRef(null);
  const hotelListRef = useRef(null);

  const scrollToSearch = () => {
    searchRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToHotelList = () => {
    hotelListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        <Hero ref={searchRef} scrollToHotelList={scrollToHotelList} />
        <HotelListing
          scrollToSearch={scrollToSearch}
          scrollToHotelList={scrollToHotelList}
          ref={hotelListRef}
        />
      </main>
    </>
  );
}

export default HomePage;
