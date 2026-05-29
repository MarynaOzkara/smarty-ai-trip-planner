import { Car, Hotel, Plane, TicketCheck, Wallet } from "lucide-react";
import { MdRestaurant } from "react-icons/md";

const TripBudget = ({ trip }) => {
  return (
    trip && (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <p className="text-[16px] mb-2">{trip?.tripData?.tripNote}</p>
        <div className="flex-between border-b border-gray-200 pt-3 mb-3">
          <div className="flex-center gap-2">
            <Plane className="h-6 w-6 text-secondary" />
            <h4>Літак</h4>
          </div>
          <p className="text-gray-600 font-bold">
            {trip?.tripData?.estimatedTotalPrice?.flightPrice} €
          </p>
        </div>
        <div className="flex-between border-b border-gray-200 mb-3">
          <div className="flex-center gap-2">
            <Car className="h-6 w-6 text-secondary" />
            <h4>Трансфер</h4>
          </div>
          <p className="text-gray-600 font-bold">
            {trip?.tripData?.estimatedTotalPrice?.transferPrice || 0} €
          </p>
        </div>
        <div className="flex-between border-b border-gray-200 mb-3">
          <div className="flex-center gap-2">
            <Hotel className="h-6 w-6 text-secondary" />
            <h4>Готель</h4>
          </div>
          <p className="text-gray-600 font-bold">
            {trip?.tripData?.estimatedTotalPrice?.hotelPrice} €
          </p>
        </div>
        <div className="flex-between border-b border-gray-200 mb-3">
          <div className="flex-center gap-2">
            <MdRestaurant className="h-6 w-6 text-secondary" />
            <h4>Їжа</h4>
          </div>
          <p className="text-gray-600 font-bold">
            {trip?.tripData?.estimatedTotalPrice?.foodPrice} €
          </p>
        </div>
        <div className="flex-between border-b-2 border-gray-400 mb-5">
          <div className="flex-center gap-2">
            <TicketCheck className="h-6 w-6 text-secondary" />
            <h4>Екскурсії</h4>
          </div>
          <p className="text-gray-600 font-bold">
            {trip?.tripData?.estimatedTotalPrice?.activitiesPrice} €
          </p>
        </div>
        <div className="flex-between mb-3">
          <div className="flex-center gap-2">
            <Wallet className="h-6 w-6 text-secondary" />
            <h4>Бюджет</h4>
          </div>
          <p className="text-gray-600 font-bold">
            {trip?.tripData?.estimatedTotalPrice?.total} €
          </p>
        </div>
        <p className="text-gray-500 text-sm">
          * Ціна розраховани на одну людину. Ціни приблизні і можуть
          відрізнятися в залежності від сезону та інших факторів.
        </p>
      </div>
    )
  );
};

export default TripBudget;
