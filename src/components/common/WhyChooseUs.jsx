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
    <section className="border py-20 bg-background">
      <div className="max-padd-container border">
        <h2 className="text-center">
          Чому обирають <span className="text-accent">Smarty?</span>
        </h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ">
          {CHOOSE_OPTIONS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-4 p-6 md:flex-row rounded-2xl cursor-pointer hover:scale-105 shadow-sm"
            >
              <div>{item.icon}</div>
              <div>
                <h4 className="font-bold">{item.title}</h4>
                <p className="text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
