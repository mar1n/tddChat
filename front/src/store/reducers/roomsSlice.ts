import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
    console.log("fetchRoomsThunk", userName);
    try {
      const response = await axios({
        method: "GET",
        url: `http://localhost:500/rooms`,
        data: {
          userName: userName,
        },
      });

      console.log("data", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error", error.response.data.error);
    }
  }
);

export const createRoomThunk = createAsyncThunk(
  "rooms/createRoom",
  async (title: string) => {
    const response = await axios({
      method: "POST",
      url: `http://localhost:500/createRoom`,
      data: {
        title: title,
      },
    });
    return response.data;
  }
);

export const addMessageThunk = createAsyncThunk(
  "rooms/addMessage",
  async (values: { text: string; name: string; roomTitle: string }) => {
    const response = await axios({
      method: "POST",
      url: `http://localhost:500/addMsg`,
      data: {
        text: values.text,
        name: values.name,
        roomTitle: values.roomTitle,
      },
    });
    console.log("addMessage thunk", response.data);
    return response.data;
  }
);

export const selectRoomThunk = createAsyncThunk(
  "rooms/selectRoom",
  async (values: { title: string; name: string}) => {
    const response = await axios({
      method: "GET",
      url: `http://localhost:500/selectRoom`,
      data: {
        title: values.title,
        name: values.name
      }
    });
    console.log("selectRoomThunk")
    return response.data;
  }
)

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
        console.log("action.payload", action.payload);
        return [...state, action.payload];
      })
      .addCase(createRoomThunk.fulfilled, (state, action) => {
        return [...state, action.payload];
      })
      .addCase(addMessageThunk.fulfilled, (state, action) => {
        console.log("action", action.payload);
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
