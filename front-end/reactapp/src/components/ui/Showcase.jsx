import { Link } from "react-router";
import ShowcaseImageFirst from "@/assets/showcase_1.jpg";
import ShowcaseImageSecond from "@/assets/showcase_2.jpg";
import ShowcaseImageThird from "@/assets/showcase_3.jpg";
import { Card } from "./card";
import { Star } from "lucide-react";

export function Showcase({ scrollToSearch }) {
  const selectedRating = 3;

  const handleStarClick = (value) => {
    setSelectedRating(value);
  };
  return (
    <section className="container mx-auto px-4 py-12  my-12">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="">
          {/* Top left block */}
          <div className="relative h-[300px] rounded-2xl overflow-hidden">
            <img
              src={ShowcaseImageFirst}
              alt="Outdoor view"
              className="w-full h-full object-cover "
            />
            <div className="absolute inset-0 bg-black/40  flex flex-col justify-center p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">
                Explore more to get your comfort zone
              </h2>
              <p className="text-sm mb-4">Book your perfect stay with us.</p>

              <button
                className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm"
                onClick={scrollToSearch}
              >
                Booking Now →
              </button>
            </div>
          </div>

          {/* Bottom left block */}
          <div className="relative h-[250px] mt-6 rounded-2xl overflow-hidden col-span-full lg:col-span-1">
            <img
              src={ShowcaseImageSecond}
              alt="Hotel exterior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0  bg-black/40 p-6 text-white flex flex-col justify-end">
              <p className="text-sm">Hotels Available</p>
              <h3 className="text-3xl font-bold">1,764,980</h3>
            </div>
          </div>
        </div>

        {/* Right block */}
        <div className="relative h-[300px] lg:h-full  rounded-2xl overflow-hidden col-span-full lg:col-span-1">
          <img
            src={ShowcaseImageThird}
            alt="Hotel room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-8 text-white text-center">
            <h2 className="text-2xl font-bold max-w-md leading-snug">
              Beyond accommodation, <br />
              creating memories of a lifetime
            </h2>
          </div>
        </div>
      </div>
      <div className="text-center mt-12  text-muted-foreground ">
        <Card className=" max-w-[500px] mx-auto p-6 ">
          <div className="flex items-center space-x-1 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-10 w-10 cursor-pointer ${
                  i < selectedRating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => handleStarClick(i + 1)}
              />
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            If you are happy with our service, please consider leaving us a
            review on Google.
          </p>
        </Card>
      </div>
    </section>
  );
}
