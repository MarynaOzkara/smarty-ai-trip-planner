import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { toast } from "sonner";
import { FaArrowLeft } from "react-icons/fa";
import Itinerary from "../components/common/Itinerary";
import Hotels from "../components/common/Hotels";
import { MdHotel } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import TripBudget from "../components/common/TripBadget";
import { FaPlaneDeparture } from "react-icons/fa";
import Transport from "../components/common/Transport";
import { getPlacePhoto } from "../services/placePhotoApi";

const TripDetails = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  const [placePhoto, setPlacePhoto] = useState("");
  const navigate = useNavigate();
  // console.log("trip", trip);
  const fetchTripData = async () => {
    const docRef = doc(db, "trips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      toast.error("Подорож не знайдено.");
      navigate("/create-trip");
    }
  };
  useEffect(() => {
    if (tripId) {
      fetchTripData();
    }
  }, [tripId]);

  useEffect(() => {
    if (!trip?.userSelection?.destination) return;
    const loadPhoto = async () => {
      const photoUrl = await getPlacePhoto(trip?.userSelection?.destination);
      setPlacePhoto(photoUrl);
    };
    loadPhoto();
  }, [trip]);
  return (
    trip && (
      <section className="bg-secondary-foreground min-h-screen">
        <div>
          <div className="relative h-98 md:h-111 bg-gray-900">
            <img
              src={placePhoto ? placePhoto : "/template.jpg"}
              alt={trip?.userSelection?.destination}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
            <div className="max-padd-container absolute bottom-10 left-0 right-0 text-white">
              <button
                onClick={() => navigate("/create-trip")}
                className="mb-4 flex-center gap-2 cursor-pointer text-sm bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full hover:bg-white/30 transition-colors"
              >
                <FaArrowLeft /> Створити іншу подорож
              </button>
              <div className="max-w-2xl p-5 bg-white/20 backdrop-blur-sm rounded-xl">
                <h1 className="mb-2">{trip?.userSelection?.destination}</h1>
                <p className="text-sm md:text-lg text-gray-300">
                  {trip?.tripData?.tripNote?.split(".")[0]}
                </p>
              </div>
            </div>
          </div>
          <div className="max-padd-container py-12">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column Itinerary */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 md:p-6">
                  {/* <h2 className="flex items-baseline gap-2 text-gray-600 text-xl md:text-3xl mb-4">
                    План подорожі на {trip?.userSelection?.duration} дні
                  </h2> */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <h3>
                        План подорожі на {trip?.userSelection?.duration} дні
                      </h3>
                    </div>
                  </div>
                  <Itinerary trip={trip} />
                </div>
              </div>
              {/* Right Column Flight, Hotels, Budget */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-accent mb-2 flex items-center gap-2">
                    <FaPlaneDeparture className="w-7 h-7" /> Транспорт
                  </h3>
                  <Transport trip={trip} />
                </div>
                <div>
                  <h3 className="text-accent mb-2 flex items-center gap-2">
                    <MdHotel className="w-7 h-7" /> Проживання
                  </h3>
                  <Hotels trip={trip} />
                </div>
                <div>
                  <h3 className="text-accent mb-2 flex items-center gap-2">
                    <FaWallet className="w-6 h-6" />
                    Бюджет подорожі
                  </h3>
                  <TripBudget trip={trip} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default TripDetails;
