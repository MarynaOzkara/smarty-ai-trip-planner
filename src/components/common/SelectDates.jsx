import { useContext, useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { uk } from "date-fns/locale";
import moment from "moment/moment";
import "moment/locale/uk";
import { TripContext } from "../../provider/TripContext";
import { useUser } from "@clerk/react";
import { toast } from "sonner";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

moment.locale("uk");

export function SelectDates({ maxDays: maxDaysProp } = {}) {
  const { tripDetails, setTripDetails } = useContext(TripContext);
  const { user } = useUser();
  const [maxDays, setMaxDays] = useState(maxDaysProp ?? 5);
  const [date, setDate] = useState(() => {
    if (tripDetails?.startDate && tripDetails?.endDate) {
      return {
        from: moment(tripDetails.startDate, "DD/MM/YYYY").toDate(),
        to: moment(tripDetails.endDate, "DD/MM/YYYY").toDate(),
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
  // console.log("Max days", maxDays);

  const handleSelect = (selected) => {
    const s = selected?.from ? moment(selected.from).format("DD/MM/YYYY") : "";
    const e = selected?.to ? moment(selected.to).format("DD/MM/YYYY") : "";
    const d =
      selected?.from && selected?.to
        ? moment(selected.to).diff(moment(selected.from), "days") + 1
        : "";

    if (d && d > maxDays) {
      toast.error(
        maxDays === 30
          ? "На Pro тарифі доступно максимум 30 днів"
          : "На безкоштовному тарифі доступно максимум 5 днів",
      );
      setDate({ from: selected?.from, to: undefined });
      setTripDetails({
        ...tripDetails,
        startDate: "",
        endDate: "",
        duration: "",
      });
      return;
    }

    setDate(selected);

    if (s && e) {
      setTripDetails({
        ...tripDetails,
        startDate: s,
        endDate: e,
        duration: d,
      });
    }
  };

  const isDateDisabled = (currentDate) => {
    const today = moment().startOf("day").toDate();

    if (currentDate < today) {
      return true;
    }

    if (date?.from && !date?.to) {
      const maxEndDate = moment(date.from)
        .add(maxDays - 1, "days")
        .endOf("day")
        .toDate();
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
      duration: "",
    });
  };

  return (
    <Field className="mx-auto w-150">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-range"
            className="justify-start w-full rounded-xl p-6 font-normal border-gray-200 bg-gray-50 text-gray-400 hover:border-secondary hover:bg-transparent cursor-pointer"
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {moment(date?.from).format("D MMMM")} -{" "}
                  {moment(date?.to).format("D MMMM")}
                </>
              ) : (
                moment(date?.from).format("D MMMM")
              )
            ) : (
              <span>Оберіть дати</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3">
            <Calendar
              mode="range"
              locale={uk}
              disabled={isDateDisabled}
              selected={date}
              onSelect={handleSelect}
              numberOfMonths={1}
              className="[--cell-size:--spacing(8)] md:[--cell-size:--spacing(9)]"
            />
            <div className="mt-3 flex justify-end">
              <Button variant="ghost" onClick={clearDates} className="text-sm">
                Очистити
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </Field>
  );
}
