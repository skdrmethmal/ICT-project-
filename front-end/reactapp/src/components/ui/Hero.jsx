import { Input } from "./input";
import { Button } from "./button";
import { Sparkles } from "lucide-react";
import { useState } from "react";

const Hero = () => {
  const [destination, setDestination] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(destination);
    setDestination("");
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Find Your Perfect
            <br />
            <span className="text-black">Luxury Staycation</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Discover handpicked luxury accommodations for unforgettable
            experiences, all in one place.
          </p>
          <div className="flex  justify-center items-center w-2/3 ">
            <form
              action=""
              className="w-full max-w-3xl bg-black/10   backdrop-blur-md lg:h-13 rounded-full p-2 flex items-center"
              onSubmit={handleSubmit}
            >
              <Input
                style={{ outline: "none", boxShadow: "none" }}
                className="  border-none w-[80%] bg-transparent text-white ring-0 "
                placeholder="Where are you going?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <Button
                variant="secondary"
                className="min-w-[20%] rounded-full text-white"
              >
                <Sparkles className="animate-pulse text-sky-400" />
                AI Search
              </Button>
            </form>
          </div>
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
        <div className="w-full lg:w-1/2">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1000"
              alt="Luxury hotel room"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Hero };
