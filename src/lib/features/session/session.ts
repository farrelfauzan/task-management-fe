import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../swagger/api";
import { RootState } from "../../store";

enum Role {
  Admin = "admin",
  User = "user",
}

export type Session = {
  user: User | null;
  role: Role | null;
  isLoggedIn: boolean;
};

const initialState = {
  data: {} as Session,
};

export const sessionReducer = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session>) => {
      state.data = action.payload;
    },
  },
});

export const { setSession } = sessionReducer.actions;

export const sessionData = (state: RootState) => state.session.data;

export default sessionReducer.reducer;
