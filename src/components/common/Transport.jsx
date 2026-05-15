import { Bus, Plane, Ticket } from "lucide-react";
import { FaPlane } from "react-icons/fa";
import { FaBusSimple } from "react-icons/fa6";

const Transport = ({ trip }) => {
  return (
    trip && (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <Plane className="h-6 w-6 text-secondary" />
            <h4>{trip?.tripData?.flights?.airline}</h4>
          </div>
          <div className="flex-between mb-5">
            <h3 className="pr-2 text-xl">
              {trip?.tripData?.flights?.origin.split("(")[0]}
            </h3>
            <div className="relative pl-4 flex grow">
              <div className="before:content-[''] before:absolute before:top-1/2 before:left-0 before:right-0 before:w-full before:h-0.5 before:bg-accent"></div>
              <div className="absolute left-9 sm:left-50 md:left-16 -top-5 w-10 h-10 bg-secondary-foreground rounded-full flex-center z-10">
                <FaPlane className="text-accent" />
              </div>
            </div>
            <h3 className="pl-2 text-xl">
              {trip?.tripData?.flights?.destination.split("(")[0]}
            </h3>
          </div>
          <div className="flex-between">
            <div className="flex items-center gap-2">
              <Ticket />
              <p className="text-gray-600 font-bold">
                {trip?.tripData?.flights?.price} €
              </p>
            </div>
            <a
              href={trip?.tripData?.flights?.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer px-4 py-2 rounded-xl bg-accent hover:bg-secondary transition-colors"
            >
              <p className="text-white">Купити</p>
            </a>
          </div>
        </div>
        {/* Трансфер та інші види транспорту можна додати тут аналогічно */}
        {trip?.tripData?.transfer && (
          <div className="mt-8 border-t border-gray-200">
            <div className="mt-8 flex items-center gap-2 mb-2">
              <FaBusSimple className="h-6 w-6 text-secondary" />
              <h4>{trip?.tripData?.transfer?.company}</h4>
            </div>
            <p className="text-[16px]">{trip?.tripData?.transfer?.details}</p>
            <div className="flex-between mt-2">
              <div className="flex items-center gap-2">
                <Ticket />
                <p className="text-gray-600 font-bold">
                  {trip?.tripData?.transfer?.price} €
                </p>
              </div>
              <a
                href={trip?.tripData?.transfer?.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer px-4 py-2 rounded-xl bg-accent hover:bg-secondary transition-colors"
              >
                <p className="text-white">Купити</p>
              </a>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Transport;
