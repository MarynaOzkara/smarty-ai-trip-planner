import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { useClerk, useUser } from "@clerk/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

const PriceCardPro = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const subscribeToPro = async () => {
    if (!user) {
      openSignIn();
      return;
    }
    const userRef = doc(db, "users", user.id);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      openSignIn();
      return;
    }
    const userData = userSnap.data();
    const userPlan = userData?.plan;

    if (userPlan === "free") {
      window.open(
        "https://buymeacoffee.com/smartytravels/membership",
        "_blank",
      );
    }
  };

  return (
    <div className="bg-white p-6 max-w-md rounded-2xl shadow-sm border border-gray-100">
      <h3>AI Smarty Pro</h3>
      <p className="text-gray-600 mt-6 text-[16px]">
        Плануй подорожі швидше, розумніше та без обмежень. Smarty AI Pro
        сьворений для активних мандрівників, digital travelers та всіх, хто хоче
        отримувати персоналізовані AI-маршрути за кілька хвилин.
      </p>
      <span className="mt-6 block text-2xl font-bold text-primary">
        3 € /місяць
      </span>
      <ul className="mt-6">
        <li className="flex items-center mb-3">
          <Check className="text-green-500 w-5 h-5" />
          <p className="ml-2 text-gray-600 text-sm">
            Необмежена генерація маршрутів
          </p>
        </li>
        <li className="flex items-center mb-3">
          <Check className="text-green-500 w-5 h-5" />
          <p className="ml-2 text-gray-600 text-sm">
            До 30 днів подорожі в одному маршруті
          </p>
        </li>
        <li className="flex items-center mb-3">
          <Check className="text-green-500 w-5 h-5" />
          <p className="ml-2 text-gray-600 text-sm">
            Пермоналізовані маршрути під бюджет і стиль подорожі
          </p>
        </li>
        <li className="flex items-center mb-3">
          <Check className="text-green-500 w-5 h-5" />
          <p className="ml-2 text-gray-600 text-sm">
            AI-поради для транспорту, житла та активностей
          </p>
        </li>
        <li className="flex items-center mb-3">
          <Check className="text-green-500 w-5 h-5" />
          <p className="ml-2 text-gray-600 text-sm">Пріоритетна підтримка</p>
        </li>
      </ul>
      <div className="mt-12 flex-center">
        <Button
          onClick={() => subscribeToPro()}
          className="py-6 px-10 cursor-pointer hover:bg-secondary text-xl"
        >
          Підписатись
        </Button>
      </div>
    </div>
  );
};

export default PriceCardPro;
