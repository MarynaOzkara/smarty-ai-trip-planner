import { FaArrowRightLong } from "react-icons/fa6";
import { FaPlane } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { CheckCircle } from "lucide-react";
import { useClerk, useUser } from "@clerk/react";
import { motion } from "framer-motion";

const TripExample = () => {
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
    <section className="py-10 lg:py-20 bg-secondary-foreground">
      <div className="max-padd-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          Приклад подорожі
        </motion.h2>
        <div className="mt-6 md:mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white h-80 rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <img
              className="h-60 w-full object-cover"
              src="/barcelona.jpg"
              alt="Barcelona"
            />
            <div className="py-4 px-8">
              <div className="flex-between">
                <h4 className="font-bold">Київ</h4>
                <FaArrowRightLong />
                <h4 className="font-bold">Барселона</h4>
              </div>
              <div className="flex-between">
                <h4>3 дня</h4>
                <span className="w-1 h-1 bg-accent rounded-full"></span>
                <h4>2 дорослих</h4>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-white h-80 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="p-6 lg:p-4 xl:p-6 flex flex-col gap-4">
              <div className="flex items-start gap-6 lg:gap-2 xl:gap-6">
                <FaPlane className="w-7 h-7 text-accent" />
                <div>
                  <h4 className="font-bold">Авіаквитки</h4>
                  <p>
                    від <span className="text-accent font-bold">80 €</span>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6 lg:gap-2 xl:gap-6">
                <FaHotel className="w-7 h-7 text-accent" />
                <div>
                  <h4 className="font-bold">Готелі</h4>
                  <p>
                    від <span className="text-accent font-bold">65 €</span>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6 lg:gap-2 xl:gap-6">
                <FaMapLocationDot className="w-7 h-7 text-accent" />
                <div>
                  <h4 className="font-bold">Маршрут</h4>
                  <p>готовий план по днях</p>
                </div>
              </div>
              <div className="flex items-start gap-6 lg:gap-2 xl:gap-6">
                <FaWallet className="w-7 h-7 text-accent" />
                <div>
                  <h4 className="font-bold">Загальний бюджет</h4>
                  <p>
                    від <span className="text-accent font-bold">397 €</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="relative bg-white h-70 md:h-80 rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col gap-6 lg:gap-8 p-6 lg:p-4 xl:p-6">
              <h4 className="font-bold">Отримайте свій маршрут зараз</h4>
              <div>
                <p className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-accent" /> Швидко
                </p>
                <p className="flex items-center gap-2 mb-1">
                  <CheckCircle className="w-5 h-5 text-accent" /> Зручно
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />{" "}
                  Персоналізовано
                </p>
              </div>
              <Button
                onClick={createTrip}
                className="mt-6 py-6 px-8 cursor-pointer hover:bg-secondary text-xl"
              >
                Створити подорож <BsStars className="w-6 h-6 text-white" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};

export default TripExample;
