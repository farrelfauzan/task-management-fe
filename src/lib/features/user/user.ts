import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, User } from "../../../swagger/api";
import { api } from "../../../plugins/service";
import { RootState } from "../../store";

const initialState = {
  data: [] as User[],
  loading: false,
  errorMessage: "",
};

export const getUsers: any = createAsyncThunk(
  "user/getUsers",
  async (...args: Parameters<Api<any>["users"]["usersControllerFindAll"]>) => {
    try {
      const response = await api.users.usersControllerFindAll(...args);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.data = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.errorMessage = "";
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.data = [];
        state.errorMessage = "Failed to fetch data";
        state.loading = false;
      })
      .addCase(getUsers.pending, (state) => {
        state.data = [];
        state.errorMessage = "";
        state.loading = true;
      });
  },
});

export const { setUsers } = userReducer.actions;

export const userData = (state: RootState) => state.user.data;

export default userReducer.reducer;
