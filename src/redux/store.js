import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { tripDataReducer } from "./slices/formDataSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const storage = {
  getItem: async (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? item : null;
    } catch (error) {
      console.warn("localStorage getItem error:", error);
      return null;
    }
  },
  setItem: async (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn("localStorage setItem error:", error);
    }
  },
  removeItem: async (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn("localStorage removeItem error:", error);
    }
  },
};

const tripPersistConfig = {
  key: "tripData",
  version: 1,
  storage,
};

const reducer = combineReducers({
  tripData: persistReducer(tripPersistConfig, tripDataReducer),
});

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
