import { MapPin, Play } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-background to-primary/20 pt-10 pb-10 md:pb-20">
      <img
        className="absolute w-60 top-125 right-30 md:w-180 md:top-10 md:right-50 opacity-25"
        src="/map.png"
        alt="World Map"
      />
      <MapPin className="absolute w-7 h-7 top-45 right-124 text-accent" />
      <MapPin className="absolute w-6 h-6 top-40 right-190 text-accent" />
      <MapPin className="absolute w-6 h-6 top-62 right-152 text-accent" />
      <MapPin className="absolute w-6 h-6 top-42 right-144 text-accent" />
      <MapPin className="absolute w-6 h-6 top-50 right-135 text-accent" />
      <MapPin className="absolute w-6 h-6 top-65 right-125 text-accent" />
      <MapPin className="absolute w-6 h-6 top-70 right-182 text-accent" />
      <div className=" border max-padd-container flex flex-col md:flex-row">
        <div className="border max-w-2xl py-10 md:py-20 px-0 md:px-8">
          <div className="mb-8 inline-flex items-center justify-center gap-4 rounded-full bg-background border border-background/50 px-4 py-1 shadow-sm">
            <div className="relative flex-center h-3 w-3">
              <span className="absolute inline-flex animate-ping w-full h-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-3 w-3 bg-secondary rounded-full" />
            </div>
            <span>Smarty AI Trip Planner</span>
          </div>
          <h1 className="pb-6 md:pb-10">
            Плануй подорож <br /> за 1 хвилину з{" "}
            <span className="text-accent">AI</span>
          </h1>
          <p>
            <b className="text-accent">Smarty</b> створює персоналізований
            маршрут, знаходить авіаквитки, готелі та рахує бюджет автоматично
          </p>
          <div className="pt-10 gap-4 flex flex-col md:flex-row">
            <Button
              onClick={() => navigate("/create-trip")}
              className="py-6 px-10 cursor-pointer hover:bg-secondary text-xl"
            >
              Створити подорож
            </Button>
            <a href="#how-it-work">
              <Button
                variant="outline"
                className="py-6 px-10 cursor-pointer text-xl flex items-center gap-4"
              >
                Як це працює
                <Play className="h-10 w-10" />
              </Button>
            </a>
          </div>
        </div>
        <div className="border relative grow min-h-25 max-w-2xl">
          <img
            className="w-40 md:w-60 absolute right-1 md:right-35 bottom-0"
            src="/SmartyAI.png"
            alt="SmartyAi"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
