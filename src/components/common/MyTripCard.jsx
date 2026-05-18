import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlacePhoto } from "../../services/placePhotoApi";
import { Calendar, Trash2, Wallet } from "lucide-react";

const MyTripCard = ({ trip, deleteTrip }) => {
  // console.log(trip);
  const [tripPhoto, setTripPhoto] = useState("");
  useEffect(() => {
    if (!trip?.userSelection?.destination) return;
    const loadPhoto = async () => {
      const photoUrl = await getPlacePhoto(trip?.userSelection?.destination);
      setTripPhoto(photoUrl);
    };
    loadPhoto();
  }, [trip]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 overflow-hidden">
      <div className="h-50 relative">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={tripPhoto ? tripPhoto : "/template.jpg"}
          alt={trip?.userSelection?.destination}
        />
        <button
          onClick={() => deleteTrip(trip?.id)}
          className="absolute cursor-pointer top-3 right-3 w-7 h-7 flex-center rounded-sm text-gray-500 hover:text-accent bg-white/40 backdrop-blur-sm hover:bg-white/90 transition-colors "
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      <Link to={`/trip/${trip?.id}`}>
        <h3 className="mt-2 text-xl line-clamp-1">
          {trip?.userSelection?.destination}
        </h3>
        <div>
          <div className="flex-between">
            <div className="flex-center gap-1">
              <Calendar className="h-4 w-4 text-secondary" />
              <h4 className="text-[18px]">Тривалість</h4>
            </div>
            <p className="text-gray-600 font-medium">
              {trip?.userSelection?.duration} дні
            </p>
          </div>
          <div className="flex-between">
            <div className="flex-center gap-1">
              <Wallet className="h-4 w-4 text-secondary" />
              <h4 className="text-[18px]">Бюджет</h4>
            </div>
            <p className="text-gray-600 font-medium">
              {trip?.tripData?.estimatedTotalPrice?.total} €
            </p>
          </div>
          <p className="mt-2 text-sm line-clamp-5">
            {trip?.tripData?.tripNote}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MyTripCard;
