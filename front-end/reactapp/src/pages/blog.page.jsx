import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogPage() {
  return (
    <div className="max-w-2xl mx-auto py-20 px-4 text-center">
      <Card className="bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-zinc-800">
            HotelzaAI Blog
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-zinc-600">
          <p>Our blog isn’t live yet — but it’s on the roadmap!</p>
          <p>
            Soon you’ll find stories about travel tech, smart hotel strategies,
            AI insights, and how we’re building HotelzaAI.
          </p>
          <p className="text-sm text-zinc-500">Stay tuned for updates.</p>
        </CardContent>
      </Card>
    </div>
  );
}
