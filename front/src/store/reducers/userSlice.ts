import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { isConstructorDeclaration } from "typescript";

export interface userState {
    user: string
}
const userSlice = createSlice({
  name: "user",
  initialState: "guest",
  reducers: {
    setUser(state, action: PayloadAction<userState>) {
      console.log('state', state)
      return action.payload.user;
    },
  }
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
