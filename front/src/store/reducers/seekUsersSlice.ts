import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "./helper";
const domainName = server("production")
export type seekuser = {
  email: string;
}

export const fetchSeekUsers = createAsyncThunk("rooms/seekUsers", async (user:string) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${domainName}/user/seekUsers`,
      params: {email: user}
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
      (_state, action) => {
        return [...action.payload.users];
      }
    );
  },
});

export default seekUsersSlice.reducer;
