import { useContext, useState, useEffect } from "react";
import { SelectDates } from "../components/common/SelectDates";
import SelectPlace from "../components/common/SelectPlace";
import SelectBudget from "../components/common/SelectBudget";
import SelectTravelers from "../components/common/SelectTravelers";
import { ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useClerk, useUser } from "@clerk/react";
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
  const { user } = useUser();
  const [isProPlan, setIsProPlan] = useState(false);
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const { tripDetails, setTripDetails } = useContext(TripContext);
  // console.log(tripDetails);
  useEffect(() => {
    const loadPlan = async () => {
      if (!user?.id) return;
      try {
        const userRef = doc(db, "users", user.id);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const plan = String(userData?.plan ?? "")
            .trim()
            .toLowerCase();
          setIsProPlan(plan === "pro");
        }
      } catch (e) {
        console.error("Error loading user plan:", e);
        // ignore
      }
    };
    loadPlan();
  }, [user?.id]);
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const handleNext = () => {
    const durationNum = Number(tripDetails?.duration || 0);
    const allowed = isProPlan ? 30 : 5;
    if (durationNum > allowed) return;

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
    const allowed = isProPlan ? 30 : 5;
    if (tripDetails.duration > allowed) {
      toast.error(
        isProPlan
          ? "На Pro тарифі доступно максимум 30 днів"
          : "На безкоштовному тарифі AI генерує максимум 5 днів",
      );
      return;
    }
    const userRef = doc(db, "users", user.id);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      openSignIn();
      return;
    }
    const userData = userSnap.data();
    const plan = String(userData?.plan ?? "")
      .trim()
      .toLowerCase();
    const isPro = plan === "pro";
    const lastTripGenerated = userData?.lastTripGeneratedAt;
    // console.log("Last trip generated", lastTripGenerated);
    if (!isPro && lastTripGenerated) {
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
        setTripDetails({
          origin: "",
          destination: "",
          startDate: "",
          endDate: "",
          duration: "",
          budget: "",
          travelers: "",
        });
        return;
      }
    }

    setLoading(true);
    const DYNAMIC_PROMPT = `Generate a Travel Plan from origin: ${tripDetails?.origin} to destination: ${tripDetails?.destination}, with startDate ${tripDetails?.startDate} and endDate ${tripDetails?.endDate} for ${tripDetails?.duration} days for ${tripDetails?.travelers} for a ${tripDetails?.budget} budget with a flight details, airlines, flight price with a booking url, hotels options with list of 3-5 hotels with hotel name, hotel address, price only per 1 night, rating, descriptions, booking url, and places to visit nearby with place name, address, details, price ,ticket pricing, booking url, time to travel each of the locations for 1 day plan with best time to visit. Please include also in the itinerary real restaurants or caffe where people can have a breakfast, launch and dinner with only real place name, address and price. Plan please itinerary activities time from 09:00 - 18:00. Don’t include in itineraty flight and hotel, start straightaway from activities. And calculate approximately price for trip for one person including flight price, hotel price for all days and activities price. Geve descriptions for tripNote, hotel description, activity and activities details, howToGetTo and transfer details(max 1 sentence) in Ukrainian language, other data in english. hotelName and placeName only data name in english without any description.
1.Search flights at kiwi.com and add bookin url https://www.kiwi.com/deep?affilid=ozkarablogaitripplanner&currency=EUR&from=anywhere&to=anywhere&departure=anytime&lang=uk&return=anytime. Only change from=origin and to=destination and dates depature and return for trip, for example for trip from Tallinn to Prague from 16 August to 18 August https://www.kiwi.com/deep?affilid=ozkarablogaitripplanner&currency=EUR&departure=2026-08-16_2026-08-16&from=TLL&to=PRG&lang=uk&return=2026-08-18_2026-08-18.
2. Search hotels at booking.com and add booking url https://www.booking.com/.
3.Search tickets for activities at https://www.tiqets.com/?partner=smarty_travels-187662. If you can find country of destination in the list, use suitable link for booking url, do not add any additional attributes: https://www.tiqets.com/spain-attractions-z50067/?partner=smarty_travels-187662
https://www.tiqets.com/portugal-attractions-z50184/?partner=smarty_travels-187662
https://www.tiqets.com/things-to-do-in-france-z50074/?partner=smarty_travels-187662
https://www.tiqets.com/belgium-attractions-z50019/?partner=smarty_travels-187662
https://www.tiqets.com/ireland-attractions-z50101/?partner=smarty_travels-187662
https://www.tiqets.com/germany-attractions-z50056/?partner=smarty_travels-187662
https://www.tiqets.com/austria-attractions-z50011/?partner=smarty_travels-187662
https://www.tiqets.com/italy-attractions-z50109/?partner=smarty_travels-187662
https://www.tiqets.com/greece-attractions-z50088/?partner=smarty_travels-187662
https://www.tiqets.com/hungary-attractions-z50099/?partner=smarty_travels-187662
https://www.tiqets.com/poland-attractions-z50179/?partner=smarty_travels-187662
https://www.tiqets.com/norway-attractions-z50167/?partner=smarty_travels-187662
https://www.tiqets.com/sweden-attractions-z50198/?partner=smarty_travels-187662
https://www.tiqets.com/finland-attractions-z50069/?partner=smarty_travels-187662
https://www.tiqets.com/turkey-attractions-z50225/?partner=smarty_travels-187662
https://www.tiqets.com/iceland-attractions-z50108/?partner=smarty_travels-187662
https://www.tiqets.com/czech-republic-attractions-z50055/?partner=smarty_travels-187662
https://www.tiqets.com/slovakia-attractions-z50203/?partner=smarty_travels-187662
https://www.tiqets.com/croatia-attractions-z50097/?partner=smarty_travels-187662
https://www.tiqets.com/united-kingdom-attractions-z50076/?partner=smarty_travels-187662
https://www.tiqets.com/romania-attractions-z50189/?partner=smarty_travels-187662
https://www.tiqets.com/estonia-attractions-z50063/?partner=smarty_travels-187662
https://www.tiqets.com/latvia-attractions-z50135/?partner=smarty_travels-187662
https://www.tiqets.com/lithuania-attractions-z50133/?partner=smarty_travels-187662.If you can not find destination country, use for booking url just https://www.tiqets.com/?partner=smarty_travels-187662.
4.If you can't find booking url leave emty string, do not write N/A or any other text, only empty string. For example, if you can't find booking url for restaurant, it should be "bookingUrl": "".
5.Only, if origin city located in Ukraine, please search flights from Poland, Romania, Slovakia, Hungary, Moldova. For example, if origin is Kyiv, search flights from Warsaw, Budapest, Bratislava, Bucharest, Chisinau. Add in trip buss from origin city to nearest city with flights and add in strict schema transferFromOrigin: booking url, company name and price for bus tickets search at https://infobus.eu/ua/bus?partner=3695&marker_id=252590&currency=EUR. Only add from and to and dates, for example for trip from Kyiv to Warsaw https://infobus.eu/ua/Kyiv/Warsaw/09.06/7/?partner=3695&marker_id=252590&currency=EUR.
6.If origin city located in Ukraine and destination city located in Ukraine don't add flight, only add transferToDestination with strict schema transferToDestination with booking url, company name and price for bus tickets search at https://infobus.eu/ua/bus?partner=3695&marker_id=252590&currency=EUR. Only add from and to and dates, for example for trip from Kyiv to Lviv https://infobus.eu/ua/Kyiv/Lviv/09.06/7/?partner=3695&marker_id=252590&currency=EUR. 
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
          : "Сталася помилка при генерації подорожі. Спробуйте ще раз пізніше.",
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

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      if (userData?.plan === "free") {
        await updateDoc(userRef, {
          lastTripGeneratedAt: serverTimestamp(),
        });
      }
    }

    setLoading(false);
    toast.success("Подорож успішно створено!");
    navigate(`/trip/${docId}`);
  };

  if (loading) {
    return <Loader />;
  }

  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const durationFromDates =
    tripDetails?.startDate && tripDetails?.endDate
      ? Math.floor(
          (parseDate(tripDetails.endDate) - parseDate(tripDetails.startDate)) /
            (1000 * 60 * 60 * 24),
        ) + 1
      : 0;

  const durationNum = Number(tripDetails?.duration || durationFromDates || 0);
  const allowedDays = isProPlan ? 30 : 5;
  const isDurationTooLong = durationNum > allowedDays;
  const isNextDisabled =
    isDurationTooLong ||
    (step === 1 && (!tripDetails.origin || !tripDetails.destination)) ||
    (step === 2 && (!tripDetails.startDate || !tripDetails.endDate)) ||
    (step === 3 && !tripDetails.budget) ||
    (step === 4 && !tripDetails.travelers);

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
                      Оберіть дати подорожі (максимум {isProPlan ? 30 : 5}{" "}
                      днів).
                    </p>
                    <div className="flex-center mt-8">
                      <SelectDates maxDays={isProPlan ? 30 : 5} />
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
              <div className="flex flex-col items-end">
                <button
                  disabled={isNextDisabled}
                  className={`flex items-center px-8 py-3 rounded-full font-bold text-white transition-all shadow-lg ${isNextDisabled ? "bg-gray-300 cursor-not-allowed opacity-70" : "bg-primary hover:bg-secondary"}`}
                  onClick={handleNext}
                >
                  {step === 4 ? "Згенерувати" : "Далі"}
                  {step === 4 ? (
                    <CheckCircle className="ml-2 w-5 h-5" />
                  ) : (
                    <ArrowRight className="ml-2 w-5 h-5" />
                  )}
                </button>
                {isDurationTooLong && (
                  <p className="text-sm text-red-600 mt-2">
                    {isProPlan
                      ? "На Pro тарифі доступно максимум 30 днів"
                      : "На безкоштовному тарифі доступно максимум 5 днів"}
                  </p>
                )}
              </div>
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
