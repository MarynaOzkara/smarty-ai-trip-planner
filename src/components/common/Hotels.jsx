import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import HotelCard from "./HotelCard";
import Autoplay from "embla-carousel-autoplay";

const Hotels = ({ trip }) => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 6000,
        }),
      ]}
    >
      <CarouselContent>
        {trip?.tripData?.hotels.map((hotel, index) => (
          <CarouselItem key={index}>
            <HotelCard hotel={hotel} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Hotels;
