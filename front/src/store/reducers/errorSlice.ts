import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface errors {
    room: string;
}

const errorsSlice = createSlice({
    name: "errors",
    initialState: "",
    reducers: {
        errorUpdate(_state, action: PayloadAction<errors>) {
            return action.payload.room;
        }
    }
})

export default errorsSlice.reducer;

export const { errorUpdate } = errorsSlice.actions;