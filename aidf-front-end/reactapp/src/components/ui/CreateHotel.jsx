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
  location: z.string().min(3),
  image: z.string().min(3),
  price: z.number(),
  description: z.string().min(3),
});

const CreateHotel = () => {
  const [createHotel, { isLoading }] = useCreateHotelMutation();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      location: "",
      image: "",
      price: "",
      description: "",
    },
  });

  const handleSubmit = async (data) => {
    // console.log(data);
    const { name, location, image, price, description } = data;
    try {
      await createHotel({
        name: name,
        location: location,
        image: image,
        price: price,
        description: description,
      }).unwrap();
      toast.success("Hotel created successfully");
    } catch (error) {
      toast.error("Hotel creation failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center md:mt-20 mt-10 ">
      <div className="mt-4 ml-4 w-5/6 md:w-1/2 bg-white rounded-lg p-10 border-1 border-gray-100 shadow-md">
        <h1 className=" text-2xl font-bold mb-10 ">Create Hotel</h1>
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
                        <Textarea {...field} placeholder="Hotel Description" />
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
