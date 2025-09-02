import { CreateHotel } from "@/components/ui/CreateHotel";
import { HelpAUser } from "@/components/ui/HelpAUser";
import { Link } from "react-router";
const CreateHotelPage = () => {
  // const [createHotel, { isLoading }] = useCreateHotelMutation();
  // const handleClick = async () => {
  //   try {
  //     await createHotel({
  //       name: "Sydney Harbour Hotel",
  //       location: "Sydney, Australia",
  //       rating: 4.8,
  //       image:
  //         "https://cf.bstatic.com/xdata/images/hotel/max1280x900/84555265.jpg?k=ce7c3c699dc591b8fbac1a329b5f57247cfa4d13f809c718069f948a4df78b54&o=&hp=1",
  //       price: 200,
  //       description:
  //         "Stay at Sydney Harbour Hotel and wake up to stunning harbour views in one of Australia’s most iconic destinations. Starting at $200 per night, enjoy rooftop dining, modern facilities, and close proximity to Darling Harbour and Sydney’s vibrant nightlife. Ideal for couples and city adventurers.",
  //     }).unwrap();
  //     toast.success("Hotel created successfully");
  //   } catch (error) {
  //     toast.error("Hotel ");
  //   }
  // };
  return (
    <>
      <div className="flex flex-col items-center justify-center md:mt-20 mt-10 ">
        <div className=" flex items-center justify-center w-5/6 md:w-1/2 bg-white rounded-full p-5 border-1 border-gray-100 shadow-md">
          <Link
            to="/admin-dashboard/bookings"
            className="font-medium text-gray-700 hover:text-black  transition-colors relative group"
          >
            Check Bookings
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
          </Link>
        </div>
      </div>
      <CreateHotel />
      <HelpAUser />
    </>
  );
};

export default CreateHotelPage;
