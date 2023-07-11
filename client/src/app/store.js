import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import placesReducer from "../features/places/placesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    places: placesReducer,
  },
});
