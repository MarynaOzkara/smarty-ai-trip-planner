import { createSlice } from "@reduxjs/toolkit";

const tripDataSlice = createSlice({
  name: "tripData",
  initialState: {
    origin: "",
    destination: "",
    startDate: "",
    endDate: "",
    duration: "",
    budget: "",
    travelers: "",
    // Define your initial state here
  },
  reducers: {
    addTripData: (state, action) => {
      // console.log(state);
      // console.log(action);
      return { ...state, ...action.payload };
    },
    // Define your reducers here
    resetTripData: (state) => {
      state.origin = "";
      state.destination = "";
      state.budget = "";
      state.duration = "";
      state.startDate = "";
      state.endDate = "";
      state.travelers = "";
    },
  },
});

export const { addTripData, resetTripData } = tripDataSlice.actions;
export const tripDataReducer = tripDataSlice.reducer;
