import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const middleware = [thunk];
const Store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default Store;
