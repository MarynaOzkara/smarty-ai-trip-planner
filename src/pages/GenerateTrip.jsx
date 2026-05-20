import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/common/Loader";
import { selectTripData } from "../redux/selectors";
import { generateTripWithAI } from "../services/AiModel";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { resetTripData } from "../redux/slices/formDataSlice";

const GenerateTrip = () => {
  const [loading, setLoading] = useState(true);
  const tripData = useSelector(selectTripData);
  const dispatch = useDispatch();
  // console.log("Trip data in GenerateTrip:", tripData);
  const { user } = useUser();

  const navigate = useNavigate();

  const DYNAMIC_PROMPT = `Generate a Travel Plan from origin: ${tripData?.origin} to destination: ${tripData?.destination}, with startDate ${tripData?.startDate} and endDate ${tripData?.endDate} for ${tripData?.duration} days for ${tripData?.travelers} for a ${tripData?.budget} budget with a flight details, airlines, flight price with a booking url, hotels options with list of 3-5 hotels with hotel name, hotel address, price only per 1 night, rating, descriptions, booking url, and places to visit nearby with place name, address, details, price ,ticket pricing, booking url, time to travel each of the locations for 1 day plan with best time to visit. Please include also in the itinerary real restaurants or caffe where people can have a breakfast, launch and dinner with only real place name, address and price. Plan please itinerary activities time from 09:00 - 18:00. Don’t include in itineraty flight and hotel, start straightaway from activities. And calculate approximately price for trip for one person including flight price, hotel price for all days and activities price. Geve descriptions for tripNote, hotel description, activity and activities details, howToGetTo and transfer details(max 1 sentence) in Ukrainian language, other data in english. hotelName and placeName only data name in english without any description.
1.Search flights at kiwi.com and add Bookin url www.kiwi.com/deep?affilid=ozkarablogaitripplanner&currency=EUR&departure=anytime&lang=en&return=anytime&returnFromDifferentAirport=false&returnToDifferentAirport=false. Only change destination and dates for trip, for example for Prague from 16 March to 18 March www.kiwi.com/deep?affilid=ozkarablogaitripplanner&currency=EUR&departure=2026-03-16_2026-03-16&destination=prague_cz&lang=en&return=2026-03-18_2026-03-18&returnFromDifferentAirport=false&returnToDifferentAirport=false
2. Search hotels at booking.com.
3.Search tickets for activities at https://tiqets.com. When you make a booking url use always this link https://tiqets.tpo.li/BxxMbWkW.
4.If you can't find booking url leave emty string, do not write N/A or any other text, only empty string. For example, if you can't find booking url for restaurant, it should be "bookingUrl": "".
5.Only, if origin city located in Ukraine, please search flights from Poland, Romania, Slovakia, Hungary, Moldova. For example, if origin is Kyiv, search flights from Warsaw, Budapest, Bratislava, Bucharest, Chisinau. Add in trip buss from origin city to nearest city with flights and add in strict schema transferFromOrigin: booking url, company name and price for bus tickets search at https://infobus.eu/.
6.If origin city located in Ukraine and destination city located in Ukraine don't add flight, only add transferToDestination with with strict schema transferToDestination with booking url, company name and price for bus tickets search at https://infobus.eu/.
7.If origin or destination city located in Russia, Belarus don't make any Travel Plan and return JSON response with tripNote: "Sorry, we cannot generate a travel plan for this destination due to current geopolitical situation."
8.If destination city in Europe has no flights, please search for nearby cities with flights and add to trip transfer from airport to destination city with strict schema transferToDestination with booking url, company name and price for bus tickets search at https://www.omio.com/. For example, if destination is Sintra, Portugal, search for flights to Lisbon and transfer from Lisbon to Sintra.
9.If travelers with pets, please search for pet friendly options and add pet-friendly hotels, airlines and activities.
10.All prices geve integer.
11.Generate and return a strict JSON response only`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await generateTripWithAI(DYNAMIC_PROMPT);
        if (response) {
          dispatch(resetTripData());
        }
        await saveToDB(response);

        // console.log("AI response:", response);
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
    fetchData();
    const saveToDB = async (trip) => {
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      // console.log(userEmail);
      const docId = Date.now().toString();
      await setDoc(doc(db, "trips", docId), {
        userSelection: tripData,
        tripData: trip,
        userEmail: userEmail,
        id: docId,
      });
      setLoading(false);
      toast.success("Подорож успішно створено!");
      navigate(`/trip/${docId}`);
    };
  }, [
    DYNAMIC_PROMPT,
    dispatch,
    navigate,
    tripData,
    user?.primaryEmailAddress?.emailAddress,
  ]);

  return <div>{loading && <Loader />}</div>;
};

export default GenerateTrip;
