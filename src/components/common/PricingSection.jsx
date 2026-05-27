import { PricingTable } from "@clerk/react";

const PricingSection = () => {
  return (
    <section className="py-10 lg:py-20 bg-background">
      <h2 className="text-center mb-6 md:mb-10">Наші тарифні плани</h2>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}>
        <PricingTable appearance={{}} />
      </div>
    </section>
  );
};

export default PricingSection;
