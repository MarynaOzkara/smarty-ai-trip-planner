import { Play } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/react";
import { BsStars } from "react-icons/bs";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const createTrip = () => {
    if (!user) {
      openSignIn();
      return;
    }
    navigate("/create-trip");
  };

  return (
    <section
      className="relative h-[90vh] bg-[linear-gradient(to_right,rgba(0,0,0,.6),rgba(0,0,0,.2)),url('/Smarty-Travels.webp')] bg-cover bg-center bg-no-repeat
             pt-10 pb-10 lg:pb-20"
    >
      <div className="max-padd-container flex flex-col md:flex-row">
        <div className="max-w-120 lg:max-w-2xl py-10 lg:py-20 px-0 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8 inline-flex items-center justify-center gap-4 rounded-full bg-background/60 backdrop-blur-sm border border-background/50 px-4 py-1 shadow-sm"
          >
            <div className="relative flex-center h-3 w-3">
              <span className="absolute inline-flex animate-ping w-full h-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-3 w-3 bg-secondary rounded-full" />
            </div>
            <span>AI Smarty Trip Planner</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white pb-6 lg:pb-10"
          >
            Плануй подорож <br /> за 1 хвилину з{" "}
            <span className="text-accent">AI</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-white text-lg md:text-xl max-w-2xl"
          >
            <b>AI Smarty Travels</b> створює персоналізований маршрут, знаходить
            авіаквитки, готелі та рахує бюджет автоматично
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="pt-10 gap-4 flex flex-col md:flex-row"
          >
            <Button
              onClick={() => createTrip()}
              className="py-6 px-10 cursor-pointer hover:bg-secondary text-xl"
            >
              Створити подорож <BsStars className="w-6 h-6 text-white" />
            </Button>
            <a href="#how-it-work">
              <Button
                variant="outline"
                className="text-white border border-white/50 py-6 px-10 cursor-pointer text-xl flex items-center gap-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                Як це працює
                <Play className="h-10 w-10" />
              </Button>
            </a>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-sm text-gray-50 mt-6"
          >
            * На безкоштовному тарифі ви можете генерувати 1 маршрут на день
          </motion.p>
        </div>
        <div className="relative grow min-h-25 max-w-2xl"></div>
      </div>
    </section>
  );
};

export default Hero;
