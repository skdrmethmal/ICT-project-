import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
const AccountPage = () => {
  const { user } = useUser();

  return (
    <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <div className="bg-popover rounded-lg p-6 hover:shadow-lg transition-shadow ">
            <h3 className="text-xl font-medium text-popover-foreground">
              Luxury Resort & Spa
            </h3>
            <div className="space-y-2 mt-4 text-muted-foreground">
              <p className="flex justify-between">
                <span>Check-in:</span>
                <span>15/03/2024</span>
              </p>
              <p className="flex justify-between">
                <span>Check-out:</span>
                <span>20/03/2024</span>
              </p>
              <p className="flex justify-between">
                <span>Guests:</span>
                <span>2</span>
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Confirmed
                </span>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </div>
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
