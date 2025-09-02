import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetHotelByIdQuery } from "@/lib/api";
import { useCreateReviewMutation } from "@/lib/api";
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
import { useNavigate } from "react-router";
import { ReviewModel } from "@/components/ui/ReviewModel";
import { useGetReviewsByHotelIdQuery } from "@/lib/api";
import { ReviewCardForHotel } from "@/components/ui/ReviewCardForHotel";
import { ConfirmationModel } from "@/components/ui/ConfirmationModel";
import { useDeleteHotelByIdMutation } from "@/lib/api";

const HotelPage = () => {
  const navigate = useNavigate();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { id } = useParams();
  const {
    data: hotel,
    isLoading,
    isError,
    error,
  } = useGetHotelByIdQuery({ hotelId: id });

  // Fetch reviews for the hotel
  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isError: isReviewError,
  } = useGetReviewsByHotelIdQuery({ hotelId: id });

  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();

  const [createReview, { isLoading: isReviewLoading }] =
    useCreateReviewMutation();

  const [deleteHotelById] = useDeleteHotelByIdMutation();

  const handleModelOpen = () => {
    setIsModelOpen(true);
  };

  const handleReviewModelOpen = () => {
    setIsReviewOpen(true);
  };

  const handleReviewModelClose = () => {
    setIsReviewOpen(false);
  };

  const handleModelClose = () => {
    setIsModelOpen(false);
  };

  const handleConfirmationOpen = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
  };

  const handleDeleteHotelConfirm = async () => {
    try {
      await deleteHotelById({ id: id }).unwrap();
      toast.success("Hotel deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting hotel:", error);
      toast.error("Failed to delete hotel. Please try again.");
    }
  };

  //submitting booking
  const handleBooking = async (data) => {
    const { checkIn, checkOut, totalPrice, nights, hotelName, hotelImage } =
      data;
    try {
      const booking = await createBooking({
        hotelId: id,
        hotelImage: hotelImage,
        checkIn: checkIn,
        checkOut: checkOut,
        totalPrice: totalPrice,
        nights: nights,
        hotelName: hotelName,
      }).unwrap();
      navigate(`/booking/payment?bookingId=${booking._id}`);
      //if successfull the toast success message will not be shown because of the navigate
      // toast.success("Booking has been made successfully");
    } catch (error) {
      toast.error("Booking failed");
    }
  };

  const handleReview = async (data) => {
    const { rating, review } = data;

    try {
      const userReview = await createReview({
        rating: rating,
        review: review,
        hotelId: id,
      }).unwrap();
      toast.success("Review has been submitted successfully");
    } catch (error) {
      if (error.status === 403) {
        toast.error(error.data.message);
      } else if (error.status === 400) {
        toast.error(error.data.message);
      } else {
        toast.error("Review failed");
      }
    }
  };

  if (isLoading || !isUserLoaded || isReviewsLoading) {
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
        <div className="container mx-auto px-4 py-8 min-h-screen ">
          <div className="grid md:grid-cols-2 gap-8 ">
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
                <div>
                  {user?.publicMetadata?.role === "admin" && (
                    <>
                      <Button
                        size="lg"
                        className="mr-2"
                        variant="destructive"
                        onClick={handleConfirmationOpen}
                      >
                        Delete Hotel
                      </Button>
                      <ConfirmationModel
                        isOpen={isConfirmationOpen}
                        onClose={handleConfirmationClose}
                        onConfirm={handleDeleteHotelConfirm}
                      />
                    </>
                  )}
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleReviewModelOpen}
                  >
                    Leave a Review
                  </Button>
                  <ReviewModel
                    isOpen={isReviewOpen}
                    onClose={handleReviewModelClose}
                    onSubmitReview={handleReview}
                    isLoading={isReviewLoading}
                  />
                  <Button size="lg" className="ml-2" onClick={handleModelOpen}>
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
          <div className="bg-card rounded-lg shadow-lg p-8 mt-12">
            <h2 className="text-2xl font-semibold text-card-foreground mb-6">
              Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* reviews cards */}
              {reviews?.length > 0 ? (
                reviews.map((review) => {
                  return (
                    <ReviewCardForHotel key={review._id} review={review} />
                  );
                })
              ) : (
                <div className="text-black-100">No reviews for this hotel</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HotelPage;
