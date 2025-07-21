import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function CareersPage() {
  return (
    <div className="max-w-2xl mx-auto py-20 mb-12 px-4">
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-zinc-800">
            Careers at HotelzaAI
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-zinc-600">
          <p>Our Careers section is not configured yet.</p>
          <p>
            We’re focused on building the future of hotel booking with AI — and
            we’ll be opening up roles soon.
          </p>
          <p className="text-sm text-zinc-500">
            In the meantime, feel free to contact us if you’re interested in
            collaborating.
          </p>
          <Button asChild variant="outline" className="mt-2">
            <Link to="/contact">Go to Contact Us</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
