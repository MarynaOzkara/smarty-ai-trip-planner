import Hero from "../components/common/Hero";
import HowItWork from "../components/common/HowItWork";
import PricingSection from "../components/common/PricingSection";
import TripExample from "../components/common/TripExample";
import WhyChooseUs from "../components/common/WhyChooseUs";

const Home = () => {
  return (
    <main>
      <Hero />
      <HowItWork />
      <TripExample />
      <PricingSection />
      <WhyChooseUs />
    </main>
  );
};

export default Home;
