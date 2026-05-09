import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { ClerkProvider } from "@clerk/react";
import { PersistGate } from "redux-persist/integration/react";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ClerkProvider publishableKey={publishableKey}>
            <App />
          </ClerkProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
