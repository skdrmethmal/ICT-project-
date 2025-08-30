import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";

export default function ContactUsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-zinc-900 mb-6">
        Contact Us
      </h1>

      <p className="text-zinc-600 text-center mb-10">
        Need to reach our team? Whether you're a hotel owner, a guest, or just
        exploring, we’d love to hear from you. Use the information below or
        visit our Help Center.
      </p>

      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-zinc-800">Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-zinc-700">
          <div>
            📧{" "}
            <span className="font-medium text-black">
              methmaldeshapriya2002@gmail.com
            </span>
          </div>
          <div>🕒 Business Hours: Monday – Friday, 9:00 AM – 6:00 PM</div>
          <div>
            🏨 Want to list your hotel on HotelzaAI? Reach out to us via email
            and we'll get back to you shortly.
          </div>
        </CardContent>
      </Card>

      <div className="mt-10 text-center">
        <p className="text-zinc-700 mb-4">
          Need help with a booking or feature?
        </p>
        <Button asChild variant="outline">
          <Link to="/help">Go to Help Center</Link>
        </Button>
      </div>
    </div>
  );
}
