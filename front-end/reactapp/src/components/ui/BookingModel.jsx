import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { MessageSquareWarning } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { z } from "zod";
import { data } from "react-router";

//zod schema validation
const bookingSchema = z
  .object({
    hotelId: z.string(),
    userId: z.string(),
    userFullName: z.string(),
    email: z.string().email(),
    hotelName: z.string(),
    checkIn: z.string(),
    checkOut: z.string(),
    totalPrice: z.number(),
    nights: z.number(),
  })
  .refine((data) => new Date(data.checkIn) < new Date(data.checkOut), {
    message: "Check-in date should be less than check-out date",
    path: ["checkOut"],
  })
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(data.checkIn) >= today;
    },
    {
      message: "Check-in date should be today or in the future.",
      path: ["checkIn"],
    }
  );

export default function BookingModel({
  isOpen,
  onClose,
  hotel,
  user,
  onSubmitBooking,
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const userFullName = user?.fullName;
  const email = user?.emailAddresses?.[0]?.emailAddress;
  // form.setValue("userFullName", userFullName);
  // form.setValue("email", email);
  // console.log(user?.emailAddresses[0].emailAddress);

  const form = useForm({
    resolver: zodResolver(bookingSchema),
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      hotelId: hotel._id,
      hotelName: hotel.name,
      userId: user?.id,
      userFullName: userFullName,
      email: email,
      totalPrice: totalPrice,
      nights: 0,
      checkIn: "",
      checkOut: "",
    },
  });

  form.setValue("userFullName", userFullName);
  form.setValue("email", email);

  const watchCheckIn = form.watch("checkIn");
  const watchCheckOut = form.watch("checkOut");

  useEffect(() => {
    if (watchCheckIn && watchCheckOut) {
      const checkInDate = new Date(watchCheckIn);
      const checkOutDate = new Date(watchCheckOut);
      const diffDats = checkOutDate - checkInDate;
      const diffDays = Math.ceil(diffDats / (1000 * 60 * 60 * 24));
      form.setValue("nights", diffDays);

      if (checkInDate < checkOutDate) {
        setTotalPrice(hotel.price * diffDays);
        form.setValue("totalPrice", hotel.price * diffDays);
      } else {
        setTotalPrice(0);
        form.setValue("totalPrice", 0);
      }
    }
  }, [watchCheckIn, watchCheckOut, hotel.price]);

  const handleFormSubmit = (data) => {
    const completeData = {
      ...data,
      hotelImage: hotel.image,
    };
    // console.log(data);
    onSubmitBooking(completeData);

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl w-full bg-white rounded-2xl shadow-xl">
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl font-semibold text-zinc-800">
            Booking Details
          </DialogTitle>
          <DialogDescription className="text-sm text-zinc-500">
            Not showing your name and email address? Then you need to log in
            first.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            {/* Hotel & User Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hotelName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Name</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        {...field}
                        tabIndex={-1}
                        className="bg-gray-100"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userFullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        {...field}
                        tabIndex={-1}
                        className="bg-gray-100"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Email</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      {...field}
                      tabIndex={-1}
                      className="bg-gray-100"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="checkIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check In</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="bg-gray-100" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="checkOut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check Out</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="bg-gray-100" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Total Price */}
            {totalPrice > 0 && (
              <div className="text-right text-lg font-semibold text-zinc-700">
                Total: ${totalPrice}
              </div>
            )}

            {/* Submit */}
            <DialogFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={!form.formState.isValid}
              >
                Book
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
