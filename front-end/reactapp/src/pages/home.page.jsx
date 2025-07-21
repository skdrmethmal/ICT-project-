import React from "react";
import { Hero } from "@/components/ui/Hero";
import { HotelListing } from "@/components/ui/HotelListing";
import { useRef } from "react";
import { useGetAppStatisticsQuery } from "@/lib/api";
import WelcomeDialog from "@/components/ui/WelcomeDialog";

function HomePage() {
  const { data, isLoading, isError } = useGetAppStatisticsQuery();
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
        <WelcomeDialog />
        <Hero
          ref={searchRef}
          statistics={data}
          isStatisticsError={isError}
          isStatisticsLoading={isLoading}
          scrollToHotelList={scrollToHotelList}
        />
        <HotelListing
          isNumberOfHotelsError={isError}
          isNumberOfHotelsLoading={isLoading}
          numberOfHotels={data?.hotelsCount}
          scrollToSearch={scrollToSearch}
          scrollToHotelList={scrollToHotelList}
          ref={hotelListRef}
        />
      </main>
    </>
  );
}

export default HomePage;
