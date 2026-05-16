import { Clock, Map, Ticket } from "lucide-react";
import {
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "../reui/timeline";
import { FaWalking } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getPlacePhoto } from "../../services/placePhotoApi";

const ActivityCard = ({ activity }) => {
  const [activityPhoto, setActivityPhoto] = useState("");
  const url = `https://google.com/maps/search/?api=1&query=${activity?.placeName},${activity?.address}`;
  useEffect(() => {
    if (!activity?.placeName) return;
    const loadPhoto = async () => {
      const photoUrl = await getPlacePhoto(activity?.placeName);
      setActivityPhoto(photoUrl);
    };
    loadPhoto();
  }, [activity]);

  // console.log(activity);
  return (
    <TimelineItem className="group-data-[orientation=vertical]/timeline:ms-10">
      <TimelineHeader>
        <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
        <TimelineTitle className="text-[16px] font-bold text-gray-600">
          {activity?.time}
        </TimelineTitle>
        <div className="mt-1 flex items-start gap-1">
          <div className="w-7 h-7 rounded-full bg-secondary-foreground flex-center">
            <FaWalking className="w-4 h-4 text-accent" />
          </div>

          <p className="text-sm  text-gray-600">{activity?.howToGetTo}</p>
        </div>

        <TimelineIndicator className="bg-primary/10 group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7">
          <Clock className="size-3.5" />
        </TimelineIndicator>
      </TimelineHeader>
      <TimelineContent>
        <div className="block mt-2 border border-gray-200 rounded-lg hover:shadow-2xs focus: outline-hidden overflow-hidden">
          <div className="relative flex flex-col sm:flex-row overflow-hidden sm:h-60">
            <img
              src={activityPhoto ? activityPhoto : `/template.jpg`}
              alt={activity?.placeName}
              className="h-50 w-full md:h-full md:w-60 object-cover inset-0"
            />
            <div className="p-4">
              <div className="flex flex-col min-h-24">
                <h4 className="text-accent line-clamp-1">
                  {activity?.activity}
                </h4>
                <a
                  target="_blank"
                  href={url}
                  className="flex gap-1 items-start text-sm text-gray-500"
                >
                  <Map width={15} height={15} />
                  {activity?.address}
                </a>
                <p className="text-[16px] mt-1">{activity?.details}</p>
                <div className="flex flex-col sm:flex-row items-center sm:justify-between">
                  <p className="text-gray-600 mt-1 flex items-center gap-2">
                    <Ticket /> <b>{activity?.ticketPricing} €</b>
                  </p>
                  <a
                    href={activity?.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer px-4 py-2 rounded-xl bg-accent hover:bg-secondary transition-colors"
                  >
                    <p className="text-white">Купити квиток</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TimelineContent>
    </TimelineItem>
  );
};

export default ActivityCard;
