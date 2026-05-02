import { useState } from "react";

const CreateTrip = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    origin: null,
    destination: null,
    startDate: "",
    endDate: "",
    totalDays: "",
    travelers: "",
    budget: "",
  });
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
                <div>
                  <div className="mb-4">
                    <h3 className="text-2xl mb-2">
                      Крок 1: Куди наступна мандрівка?
                    </h3>
                    <p>
                      Оберіть пункт відправлення та призначення для вашої
                      мандрівки.
                    </p>
                  </div>
                  <div>
                    <label htmlFor="origin">Звідки:</label>
                  </div>
                </div>
              )}
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
