import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../lib/features/searchSlice";
import { Input } from "./input";
import { Button } from "./button";
import { Sparkles } from "lucide-react";
import HeroImage from "@/assets/hero_1.jpg";
import { forwardRef } from "react";

export const Hero = forwardRef((props, ref) => {
  const [destination, setDestination] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    dispatch(setSearchValue(searchValue));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8 items-center" ref={ref}>
        {/* Left Section - Text + Form */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Find Your Perfect <br />
            <span className="text-black">Luxury Staycation</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Discover handpicked luxury accommodations for unforgettable
            experiences, all in one place.
          </p>

          {/* Search Form with same logic */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white shadow-md rounded-full overflow-hidden w-full max-w-xl h-14 border border-gray-200"
          >
            <Input
              name="search"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Describe the experience you are looking for"
              className="flex-grow px-4 py-3 border-none ring-0 focus-visible:ring-0 focus:outline-none h-full"
            />
            <Button
              type="submit"
              variant="default"
              className="rounded-full px-6 h-12 flex mr-1 items-center gap-2 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              <Sparkles className="animate-pulse text-sky-400" />
              AI Search
            </Button>
          </form>
          {/* Statistics */}
          <div className="flex items-center space-x-6 pt-4">
            <div>
              <p className="text-2xl font-bold">500+</p>
              <p className="text-gray-500">Luxury Hotels</p>
            </div>
            <div>
              <p className="text-2xl font-bold">100k+</p>
              <p className="text-gray-500">Happy Guests</p>
            </div>
            <div>
              <p className="text-2xl font-bold">4.9</p>
              <p className="text-gray-500">Customer Rating</p>
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="w-full lg:w-1/2">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={HeroImage}
              alt="Luxury hotel room"
              className="w-full h-[500px] object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
});
