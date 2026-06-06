import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/components/common/SelectDates.jsx");const useContext = __vite__cjsImport0_react["useContext"]; const useState = __vite__cjsImport0_react["useState"]; const useEffect = __vite__cjsImport0_react["useEffect"];const moment = __vite__cjsImport7_moment_moment;const _Fragment = __vite__cjsImport14_react_jsxDevRuntime["Fragment"]; const _jsxDEV = __vite__cjsImport14_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=b3854477";
import { CalendarIcon } from "/node_modules/.vite/deps/lucide-react.js?v=b3854477";
import { Button } from "/src/components/ui/button.jsx";
import { Calendar } from "/src/components/ui/calendar.jsx";
import { Field } from "/src/components/ui/field.jsx";
import { Popover, PopoverContent, PopoverTrigger } from "/src/components/ui/popover.jsx";
import { uk } from "/node_modules/.vite/deps/date-fns_locale.js?v=b3854477";
import __vite__cjsImport7_moment_moment from "/node_modules/.vite/deps/moment_moment.js?v=b3854477";
import "/node_modules/.vite/deps/moment_locale_uk.js?v=b3854477";
import { TripContext } from "/src/provider/TripContext.js";
import { useUser } from "/node_modules/.vite/deps/@clerk_react.js?v=b3854477";
import { toast } from "/node_modules/.vite/deps/sonner.js?v=b3854477";
import { doc, getDoc } from "/node_modules/.vite/deps/firebase_firestore.js?v=b3854477";
import { db } from "/src/services/firebaseConfig.js";
var _jsxFileName = "C:/Users/admin/OneDrive/Документи/GitHub/smarty-ai-trip-planner/src/components/common/SelectDates.jsx";
import __vite__cjsImport14_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=b3854477";
var _s = $RefreshSig$();
moment.locale("uk");
export function SelectDates({ maxDays: maxDaysProp } = {}) {
	_s();
	const { tripDetails, setTripDetails } = useContext(TripContext);
	const { user } = useUser();
	const [maxDays, setMaxDays] = useState(maxDaysProp ?? 5);
	const [date, setDate] = useState(() => {
		if (tripDetails?.startDate && tripDetails?.endDate) {
			return {
				from: moment(tripDetails.startDate, "DD/MM/YYYY").toDate(),
				to: moment(tripDetails.endDate, "DD/MM/YYYY").toDate()
			};
		}
		return undefined;
	});
	useEffect(() => {
		if (maxDaysProp !== undefined) return;
		const loadUserPlan = async () => {
			if (!user?.id) return;
			const userSnap = await getDoc(doc(db, "users", user.id));
			if (userSnap.exists()) {
				const userData = userSnap.data();
				const plan = userData?.plan;
				setMaxDays(plan === "pro" ? 30 : 5);
			}
		};
		loadUserPlan();
	}, [user.id]);
	console.log("Max days", maxDays);
	const handleSelect = (selected) => {
		const s = selected?.from ? moment(selected.from).format("DD/MM/YYYY") : "";
		const e = selected?.to ? moment(selected.to).format("DD/MM/YYYY") : "";
		const d = selected?.from && selected?.to ? moment(selected.to).diff(moment(selected.from), "days") + 1 : "";
		if (d && d > maxDays) {
			toast.error(maxDays === 30 ? "На Pro тарифі доступно максимум 30 днів" : "На безкоштовному тарифі доступно максимум 5 днів");
			setDate({
				from: selected?.from,
				to: undefined
			});
			setTripDetails({
				...tripDetails,
				startDate: "",
				endDate: "",
				duration: ""
			});
			return;
		}
		setDate(selected);
		if (s && e) {
			setTripDetails({
				...tripDetails,
				startDate: s,
				endDate: e,
				duration: d
			});
		}
	};
	const isDateDisabled = (currentDate) => {
		const today = moment().startOf("day").toDate();
		if (currentDate < today) {
			return true;
		}
		if (date?.from && !date?.to) {
			const maxEndDate = moment(date.from).add(maxDays - 1, "days").endOf("day").toDate();
			return currentDate > maxEndDate;
		}
		return false;
	};
	const clearDates = () => {
		setDate(undefined);
		setTripDetails({
			...tripDetails,
			startDate: "",
			endDate: "",
			duration: ""
		});
	};
	return /* @__PURE__ */ _jsxDEV(Field, {
		className: "mx-auto w-150",
		children: /* @__PURE__ */ _jsxDEV(Popover, { children: [/* @__PURE__ */ _jsxDEV(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ _jsxDEV(Button, {
				variant: "outline",
				id: "date-picker-range",
				className: "justify-start w-full rounded-xl p-6 font-normal border-gray-200 bg-gray-50 text-gray-400 hover:border-secondary hover:bg-transparent cursor-pointer",
				children: [/* @__PURE__ */ _jsxDEV(CalendarIcon, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 120,
					columnNumber: 13
				}, this), date?.from ? date.to ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [
					moment(date?.from).format("D MMMM"),
					" -",
					" ",
					moment(date?.to).format("D MMMM")
				] }, void 0, true) : moment(date?.from).format("D MMMM") : /* @__PURE__ */ _jsxDEV("span", { children: "Оберіть дати" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 131,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 115,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 114,
			columnNumber: 9
		}, this), /* @__PURE__ */ _jsxDEV(PopoverContent, {
			className: "w-auto p-0",
			align: "start",
			children: /* @__PURE__ */ _jsxDEV("div", {
				className: "p-3",
				children: [/* @__PURE__ */ _jsxDEV(Calendar, {
					mode: "range",
					locale: uk,
					disabled: isDateDisabled,
					selected: date,
					onSelect: handleSelect,
					numberOfMonths: 1,
					className: "[--cell-size:--spacing(8)] md:[--cell-size:--spacing(9)]"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 137,
					columnNumber: 13
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "mt-3 flex justify-end",
					children: /* @__PURE__ */ _jsxDEV(Button, {
						variant: "ghost",
						onClick: clearDates,
						className: "text-sm",
						children: "Очистити"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 147,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 146,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 136,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 135,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 113,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 112,
		columnNumber: 5
	}, this);
}
_s(SelectDates, "EPWPobGFaQe6neuW4X97r58ZziU=", false, function() {
	return [useUser];
});
_c = SelectDates;
var _c;
$RefreshReg$(_c, "SelectDates");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/components/common/SelectDates.jsx";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/admin/OneDrive/Документи/GitHub/smarty-ai-trip-planner/src/components/common/SelectDates.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/admin/OneDrive/Документи/GitHub/smarty-ai-trip-planner/src/components/common/SelectDates.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "C:/Users/admin/OneDrive/Документи/GitHub/smarty-ai-trip-planner/src/components/common/SelectDates.jsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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QUFDLE9BQUQ7RUFBTyxXQUFVO1lBQ2Ysd0JBQUMsU0FBRCxhQUNFLHdCQUFDLGdCQUFEO0dBQWdCO2FBQ2Qsd0JBQUMsUUFBRDtJQUNFLFNBQVE7SUFDUixJQUFHO0lBQ0gsV0FBVTtjQUhaLENBS0Usd0JBQUMsY0FBRCxFQUFnQjs7OztjQUNmLE1BQU0sT0FDTCxLQUFLLEtBQ0g7S0FDRyxPQUFPLE1BQU0sS0FBSyxDQUFDLE9BQU8sU0FBUztLQUFDO0tBQUc7S0FDdkMsT0FBTyxNQUFNLEdBQUcsQ0FBQyxPQUFPLFNBQVM7S0FDakMsb0JBRUgsT0FBTyxNQUFNLEtBQUssQ0FBQyxPQUFPLFNBQVMsR0FHckMsd0JBQUMsUUFBRCxZQUFNLGdCQUFtQjs7OzthQUVwQjs7Ozs7O0dBQ007Ozs7WUFDakIsd0JBQUMsZ0JBQUQ7R0FBZ0IsV0FBVTtHQUFhLE9BQU07YUFDM0Msd0JBQUMsT0FBRDtJQUFLLFdBQVU7Y0FBZixDQUNFLHdCQUFDLFVBQUQ7S0FDRSxNQUFLO0tBQ0wsUUFBUTtLQUNSLFVBQVU7S0FDVixVQUFVO0tBQ1YsVUFBVTtLQUNWLGdCQUFnQjtLQUNoQixXQUFVO0tBQ1Y7Ozs7Y0FDRix3QkFBQyxPQUFEO0tBQUssV0FBVTtlQUNiLHdCQUFDLFFBQUQ7TUFBUSxTQUFRO01BQVEsU0FBUztNQUFZLFdBQVU7Z0JBQVU7TUFFeEQ7Ozs7O0tBQ0w7Ozs7YUFDRjs7Ozs7O0dBQ1M7Ozs7V0FDVDs7Ozs7RUFDSjs7Ozs7Ozs7RUFFWCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJTZWxlY3REYXRlcy5qc3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlQ29udGV4dCwgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBDYWxlbmRhckljb24gfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvYnV0dG9uXCI7XHJcbmltcG9ydCB7IENhbGVuZGFyIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9jYWxlbmRhclwiO1xyXG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvZmllbGRcIjtcclxuaW1wb3J0IHtcclxuICBQb3BvdmVyLFxyXG4gIFBvcG92ZXJDb250ZW50LFxyXG4gIFBvcG92ZXJUcmlnZ2VyLFxyXG59IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvcG9wb3ZlclwiO1xyXG5pbXBvcnQgeyB1ayB9IGZyb20gXCJkYXRlLWZucy9sb2NhbGVcIjtcclxuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50L21vbWVudFwiO1xyXG5pbXBvcnQgXCJtb21lbnQvbG9jYWxlL3VrXCI7XHJcbmltcG9ydCB7IFRyaXBDb250ZXh0IH0gZnJvbSBcIi4uLy4uL3Byb3ZpZGVyL1RyaXBDb250ZXh0XCI7XHJcbmltcG9ydCB7IHVzZVVzZXIgfSBmcm9tIFwiQGNsZXJrL3JlYWN0XCI7XHJcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSBcInNvbm5lclwiO1xyXG5pbXBvcnQgeyBkb2MsIGdldERvYyB9IGZyb20gXCJmaXJlYmFzZS9maXJlc3RvcmVcIjtcclxuaW1wb3J0IHsgZGIgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmlyZWJhc2VDb25maWdcIjtcclxuXHJcbm1vbWVudC5sb2NhbGUoXCJ1a1wiKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBTZWxlY3REYXRlcyh7IG1heERheXM6IG1heERheXNQcm9wIH0gPSB7fSkge1xyXG4gIGNvbnN0IHsgdHJpcERldGFpbHMsIHNldFRyaXBEZXRhaWxzIH0gPSB1c2VDb250ZXh0KFRyaXBDb250ZXh0KTtcclxuICBjb25zdCB7IHVzZXIgfSA9IHVzZVVzZXIoKTtcclxuICBjb25zdCBbbWF4RGF5cywgc2V0TWF4RGF5c10gPSB1c2VTdGF0ZShtYXhEYXlzUHJvcCA/PyA1KTtcclxuICBjb25zdCBbZGF0ZSwgc2V0RGF0ZV0gPSB1c2VTdGF0ZSgoKSA9PiB7XHJcbiAgICBpZiAodHJpcERldGFpbHM/LnN0YXJ0RGF0ZSAmJiB0cmlwRGV0YWlscz8uZW5kRGF0ZSkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGZyb206IG1vbWVudCh0cmlwRGV0YWlscy5zdGFydERhdGUsIFwiREQvTU0vWVlZWVwiKS50b0RhdGUoKSxcclxuICAgICAgICB0bzogbW9tZW50KHRyaXBEZXRhaWxzLmVuZERhdGUsIFwiREQvTU0vWVlZWVwiKS50b0RhdGUoKSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAobWF4RGF5c1Byb3AgIT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgbG9hZFVzZXJQbGFuID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBpZiAoIXVzZXI/LmlkKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IHVzZXJTbmFwID0gYXdhaXQgZ2V0RG9jKGRvYyhkYiwgXCJ1c2Vyc1wiLCB1c2VyLmlkKSk7XHJcbiAgICAgIGlmICh1c2VyU25hcC5leGlzdHMoKSkge1xyXG4gICAgICAgIGNvbnN0IHVzZXJEYXRhID0gdXNlclNuYXAuZGF0YSgpO1xyXG4gICAgICAgIGNvbnN0IHBsYW4gPSB1c2VyRGF0YT8ucGxhbjtcclxuICAgICAgICBzZXRNYXhEYXlzKHBsYW4gPT09IFwicHJvXCIgPyAzMCA6IDUpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgbG9hZFVzZXJQbGFuKCk7XHJcbiAgfSwgW3VzZXIuaWRdKTtcclxuICBjb25zb2xlLmxvZyhcIk1heCBkYXlzXCIsIG1heERheXMpO1xyXG5cclxuICBjb25zdCBoYW5kbGVTZWxlY3QgPSAoc2VsZWN0ZWQpID0+IHtcclxuICAgIGNvbnN0IHMgPSBzZWxlY3RlZD8uZnJvbSA/IG1vbWVudChzZWxlY3RlZC5mcm9tKS5mb3JtYXQoXCJERC9NTS9ZWVlZXCIpIDogXCJcIjtcclxuICAgIGNvbnN0IGUgPSBzZWxlY3RlZD8udG8gPyBtb21lbnQoc2VsZWN0ZWQudG8pLmZvcm1hdChcIkREL01NL1lZWVlcIikgOiBcIlwiO1xyXG4gICAgY29uc3QgZCA9XHJcbiAgICAgIHNlbGVjdGVkPy5mcm9tICYmIHNlbGVjdGVkPy50b1xyXG4gICAgICAgID8gbW9tZW50KHNlbGVjdGVkLnRvKS5kaWZmKG1vbWVudChzZWxlY3RlZC5mcm9tKSwgXCJkYXlzXCIpICsgMVxyXG4gICAgICAgIDogXCJcIjtcclxuXHJcbiAgICBpZiAoZCAmJiBkID4gbWF4RGF5cykge1xyXG4gICAgICB0b2FzdC5lcnJvcihtYXhEYXlzID09PSAzMCA/IFwi0J3QsCBQcm8g0YLQsNGA0LjRhNGWINC00L7RgdGC0YPQv9C90L4g0LzQsNC60YHQuNC80YPQvCAzMCDQtNC90ZbQslwiIDogXCLQndCwINCx0LXQt9C60L7RiNGC0L7QstC90L7QvNGDINGC0LDRgNC40YTRliDQtNC+0YHRgtGD0L/QvdC+INC80LDQutGB0LjQvNGD0LwgNSDQtNC90ZbQslwiKTtcclxuICAgICAgc2V0RGF0ZSh7IGZyb206IHNlbGVjdGVkPy5mcm9tLCB0bzogdW5kZWZpbmVkIH0pO1xyXG4gICAgICBzZXRUcmlwRGV0YWlscyh7XHJcbiAgICAgICAgLi4udHJpcERldGFpbHMsXHJcbiAgICAgICAgc3RhcnREYXRlOiBcIlwiLFxyXG4gICAgICAgIGVuZERhdGU6IFwiXCIsXHJcbiAgICAgICAgZHVyYXRpb246IFwiXCIsXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGF0ZShzZWxlY3RlZCk7XHJcblxyXG4gICAgaWYgKHMgJiYgZSkge1xyXG4gICAgICBzZXRUcmlwRGV0YWlscyh7XHJcbiAgICAgICAgLi4udHJpcERldGFpbHMsXHJcbiAgICAgICAgc3RhcnREYXRlOiBzLFxyXG4gICAgICAgIGVuZERhdGU6IGUsXHJcbiAgICAgICAgZHVyYXRpb246IGQsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGlzRGF0ZURpc2FibGVkID0gKGN1cnJlbnREYXRlKSA9PiB7XHJcbiAgICBjb25zdCB0b2RheSA9IG1vbWVudCgpLnN0YXJ0T2YoXCJkYXlcIikudG9EYXRlKCk7XHJcblxyXG4gICAgaWYgKGN1cnJlbnREYXRlIDwgdG9kYXkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRhdGU/LmZyb20gJiYgIWRhdGU/LnRvKSB7XHJcbiAgICAgIGNvbnN0IG1heEVuZERhdGUgPSBtb21lbnQoZGF0ZS5mcm9tKVxyXG4gICAgICAgIC5hZGQobWF4RGF5cyAtIDEsIFwiZGF5c1wiKVxyXG4gICAgICAgIC5lbmRPZihcImRheVwiKVxyXG4gICAgICAgIC50b0RhdGUoKTtcclxuICAgICAgcmV0dXJuIGN1cnJlbnREYXRlID4gbWF4RW5kRGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgY2xlYXJEYXRlcyA9ICgpID0+IHtcclxuICAgIHNldERhdGUodW5kZWZpbmVkKTtcclxuICAgIHNldFRyaXBEZXRhaWxzKHtcclxuICAgICAgLi4udHJpcERldGFpbHMsXHJcbiAgICAgIHN0YXJ0RGF0ZTogXCJcIixcclxuICAgICAgZW5kRGF0ZTogXCJcIixcclxuICAgICAgZHVyYXRpb246IFwiXCIsXHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEZpZWxkIGNsYXNzTmFtZT1cIm14LWF1dG8gdy0xNTBcIj5cclxuICAgICAgPFBvcG92ZXI+XHJcbiAgICAgICAgPFBvcG92ZXJUcmlnZ2VyIGFzQ2hpbGQ+XHJcbiAgICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJvdXRsaW5lXCJcclxuICAgICAgICAgICAgaWQ9XCJkYXRlLXBpY2tlci1yYW5nZVwiXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImp1c3RpZnktc3RhcnQgdy1mdWxsIHJvdW5kZWQteGwgcC02IGZvbnQtbm9ybWFsIGJvcmRlci1ncmF5LTIwMCBiZy1ncmF5LTUwIHRleHQtZ3JheS00MDAgaG92ZXI6Ym9yZGVyLXNlY29uZGFyeSBob3ZlcjpiZy10cmFuc3BhcmVudCBjdXJzb3ItcG9pbnRlclwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxDYWxlbmRhckljb24gLz5cclxuICAgICAgICAgICAge2RhdGU/LmZyb20gPyAoXHJcbiAgICAgICAgICAgICAgZGF0ZS50byA/IChcclxuICAgICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICAgIHttb21lbnQoZGF0ZT8uZnJvbSkuZm9ybWF0KFwiRCBNTU1NXCIpfSAte1wiIFwifVxyXG4gICAgICAgICAgICAgICAgICB7bW9tZW50KGRhdGU/LnRvKS5mb3JtYXQoXCJEIE1NTU1cIil9XHJcbiAgICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgbW9tZW50KGRhdGU/LmZyb20pLmZvcm1hdChcIkQgTU1NTVwiKVxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICA8c3Bhbj7QntCx0LXRgNGW0YLRjCDQtNCw0YLQuDwvc3Bhbj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgIDwvUG9wb3ZlclRyaWdnZXI+XHJcbiAgICAgICAgPFBvcG92ZXJDb250ZW50IGNsYXNzTmFtZT1cInctYXV0byBwLTBcIiBhbGlnbj1cInN0YXJ0XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtM1wiPlxyXG4gICAgICAgICAgICA8Q2FsZW5kYXJcclxuICAgICAgICAgICAgICBtb2RlPVwicmFuZ2VcIlxyXG4gICAgICAgICAgICAgIGxvY2FsZT17dWt9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRGF0ZURpc2FibGVkfVxyXG4gICAgICAgICAgICAgIHNlbGVjdGVkPXtkYXRlfVxyXG4gICAgICAgICAgICAgIG9uU2VsZWN0PXtoYW5kbGVTZWxlY3R9XHJcbiAgICAgICAgICAgICAgbnVtYmVyT2ZNb250aHM9ezF9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiWy0tY2VsbC1zaXplOi0tc3BhY2luZyg4KV0gbWQ6Wy0tY2VsbC1zaXplOi0tc3BhY2luZyg5KV1cIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTMgZmxleCBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgICAgICAgIDxCdXR0b24gdmFyaWFudD1cImdob3N0XCIgb25DbGljaz17Y2xlYXJEYXRlc30gY2xhc3NOYW1lPVwidGV4dC1zbVwiPlxyXG4gICAgICAgICAgICAgICAg0J7Rh9C40YHRgtC40YLQuFxyXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvUG9wb3ZlckNvbnRlbnQ+XHJcbiAgICAgIDwvUG9wb3Zlcj5cclxuICAgIDwvRmllbGQ+XHJcbiAgKTtcclxufVxyXG4iXX0=