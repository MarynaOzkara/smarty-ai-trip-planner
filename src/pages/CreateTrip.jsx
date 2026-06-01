import { useContext, useState } from "react";
import { SelectDates } from "../components/common/SelectDates";
import SelectPlace from "../components/common/SelectPlace";
import SelectBudget from "../components/common/SelectBudget";
import SelectTravelers from "../components/common/SelectTravelers";
import { ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth, useClerk, useUser } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "../provider/TripContext";
import Loader from "../components/common/Loader";
import { generateTripWithAI } from "../services/AiModel";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/firebaseConfig";

const CreateTrip = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  // const { has } = useAuth();
  const { user } = useUser();
  const { openSignUp } = useClerk();
  const navigate = useNavigate();
  const { tripDetails, setTripDetails } = useContext(TripContext);
  // const hasProPlan = has({ plan: "smarty_ai_pro" });
  // console.log(hasProPlan);
  // console.log(tripDetails);
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
    if (step === 4) {
      generateTrip();
    }
  };
  const generateTrip = async () => {
    if (
      !tripDetails.origin ||
      !tripDetails.destination ||
      !tripDetails.startDate ||
      !tripDetails.endDate ||
      !tripDetails.budget ||
      !tripDetails.travelers
    ) {
      return toast.error("Будь ласка заповніть усі необхідні поля");
    }
    if (tripDetails.duration > 5) {
      toast.error("На безкоштовному тарифі AI генерує максимум 5 днів");
      return;
    }
    const userRef = doc(db, "users", user.id);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      openSignUp();
      return;
    }
    const userData = userSnap.data();
    const lastTripGenerated = userData?.lastTripGeneratedAt;
    // console.log("Last trip generated", lastTripGenerated);
    if (lastTripGenerated) {
      const now = new Date();
      const lastGenerated = lastTripGenerated.toDate();
      // console.log("Останній тріп", lastGenerated);
      // console.log("Час зараз", now);
      const diffHours = (now - lastGenerated) / (60 * 60 * 1000);
      // console.log("Різниця генерацій", diffHours);
      // console.log("Різниця годин", Math.ceil(24 - diffHours));
      if (diffHours < 24) {
        const remainihgHours = Math.ceil(24 - diffHours);
        toast.warning(
          `Ви можете згенерувати новий маршрут через ${remainihgHours} год.`,
        );
        // console.log(
        //   `Ви можете згенерувати новий маршрут через ${remainihgHours} год.`,
        // );
        return;
      }
    }

    setLoading(true);
    const DYNAMIC_PROMPT = `Generate a Travel Plan from origin: ${tripDetails?.origin} to destination: ${tripDetails?.destination}, with startDate ${tripDetails?.startDate} and endDate ${tripDetails?.endDate} for ${tripDetails?.duration} days for ${tripDetails?.travelers} for a ${tripDetails?.budget} budget with a flight details, airlines, flight price with a booking url, hotels options with list of 3-5 hotels with hotel name, hotel address, price only per 1 night, rating, descriptions, booking url, and places to visit nearby with place name, address, details, price ,ticket pricing, booking url, time to travel each of the locations for 1 day plan with best time to visit. Please include also in the itinerary real restaurants or caffe where people can have a breakfast, launch and dinner with only real place name, address and price. Plan please itinerary activities time from 09:00 - 18:00. Don’t include in itineraty flight and hotel, start straightaway from activities. And calculate approximately price for trip for one person including flight price, hotel price for all days and activities price. Geve descriptions for tripNote, hotel description, activity and activities details, howToGetTo and transfer details(max 1 sentence) in Ukrainian language, other data in english. hotelName and placeName only data name in english without any description.
1.Search flights at kiwi.com and add bookin url https://www.kiwi.com/deep?affilid=ozkarablogaitripplanner&currency=EUR&departure=anytime&lang=en&return=anytime&returnFromDifferentAirport=false&returnToDifferentAirport=false. Only change destination and dates for trip, for example for Prague from 16 March to 18 March https://www.kiwi.com/deep?affilid=ozkarablogaitripplanner&currency=EUR&departure=2026-03-16_2026-03-16&destination=prague_cz&lang=en&return=2026-03-18_2026-03-18&returnFromDifferentAirport=false&returnToDifferentAirport=false
2. Search hotels at booking.com and add booking url https://www.booking.com/.
3.Search tickets for activities at https://tiqets.com. When you make a booking url use always this link https://tiqets.tpo.li/BxxMbWkW.
4.If you can't find booking url leave emty string, do not write N/A or any other text, only empty string. For example, if you can't find booking url for restaurant, it should be "bookingUrl": "".
5.Only, if origin city located in Ukraine, please search flights from Poland, Romania, Slovakia, Hungary, Moldova. For example, if origin is Kyiv, search flights from Warsaw, Budapest, Bratislava, Bucharest, Chisinau. Add in trip buss from origin city to nearest city with flights and add in strict schema transferFromOrigin: booking url, company name and price for bus tickets search at https://infobus.eu/.
6.If origin city located in Ukraine and destination city located in Ukraine don't add flight, only add transferToDestination with strict schema transferToDestination with booking url, company name and price for bus tickets search at https://infobus.eu/. 
7.If origin or destination city located in Russia, Belarus don't make any Travel Plan and return JSON response with tripNote: "Sorry, we cannot generate a travel plan for this destination due to current geopolitical situation."
8.If destination city in Europe has no flights, please search for nearby cities with flights and add to trip transfer from airport to destination city with strict schema transferToDestination with booking url, company name and price for bus tickets search at https://www.omio.com/. For example, if destination is Sintra, Portugal, search for flights to Lisbon and transfer from Lisbon to Sintra.
9.If travelers with pets, please search for pet friendly options and add pet-friendly hotels, airlines and activities.
10.All prices geve integer.
11.Generate and return a strict JSON response only`;

    try {
      const response = await generateTripWithAI(DYNAMIC_PROMPT);
      await saveToDB(response);
      setTripDetails({
        origin: "",
        destination: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
        travelers: "",
      });
    } catch (error) {
      setLoading(false);
      // console.error("Error generating trip:", error);
      toast.error(
        error.message?.includes("429")
          ? "Забагато запитів до AI. Спробуйте ще раз через хвилину."
          : "Сталася помилка при генерації подорожі. Спробуйте ще раз.",
      );
      navigate("/create-trip");
    }
  };

  const saveToDB = async (trip) => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    const userId = user?.id;
    // console.log(userEmail);
    const docId = Date.now().toString();
    await setDoc(doc(db, "trips", docId), {
      userSelection: tripDetails,
      tripData: trip,
      userId: userId,
      userEmail: userEmail,
      id: docId,
      createdAt: serverTimestamp(),
    });

    await updateDoc(doc(db, "users", userId), {
      lastTripGeneratedAt: serverTimestamp(),
    });

    setLoading(false);
    toast.success("Подорож успішно створено!");
    navigate(`/trip/${docId}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="bg-secondary-foreground pt-10 pb-20 xl:pb-30">
      <h2 className="text-center mb-6">Створити подорож</h2>
      <div className="relative max-padd-container flex flex-col lg:flex-row">
        {/* Container */}
        <div className="w-full lg:max-w-[50%] bg-background rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
          {/* Progress Bar */}
          <div className="h-2 bg-primary/20 w-full">
            <div
              style={{ width: `${(step / 4) * 100}%` }}
              className="h-full bg-primary transition-all duration-500 ease-out"
            />
          </div>
          <div className="p-5 lg:p-8 xl:p-12 flex flex-col flex-1">
            {/* Steps Indicator*/}
            <div className="flex-center space-x-2 mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${step === s ? "w-8 bg-accent" : step > s ? "w-2 bg-accent" : "w-2 bg-accent/20"}`}
                />
              ))}
            </div>
            <div className="flex-1 flex flex-col pt-2">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="mb-4 text-center">
                    <h3 className="text-2xl mb-2">
                      Крок 1: Куди наступна мандрівка?
                    </h3>
                    <p>
                      Оберіть пункт відправлення та призначення для вашої
                      мандрівки.
                    </p>
                  </div>
                  {/* From */}
                  <div>
                    <label
                      className="text-sm font-medium ml-1"
                      htmlFor="destination"
                    >
                      Звідки:
                    </label>
                    <SelectPlace name="origin" />
                    {/* To */}
                  </div>
                  <div>
                    <label
                      className="text-sm font-medium ml-1"
                      htmlFor="destination"
                    >
                      Куди:
                    </label>
                    <SelectPlace name="destination" />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div>
                  <div className="mb-4 text-center">
                    <h3 className="text-2xl mb-2">
                      Крок 2: Коли наступна мандрівка?
                    </h3>
                    <p>
                      Оберіть дати подорожі(на безкоштовній версії максимум 5
                      днів).
                    </p>
                    <div className="flex-center mt-8">
                      <SelectDates />
                    </div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="">
                  <div className="text-center">
                    <h3 className="text-2xl mb-2">Крок 3: Який ваш бюджет?</h3>
                    <p>Оберіть комфортний бюджет подорожі.</p>
                  </div>
                  <div className="mt-10 md:mt-6">
                    <SelectBudget />
                  </div>
                </div>
              )}
              {step === 4 && (
                <div>
                  <div className="text-center">
                    <h3 className="text-2xl mb-2">
                      Крок 4: Хто вирушає в подорож?
                    </h3>
                    <p>Оберіть компанію для подорожі.</p>
                  </div>
                  <div className="mt-10 md:mt-6">
                    <SelectTravelers />
                  </div>
                </div>
              )}
            </div>
            {/* Navigation */}
            <div className="flex-between pt-6 border-t border-gray-100">
              <button
                onClick={handleBack}
                className={`text-gray-500 cursor-pointer hover:text-gray-800 font-medium px-4 py-2 ${step === 1 && "invisible"}`}
              >
                Назад
              </button>
              <button
                disabled={
                  (step === 1 && !tripDetails.origin) ||
                  (step === 1 && !tripDetails.destination) ||
                  (step === 2 && !tripDetails.startDate) ||
                  (step === 2 && !tripDetails.endDate) ||
                  (step === 2 && tripDetails.duration > 5) ||
                  (step === 3 && !tripDetails.budget) ||
                  (step === 4 && !tripDetails.travelers)
                }
                className={`flex items-center px-8 py-3 rounded-full font-bold text-white transition-all shadow-lg bg-primary cursor-pointer hover:bg-secondary disabled:bg-gray-300 disabled:cursor-not-allowed`}
                onClick={handleNext}
              >
                {step === 4 ? "Згенерувати" : "Далі"}
                {step === 4 ? (
                  <CheckCircle className="ml-2 w-5 h-5" />
                ) : (
                  <ArrowRight className="ml-2 w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="hidden mx-auto lg:block max-w-lg">
          <img
            src="/popular-destination.png"
            alt="Popular destinations"
            className="opacity-20"
          />
        </div>
      </div>
    </section>
  );
};

export default CreateTrip;
