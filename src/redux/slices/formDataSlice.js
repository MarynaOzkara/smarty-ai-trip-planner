import { createSlice } from "@reduxjs/toolkit";

const formDataSlice = createSlice({
  name: "formData",
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
    addFormData: (state, action) => {
      // console.log(state);
      // console.log(action);
      return { ...state, ...action.payload };
    },
    // Define your reducers here
  },
});

export const { addFormData } = formDataSlice.actions;
export const formDataReducer = formDataSlice.reducer;
