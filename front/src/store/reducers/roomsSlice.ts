import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "./helper";
import { io } from "socket.io-client";
const domainName = server("production");
const clientSocket = io(`${domainName}/api/`);

interface users {
  name: string;
}
interface messages {
  text: string;
  firstName: string;
}
export interface irooms {
  title: string;
  users: Array<users>;
  messages: Array<messages>;
}

export const fetchRoomsThunk = createAsyncThunk(
  "rooms/fetchRooms",
  async (userName: string) => {
    try {
      const response = await axios.get(
      `${domainName}/api/room/all?firstName=${userName}`,
      {
        headers: {
          Accept: "*/*, application/json, text/plain"
        }
      }
      );
      return response.data;
    } catch (error: any) {
      console.log("error", error.response);
      console.log("error", error.response.data.error);
    }
  }
);

export const createRoomThunk = createAsyncThunk(
  "rooms/createRoom",
  async (values: { title: string; usersList: string }, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${domainName}/api/room/create`,
        {
          title: values.title,
          usersList: values.usersList,
        },
        {
          headers: {
            Accept: "*/*, application/json, text/plain"
          }
        }
        );
      return response.data;
    } catch(error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addMessageThunk = createAsyncThunk(
  "rooms/addMessage",
  async (
    values: { text: string; firstName: string; room: any },
    { dispatch }
  ) => {
    clientSocket.emit("/room/new", values);
    clientSocket.on("/room/new", (room) => {
      console.log("addMessage", room);
      clientSocket.removeListener("/room/new");
      return dispatch({ type: "rooms/addMessagesRecevied", payload: room });
    });
  }
);

export interface roomsState {
  error: string;
  rooms: Array<irooms>;
}

export interface rooms {
  rooms: roomsState;
}

const roomsSlice = createSlice({
  name: "rooms",
  initialState: { error: "", rooms: [] } as roomsState,
  reducers: {
    roomsAdd(state, action: PayloadAction<irooms[]>) {
      return { ...state, rooms: [...action.payload] };
    },
    fetchRoomsRecevied: (state, action) => {
      if (action.payload) {
        return { error: "", rooms: [...action.payload.room] };
      }
      return { ...state };
    },
    addMessagesRecevied: (state, action) => {
      let updateState = state.rooms.map((value) => {
        if (value.title === action.payload.room.title) {
          return action.payload.room;
        }
        return value;
      });
      return { error: "", rooms: [...updateState] };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomsThunk.fulfilled, () => {})
      .addCase(createRoomThunk.fulfilled, (state, action) => {
        return { ...state, rooms: [...state.rooms, action.payload.room] };
      })
      .addCase(createRoomThunk.rejected, (state, action) => {
        return { error: `${action.payload}`, rooms: [...state.rooms] };
      })
      .addCase(addMessageThunk.fulfilled, () => {});
  },
});

export default roomsSlice.reducer;
