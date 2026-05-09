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
  },
});

export const { addTripData } = tripDataSlice.actions;
export const tripDataReducer = tripDataSlice.reducer;
