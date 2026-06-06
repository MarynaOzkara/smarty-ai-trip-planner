import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/CreateTrip.jsx");const useContext = __vite__cjsImport0_react["useContext"]; const useState = __vite__cjsImport0_react["useState"]; const useEffect = __vite__cjsImport0_react["useEffect"];const _jsxDEV = __vite__cjsImport14_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=b3854477";
import { SelectDates } from "/src/components/common/SelectDates.jsx";
import SelectPlace from "/src/components/common/SelectPlace.jsx";
import SelectBudget from "/src/components/common/SelectBudget.jsx";
import SelectTravelers from "/src/components/common/SelectTravelers.jsx";
import { ArrowRight, CheckCircle } from "/node_modules/.vite/deps/lucide-react.js?v=b3854477";
import { toast } from "/node_modules/.vite/deps/sonner.js?v=b3854477";
import { useClerk, useUser } from "/node_modules/.vite/deps/@clerk_react.js?v=b3854477";
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=b3854477";
import { TripContext } from "/src/provider/TripContext.js";
import Loader from "/src/components/common/Loader.jsx";
import { generateTripWithAI } from "/src/services/AiModel.js";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "/node_modules/.vite/deps/firebase_firestore.js?v=b3854477";
import { db } from "/src/services/firebaseConfig.js";
var _jsxFileName = "C:/Users/admin/OneDrive/Документи/GitHub/smarty-ai-trip-planner/src/pages/CreateTrip.jsx";
import __vite__cjsImport14_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=b3854477";
var _s = $RefreshSig$();
const CreateTrip = () => {
	_s();
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
					setIsProPlan(userData?.plan === "pro");
				}
			} catch (e) {}
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
		if (!tripDetails.origin || !tripDetails.destination || !tripDetails.startDate || !tripDetails.endDate || !tripDetails.budget || !tripDetails.travelers) {
			return toast.error("Будь ласка заповніть усі необхідні поля");
		}
		const allowed = isProPlan ? 30 : 5;
		if (tripDetails.duration > allowed) {
			toast.error(isProPlan ? "На Pro тарифі доступно максимум 30 днів" : "На безкоштовному тарифі AI генерує максимум 5 днів");
			return;
		}
		const userRef = doc(db, "users", user.id);
		const userSnap = await getDoc(userRef);
		if (!userSnap.exists()) {
			openSignIn();
			return;
		}
		const userData = userSnap.data();
		const isPro = userData?.plan === "pro";
		const lastTripGenerated = userData?.lastTripGeneratedAt;
		// console.log("Last trip generated", lastTripGenerated);
		if (!isPro && lastTripGenerated) {
			const now = new Date();
			const lastGenerated = lastTripGenerated.toDate();
			// console.log("Останній тріп", lastGenerated);
			// console.log("Час зараз", now);
			const diffHours = (now - lastGenerated) / (60 * 60 * 1e3);
			// console.log("Різниця генерацій", diffHours);
			// console.log("Різниця годин", Math.ceil(24 - diffHours));
			if (diffHours < 24) {
				const remainihgHours = Math.ceil(24 - diffHours);
				toast.warning(`Ви можете згенерувати новий маршрут через ${remainihgHours} год.`);
				setTripDetails({
					origin: "",
					destination: "",
					startDate: "",
					endDate: "",
					duration: "",
					budget: "",
					travelers: ""
				});
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
				travelers: ""
			});
		} catch (error) {
			setLoading(false);
			// console.error("Error generating trip:", error);
			toast.error(error.message?.includes("429") ? "Забагато запитів до AI. Спробуйте ще раз через хвилину." : "Сталася помилка при генерації подорожі. Спробуйте ще раз пізніше.");
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
			userId,
			userEmail,
			id: docId,
			createdAt: serverTimestamp()
		});
		const userRef = doc(db, "users", userId);
		const userSnap = await getDoc(userRef);
		if (userSnap.exists()) {
			const userData = userSnap.data();
			if (userData?.plan === "free") {
				await updateDoc(userRef, { lastTripGeneratedAt: serverTimestamp() });
			}
		}
		setLoading(false);
		toast.success("Подорож успішно створено!");
		navigate(`/trip/${docId}`);
	};
	if (loading) {
		return /* @__PURE__ */ _jsxDEV(Loader, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 185,
			columnNumber: 12
		}, this);
	}
	const parseDate = (dateStr) => {
		if (!dateStr) return null;
		const [day, month, year] = dateStr.split("/").map(Number);
		return new Date(year, month - 1, day);
	};
	const durationFromDates = tripDetails?.startDate && tripDetails?.endDate ? Math.floor((parseDate(tripDetails.endDate) - parseDate(tripDetails.startDate)) / (1e3 * 60 * 60 * 24)) + 1 : 0;
	const durationNum = Number(tripDetails?.duration || durationFromDates || 0);
	const allowedDays = isProPlan ? 30 : 5;
	const isDurationTooLong = durationNum > allowedDays;
	const isNextDisabled = isDurationTooLong || step === 1 && (!tripDetails.origin || !tripDetails.destination) || step === 2 && (!tripDetails.startDate || !tripDetails.endDate) || step === 3 && !tripDetails.budget || step === 4 && !tripDetails.travelers;
	return /* @__PURE__ */ _jsxDEV("section", {
		className: "bg-secondary-foreground pt-10 pb-20 xl:pb-30",
		children: [/* @__PURE__ */ _jsxDEV("h2", {
			className: "text-center mb-6",
			children: "Створити подорож"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 214,
			columnNumber: 7
		}, this), /* @__PURE__ */ _jsxDEV("div", {
			className: "relative max-padd-container flex flex-col lg:flex-row",
			children: [/* @__PURE__ */ _jsxDEV("div", {
				className: "w-full lg:max-w-[50%] bg-background rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "h-2 bg-primary/20 w-full",
					children: /* @__PURE__ */ _jsxDEV("div", {
						style: { width: `${step / 4 * 100}%` },
						className: "h-full bg-primary transition-all duration-500 ease-out"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 220,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 219,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "p-5 lg:p-8 xl:p-12 flex flex-col flex-1",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex-center space-x-2 mb-8",
							children: [
								1,
								2,
								3,
								4
							].map((s) => /* @__PURE__ */ _jsxDEV("div", { className: `h-2 rounded-full transition-all duration-300 ${step === s ? "w-8 bg-accent" : step > s ? "w-2 bg-accent" : "w-2 bg-accent/20"}` }, s, false, {
								fileName: _jsxFileName,
								lineNumber: 229,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 227,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex-1 flex flex-col pt-2",
							children: [
								step === 1 && /* @__PURE__ */ _jsxDEV("div", {
									className: "space-y-6",
									children: [
										/* @__PURE__ */ _jsxDEV("div", {
											className: "mb-4 text-center",
											children: [/* @__PURE__ */ _jsxDEV("h3", {
												className: "text-2xl mb-2",
												children: "Крок 1: Куди наступна мандрівка?"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 239,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV("p", { children: "Оберіть пункт відправлення та призначення для вашої мандрівки." }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 242,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 238,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
											className: "text-sm font-medium ml-1",
											htmlFor: "destination",
											children: "Звідки:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 249,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV(SelectPlace, { name: "origin" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 255,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 248,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
											className: "text-sm font-medium ml-1",
											htmlFor: "destination",
											children: "Куди:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 259,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV(SelectPlace, { name: "destination" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 265,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 258,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 237,
									columnNumber: 17
								}, this),
								step === 2 && /* @__PURE__ */ _jsxDEV("div", { children: /* @__PURE__ */ _jsxDEV("div", {
									className: "mb-4 text-center",
									children: [
										/* @__PURE__ */ _jsxDEV("h3", {
											className: "text-2xl mb-2",
											children: "Крок 2: Коли наступна мандрівка?"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 272,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("p", { children: [
											"Оберіть дати подорожі (максимум ",
											isProPlan ? 30 : 5,
											" днів)."
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 275,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("div", {
											className: "flex-center mt-8",
											children: /* @__PURE__ */ _jsxDEV(SelectDates, { maxDays: isProPlan ? 30 : 5 }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 279,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 278,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 271,
									columnNumber: 19
								}, this) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 270,
									columnNumber: 17
								}, this),
								step === 3 && /* @__PURE__ */ _jsxDEV("div", {
									className: "",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "text-center",
										children: [/* @__PURE__ */ _jsxDEV("h3", {
											className: "text-2xl mb-2",
											children: "Крок 3: Який ваш бюджет?"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 287,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("p", { children: "Оберіть комфортний бюджет подорожі." }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 288,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 286,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "mt-10 md:mt-6",
										children: /* @__PURE__ */ _jsxDEV(SelectBudget, {}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 291,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 290,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 285,
									columnNumber: 17
								}, this),
								step === 4 && /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "text-center",
									children: [/* @__PURE__ */ _jsxDEV("h3", {
										className: "text-2xl mb-2",
										children: "Крок 4: Хто вирушає в подорож?"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 298,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("p", { children: "Оберіть компанію для подорожі." }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 301,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 297,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "mt-10 md:mt-6",
									children: /* @__PURE__ */ _jsxDEV(SelectTravelers, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 304,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 303,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 296,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 235,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex-between pt-6 border-t border-gray-100",
							children: [/* @__PURE__ */ _jsxDEV("button", {
								onClick: handleBack,
								className: `text-gray-500 cursor-pointer hover:text-gray-800 font-medium px-4 py-2 ${step === 1 && "invisible"}`,
								children: "Назад"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 311,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "flex flex-col items-end",
								children: [/* @__PURE__ */ _jsxDEV("button", {
									disabled: isNextDisabled,
									className: `flex items-center px-8 py-3 rounded-full font-bold text-white transition-all shadow-lg ${isNextDisabled ? "bg-gray-300 cursor-not-allowed opacity-70" : "bg-primary hover:bg-secondary"}`,
									onClick: handleNext,
									children: [step === 4 ? "Згенерувати" : "Далі", step === 4 ? /* @__PURE__ */ _jsxDEV(CheckCircle, { className: "ml-2 w-5 h-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 325,
										columnNumber: 21
									}, this) : /* @__PURE__ */ _jsxDEV(ArrowRight, { className: "ml-2 w-5 h-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 327,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 318,
									columnNumber: 17
								}, this), isDurationTooLong && /* @__PURE__ */ _jsxDEV("p", {
									className: "text-sm text-red-600 mt-2",
									children: isProPlan ? "На Pro тарифі доступно максимум 30 днів" : "На безкоштовному тарифі доступно максимум 5 днів"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 331,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 317,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 310,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 225,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 217,
				columnNumber: 9
			}, this), /* @__PURE__ */ _jsxDEV("div", {
				className: "hidden mx-auto lg:block max-w-lg",
				children: /* @__PURE__ */ _jsxDEV("img", {
					src: "/popular-destination.png",
					alt: "Popular destinations",
					className: "opacity-20"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 340,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 339,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 215,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 213,
		columnNumber: 5
	}, this);
};
_s(CreateTrip, "XBIS0VzCj0TXoplF+Vc1cJpxYss=", false, function() {
	return [
		useUser,
		useClerk,
		useNavigate
	];
});
_c = CreateTrip;
export default CreateTrip;
var _c;
$RefreshReg$(_c, "CreateTrip");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/pages/CreateTrip.jsx";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/admin/OneDrive/Документи/GitHub/smarty-ai-trip-planner/src/pages/CreateTrip.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/admin/OneDrive/Документи/GitHub/smarty-ai-trip-planner/src/pages/CreateTrip.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/admin/OneDrive/Документи/GitHub/smarty-ai-trip-planner/src/pages/CreateTrip.jsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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OltdLCJzb3VyY2VzIjpbIkNyZWF0ZVRyaXAuanN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUNvbnRleHQsIHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgU2VsZWN0RGF0ZXMgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9jb21tb24vU2VsZWN0RGF0ZXNcIjtcclxuaW1wb3J0IFNlbGVjdFBsYWNlIGZyb20gXCIuLi9jb21wb25lbnRzL2NvbW1vbi9TZWxlY3RQbGFjZVwiO1xyXG5pbXBvcnQgU2VsZWN0QnVkZ2V0IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbW1vbi9TZWxlY3RCdWRnZXRcIjtcclxuaW1wb3J0IFNlbGVjdFRyYXZlbGVycyBmcm9tIFwiLi4vY29tcG9uZW50cy9jb21tb24vU2VsZWN0VHJhdmVsZXJzXCI7XHJcbmltcG9ydCB7IEFycm93UmlnaHQsIENoZWNrQ2lyY2xlIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xyXG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gXCJzb25uZXJcIjtcclxuaW1wb3J0IHsgdXNlQ2xlcmssIHVzZVVzZXIgfSBmcm9tIFwiQGNsZXJrL3JlYWN0XCI7XHJcbmltcG9ydCB7IHVzZU5hdmlnYXRlIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuaW1wb3J0IHsgVHJpcENvbnRleHQgfSBmcm9tIFwiLi4vcHJvdmlkZXIvVHJpcENvbnRleHRcIjtcclxuaW1wb3J0IExvYWRlciBmcm9tIFwiLi4vY29tcG9uZW50cy9jb21tb24vTG9hZGVyXCI7XHJcbmltcG9ydCB7IGdlbmVyYXRlVHJpcFdpdGhBSSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9BaU1vZGVsXCI7XHJcbmltcG9ydCB7XHJcbiAgZG9jLFxyXG4gIGdldERvYyxcclxuICBzZXJ2ZXJUaW1lc3RhbXAsXHJcbiAgc2V0RG9jLFxyXG4gIHVwZGF0ZURvYyxcclxufSBmcm9tIFwiZmlyZWJhc2UvZmlyZXN0b3JlXCI7XHJcbmltcG9ydCB7IGRiIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2ZpcmViYXNlQ29uZmlnXCI7XHJcblxyXG5jb25zdCBDcmVhdGVUcmlwID0gKCkgPT4ge1xyXG4gIGNvbnN0IFtzdGVwLCBzZXRTdGVwXSA9IHVzZVN0YXRlKDEpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCB7IHVzZXIgfSA9IHVzZVVzZXIoKTtcclxuICBjb25zdCBbaXNQcm9QbGFuLCBzZXRJc1Byb1BsYW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHsgb3BlblNpZ25JbiB9ID0gdXNlQ2xlcmsoKTtcclxuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XHJcbiAgY29uc3QgeyB0cmlwRGV0YWlscywgc2V0VHJpcERldGFpbHMgfSA9IHVzZUNvbnRleHQoVHJpcENvbnRleHQpO1xyXG4gIC8vIGNvbnNvbGUubG9nKHRyaXBEZXRhaWxzKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgbG9hZFBsYW4gPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGlmICghdXNlcj8uaWQpIHJldHVybjtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB1c2VyUmVmID0gZG9jKGRiLCBcInVzZXJzXCIsIHVzZXIuaWQpO1xyXG4gICAgICAgIGNvbnN0IHVzZXJTbmFwID0gYXdhaXQgZ2V0RG9jKHVzZXJSZWYpO1xyXG4gICAgICAgIGlmICh1c2VyU25hcC5leGlzdHMoKSkge1xyXG4gICAgICAgICAgY29uc3QgdXNlckRhdGEgPSB1c2VyU25hcC5kYXRhKCk7XHJcbiAgICAgICAgICBzZXRJc1Byb1BsYW4odXNlckRhdGE/LnBsYW4gPT09IFwicHJvXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIC8vIGlnbm9yZVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgbG9hZFBsYW4oKTtcclxuICB9LCBbdXNlcj8uaWRdKTtcclxuICBjb25zdCBoYW5kbGVCYWNrID0gKCkgPT4ge1xyXG4gICAgaWYgKHN0ZXAgPiAxKSB7XHJcbiAgICAgIHNldFN0ZXAoc3RlcCAtIDEpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgY29uc3QgaGFuZGxlTmV4dCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGR1cmF0aW9uTnVtID0gTnVtYmVyKHRyaXBEZXRhaWxzPy5kdXJhdGlvbiB8fCAwKTtcclxuICAgIGNvbnN0IGFsbG93ZWQgPSBpc1Byb1BsYW4gPyAzMCA6IDU7XHJcbiAgICBpZiAoZHVyYXRpb25OdW0gPiBhbGxvd2VkKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHN0ZXAgPCA0KSB7XHJcbiAgICAgIHNldFN0ZXAoc3RlcCArIDEpO1xyXG4gICAgfVxyXG4gICAgaWYgKHN0ZXAgPT09IDQpIHtcclxuICAgICAgZ2VuZXJhdGVUcmlwKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBjb25zdCBnZW5lcmF0ZVRyaXAgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoXHJcbiAgICAgICF0cmlwRGV0YWlscy5vcmlnaW4gfHxcclxuICAgICAgIXRyaXBEZXRhaWxzLmRlc3RpbmF0aW9uIHx8XHJcbiAgICAgICF0cmlwRGV0YWlscy5zdGFydERhdGUgfHxcclxuICAgICAgIXRyaXBEZXRhaWxzLmVuZERhdGUgfHxcclxuICAgICAgIXRyaXBEZXRhaWxzLmJ1ZGdldCB8fFxyXG4gICAgICAhdHJpcERldGFpbHMudHJhdmVsZXJzXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRvYXN0LmVycm9yKFwi0JHRg9C00Ywg0LvQsNGB0LrQsCDQt9Cw0L/QvtCy0L3RltGC0Ywg0YPRgdGWINC90LXQvtCx0YXRltC00L3RliDQv9C+0LvRj1wiKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGFsbG93ZWQgPSBpc1Byb1BsYW4gPyAzMCA6IDU7XHJcbiAgICBpZiAodHJpcERldGFpbHMuZHVyYXRpb24gPiBhbGxvd2VkKSB7XHJcbiAgICAgIHRvYXN0LmVycm9yKGlzUHJvUGxhbiA/IFwi0J3QsCBQcm8g0YLQsNGA0LjRhNGWINC00L7RgdGC0YPQv9C90L4g0LzQsNC60YHQuNC80YPQvCAzMCDQtNC90ZbQslwiIDogXCLQndCwINCx0LXQt9C60L7RiNGC0L7QstC90L7QvNGDINGC0LDRgNC40YTRliBBSSDQs9C10L3QtdGA0YPRlCDQvNCw0LrRgdC40LzRg9C8IDUg0LTQvdGW0LJcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHVzZXJSZWYgPSBkb2MoZGIsIFwidXNlcnNcIiwgdXNlci5pZCk7XHJcbiAgICBjb25zdCB1c2VyU25hcCA9IGF3YWl0IGdldERvYyh1c2VyUmVmKTtcclxuICAgIGlmICghdXNlclNuYXAuZXhpc3RzKCkpIHtcclxuICAgICAgb3BlblNpZ25JbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCB1c2VyRGF0YSA9IHVzZXJTbmFwLmRhdGEoKTtcclxuICAgIGNvbnN0IGlzUHJvID0gdXNlckRhdGE/LnBsYW4gPT09IFwicHJvXCI7XHJcbiAgICBjb25zdCBsYXN0VHJpcEdlbmVyYXRlZCA9IHVzZXJEYXRhPy5sYXN0VHJpcEdlbmVyYXRlZEF0O1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJMYXN0IHRyaXAgZ2VuZXJhdGVkXCIsIGxhc3RUcmlwR2VuZXJhdGVkKTtcclxuICAgIGlmICghaXNQcm8gJiYgbGFzdFRyaXBHZW5lcmF0ZWQpIHtcclxuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgY29uc3QgbGFzdEdlbmVyYXRlZCA9IGxhc3RUcmlwR2VuZXJhdGVkLnRvRGF0ZSgpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhcItCe0YHRgtCw0L3QvdGW0Lkg0YLRgNGW0L9cIiwgbGFzdEdlbmVyYXRlZCk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwi0KfQsNGBINC30LDRgNCw0LdcIiwgbm93KTtcclxuICAgICAgY29uc3QgZGlmZkhvdXJzID0gKG5vdyAtIGxhc3RHZW5lcmF0ZWQpIC8gKDYwICogNjAgKiAxMDAwKTtcclxuICAgICAgLy8gY29uc29sZS5sb2coXCLQoNGW0LfQvdC40YbRjyDQs9C10L3QtdGA0LDRhtGW0LlcIiwgZGlmZkhvdXJzKTtcclxuICAgICAgLy8gY29uc29sZS5sb2coXCLQoNGW0LfQvdC40YbRjyDQs9C+0LTQuNC9XCIsIE1hdGguY2VpbCgyNCAtIGRpZmZIb3VycykpO1xyXG4gICAgICBpZiAoZGlmZkhvdXJzIDwgMjQpIHtcclxuICAgICAgICBjb25zdCByZW1haW5paGdIb3VycyA9IE1hdGguY2VpbCgyNCAtIGRpZmZIb3Vycyk7XHJcbiAgICAgICAgdG9hc3Qud2FybmluZyhcclxuICAgICAgICAgIGDQktC4INC80L7QttC10YLQtSDQt9Cz0LXQvdC10YDRg9Cy0LDRgtC4INC90L7QstC40Lkg0LzQsNGA0YjRgNGD0YIg0YfQtdGA0LXQtyAke3JlbWFpbmloZ0hvdXJzfSDQs9C+0LQuYCxcclxuICAgICAgICApO1xyXG4gICAgICAgIHNldFRyaXBEZXRhaWxzKHtcclxuICAgICAgICAgIG9yaWdpbjogXCJcIixcclxuICAgICAgICAgIGRlc3RpbmF0aW9uOiBcIlwiLFxyXG4gICAgICAgICAgc3RhcnREYXRlOiBcIlwiLFxyXG4gICAgICAgICAgZW5kRGF0ZTogXCJcIixcclxuICAgICAgICAgIGR1cmF0aW9uOiBcIlwiLFxyXG4gICAgICAgICAgYnVkZ2V0OiBcIlwiLFxyXG4gICAgICAgICAgdHJhdmVsZXJzOiBcIlwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICBjb25zdCBEWU5BTUlDX1BST01QVCA9IGBHZW5lcmF0ZSBhIFRyYXZlbCBQbGFuIGZyb20gb3JpZ2luOiAke3RyaXBEZXRhaWxzPy5vcmlnaW59IHRvIGRlc3RpbmF0aW9uOiAke3RyaXBEZXRhaWxzPy5kZXN0aW5hdGlvbn0sIHdpdGggc3RhcnREYXRlICR7dHJpcERldGFpbHM/LnN0YXJ0RGF0ZX0gYW5kIGVuZERhdGUgJHt0cmlwRGV0YWlscz8uZW5kRGF0ZX0gZm9yICR7dHJpcERldGFpbHM/LmR1cmF0aW9ufSBkYXlzIGZvciAke3RyaXBEZXRhaWxzPy50cmF2ZWxlcnN9IGZvciBhICR7dHJpcERldGFpbHM/LmJ1ZGdldH0gYnVkZ2V0IHdpdGggYSBmbGlnaHQgZGV0YWlscywgYWlybGluZXMsIGZsaWdodCBwcmljZSB3aXRoIGEgYm9va2luZyB1cmwsIGhvdGVscyBvcHRpb25zIHdpdGggbGlzdCBvZiAzLTUgaG90ZWxzIHdpdGggaG90ZWwgbmFtZSwgaG90ZWwgYWRkcmVzcywgcHJpY2Ugb25seSBwZXIgMSBuaWdodCwgcmF0aW5nLCBkZXNjcmlwdGlvbnMsIGJvb2tpbmcgdXJsLCBhbmQgcGxhY2VzIHRvIHZpc2l0IG5lYXJieSB3aXRoIHBsYWNlIG5hbWUsIGFkZHJlc3MsIGRldGFpbHMsIHByaWNlICx0aWNrZXQgcHJpY2luZywgYm9va2luZyB1cmwsIHRpbWUgdG8gdHJhdmVsIGVhY2ggb2YgdGhlIGxvY2F0aW9ucyBmb3IgMSBkYXkgcGxhbiB3aXRoIGJlc3QgdGltZSB0byB2aXNpdC4gUGxlYXNlIGluY2x1ZGUgYWxzbyBpbiB0aGUgaXRpbmVyYXJ5IHJlYWwgcmVzdGF1cmFudHMgb3IgY2FmZmUgd2hlcmUgcGVvcGxlIGNhbiBoYXZlIGEgYnJlYWtmYXN0LCBsYXVuY2ggYW5kIGRpbm5lciB3aXRoIG9ubHkgcmVhbCBwbGFjZSBuYW1lLCBhZGRyZXNzIGFuZCBwcmljZS4gUGxhbiBwbGVhc2UgaXRpbmVyYXJ5IGFjdGl2aXRpZXMgdGltZSBmcm9tIDA5OjAwIC0gMTg6MDAuIERvbuKAmXQgaW5jbHVkZSBpbiBpdGluZXJhdHkgZmxpZ2h0IGFuZCBob3RlbCwgc3RhcnQgc3RyYWlnaHRhd2F5IGZyb20gYWN0aXZpdGllcy4gQW5kIGNhbGN1bGF0ZSBhcHByb3hpbWF0ZWx5IHByaWNlIGZvciB0cmlwIGZvciBvbmUgcGVyc29uIGluY2x1ZGluZyBmbGlnaHQgcHJpY2UsIGhvdGVsIHByaWNlIGZvciBhbGwgZGF5cyBhbmQgYWN0aXZpdGllcyBwcmljZS4gR2V2ZSBkZXNjcmlwdGlvbnMgZm9yIHRyaXBOb3RlLCBob3RlbCBkZXNjcmlwdGlvbiwgYWN0aXZpdHkgYW5kIGFjdGl2aXRpZXMgZGV0YWlscywgaG93VG9HZXRUbyBhbmQgdHJhbnNmZXIgZGV0YWlscyhtYXggMSBzZW50ZW5jZSkgaW4gVWtyYWluaWFuIGxhbmd1YWdlLCBvdGhlciBkYXRhIGluIGVuZ2xpc2guIGhvdGVsTmFtZSBhbmQgcGxhY2VOYW1lIG9ubHkgZGF0YSBuYW1lIGluIGVuZ2xpc2ggd2l0aG91dCBhbnkgZGVzY3JpcHRpb24uXHJcbjEuU2VhcmNoIGZsaWdodHMgYXQga2l3aS5jb20gYW5kIGFkZCBib29raW4gdXJsIGh0dHBzOi8vd3d3Lmtpd2kuY29tL2RlZXA/YWZmaWxpZD1vemthcmFibG9nYWl0cmlwcGxhbm5lciZjdXJyZW5jeT1FVVImZGVwYXJ0dXJlPWFueXRpbWUmbGFuZz1lbiZyZXR1cm49YW55dGltZSZyZXR1cm5Gcm9tRGlmZmVyZW50QWlycG9ydD1mYWxzZSZyZXR1cm5Ub0RpZmZlcmVudEFpcnBvcnQ9ZmFsc2UuIE9ubHkgY2hhbmdlIGRlc3RpbmF0aW9uIGFuZCBkYXRlcyBmb3IgdHJpcCwgZm9yIGV4YW1wbGUgZm9yIFByYWd1ZSBmcm9tIDE2IE1hcmNoIHRvIDE4IE1hcmNoIGh0dHBzOi8vd3d3Lmtpd2kuY29tL2RlZXA/YWZmaWxpZD1vemthcmFibG9nYWl0cmlwcGxhbm5lciZjdXJyZW5jeT1FVVImZGVwYXJ0dXJlPTIwMjYtMDMtMTZfMjAyNi0wMy0xNiZkZXN0aW5hdGlvbj1wcmFndWVfY3ombGFuZz1lbiZyZXR1cm49MjAyNi0wMy0xOF8yMDI2LTAzLTE4JnJldHVybkZyb21EaWZmZXJlbnRBaXJwb3J0PWZhbHNlJnJldHVyblRvRGlmZmVyZW50QWlycG9ydD1mYWxzZVxyXG4yLiBTZWFyY2ggaG90ZWxzIGF0IGJvb2tpbmcuY29tIGFuZCBhZGQgYm9va2luZyB1cmwgaHR0cHM6Ly93d3cuYm9va2luZy5jb20vLlxyXG4zLlNlYXJjaCB0aWNrZXRzIGZvciBhY3Rpdml0aWVzIGF0IGh0dHBzOi8vdGlxZXRzLmNvbS4gV2hlbiB5b3UgbWFrZSBhIGJvb2tpbmcgdXJsIHVzZSBhbHdheXMgdGhpcyBsaW5rIGh0dHBzOi8vdGlxZXRzLnRwby5saS9CeHhNYldrVy5cclxuNC5JZiB5b3UgY2FuJ3QgZmluZCBib29raW5nIHVybCBsZWF2ZSBlbXR5IHN0cmluZywgZG8gbm90IHdyaXRlIE4vQSBvciBhbnkgb3RoZXIgdGV4dCwgb25seSBlbXB0eSBzdHJpbmcuIEZvciBleGFtcGxlLCBpZiB5b3UgY2FuJ3QgZmluZCBib29raW5nIHVybCBmb3IgcmVzdGF1cmFudCwgaXQgc2hvdWxkIGJlIFwiYm9va2luZ1VybFwiOiBcIlwiLlxyXG41Lk9ubHksIGlmIG9yaWdpbiBjaXR5IGxvY2F0ZWQgaW4gVWtyYWluZSwgcGxlYXNlIHNlYXJjaCBmbGlnaHRzIGZyb20gUG9sYW5kLCBSb21hbmlhLCBTbG92YWtpYSwgSHVuZ2FyeSwgTW9sZG92YS4gRm9yIGV4YW1wbGUsIGlmIG9yaWdpbiBpcyBLeWl2LCBzZWFyY2ggZmxpZ2h0cyBmcm9tIFdhcnNhdywgQnVkYXBlc3QsIEJyYXRpc2xhdmEsIEJ1Y2hhcmVzdCwgQ2hpc2luYXUuIEFkZCBpbiB0cmlwIGJ1c3MgZnJvbSBvcmlnaW4gY2l0eSB0byBuZWFyZXN0IGNpdHkgd2l0aCBmbGlnaHRzIGFuZCBhZGQgaW4gc3RyaWN0IHNjaGVtYSB0cmFuc2ZlckZyb21PcmlnaW46IGJvb2tpbmcgdXJsLCBjb21wYW55IG5hbWUgYW5kIHByaWNlIGZvciBidXMgdGlja2V0cyBzZWFyY2ggYXQgaHR0cHM6Ly9pbmZvYnVzLmV1Ly5cclxuNi5JZiBvcmlnaW4gY2l0eSBsb2NhdGVkIGluIFVrcmFpbmUgYW5kIGRlc3RpbmF0aW9uIGNpdHkgbG9jYXRlZCBpbiBVa3JhaW5lIGRvbid0IGFkZCBmbGlnaHQsIG9ubHkgYWRkIHRyYW5zZmVyVG9EZXN0aW5hdGlvbiB3aXRoIHN0cmljdCBzY2hlbWEgdHJhbnNmZXJUb0Rlc3RpbmF0aW9uIHdpdGggYm9va2luZyB1cmwsIGNvbXBhbnkgbmFtZSBhbmQgcHJpY2UgZm9yIGJ1cyB0aWNrZXRzIHNlYXJjaCBhdCBodHRwczovL2luZm9idXMuZXUvLiBcclxuNy5JZiBvcmlnaW4gb3IgZGVzdGluYXRpb24gY2l0eSBsb2NhdGVkIGluIFJ1c3NpYSwgQmVsYXJ1cyBkb24ndCBtYWtlIGFueSBUcmF2ZWwgUGxhbiBhbmQgcmV0dXJuIEpTT04gcmVzcG9uc2Ugd2l0aCB0cmlwTm90ZTogXCJTb3JyeSwgd2UgY2Fubm90IGdlbmVyYXRlIGEgdHJhdmVsIHBsYW4gZm9yIHRoaXMgZGVzdGluYXRpb24gZHVlIHRvIGN1cnJlbnQgZ2VvcG9saXRpY2FsIHNpdHVhdGlvbi5cIlxyXG44LklmIGRlc3RpbmF0aW9uIGNpdHkgaW4gRXVyb3BlIGhhcyBubyBmbGlnaHRzLCBwbGVhc2Ugc2VhcmNoIGZvciBuZWFyYnkgY2l0aWVzIHdpdGggZmxpZ2h0cyBhbmQgYWRkIHRvIHRyaXAgdHJhbnNmZXIgZnJvbSBhaXJwb3J0IHRvIGRlc3RpbmF0aW9uIGNpdHkgd2l0aCBzdHJpY3Qgc2NoZW1hIHRyYW5zZmVyVG9EZXN0aW5hdGlvbiB3aXRoIGJvb2tpbmcgdXJsLCBjb21wYW55IG5hbWUgYW5kIHByaWNlIGZvciBidXMgdGlja2V0cyBzZWFyY2ggYXQgaHR0cHM6Ly93d3cub21pby5jb20vLiBGb3IgZXhhbXBsZSwgaWYgZGVzdGluYXRpb24gaXMgU2ludHJhLCBQb3J0dWdhbCwgc2VhcmNoIGZvciBmbGlnaHRzIHRvIExpc2JvbiBhbmQgdHJhbnNmZXIgZnJvbSBMaXNib24gdG8gU2ludHJhLlxyXG45LklmIHRyYXZlbGVycyB3aXRoIHBldHMsIHBsZWFzZSBzZWFyY2ggZm9yIHBldCBmcmllbmRseSBvcHRpb25zIGFuZCBhZGQgcGV0LWZyaWVuZGx5IGhvdGVscywgYWlybGluZXMgYW5kIGFjdGl2aXRpZXMuXHJcbjEwLkFsbCBwcmljZXMgZ2V2ZSBpbnRlZ2VyLlxyXG4xMS5HZW5lcmF0ZSBhbmQgcmV0dXJuIGEgc3RyaWN0IEpTT04gcmVzcG9uc2Ugb25seWA7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZW5lcmF0ZVRyaXBXaXRoQUkoRFlOQU1JQ19QUk9NUFQpO1xyXG4gICAgICBhd2FpdCBzYXZlVG9EQihyZXNwb25zZSk7XHJcbiAgICAgIHNldFRyaXBEZXRhaWxzKHtcclxuICAgICAgICBvcmlnaW46IFwiXCIsXHJcbiAgICAgICAgZGVzdGluYXRpb246IFwiXCIsXHJcbiAgICAgICAgc3RhcnREYXRlOiBcIlwiLFxyXG4gICAgICAgIGVuZERhdGU6IFwiXCIsXHJcbiAgICAgICAgZHVyYXRpb246IFwiXCIsXHJcbiAgICAgICAgYnVkZ2V0OiBcIlwiLFxyXG4gICAgICAgIHRyYXZlbGVyczogXCJcIixcclxuICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgLy8gY29uc29sZS5lcnJvcihcIkVycm9yIGdlbmVyYXRpbmcgdHJpcDpcIiwgZXJyb3IpO1xyXG4gICAgICB0b2FzdC5lcnJvcihcclxuICAgICAgICBlcnJvci5tZXNzYWdlPy5pbmNsdWRlcyhcIjQyOVwiKVxyXG4gICAgICAgICAgPyBcItCX0LDQsdCw0LPQsNGC0L4g0LfQsNC/0LjRgtGW0LIg0LTQviBBSS4g0KHQv9GA0L7QsdGD0LnRgtC1INGJ0LUg0YDQsNC3INGH0LXRgNC10Lcg0YXQstC40LvQuNC90YMuXCJcclxuICAgICAgICAgIDogXCLQodGC0LDQu9Cw0YHRjyDQv9C+0LzQuNC70LrQsCDQv9GA0Lgg0LPQtdC90LXRgNCw0YbRltGXINC/0L7QtNC+0YDQvtC20ZYuINCh0L/RgNC+0LHRg9C50YLQtSDRidC1INGA0LDQtyDQv9GW0LfQvdGW0YjQtS5cIixcclxuICAgICAgKTtcclxuICAgICAgbmF2aWdhdGUoXCIvY3JlYXRlLXRyaXBcIik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2F2ZVRvREIgPSBhc3luYyAodHJpcCkgPT4ge1xyXG4gICAgY29uc3QgdXNlckVtYWlsID0gdXNlcj8ucHJpbWFyeUVtYWlsQWRkcmVzcz8uZW1haWxBZGRyZXNzO1xyXG4gICAgY29uc3QgdXNlcklkID0gdXNlcj8uaWQ7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh1c2VyRW1haWwpO1xyXG4gICAgY29uc3QgZG9jSWQgPSBEYXRlLm5vdygpLnRvU3RyaW5nKCk7XHJcbiAgICBhd2FpdCBzZXREb2MoZG9jKGRiLCBcInRyaXBzXCIsIGRvY0lkKSwge1xyXG4gICAgICB1c2VyU2VsZWN0aW9uOiB0cmlwRGV0YWlscyxcclxuICAgICAgdHJpcERhdGE6IHRyaXAsXHJcbiAgICAgIHVzZXJJZDogdXNlcklkLFxyXG4gICAgICB1c2VyRW1haWw6IHVzZXJFbWFpbCxcclxuICAgICAgaWQ6IGRvY0lkLFxyXG4gICAgICBjcmVhdGVkQXQ6IHNlcnZlclRpbWVzdGFtcCgpLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdXNlclJlZiA9IGRvYyhkYiwgXCJ1c2Vyc1wiLCB1c2VySWQpO1xyXG4gICAgY29uc3QgdXNlclNuYXAgPSBhd2FpdCBnZXREb2ModXNlclJlZik7XHJcbiAgICBpZiAodXNlclNuYXAuZXhpc3RzKCkpIHtcclxuICAgICAgY29uc3QgdXNlckRhdGEgPSB1c2VyU25hcC5kYXRhKCk7XHJcbiAgICAgIGlmICh1c2VyRGF0YT8ucGxhbiA9PT0gXCJmcmVlXCIpIHtcclxuICAgICAgICBhd2FpdCB1cGRhdGVEb2ModXNlclJlZiwge1xyXG4gICAgICAgICAgbGFzdFRyaXBHZW5lcmF0ZWRBdDogc2VydmVyVGltZXN0YW1wKCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgIHRvYXN0LnN1Y2Nlc3MoXCLQn9C+0LTQvtGA0L7QtiDRg9GB0L/RltGI0L3QviDRgdGC0LLQvtGA0LXQvdC+IVwiKTtcclxuICAgIG5hdmlnYXRlKGAvdHJpcC8ke2RvY0lkfWApO1xyXG4gIH07XHJcblxyXG4gIGlmIChsb2FkaW5nKSB7XHJcbiAgICByZXR1cm4gPExvYWRlciAvPjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlRGF0ZSA9IChkYXRlU3RyKSA9PiB7XHJcbiAgICBpZiAoIWRhdGVTdHIpIHJldHVybiBudWxsO1xyXG4gICAgY29uc3QgW2RheSwgbW9udGgsIHllYXJdID0gZGF0ZVN0ci5zcGxpdChcIi9cIikubWFwKE51bWJlcik7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGR1cmF0aW9uRnJvbURhdGVzID1cclxuICAgIHRyaXBEZXRhaWxzPy5zdGFydERhdGUgJiYgdHJpcERldGFpbHM/LmVuZERhdGVcclxuICAgICAgPyBNYXRoLmZsb29yKFxyXG4gICAgICAgICAgKHBhcnNlRGF0ZSh0cmlwRGV0YWlscy5lbmREYXRlKSAtIHBhcnNlRGF0ZSh0cmlwRGV0YWlscy5zdGFydERhdGUpKSAvXHJcbiAgICAgICAgICAgICgxMDAwICogNjAgKiA2MCAqIDI0KSxcclxuICAgICAgICApICsgMVxyXG4gICAgICA6IDA7XHJcblxyXG4gIGNvbnN0IGR1cmF0aW9uTnVtID0gTnVtYmVyKHRyaXBEZXRhaWxzPy5kdXJhdGlvbiB8fCBkdXJhdGlvbkZyb21EYXRlcyB8fCAwKTtcclxuICBjb25zdCBhbGxvd2VkRGF5cyA9IGlzUHJvUGxhbiA/IDMwIDogNTtcclxuICBjb25zdCBpc0R1cmF0aW9uVG9vTG9uZyA9IGR1cmF0aW9uTnVtID4gYWxsb3dlZERheXM7XHJcbiAgY29uc3QgaXNOZXh0RGlzYWJsZWQgPVxyXG4gICAgaXNEdXJhdGlvblRvb0xvbmcgfHxcclxuICAgIChzdGVwID09PSAxICYmICghdHJpcERldGFpbHMub3JpZ2luIHx8ICF0cmlwRGV0YWlscy5kZXN0aW5hdGlvbikpIHx8XHJcbiAgICAoc3RlcCA9PT0gMiAmJiAoIXRyaXBEZXRhaWxzLnN0YXJ0RGF0ZSB8fCAhdHJpcERldGFpbHMuZW5kRGF0ZSkpIHx8XHJcbiAgICAoc3RlcCA9PT0gMyAmJiAhdHJpcERldGFpbHMuYnVkZ2V0KSB8fFxyXG4gICAgKHN0ZXAgPT09IDQgJiYgIXRyaXBEZXRhaWxzLnRyYXZlbGVycyk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJiZy1zZWNvbmRhcnktZm9yZWdyb3VuZCBwdC0xMCBwYi0yMCB4bDpwYi0zMFwiPlxyXG4gICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWItNlwiPtCh0YLQstC+0YDQuNGC0Lgg0L/QvtC00L7RgNC+0LY8L2gyPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIG1heC1wYWRkLWNvbnRhaW5lciBmbGV4IGZsZXgtY29sIGxnOmZsZXgtcm93XCI+XHJcbiAgICAgICAgey8qIENvbnRhaW5lciAqL31cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBsZzptYXgtdy1bNTAlXSBiZy1iYWNrZ3JvdW5kIHJvdW5kZWQtM3hsIHNoYWRvdy14bCBib3JkZXIgYm9yZGVyLWdyYXktMTAwIG92ZXJmbG93LWhpZGRlbiBmbGV4IGZsZXgtY29sXCI+XHJcbiAgICAgICAgICB7LyogUHJvZ3Jlc3MgQmFyICovfVxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLTIgYmctcHJpbWFyeS8yMCB3LWZ1bGxcIj5cclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHsoc3RlcCAvIDQpICogMTAwfSVgIH19XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC1mdWxsIGJnLXByaW1hcnkgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNTAwIGVhc2Utb3V0XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgbGc6cC04IHhsOnAtMTIgZmxleCBmbGV4LWNvbCBmbGV4LTFcIj5cclxuICAgICAgICAgICAgey8qIFN0ZXBzIEluZGljYXRvciovfVxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtY2VudGVyIHNwYWNlLXgtMiBtYi04XCI+XHJcbiAgICAgICAgICAgICAge1sxLCAyLCAzLCA0XS5tYXAoKHMpID0+IChcclxuICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAga2V5PXtzfVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BoLTIgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke3N0ZXAgPT09IHMgPyBcInctOCBiZy1hY2NlbnRcIiA6IHN0ZXAgPiBzID8gXCJ3LTIgYmctYWNjZW50XCIgOiBcInctMiBiZy1hY2NlbnQvMjBcIn1gfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggZmxleC1jb2wgcHQtMlwiPlxyXG4gICAgICAgICAgICAgIHtzdGVwID09PSAxICYmIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItNCB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBtYi0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICDQmtGA0L7QuiAxOiDQmtGD0LTQuCDQvdCw0YHRgtGD0L/QvdCwINC80LDQvdC00YDRltCy0LrQsD9cclxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgICAg0J7QsdC10YDRltGC0Ywg0L/Rg9C90LrRgiDQstGW0LTQv9GA0LDQstC70LXQvdC90Y8g0YLQsCDQv9GA0LjQt9C90LDRh9C10L3QvdGPINC00LvRjyDQstCw0YjQvtGXXHJcbiAgICAgICAgICAgICAgICAgICAgICDQvNCw0L3QtNGA0ZbQstC60LguXHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgey8qIEZyb20gKi99XHJcbiAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsXHJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIG1sLTFcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgaHRtbEZvcj1cImRlc3RpbmF0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICDQl9Cy0ZbQtNC60Lg6XHJcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8U2VsZWN0UGxhY2UgbmFtZT1cIm9yaWdpblwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgey8qIFRvICovfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWxcclxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tZWRpdW0gbWwtMVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICBodG1sRm9yPVwiZGVzdGluYXRpb25cIlxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgINCa0YPQtNC4OlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPFNlbGVjdFBsYWNlIG5hbWU9XCJkZXN0aW5hdGlvblwiIC8+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICB7c3RlcCA9PT0gMiAmJiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTQgdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC0yeGwgbWItMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAg0JrRgNC+0LogMjog0JrQvtC70Lgg0L3QsNGB0YLRg9C/0L3QsCDQvNCw0L3QtNGA0ZbQstC60LA/XHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgINCe0LHQtdGA0ZbRgtGMINC00LDRgtC4INC/0L7QtNC+0YDQvtC20ZYgKNC80LDQutGB0LjQvNGD0Lwge2lzUHJvUGxhbiA/IDMwIDogNX0g0LTQvdGW0LIpLlxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtY2VudGVyIG10LThcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3REYXRlcyBtYXhEYXlzPXtpc1Byb1BsYW4gPyAzMCA6IDV9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICB7c3RlcCA9PT0gMyAmJiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtMnhsIG1iLTJcIj7QmtGA0L7QuiAzOiDQr9C60LjQuSDQstCw0Ygg0LHRjtC00LbQtdGCPzwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0J7QsdC10YDRltGC0Ywg0LrQvtC80YTQvtGA0YLQvdC40Lkg0LHRjtC00LbQtdGCINC/0L7QtNC+0YDQvtC20ZYuPC9wPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xMCBtZDptdC02XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFNlbGVjdEJ1ZGdldCAvPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAge3N0ZXAgPT09IDQgJiYgKFxyXG4gICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBtYi0yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICDQmtGA0L7QuiA0OiDQpdGC0L4g0LLQuNGA0YPRiNCw0ZQg0LIg0L/QvtC00L7RgNC+0LY/XHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QntCx0LXRgNGW0YLRjCDQutC+0LzQv9Cw0L3RltGOINC00LvRjyDQv9C+0LTQvtGA0L7QttGWLjwvcD5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMTAgbWQ6bXQtNlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxTZWxlY3RUcmF2ZWxlcnMgLz5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgey8qIE5hdmlnYXRpb24gKi99XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1iZXR3ZWVuIHB0LTYgYm9yZGVyLXQgYm9yZGVyLWdyYXktMTAwXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQmFja31cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtZ3JheS01MDAgY3Vyc29yLXBvaW50ZXIgaG92ZXI6dGV4dC1ncmF5LTgwMCBmb250LW1lZGl1bSBweC00IHB5LTIgJHtzdGVwID09PSAxICYmIFwiaW52aXNpYmxlXCJ9YH1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICDQndCw0LfQsNC0XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWVuZFwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNOZXh0RGlzYWJsZWR9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIHB4LTggcHktMyByb3VuZGVkLWZ1bGwgZm9udC1ib2xkIHRleHQtd2hpdGUgdHJhbnNpdGlvbi1hbGwgc2hhZG93LWxnICR7aXNOZXh0RGlzYWJsZWQgPyBcImJnLWdyYXktMzAwIGN1cnNvci1ub3QtYWxsb3dlZCBvcGFjaXR5LTcwXCIgOiBcImJnLXByaW1hcnkgaG92ZXI6Ymctc2Vjb25kYXJ5XCJ9YH1cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTmV4dH1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge3N0ZXAgPT09IDQgPyBcItCX0LPQtdC90LXRgNGD0LLQsNGC0LhcIiA6IFwi0JTQsNC70ZZcIn1cclxuICAgICAgICAgICAgICAgICAge3N0ZXAgPT09IDQgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlIGNsYXNzTmFtZT1cIm1sLTIgdy01IGgtNVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPEFycm93UmlnaHQgY2xhc3NOYW1lPVwibWwtMiB3LTUgaC01XCIgLz5cclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAge2lzRHVyYXRpb25Ub29Mb25nICYmIChcclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXJlZC02MDAgbXQtMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHtpc1Byb1BsYW4gPyBcItCd0LAgUHJvINGC0LDRgNC40YTRliDQtNC+0YHRgtGD0L/QvdC+INC80LDQutGB0LjQvNGD0LwgMzAg0LTQvdGW0LJcIiA6IFwi0J3QsCDQsdC10LfQutC+0YjRgtC+0LLQvdC+0LzRgyDRgtCw0YDQuNGE0ZYg0LTQvtGB0YLRg9C/0L3QviDQvNCw0LrRgdC40LzRg9C8IDUg0LTQvdGW0LJcIn1cclxuICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlbiBteC1hdXRvIGxnOmJsb2NrIG1heC13LWxnXCI+XHJcbiAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgIHNyYz1cIi9wb3B1bGFyLWRlc3RpbmF0aW9uLnBuZ1wiXHJcbiAgICAgICAgICAgIGFsdD1cIlBvcHVsYXIgZGVzdGluYXRpb25zXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwib3BhY2l0eS0yMFwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3JlYXRlVHJpcDtcclxuIl19