import Hero from "../components/common/Hero";
import HowItWork from "../components/common/HowItWork";
import TripExample from "../components/common/TripExample";
import WhyChooseUs from "../components/common/WhyChooseUs";
import About from "../components/common/About";
import FAQ from "../components/common/FAQ";

const Home = () => {
  return (
    <main>
      <Hero />
      <HowItWork />
      <TripExample />
      {/* <PricingSection /> */}
      <WhyChooseUs />
      <About />
      <FAQ />
    </main>
  );
};

export default Home;
