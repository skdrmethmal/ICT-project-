import { Input } from "./input";
import { Button } from "./button";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../lib/features/searchSlice";

const Hero = () => {
  const [destination, setDestination] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const searchValue = e.target.search.value;
    // console.log(searchValue);
    dispatch(setSearchValue(searchValue));
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src="/src/assets/hero_1.jpg"
        alt="heroImage"
        className="absolute inset-0 w-full h-full object-cover z-[-10]"
      />
      <div className=" relative  bg-transparent md:my-40 py-35  flex flex-col items-center justify-center text-white ">
        <div className=" sm:w-3/4 text-center  text-4xl lg:text-6xl  font-bold  mb-5">
          Find Your Best Staycation
        </div>
        <div className="  text-center text-xl w-2/3 mb-10">
          Describe your dream destination and experience, and we'll find the
          perfect place for you
        </div>
        <div className="flex  justify-center items-center w-2/3 ">
          <form
            action=""
            className="w-full max-w-3xl bg-black/10   backdrop-blur-md lg:h-13 rounded-full p-2 flex items-center"
            onSubmit={handleSubmit}
          >
            <Input
              name="search"
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
      </div>
    </div>
  );
};

export { Hero };
