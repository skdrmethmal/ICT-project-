import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-background text-foreground px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-primary">HotelzaAI</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            HotelzaAI is your smart companion for finding and booking luxury
            stays effortlessly. With intelligent suggestions, secure payments,
            and seamless account management — we make hotel booking feel
            magical.
          </p>
        </div>

        {/* Mission + Tech */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              We built HotelzaAI to take the stress out of travel planning. With
              our AI-enhanced search, curated hotel listings, and real-time
              availability, we ensure your perfect stay is just a few clicks
              away — wherever you are.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">Tech Stack</h2>
            <p className="text-muted-foreground leading-relaxed">
              HotelzaAI is built using the modern MERN stack. We use{" "}
              <strong>React</strong> with <strong>Tailwind CSS</strong> and{" "}
              <strong>ShadCN UI</strong> for a responsive, minimalist frontend,
              and <strong>Node.js</strong>, <strong>Express</strong>, and{" "}
              <strong>MongoDB</strong> for a secure backend. Clerk handles
              authentication, and Stripe enables seamless payments.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-card rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Smart Booking</h3>
            <p className="text-muted-foreground text-sm">
              Our AI suggestions recommend hotels based on preferences and
              trends, streamlining the decision-making process.
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
            <p className="text-muted-foreground text-sm">
              Integrated with Stripe to ensure end-to-end encrypted, reliable,
              and fast payment processing.
            </p>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Personal Dashboard</h3>
            <p className="text-muted-foreground text-sm">
              Users can manage bookings, view reviews, and track payment status
              via their secure dashboard.
            </p>
          </div>
          <div className="bg-card bg-zinc-900 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-white mb-2">
              Hotelzi AI Support
            </h3>
            <p className="text-muted-foreground text-sm">
              Hotelzi AI, our advanced chatbot, is available 24/7 to provide
              instant assistance with your bookings, answer questions, and
              streamline your planning process.
            </p>
          </div>
          <div className="bg-card bg-zinc-900 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-white mb-2">
              Email Reminders
            </h3>
            <p className="text-muted-foreground text-sm">
              Enhance your travel experience with our proactive email reminders.
              We'll notify you the day before your check-in, ensuring you're
              well-prepared and informed.
            </p>
          </div>
          <div className="bg-card rounded-xl bg-zinc-900 p-6 shadow-md">
            <h3 className="text-xl font-semibold text-white mb-2">
              Rate Your Experience
            </h3>
            <p className="text-muted-foreground text-sm">
              We value your feedback! Rate your experience with us to share your
              insights, help future travelers make informed decisions, and
              contribute to our commitment to excellent service.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to simplify your next stay?
          </h2>
          <Button asChild className="text-base px-6 py-3">
            <Link to="/hotels">Explore Hotels</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
