import { useContext, useEffect, useState } from "react";
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

moment.locale("uk");

export function SelectDates() {
  const { tripDetails, setTripDetails } = useContext(TripContext);
  const [date, setDate] = useState();

  const startDate = date?.from ? moment(date?.from).format("DD/MM/YYYY") : "";
  const endDate = date?.to ? moment(date?.to).format("DD/MM/YYYY") : "";
  const duration = moment(date?.to).diff(moment(date?.from), "days") + 1 || "";
  // console.log(startDate, endDate, duration);

  useEffect(() => {
    if (startDate && endDate) {
      setTripDetails({
        ...tripDetails,
        startDate: startDate,
        endDate: endDate,
        duration: duration,
      });
    }
  }, [setTripDetails, tripDetails, startDate, endDate, duration]);

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
          <Calendar
            mode="range"
            min={1}
            max={4}
            locale={uk}
            disabled={(date) => date < new Date()}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            className="[--cell-size:--spacing(8)] md:[--cell-size:--spacing(9)]"
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
