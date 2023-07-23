import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { autheticate } from "../../components/utils/helper";
export interface userState {
  user: string;
  error: string;
}

export const activationThunk = createAsyncThunk(
  "user/authenticate",
  async (userName: string) => {
    console.log("fetchRoomsThunk", userName);
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:5000/room/all`,
        data: {
          firstName: userName,
        },
      });

      console.log("activation data", response.data);
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
      return { user: action.payload.user, error: action.payload.error };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(activationThunk.fulfilled, (state, action) => {
        console.log("activation add Case payload", action.payload)
        return {...state, error: action.payload}
      })
  }
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
