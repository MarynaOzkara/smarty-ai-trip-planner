import { useState } from "react";
import { SelectDates } from "../components/common/SelectDates";
import SelectPlace from "../components/common/SelectPlace";
import SelectBudget from "../components/common/SelectBudget";
import SelectTravelers from "../components/common/SelectTravelers";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { selectFormData } from "../redux/selectors";

const CreateTrip = () => {
  const [step, setStep] = useState(1);
  const tripData = useSelector(selectFormData);
  console.log(tripData);
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      generateTrip();
    }
  };
  const generateTrip = () => {};
  return (
    <section className="bg-secondary-foreground min-h-screen py-30">
      <h2 className="text-center mb-10">Створити маршрут</h2>
      <div className="border max-padd-container flex flex-col md:flex-row gap-10">
        {/* Container */}
        <div className="w-full max-w-[50%] min-h-[85vh] sm:min-h-[80vh] bg-background rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
          {/* Progress Bar */}
          <div className="h-2 bg-primary/20 w-full">
            <div
              style={{ width: `${(step / 4) * 100}%` }}
              className="h-full bg-primary transition-all duration-500 ease-out"
            />
          </div>
          <div className="p-5 md:p-12 flex flex-col flex-1">
            {/* Steps Indicator*/}
            <div className="flex-center space-x-2 mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${step === s ? "w-8 bg-accent" : step > s ? "w-2 bg-accent" : "w-2 bg-accent/20"}`}
                />
              ))}
            </div>
            <div className="flex-1 flex flex-col pt-2 sm:p-4">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="mb-4 text-center">
                    <h3 className="text-2xl mb-2">
                      Крок 1: Куди наступна мандрівка?
                    </h3>
                    <p>
                      Оберіть пункт відправлення та призначення для вашої
                      мандрівки.
                    </p>
                  </div>
                  {/* From */}
                  <div>
                    <label
                      className="text-sm font-medium ml-1"
                      htmlFor="destination"
                    >
                      Звідки:
                    </label>
                    <SelectPlace name="origin" />
                    {/* To */}
                  </div>
                  <div>
                    <label
                      className="text-sm font-medium ml-1"
                      htmlFor="destination"
                    >
                      Куди:
                    </label>
                    <SelectPlace name="destination" />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div>
                  <div className="mb-4 text-center">
                    <h3 className="text-2xl mb-2">
                      Крок 2: Коли наступна мандрівка?
                    </h3>
                    <p>
                      Оберіть дати подорожі(на безкоштовній версії максимум 5
                      днів).
                    </p>
                    <div className="flex-center mt-8">
                      <SelectDates />
                    </div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="">
                  <div className="text-center">
                    <h3 className="text-2xl mb-2">Крок 3: Який ваш бюджет?</h3>
                    <p>Оберіть комфортний бюджет подорожі.</p>
                  </div>
                  <div className="mt-10">
                    <SelectBudget />
                  </div>
                </div>
              )}
              {step === 4 && (
                <div>
                  <div className="text-center">
                    <h3 className="text-2xl mb-2">
                      Крок 4: Хто вирушає в подорож?
                    </h3>
                    <p>Оберіть компанію для подорожі.</p>
                  </div>
                  <div className="mt-10">
                    <SelectTravelers />
                  </div>
                </div>
              )}
            </div>
            {/* Navigation */}
            <div className="flex-between pt-6 border-t border-gray-100">
              <button
                onClick={handleBack}
                className={`text-gray-500 cursor-pointer hover:text-gray-800 font-medium px-4 py-2 ${step === 1 && "invisible"}`}
              >
                Назад
              </button>
              <button
                className={`flex items-center px-8 py-3 rounded-full font-bold text-white transition-all shadow-lg ${
                  (step === 1 && tripData.locale) ||
                  (step === 1 && tripData.destination) ||
                  (step === 2 && tripData.startDate) ||
                  (step === 2 && tripData.endDate) ||
                  (step === 3 && tripData.budget) ||
                  (step === 4 && tripData.travelers)
                    ? "bg-primary cursor-pointer hover:bg-secondary"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                onClick={handleNext}
              >
                {step === 4 ? "Згенерувати" : "Далі"}
                {step === 4 ? (
                  <CheckCircle className="ml-2 w-5 h-5" />
                ) : (
                  <ArrowRight className="ml-2 w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <img src="/SmartyAI.png" alt="SmartyAi" />
        </div>
      </div>
    </section>
  );
};

export default CreateTrip;
