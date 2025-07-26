import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useGetBookingsByUserQuery } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingCard } from "@/components/BookingCard";

const AccountPage = () => {
  const { user } = useUser();
  const {
    data: bookings,
    isLoading,
    isError,
    error,
  } = useGetBookingsByUserQuery({ userId: user?.id });
  console.log("Bookings: ", bookings);

  if (isLoading) {
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
  if (isError) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  console.log(bookings);
  return (
    // main div
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-card rounded-lg shadow-lg p-8 mb-8">
        {/* user profile */}
        <div className="flex items-center gap-8 ">
          <img
            src={user.imageUrl}
            alt={user.fullName}
            className="w-24 h-24 rounded-full object-cover border-4 border-primary"
          />
          <div>
            <h1 className="text-3xl font-bold text-card-foreground">
              {user.fullName}
            </h1>
            <p className="text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        {/* edit profile, change password, sign out, delete account */}
        <div className="grid grid-cols-2 gap-4 mt-8 ">
          <Button variant="outline" className="w-full">
            Edit Profile
          </Button>
          <Button variant="outline" className="w-full">
            Change Password
          </Button>
          <Button variant="destructive" className="w-full">
            Sign Out
          </Button>
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
        </div>
      </div>
      {/* bookings */}
      <div className="bg-card rounded-lg shadow-lg p-8 mb-8 ">
        <h2 className="text-2xl font-semibold text-card-foreground mb-6">
          My Bookings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {/* booking card */}
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))
          ) : (
            <div className="text-black-100">No bookings found</div>
          )}
        </div>
      </div>
      {/* reviews */}
      <div className="bg-card rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-card-foreground mb-6">
          My Reviews
        </h2>
        {/* reviews cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-popover rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-medium text-popover-foreground">
              Grand Hotel
            </h3>
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-400">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span className="text-gray-300">★</span>
              </div>
              <span className="ml-2 text-muted-foreground">4.0</span>
            </div>

            <p className="mt-4 text-popover-foreground">
              "Great stay, wonderful service and amazing amenities. Would
              definitely recommend!"
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Posted on: 10/03/2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
