import { Play } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/react";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignUp } = useClerk();
  const createTrip = () => {
    if (!user) {
      openSignUp();
    }
    navigate("/create-trip");
  };
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-background to-primary/20 pt-10 pb-10 lg:pb-20">
      <img
        className="absolute w-60 top-120 right-30 md:w-110 md:top-10 md:right-5 lg:w-140 lg:right-10 xl:w-180 xl:top-10 xl:right-50 opacity-25"
        src="/map.png"
        alt="World Map"
      />
      <div className="max-padd-container flex flex-col md:flex-row">
        <div className="max-w-120 lg:max-w-2xl py-10 lg:py-20 px-0 lg:px-8">
          <div className="mb-8 inline-flex items-center justify-center gap-4 rounded-full bg-background border border-background/50 px-4 py-1 shadow-sm">
            <div className="relative flex-center h-3 w-3">
              <span className="absolute inline-flex animate-ping w-full h-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-3 w-3 bg-secondary rounded-full" />
            </div>
            <span>Smarty AI Trip Planner</span>
          </div>
          <h1 className="pb-6 lg:pb-10">
            Плануй подорож <br /> за 1 хвилину з{" "}
            <span className="text-accent">AI</span>
          </h1>
          <p>
            <b className="text-accent">Smarty</b> створює персоналізований
            маршрут, знаходить авіаквитки, готелі та рахує бюджет автоматично
          </p>
          <div className="pt-10 gap-4 flex flex-col md:flex-row">
            <Button
              onClick={() => createTrip()}
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
        <div className="relative grow min-h-25 max-w-2xl">
          <img
            className="absolute w-40 right-0 bottom-0 md:w-50 md:bottom-15 md:right-5 lg:w-60 xl:w-70 xl:bottom-5 xl:right-35"
            src="/SmartyAI.png"
            alt="SmartyAi"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
