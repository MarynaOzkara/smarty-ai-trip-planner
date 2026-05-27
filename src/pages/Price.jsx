import { PricingTable } from "@clerk/react";

const Price = () => {
  return (
    <section className="bg-secondary-foreground pt-10 pb-20 xl:pb-30">
      <h2 className="text-center mb-6 md:mb-10">Наші тарифні плани</h2>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}>
        <PricingTable appearance={{}} />
      </div>
    </section>
  );
};

export default Price;
