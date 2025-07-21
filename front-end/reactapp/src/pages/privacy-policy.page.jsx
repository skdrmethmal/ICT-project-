import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-zinc-900 mb-6">
        Privacy Policy
      </h1>
      <p className="text-zinc-600 text-center mb-10">
        Your privacy is important to us. This policy explains how HotelzaAI
        collects, uses, and protects your data.
      </p>

      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-zinc-800">Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-zinc-700 leading-relaxed">
          <section>
            <h2 className="font-semibold text-zinc-900 mb-2">
              1. What We Collect
            </h2>
            <p>
              We collect personal information such as your name, email, booking
              details, payment data, and reviews when you use our platform.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-zinc-900 mb-2">
              2. How We Use Your Information
            </h2>
            <p>
              Your data is used to provide services such as AI-powered hotel
              suggestions, secure payment processing, booking management, and
              email notifications (e.g. check-in reminders).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-zinc-900 mb-2">
              3. Data Sharing
            </h2>
            <p>
              We do not sell your data. We may share data with third-party
              services (e.g. Stripe for payments, Clerk for authentication) only
              as required to operate the platform securely.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-zinc-900 mb-2">4. Your Rights</h2>
            <p>
              You can request access, updates, or deletion of your data by
              contacting our support. You can also manage your data through your
              account dashboard.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-zinc-900 mb-2">
              5. Cookies & Tracking
            </h2>
            <p>
              We use cookies to enhance your experience and analyze app usage.
              You can modify your browser settings to control cookie behavior.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-zinc-900 mb-2">6. Security</h2>
            <p>
              HotelzaAI implements strong security measures to protect your
              information — including encryption, secure APIs, and limited
              access control.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-zinc-900 mb-2">7. Contact</h2>
            <p>
              For any questions or concerns about privacy, please email us at{" "}
              <span className="font-medium text-black">
                privacy@hotelzaai.com
              </span>
              .
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
