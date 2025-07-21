import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-zinc-900 mb-6">
        Terms of Service
      </h1>
      <p className="text-zinc-600 text-center mb-10">
        These terms govern your access to and use of HotelzaAI. By using our
        services, you agree to the following.
      </p>

      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-zinc-800">
            User Agreement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-zinc-700 leading-relaxed">
          <section>
            <h2 className="font-semibold text-zinc-900 mb-2">
              1. Account Responsibility
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account and password. You agree to accept responsibility for all
              activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-zinc-900 mb-2">
              2. Use of Services
            </h2>
            <p>
              HotelzaAI provides hotel discovery, AI-powered recommendations,
              booking, and review features. You agree to use these services
              lawfully and respectfully.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-zinc-900 mb-2">
              3. Booking and Payments
            </h2>
            <p>
              Bookings are only confirmed after successful payment. Refunds and
              cancellations are subject to the cancellation policy shown during
              booking.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-zinc-900 mb-2">4. Reviews</h2>
            <p>
              You can only submit a review after completing a booking. Reviews
              must be honest and respectful. Inappropriate content may be
              removed at our discretion.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-zinc-900 mb-2">
              5. Listing a Hotel
            </h2>
            <p>
              Hotel owners can request to list their properties. Approval is
              subject to review and compliance with our platform standards.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-zinc-900 mb-2">6. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access if you
              violate these terms or misuse the platform in any way.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-zinc-900 mb-2">
              7. Changes to Terms
            </h2>
            <p>
              HotelzaAI may update these terms at any time. Continued use of the
              platform means you accept the new terms.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-zinc-900 mb-2">8. Contact</h2>
            <p>
              Questions? Contact us at{" "}
              <span className="font-medium text-black">
                terms@hotelzaai.com
              </span>
              .
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
