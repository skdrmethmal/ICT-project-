import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetHotelByIdQuery } from "@/lib/api";
import {
  Coffee,
  MapPin,
  MenuIcon as Restaurant,
  Star,
  Tv,
  Wifi,
} from "lucide-react";
import { useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateBookingMutation } from "@/lib/api";
import BookingModel from "@/components/ui/BookingModel";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";

const HotelPage = () => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { id } = useParams();
  const { data: hotel, isLoading, isError, error } = useGetHotelByIdQuery(id);

  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();

  const handleModelOpen = () => {
    setIsModelOpen(true);
    console.log("modelOppening");
  };

  const handleModelClose = () => {
    setIsModelOpen(false);
    console.log("modelClose");
  };

  //submitting booking
  const handleBooking = async (data) => {
    const { checkIn, checkOut, totalPrice, nights, hotelName } = data;
    try {
      await createBooking({
        hotelId: id,
        checkIn: checkIn,
        checkOut: checkOut,
        totalPrice: totalPrice,
        nights: nights,
        hotelName: hotelName,
      }).unwrap();
      toast.success("Booking has been made successfully");
    } catch (error) {
      toast.error("Booking failed");
    }
  };

  if (isLoading || !isUserLoaded) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="w-full h-[400px] rounded-lg" />
            <div className="flex space-x-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-28" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <Skeleton className="h-4 w-36" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Card>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-center">
                      <Skeleton className="h-5 w-5 mr-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-8 w-24 mb-1" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <main>
        <div className="container mx-auto px-4 py-8 min-h-screen">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative w-full h-[400px]">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="absolute object-cover rounded-lg"
                />
              </div>
              <div className="flex space-x-2">
                <Badge variant="secondary">Rooftop View</Badge>
                <Badge variant="secondary">French Cuisine</Badge>
                <Badge variant="secondary">City Center</Badge>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">{hotel.name}</h1>
                  <div className="flex items-center mt-2">
                    <MapPin className="h-5 w-5 text-muted-foreground mr-1" />
                    <p className="text-muted-foreground">{hotel.location}</p>
                  </div>
                </div>
                <Button variant="outline" size="icon">
                  <Star className="h-4 w-4" />
                  <span className="sr-only">Add to favorites</span>
                </Button>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="font-bold">
                  {hotel?.rating ?? "No rating"}
                </span>
                <span className="text-muted-foreground">
                  ({hotel?.reviews?.toLocaleString() ?? "No"} reviews)
                </span>
              </div>
              <p className="text-muted-foreground">{hotel.description}</p>
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Wifi className="h-5 w-5 mr-2" />
                      <span>Free Wi-Fi</span>
                    </div>
                    <div className="flex items-center">
                      <Restaurant className="h-5 w-5 mr-2" />
                      <span>Restaurant</span>
                    </div>
                    <div className="flex items-center">
                      <Tv className="h-5 w-5 mr-2" />
                      <span>Flat-screen TV</span>
                    </div>
                    <div className="flex items-center">
                      <Coffee className="h-5 w-5 mr-2" />
                      <span>Coffee maker</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">${hotel.price}</p>
                  <p className="text-sm text-muted-foreground">per night</p>
                </div>
                <Button size="lg" onClick={handleModelOpen}>
                  Book Now
                </Button>
                <BookingModel
                  isOpen={isModelOpen}
                  onClose={handleModelClose}
                  hotel={hotel}
                  user={user}
                  onSubmitBooking={handleBooking}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HotelPage;
