import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export function Showcase({
  scrollToSearch,
  numberOfHotels,
  isNumberOfHotelsLoading,
  isNumberOfHotelsError,
}) {
  const selectedRating = 3;

  const handleStarClick = (value) => {
    setSelectedRating(value);
  };

  if (isNumberOfHotelsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isNumberOfHotelsError) {
    <section className="container mx-auto px-4 py-12  my-12">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="">
          {/* Top left block */}
          <div className="relative h-[300px] rounded-2xl overflow-hidden">
            <LazyLoadImage
              src="/assets/showcase_11.webp"
              alt="Outdoor view"
              className="w-full h-full object-cover "
              effect="blur"
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
            <LazyLoadImage
              src="/assets/showcase_22.webp"
              alt="Hotel exterior"
              className="w-full h-full object-cover"
              effect="blur"
            />
            <div className="absolute inset-0  bg-black/40 p-6 text-white flex flex-col justify-end">
              <p className="text-sm">Find your Perfect</p>
              <h3 className="text-3xl font-bold"> Staycation </h3>
            </div>
          </div>
        </div>

        {/* Right block */}
        <div className="relative h-[300px] lg:h-full  rounded-2xl overflow-hidden col-span-full lg:col-span-1">
          <LazyLoadImage
            src="/assets/showcase_33.webp"
            alt="Hotel room"
            className="w-full h-full object-cover"
            effect="blur"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-8 text-white text-center">
            <h2 className="text-2xl font-bold max-w-md leading-snug">
              Beyond accommodation, <br />
              creating memories of a lifetime
            </h2>
          </div>
        </div>
      </div>
    </section>;
  }

  return (
    <section className="container mx-auto px-4 pt-12  my-12">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="">
          {/* Top left block */}
          <div className="relative h-[300px] rounded-2xl overflow-hidden">
            <LazyLoadImage
              src="/assets/showcase_11.webp"
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
            <LazyLoadImage
              src="/assets/showcase_22.webp"
              alt="Hotel exterior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0  bg-black/40 p-6 text-white flex flex-col justify-end">
              <p className="text-sm">Hotels Available</p>
              <h3 className="text-3xl font-bold"> {numberOfHotels} </h3>
            </div>
          </div>
        </div>

        {/* Right block */}
        <div className="relative h-[300px] lg:h-full  rounded-2xl overflow-hidden col-span-full lg:col-span-1">
          <LazyLoadImage
            src="/assets/showcase_33.webp"
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
    </section>
  );
}
