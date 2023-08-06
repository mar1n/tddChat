import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type seekuser = {
  name: string;
}

export const fetchSeekUsers = createAsyncThunk("rooms/seekUsers", async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `http://localhost:5000/user/seekUsers`,
      data: {}
    });
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
        return [...state,...action.payload.users];
      }
    );
  },
});

export default seekUsersSlice.reducer;
