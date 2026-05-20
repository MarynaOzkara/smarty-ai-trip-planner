import { Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Home from "./pages/Home";
import CreateTrip from "./pages/CreateTrip";
import { Toaster } from "sonner";
import GenerateTrip from "./pages/GenerateTrip";
import TripDetails from "./pages/TripDetails";
import MyTrips from "./pages/MyTrips";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/common/Footer";
import AuthProvider from "./provider/AuthProvider";

const App = () => {
  return (
    <>
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
        <Route path="/generate-trip" element={<GenerateTrip />} />
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
    </>
  );
};

export default App;
