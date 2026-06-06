// import { PricingTable } from "@clerk/react";
import PriceCardFree from "./PriceCardFree";
import PriceCardPro from "./PriceCardPro";

const PricingSection = () => {
  return (
    <section className="py-10 lg:py-20 bg-background min-h-screen">
      <h2 className="text-center mb-6 md:mb-10">Наші тарифні плани</h2>
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        <PriceCardFree />
        <PriceCardPro />
        {/* <PricingTable appearance={{}} /> */}
      </div>
    </section>
  );
};

export default PricingSection;
