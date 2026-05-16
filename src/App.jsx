import { Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import CreateTrip from "./pages/CreateTrip";
import { Toaster } from "sonner";
import GenerateTrip from "./pages/GenerateTrip";
import TripDetails from "./pages/TripDetails";
import MyTrips from "./pages/MyTrips";

const App = () => {
  return (
    <>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/generate-trip" element={<GenerateTrip />} />
        <Route path="/trip/:tripId" element={<TripDetails />} />
        <Route path="/my-trips" element={<MyTrips />} />
      </Routes>
    </>
  );
};

export default App;
