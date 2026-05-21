import { Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import CreateTrip from "./pages/CreateTrip";
import { Toaster } from "sonner";
import TripDetails from "./pages/TripDetails";
import MyTrips from "./pages/MyTrips";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/common/Footer";
import AuthProvider from "./provider/AuthProvider";
import { useState } from "react";
import { TripContext } from "./provider/TripContext";

const App = () => {
  const [tripDetails, setTripDetails] = useState({
    origin: "",
    destination: "",
    startDate: "",
    endDate: "",
    duration: "",
    budget: "",
    travelers: "",
  });
  return (
    <>
      <TripContext.Provider value={{ tripDetails, setTripDetails }}>
        <Toaster />
        <Header />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route
            path="/create-trip"
            element={
              <AuthProvider>
                <CreateTrip />
              </AuthProvider>
            }
          />
          <Route
            path="/trip/:tripId"
            element={
              <AuthProvider>
                <TripDetails />
              </AuthProvider>
            }
          />
          <Route
            path="/my-trips"
            element={
              <AuthProvider>
                <MyTrips />
              </AuthProvider>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </TripContext.Provider>
    </>
  );
};

export default App;
