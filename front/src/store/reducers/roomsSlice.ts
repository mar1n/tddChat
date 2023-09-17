import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "./helper";
interface users {
  name: string;
}
interface messages {
  text: string;
  name: string;
}
export interface roomsState {
  title: string;
  users: Array<users>;
  messages: Array<messages>;
}

export const fetchRoomsThunk = createAsyncThunk(
  "rooms/fetchRooms",
  async (userName: string) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${server("real")}/room/all?firstName=${userName}`,
      });
      return response.data;
    } catch (error: any) {
      console.log("error", error.response);
      console.log("error", error.response.data.error);
    }
  }
);
// change this from qs to array in data payload
export const createRoomThunk = createAsyncThunk(
  "rooms/createRoom",
  async (values: { title: string; user: string }) => {
    console.log("createRoomThunk", values)
    try {
      const response = await axios({
        method: "POST",
        url: `${server("rea")}/room/create`,
        data: {
          title: values.title,
          firstName: values.user,
        },
      });
      console.log("response.data", response.data);
      return response.data;
    } catch(error: any) {
      console.log("error", error.response);
      console.log("error", error.response.data.error);
    }
  }
);

export const addMessageThunk = createAsyncThunk(
  "rooms/addMessage",
  async (values: { text: string; name: string; roomTitle: string }) => {
    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:5000/room/new`,
        data: {
          text: values.text,
          name: values.name,
          roomTitle: values.roomTitle,
        },
      });
      return response.data;
    } catch (error: any) {
      console.log("error addMessageThunk", error.response.data.error);
    }
  }
);

const roomsSlice = createSlice({
  name: "rooms",
  initialState: [] as roomsState[],
  reducers: {
    roomsAdd(state, action: PayloadAction<roomsState[]>) {
      return [...state, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomsThunk.fulfilled, (state, action) => {
        if (action.payload.rooms) {
          return [...state, ...action.payload.rooms];
        }
        return [...state];
      })
      .addCase(createRoomThunk.fulfilled, (state, action) => {
        return [...state, action.payload];
      })
      .addCase(addMessageThunk.fulfilled, (state, action) => {
        let updateState = state.map((value) => {
          if (value.title === action.payload.room.title) {
            return action.payload.room;
          }
          return value;
        });
        return [...updateState];
      });
  },
});

export default roomsSlice.reducer;

export const { roomsAdd } = roomsSlice.actions;
