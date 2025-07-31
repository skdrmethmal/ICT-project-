import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useGetBookingsByUserQuery } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingCard } from "@/components/ui/BookingCard";
import { useGetReviewsForUserQuery } from "@/lib/api";
import { ReviewCardForUser } from "@/components/ReviewCardForUser";
import { useClerk } from "@clerk/clerk-react";

const AccountPage = () => {
  const { user } = useUser();
  const {
    data: bookings,
    isLoading,
    isError,
    error,
  } = useGetBookingsByUserQuery({ userId: user?.id });

  const {
    data: reviews,
    isLoading: isLoadingReviews,
    isError: isReviewError,
  } = useGetReviewsForUserQuery();

  const { signOut } = useClerk();
  const handleSignOut = () => {
    signOut(() => {
      window.location.href = "/";
    });
  };

  if (isLoading || isLoadingReviews) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* User Skeleton */}
        <div className="bg-card rounded-lg shadow-lg p-8">
          <div className="flex items-center gap-8">
            <Skeleton className="w-24 h-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Bookings Skeleton */}
        <div className="bg-card rounded-lg shadow-lg p-8">
          <Skeleton className="h-8 w-40 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Reviews Skeleton */}
        <div className="bg-card rounded-lg shadow-lg p-8">
          <Skeleton className="h-8 w-40 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (isError || isReviewError) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    // main div
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
      {/* Profile & Stats */}
      <div className=" rounded-xl shadow-xl p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Profile Info */}
          <div className="flex items-center gap-6">
            <img
              src={user.imageUrl}
              alt={user.fullName}
              className="w-24 h-24 rounded-full object-cover border-4 border-white"
            />
            <div>
              <h1 className="text-2xl font-bold text-black">{user.fullName}</h1>
              <p className="text-sm text-gray-400">
                {user.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>

          {/* Account Activity Stats */}
          <div className="col-span-1 flex justify-around text-center bg-zinc-800 rounded-lg p-4">
            <div>
              <p className="text-lg font-semibold">{bookings.length}</p>
              <p className="text-xs text-gray-400">Bookings</p>
            </div>
            <div>
              <p className="text-lg font-semibold">{reviews.length}</p>
              <p className="text-xs text-gray-400">Reviews</p>
            </div>
            <div>
              <p className="text-lg font-semibold">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              </p>
              <p className="text-xs text-gray-400">Member Since</p>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="flex justify-center md:justify-end mt-4 md:mt-0">
            <Button
              variant="default"
              className=" text-white font-semibold px-6 py-2 rounded-full hover:bg-gray-200 transition"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Bookings Section */}
      <div className=" rounded-xl shadow-xl p-8 mb-12">
        <h2 className="text-2xl text-black font-semibold mb-6">My Bookings</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))
          ) : (
            <div className="text-gray-500 col-span-full">No bookings found</div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className=" rounded-xl shadow-xl p-8">
        <h2 className="text-2xl text-black font-semibold mb-6">My Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCardForUser key={review._id} review={review} />
            ))
          ) : (
            <div className="text-gray-500 col-span-full">No reviews found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
