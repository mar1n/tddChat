import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "./helper";
const domainName = server("production");
export interface userState {
  user: string;
  error: string;
}

export interface user {
  user: userState;
}

export const activationThunk = createAsyncThunk(
  "user/authenticate",
  async (userName: string) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${domainName}/room/all`,
        data: {
          firstName: userName,
        },
      });

      return response.data;
    } catch (error: any) {
      console.log("activation error", error.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { user: "cykcykacz@gmail.com", error: "" },
  reducers: {
    setUser(state, action: PayloadAction<userState>) {
      return {
        ...state,
        user: action.payload.user,
        error: action.payload.error,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(activationThunk.fulfilled, (state, action) => {
      return { ...state, error: action.payload };
    });
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
