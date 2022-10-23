import { configureStore, AnyAction } from "@reduxjs/toolkit";
import thunk, { ThunkDispatch} from "redux-thunk";
import roomsSlice from "./reducers/roomsSlice";

const middleware = [thunk];

export const Store = configureStore({
  reducer: {
    rooms: roomsSlice
  },
  middleware,
});

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

