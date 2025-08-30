import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { useCreateHelpMutation } from "@/lib/api";
import { toast } from "sonner";

const helpFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  subject: z.string().min(3, "Topic is required."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export default function HelpCenterPage() {
  const [createHelp, { isLoading }] = useCreateHelpMutation();
  const form = useForm({
    resolver: zodResolver(helpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    const { name, email, subject, message } = data;
    try {
      await createHelp({ name, email, subject, message }).unwrap();
      toast.success("Help request submitted we will get back to you shortly");
      form.reset();
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-12">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-900 mb-4">Help Center</h1>
        <p className="text-zinc-600 max-w-2xl mx-auto">
          Need assistance with HotelzaAI? Start by exploring the most common
          questions below.
        </p>
      </div>

      {/* Instructional Guide */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-zinc-800">
            How to Use HotelzaAI
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-zinc-700 leading-relaxed">
          <div>
            <h2 className="font-semibold text-zinc-900 mb-1">
              🔍 How to Search for Hotels
            </h2>
            <p>
              On the homepage, just type the experience you want in the AI
              search bar. For example: “cozy beach hotel with fast Wi-Fi.” Our
              system will show you smart results right on the same page.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-zinc-900 mb-1">
              🛏️ How to Place a Booking
            </h2>
            <p>
              Click on a hotel to view its details, then press “Book Now.”
              You’ll be taken to a secure payment page powered by Stripe. After
              successful payment, you’ll receive a confirmation message and
              email.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-zinc-900 mb-1">
              ⭐ How to Leave a Review or Rating
            </h2>
            <p>
              Once you’ve completed a booking, visit the hotel page again or
              your account dashboard. You’ll see an option to leave one review
              per stay.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-zinc-900 mb-1">
              👤 Using Your Account Dashboard
            </h2>
            <p>
              Your dashboard shows your active and past bookings, reviews you’ve
              left, and important reminders. You’ll also get email alerts when
              your check-in date is close.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-zinc-900 mb-1">
              🏨 Want to List Your Hotel?
            </h2>
            <p>
              You can request adding your hotel to HotelzaAI by filling out the
              form below or contacting us via the{" "}
              <Link to="/contact" className="text-blue-600 underline">
                Contact Us
              </Link>{" "}
              page Once verified, your hotel will appear like any other in the
              platform.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Help Request Form */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-zinc-800">
            Still need help?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Help Topic</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Trouble with booking, review error..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="Describe the issue you're facing..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit Request
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Contact Us CTA */}
      <div className="text-center">
        <p className="text-zinc-700 mb-4">Can't find your answer here?</p>
        <Button asChild variant="outline">
          <Link to="/contact">Go to Contact Page</Link>
        </Button>
      </div>
    </div>
  );
}
