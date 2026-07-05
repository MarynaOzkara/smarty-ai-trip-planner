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
import { useEffect, useState } from "react";
import { TripContext } from "./provider/TripContext";
import { useUser } from "@clerk/react";
import { createNewUser } from "./services/createNewUser";
import Price from "./pages/Price";
import CookieConsent from "react-cookie-consent";

const App = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [tripDetails, setTripDetails] = useState({
    origin: "",
    destination: "",
    startDate: "",
    endDate: "",
    duration: "",
    budget: "",
    travelers: "",
  });

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) {
      return;
    }
    createNewUser(user);
  }, [isLoaded, isSignedIn, user]);

  return (
    <>
      <TripContext.Provider value={{ tripDetails, setTripDetails }}>
        <Toaster />
        <Header />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/price" element={<Price />} />
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
        <CookieConsent
          buttonText="Прийняти"
          declineButtonText="Скасувати"
          enableDeclineButton
          cookieName="myCookieConsent"
          expires={150}
          location="bottom"
          style={{ background: "#fff4e0", color: "#2d3748" }}
          buttonStyle={{
            color: "#ffffff",
            background: "#ED6A5A",
            fontSize: "14px",
            textTransform: "uppercase",
            borderRadius: "50px",
            padding: "10px 20px",
          }}
          declineButtonStyle={{
            color: "#ED6A5A",
            background: "#fff4e0",
            fontSize: "14px",
            textTransform: "uppercase",
            borderRadius: "50px",
            padding: "10px 20px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          Ми використовуємо cookie для найкращого представлення нашого сайту.
          Якщо ви продовжуєте використовувати сайт, ми будемо вважати, що ви
          згодні з цим.{" "}
          <a
            className="hover:text-accent"
            href="https://smarty-travels.com/polityka-konfidentsijnosti/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Політика конфіденційності
          </a>
        </CookieConsent>
      </TripContext.Provider>
    </>
  );
};

export default App;
