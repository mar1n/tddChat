import { configureStore, AnyAction, combineReducers } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import thunk, { ThunkDispatch } from "redux-thunk";
import roomsSlice from "./reducers/roomsSlice";
const middleware = [thunk];

export const Store = configureStore({
  reducer: {
    rooms: roomsSlice,
  },
  middleware,
});

const rootReducer = combineReducers({
  rooms: roomsSlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof Store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof Store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
