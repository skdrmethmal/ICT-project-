import { MapPin, Star } from "lucide-react";
import { Link } from "react-router";

const HotelCard = (props) => {
  return (
    <Link to={`/hotel/${props.hotel._id}`}>
      <div className="bg-popover rounded-lg  hover:shadow-lg transition-shadow ">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl rounded-b-none block group relative">
          <img
            src={props.hotel.image}
            alt={props.hotel.name}
            className="w-full h-full object-cover absolute transition-transform group-hover:scale-105"
          />
        </div>
        <div className="p-4  ">
          <div className="pb-4 space-2 ">
            <div className="mt-4">
              <h1 className="text-lg font-semibold">{props.hotel.name}</h1>
            </div>
            <div className="mt-2 flex items-center text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1 " />
              {props.hotel.location}
            </div>
            <div className="flex gap-x-1  mt-2 items-center">
              <Star className="w-4 hgap-x-1 -4  fill-primary" />
              <p className="font-semibold ">
                {props.hotel?.rating ?? "No Rating"}
              </p>
              <p className="text-muted-foreground">
                ({props.hotel.reviews?.toLocaleString() ?? "No"} Reviews)
              </p>
            </div>
            <p className="font-bold mt-2 text-xl">${props.hotel.price}</p>
          </div>
          <div className="flex justify-start">
            {props.confidence ? (
              <p className="text-muted-foreground pl-2 pr-2 bg-blue-200 rounded-xl">
                Simlarity: {props.confidence * 100}%
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
};
export { HotelCard };
