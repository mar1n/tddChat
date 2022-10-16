import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
//import rootReducer from "./reducer";
import roomsSlice from "./reducers/roomsSlice";
import { asyncFuntionMiddleware } from "./middleware";

const middleware = [thunk, asyncFuntionMiddleware];

export const Store = configureStore({
  reducer: {
    rooms: roomsSlice
  },
  middleware,
});

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

