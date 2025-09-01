import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateHotelMutation } from "@/lib/api";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(3),
  hotelEmail: z.string().email(),
  location: z.string().min(3),
  image: z.string().min(3),
  price: z.number(),
  description: z.string().min(3),
  propertyType: z.string().min(2),
});

const CreateHotel = () => {
  const [createHotel, { isLoading }] = useCreateHotelMutation();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      hotelEmail: "",
      location: "",
      image: "",
      price: "",
      description: "",
      propertyType: "",
    },
  });

  const handleSubmit = async (data) => {
    // console.log(data);
    const {
      name,
      location,
      image,
      price,
      description,
      propertyType,
      hotelEmail,
    } = data;
    try {
      await createHotel({
        name: name,
        hotelEmail: hotelEmail,
        location: location,
        image: image,
        price: price,
        description: description,
        propertyType: propertyType,
      }).unwrap();
      toast.success("Hotel created successfully");
      form.reset();
    } catch (error) {
      toast.error("Hotel creation failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center md:mt-20 mt-10 ">
      <div className="mt-4 ml-4 w-5/6 md:w-1/2 bg-white rounded-lg p-10 border-1 border-gray-100 shadow-md">
        <h1 className=" text-2xl font-bold mb-1 ">Create Hotel</h1>
        <p className="text-sm text-gray-500 mb-10">
          Create a new hotel to make it available for booking.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hotel Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Hotel Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="hotelEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hotel Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Hotel Email - When a guest booked your hotel to imform that we use this email address to contact you"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hotel Location</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Hotel Location" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hotel Image </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Hotel Image URL" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="which property type is ur hotel/cabin/hostel/villa/apartment"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Price"
                          onChange={(e) => {
                            field.onChange(parseFloat(e.target.value));
                          }}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hotel Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Hotel Description should be in details because the description is what we use to suggest your hotel to guests based on their experience"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  form.reset();
                }}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export { CreateHotel };
