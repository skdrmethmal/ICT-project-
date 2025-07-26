import React from "react";
import { Hero } from "@/components/ui/Hero";
import { HotelListing } from "@/components/ui/HotelListing";
function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <HotelListing />
      </main>
    </>
  );
}

export default HomePage;
