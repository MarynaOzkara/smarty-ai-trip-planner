import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { toast } from "sonner";
import { FaArrowLeft } from "react-icons/fa";
import { Calendar } from "lucide-react";
import Itinerary from "../components/common/Itinerary";

const TripDetails = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  const navigate = useNavigate();
  console.log("trip", trip);
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
  return (
    trip && (
      <section className="bg-secondary-foreground min-h-screen">
        <div>
          <div className="relative h-98 md:h-111 bg-gray-900">
            <img
              src={"/private.png"}
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
                  <h2 className="flex items-baseline gap-2 text-gray-600 text-xl md:text-3xl mb-4">
                    <Calendar className="h-5 w-5 md:w-7 md:h-7 text-accent" />{" "}
                    Ваш план подорожі на {trip?.userSelection?.duration} дні
                  </h2>
                  <Itinerary trip={trip} />
                </div>
              </div>
              {/* Right Column Flight, Hotels, Budget */}
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default TripDetails;
