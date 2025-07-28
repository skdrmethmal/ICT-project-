import { Button } from "./components/ui/button";
import { Navbar } from "./components/ui/Navbar";
import { Hero } from "./components/ui/Hero";
import { HotelListing } from "./components/ui/HotelListing";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <HotelListing />
    </>
  );
}

export default App;
