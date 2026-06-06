import PriceCardFree from "../components/common/PriceCardFree";
import PriceCardPro from "../components/common/PriceCardPro";

const Price = () => {
  return (
    <section className="bg-secondary-foreground pt-10 pb-20 xl:pb-30">
      <div className="max-padd-container">
        <h2 className="text-center mb-6 md:mb-10">Наші ціни</h2>
        <div className=" flex flex-col md:flex-row gap-6 justify-center">
          <PriceCardFree />
          <PriceCardPro />
        </div>
        <p className="text-center text-sm text-gray-900 mt-15">
          *При підписці на AI Smarty Pro використовуйте, будь ласка, той самий
          email, який ви використовували при реєстрації. Якщо у вас не
          активувався доступ до Pro-функцій на протязі 24 годин, зверніться за
          підтримкою по email support@smarty-travels.com.
        </p>
      </div>
    </section>
  );
};

export default Price;
