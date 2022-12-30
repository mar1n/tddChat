import { configureStore, AnyAction, combineReducers } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import thunk, { ThunkDispatch } from "redux-thunk";
import roomsSlice from "./reducers/roomsSlice";
import userSlice from "./reducers/userSlice";
import errorSlice from "./reducers/errorSlice";
import seekUsersSlice from "./reducers/seekUsersSlice";

const middleware = [thunk];

export const Store = configureStore({
  reducer: {
    rooms: roomsSlice,
    user: userSlice,
    seekUsers: seekUsersSlice
  },
  middleware,
});

const rootReducer = combineReducers({
  rooms: roomsSlice,
  user: userSlice,
  errors: errorSlice,
  seekUsers: seekUsersSlice
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
