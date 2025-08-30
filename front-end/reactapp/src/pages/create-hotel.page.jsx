import { CreateHotel } from "@/components/ui/CreateHotel";
import { HelpAUser } from "@/components/ui/HelpAUser";
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
      <CreateHotel />
      <HelpAUser />
    </>
  );
};

export default CreateHotelPage;
