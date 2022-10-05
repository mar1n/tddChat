import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import { asyncFuntionMiddleware } from "./middleware";

const middleware = [thunk, asyncFuntionMiddleware];

export const Store = configureStore({
  reducer: rootReducer,
  middleware,
});

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
