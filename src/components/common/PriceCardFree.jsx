import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { useClerk, useUser } from "@clerk/react";

const PriceCardFree = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  return (
    <div className="bg-white p-6 max-w-md rounded-2xl shadow-sm border border-gray-100">
      <h3>AI Smarty Free</h3>
      <p className="text-gray-600 mt-6 text-[16px]">
        Почни планувати подорожі простіше з <b>Smarty Ai Free</b>. Безкоштовний
        план допоможе швидко створити маршрут, знайти квитки, готелі, ресторани
        та екскурсії. Ідеально для тих, хто хоче спробувати наш сервіс.
      </p>
      <span className="mt-6 block text-2xl font-bold text-primary">0 €</span>
      <ul className="mt-6">
        <li className="flex items-center mb-3">
          <Check className="text-green-500 w-5 h-5" />
          <p className="ml-2 text-gray-600 text-sm">
            Один AI-маршрут кожні 24 години
          </p>
        </li>
        <li className="flex items-center mb-3">
          <Check className="text-green-500 w-5 h-5" />
          <p className="ml-2 text-gray-600 text-sm">
            Базова генерація маршруту
          </p>
        </li>
        <li className="flex items-center mb-3">
          <Check className="text-green-500 w-5 h-5" />
          <p className="ml-2 text-gray-600 text-sm">
            Максимальна кількість днів подорожі - 5 днів
          </p>
        </li>
      </ul>
      <div className="mt-12 flex-center">
        {!user ? (
          <Button
            onClick={() => openSignIn()}
            className="py-6 px-10 cursor-pointer hover:bg-secondary text-xl"
          >
            Почати безкоштовно
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PriceCardFree;
