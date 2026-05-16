import { Map, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getPlacePhoto } from "../../services/placePhotoApi";

const HotelCard = ({ hotel }) => {
  const [hotelPhoto, setHotelPhoto] = useState("");

  useEffect(() => {
    if (!hotel?.hotelName) return;
    const loadPhoto = async () => {
      const photoUrl = await getPlacePhoto(hotel?.hotelName);
      setHotelPhoto(photoUrl);
    };
    loadPhoto();
  }, [hotel]);
  // console.log(hotel);
  return (
    hotel && (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-50 bg-gray-200 relative">
          <img
            src={hotelPhoto ? hotelPhoto : "/template.jpg"}
            alt={hotel?.hotelName}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md shadow-sm text-xs font-bold flex items-center">
            <Star className="w-3 h-3 text-yellow-400 mr-1 fill-yellow-400" />
            {hotel?.rating}
          </div>
        </div>
        <div className="p-5">
          <h4 className="text-accent line-clamp-1">{hotel?.hotelName}</h4>
          <a
            target="_blank"
            href={`https://google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.address}`}
            className="flex gap-1 items-start text-sm text-gray-500"
          >
            <Map width={15} height={15} /> {hotel?.address}
          </a>
          <p className="text-[16px] mt-1">{hotel?.description}</p>

          <div className="flex-between mt-2">
            <p className="text-gray-600 font-bold">Від {hotel?.price} €</p>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer px-4 py-2 rounded-xl bg-accent hover:bg-secondary transition-colors"
            >
              <p className="text-white">Забронювати</p>
            </a>
          </div>
        </div>
      </div>
    )
  );
};

export default HotelCard;
