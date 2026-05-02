import { MapPin, Play } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-background to-primary/20 py-10">
      <img
        className="absolute w-180 top-0 right-0 md:top-30 md:right-50 opacity-25"
        src="/map.png"
        alt="World Map"
      />
      <MapPin className="absolute w-7 h-7 top-65 right-124 text-accent" />
      <MapPin className="absolute w-6 h-6 top-60 right-190 text-accent" />
      <MapPin className="absolute w-6 h-6 top-82 right-152 text-accent" />
      <MapPin className="absolute w-6 h-6 top-62 right-144 text-accent" />
      <MapPin className="absolute w-6 h-6 top-70 right-135 text-accent" />
      <MapPin className="absolute w-6 h-6 top-85 right-125 text-accent" />
      <MapPin className="absolute w-6 h-6 top-90 right-182 text-accent" />
      <div className=" border max-padd-container pt-20 flex flex-col md:flex-row">
        <div className="border max-w-2xl py-20 px-8">
          <div className="mb-8 inline-flex items-center justify-center gap-4 rounded-full bg-background border border-background/50 px-4 py-1 shadow-sm">
            <div className="relative flex-center h-3 w-3">
              <span className="absolute inline-flex animate-ping w-full h-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-3 w-3 bg-secondary rounded-full" />
            </div>
            <span>Smarty AI Trip Planner</span>
          </div>
          <h1 className="pb-10">
            Плануй подорож <br /> за 1 хвилину з{" "}
            <span className="text-accent">AI</span>
          </h1>
          <p>
            Smarty створює персоналізований маршрут, знаходить авіаквитки,
            готелі та рахує бюджет автоматично
          </p>
          <div className="pt-10 gap-4 flex flex-col md:flex-row">
            <Button
              onClick={() => navigate("/create-trip")}
              className="py-6 px-10 cursor-pointer hover:bg-secondary text-xl"
            >
              Створити маршрут
            </Button>
            <Button
              variant="outline"
              className="py-6 px-10 cursor-pointer text-xl flex items-center gap-4"
            >
              Як це працює
              <Play className="h-10 w-10" />
            </Button>
          </div>
        </div>
        <div className="border relative grow max-w-2xl">
          <img
            className="w-80 absolute right-25 bottom-0"
            src="/SmartyAI.png"
            alt="SmartyAi"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
