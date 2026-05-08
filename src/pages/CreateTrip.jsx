import { useState } from "react";
import { SelectDates } from "../components/common/SelectDates";
import SelectPlace from "../components/common/SelectPlace";
import SelectBudget from "../components/common/SelectBudget";
import SelectTravelers from "../components/common/SelectTravelers";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { selectFormData } from "../redux/selectors";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import { generateTripWithAI } from "../services/AiModel";

const CreateTrip = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const tripData = useSelector(selectFormData);
  console.log(tripData);
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
      !tripData.origin ||
      !tripData.destination ||
      !tripData.startDate ||
      !tripData.endDate ||
      !tripData.budget ||
      !tripData.travelers
    ) {
      return toast.error("Будь ласка заповніть усі необхідні поля");
    }
    if (tripData.duration > 5) {
      return toast.error("На безкоштовному тарифі AI генерує максимум 5 днів");
    }
    setLoading(true);
    const DYNAMIC_PROMPT = `Generate a Travel Plan from origin: ${tripData.origin} to destination: ${tripData.destination}, with startDate ${tripData.startDate} and endDate ${tripData.endDate} for ${tripData.duration} days for ${tripData.travelers} for a ${tripData.budget} budget with a flight details, airlines, flight price with a booking url, hotels options with list of 3-5 hotels with hotel name, hotel address, price only per 1 night, rating, descriptions, booking url, and places to visit nearby with place name, address, details, price ,ticket pricing, booking url, time to travel each of the locations for 1 day plan with best time to visit. Please include also in the itinerary real restaurants or caffe where people can have a breakfast, launch and dinner with only real place name, address and price. Plan please itinerary activities time from 09:00 - 18:00 max places to visit 3 for 1 day. Don’t include in itineraty flight and hotel, start straightaway from activities. And calculate approximately price for trip for one person including flight price, hotel price for all days and activities price. Geve descriptions for tripNote, hotel description, activity and activities details, howToGetTo and transfer details(max 1 sentence) in Ukrainian language, other data in english. hotelName and placeName only data name in english without any description.
1.Search flights at kiwi.com and add Bookin url www.kiwi.com/deep?affilid=ozkarablogaitripplanner&currency=EUR&departure=anytime&lang=en&return=anytime&returnFromDifferentAirport=false&returnToDifferentAirport=false. Only change destination and dates for trip, for example for Prague from 16 March to 18 March www.kiwi.com/deep?affilid=ozkarablogaitripplanner&currency=EUR&departure=2026-03-16_2026-03-16&destination=prague_cz&lang=en&return=2026-03-18_2026-03-18&returnFromDifferentAirport=false&returnToDifferentAirport=false
2. Search hotels at booking.com.
1.Search tickets for activities at https://tiqets.com. When you make a booking url use always this link https://tp.media/r?marker=58449&trs=331062&p=2074&u=https%3A%2F%2Ftiqets.com&campaign_id=89 only change location for activities. For example, for Prague link https://www.tiqets.com/en/prague-attractions-c64162/ it will be https://tp.media/r?marker=58449&trs=331062&p=2074&u=https%3A%2F%2Fwww.tiqets.com%2Fen%2Fprague-attractions-c64162%2F&campaign_id=89
3.If origin city located in Ukraine, please search flights from Poland, Romania, Slovakia, Hungary, Moldova. For example, if origin is Kyiv, search flights from Warsaw, Budapest, Bratislava, Bucharest, Chisinau. Add in trip buss from origin city to nearest city with flights and add booking url, company name and price for bus tickets search at https://infobus.eu/.
4.If destination city in Europe has no flights, please search for nearby cities with flights and add to trip transfer from airport to destination city with booking url, company name and price for bus tickets search at https://www.omio.com/. For example, if destination is Sintra, Portugal, search for flights to Lisbon and transfer from Lisbon to Sintra.
5.If travelers with pets, please search for pet friendly options and add pet-friendly hotels, airlines and activities.
6.Generate and return a strict JSON response only`;

    try {
      const response = await generateTripWithAI(DYNAMIC_PROMPT);
      setLoading(false);
      console.log("AI response:", response);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error(
        error.message?.includes("429")
          ? "Забагато запитів до AI. Спробуйте ще раз через хвилину."
          : "Сталася помилка при генерації маршруту. Спробуйте ще раз.",
      );
      setLoading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <section className="bg-secondary-foreground min-h-screen py-30">
      <h2 className="text-center mb-10">Створити маршрут</h2>
      <div className="border max-padd-container flex flex-col md:flex-row gap-10">
        {/* Container */}
        <div className="w-full max-w-[50%] min-h-[85vh] sm:min-h-[80vh] bg-background rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
          {/* Progress Bar */}
          <div className="h-2 bg-primary/20 w-full">
            <div
              style={{ width: `${(step / 4) * 100}%` }}
              className="h-full bg-primary transition-all duration-500 ease-out"
            />
          </div>
          <div className="p-5 md:p-12 flex flex-col flex-1">
            {/* Steps Indicator*/}
            <div className="flex-center space-x-2 mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${step === s ? "w-8 bg-accent" : step > s ? "w-2 bg-accent" : "w-2 bg-accent/20"}`}
                />
              ))}
            </div>
            <div className="flex-1 flex flex-col pt-2 sm:p-4">
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
                  <div className="mt-10">
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
                  <div className="mt-10">
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
                  (step === 1 && !tripData.origin) ||
                  (step === 1 && !tripData.destination) ||
                  (step === 2 && !tripData.startDate) ||
                  (step === 2 && !tripData.endDate) ||
                  (step === 3 && !tripData.budget) ||
                  (step === 4 && !tripData.travelers)
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
        <div>
          <img src="/SmartyAI.png" alt="SmartyAi" />
        </div>
      </div>
    </section>
  );
};

export default CreateTrip;
