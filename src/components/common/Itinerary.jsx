import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import ActivityCard from "./ActivityCard";
import { Timeline } from "../reui/timeline";
import { Calendar } from "lucide-react";
import moment from "moment/moment";
import "moment/locale/uk";

moment.locale("uk");

const Itinerary = ({ trip }) => {
  return (
    <div>
      <Accordion type="multiple" defaultValue="item-1">
        {trip?.tripData?.itinerary?.map((item, index) => (
          <AccordionItem value={`item-${index + 1}`} key={index}>
            <AccordionTrigger className="cursor-pointer">
              <h4 className="text-gray-700 font-medium">
                День {item?.day || index + 1}
              </h4>
            </AccordionTrigger>
            <AccordionContent>
              <Timeline defaultValue={1} className="mt-4 md:mt-6 w-full">
                <h5 className="text-accent font-medium mb-4 md:mb-6 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {moment(item?.date).format("D MMMM")}
                </h5>

                {item?.activities.map((activity, ind) => (
                  <ActivityCard key={ind} activity={activity} />
                ))}
              </Timeline>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Itinerary;
