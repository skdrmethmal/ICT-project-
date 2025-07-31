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
  });

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="flex gap-4 items-center  justify-between">
              {/* Hotel name field */}
              <FormField
                control={form.control}
                name="hotelName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Name :</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        {...field}
                        tabIndex={-1}
                        className="bg-gray-100 w-full "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* User name field */}
              <FormField
                control={form.control}
                name="userFullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name :</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        {...field}
                        tabIndex={-1}
                        className="bg-gray-100 w-1/2 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* User email field */}
            <div className="py-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Email :</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        {...field}
                        tabIndex={-1}
                        className="bg-gray-100 w-1/2 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <hr />
            {/* check in and out date field */}
            <div className="flex py-4 gap-4 items-center  justify-between">
              <FormField
                control={form.control}
                name="checkIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check In :</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="bg-gray-100 w-full "
                      />
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
                    <FormLabel>Check Out :</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        className="bg-gray-100  w-full "
                      />
                    </FormControl>
                    <FormMessage className="w-fill " />
                  </FormItem>
                )}
              />
            </div>
            {/* total price */}
            {totalPrice > 0 ? (
              <div className="flex justify-end mt-4">
                <p className=" text-xl font-bold">Total: ${totalPrice}</p>
              </div>
            ) : null}

            <DialogFooter>
              <Button
                type="submit"
                className="w-full mt-4"
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
