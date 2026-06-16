import { FaRegClock } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

const CHOOSE_OPTIONS = [
  {
    id: 1,
    title: "Економія часу",
    desc: "Планування займає хвилину, замість годин пошуку",
    icon: <FaRegClock className="w-10 h-10 text-accent" />,
  },
  {
    id: 2,
    title: "Економія грошей",
    desc: "Знаходимо вигідні варіанти, залежно вашого бюджету",
    icon: <GiReceiveMoney className="w-10 h-10 text-accent" />,
  },
  {
    id: 3,
    title: "Персоналізація",
    desc: "AI шукає варіанти під ваші інтереси і бюджет",
    icon: <BsStars className="w-10 h-10 text-accent" />,
  },
  {
    id: 4,
    title: "Унікальність",
    desc: "Сервіс розроблений спеціально для українського користувача",
    icon: <IoDiamond className="w-10 h-10 text-accent" />,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-10 lg:py-20 bg-secondary-foreground">
      <div className="max-padd-container">
        <h2 className="text-center">
          Чому обирають <span className="text-accent">AI Smarty Travels?</span>
        </h2>
        <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-10 ">
          {CHOOSE_OPTIONS.map((item) => (
            <div
              key={item.id}
              className="bg-background flex flex-col items-center gap-4 p-6 md:flex-row rounded-2xl hover:scale-105 shadow-sm"
            >
              <div>{item.icon}</div>
              <div>
                <h4 className="font-bold">{item.title}</h4>
                <p className="text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 md:mt-10 text-center">
          <p>
            Якщо ви шукаєте зручний планувальник подорожей онлайн або AI
            itinerary planner, який допоможе організувати подорож без зайвого
            стресу, <b>AI Smarty Travels</b> стане вашим надійним помічником.
            Створіть свій маршрут уже сьогодні та відкрийте новий спосіб
            планування подорожей за допомогою штучного інтелекту.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
