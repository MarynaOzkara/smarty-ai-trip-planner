import { FaArrowRightLong } from "react-icons/fa6";
import { FaPlane } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const TripExample = () => {
  const navigate = useNavigate();
  return (
    <section className="border py-10 md:py-20 bg-secondary-foreground">
      <div className="max-padd-container border">
        <h2 className="text-center">Приклад подорожі</h2>
        <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 ">
          <div className="bg-white h-80 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
          </div>
          <div className="bg-white h-80 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-start gap-6">
                <FaPlane className="w-7 h-7 text-accent" />
                <div>
                  <h4 className="font-bold">Авіаквитки</h4>
                  <p>
                    від <span className="text-accent font-bold">80 €</span>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <FaHotel className="w-7 h-7 text-accent" />
                <div>
                  <h4 className="font-bold">Готелі</h4>
                  <p>
                    від <span className="text-accent font-bold">65 €</span>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <FaMapLocationDot className="w-7 h-7 text-accent" />
                <div>
                  <h4 className="font-bold">Маршрут</h4>
                  <p>готовий план по днях</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <FaWallet className="w-7 h-7 text-accent" />
                <div>
                  <h4 className="font-bold">Загальний бюджет</h4>
                  <p>
                    від <span className="text-accent font-bold">397 €</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative bg-white h-70 md:h-80 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 text-center">
              <h4 className="font-bold">Готовий план за 1 хвилину!</h4>
              <Button
                onClick={() => navigate("/create-trip")}
                className="mt-6 py-6 px-10 cursor-pointer hover:bg-secondary text-xl"
              >
                Спробувати зараз
              </Button>
              <img
                className="w-30 md:w-40 absolute left-15 bottom-5"
                src="/public/Smarty-ready.png"
                alt="Smarty Ai ready"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripExample;
