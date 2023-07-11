import { createSlice } from "@reduxjs/toolkit";

export const placesSlice = createSlice({
  name: "places",
  initialState: {
    places: null,
  },
  reducers: {
    updatePlace: (state, action) => {
      state.places = action.payload;
    },
  },
});

export const { updatePlace } = placesSlice.actions;

export const selectPlaces = (state) => state.places.places;

export default placesSlice.reducer;
