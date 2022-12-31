import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type seekuser = {
  name: string;
}

export const fetchSeekUsers = createAsyncThunk("rooms/seekUsers", async () => {
  console.log("Where you at.")
  try {
    const response = await axios({
      method: "GET",
      url: `http://localhost:500/seekUsers`,
      data: {}
    });
    console.log("fetchSeekUsers", response.data);
    return response.data;
  } catch (error: any) {
    console.log("error seekUsers", error.response.data.error);
  }
});

const seekUsersSlice = createSlice({
  name: "seekUsers",
  initialState: [] as seekuser[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSeekUsers.fulfilled,
      (state, action) => {
        console.log("action seekUsers", action.payload.users);
        return [...state,...action.payload.users];
      }
    );
  },
});

export default seekUsersSlice.reducer;
