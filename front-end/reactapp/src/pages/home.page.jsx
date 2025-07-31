import React from "react";
import { Hero } from "@/components/ui/Hero";
import { HotelListing } from "@/components/ui/HotelListing";
import { useRef } from "react";

function HomePage() {
  const searchRef = useRef(null);
  const scrollToSearch = () => {
    searchRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        <Hero ref={searchRef} />
        <HotelListing scrollToSearch={scrollToSearch} />
      </main>
    </>
  );
}

export default HomePage;
