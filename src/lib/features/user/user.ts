import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, CreateUserDto, UpdateUserDto, User } from "../../../swagger/api";
import { api } from "../../../plugins/service";
import { RootState } from "../../store";
import { CreateUser } from "../auth/auth";

const initialState = {
  data: [] as User[],
  loading: false,
  errorMessage: "",
  form: {} as CreateUserDto,
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

export const updateUser: any = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }: { id: string; data: UpdateUserDto }) => {
    try {
      const response = await api.users.usersControllerUpdate(id, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const deleteUser: any = createAsyncThunk(
  "user/deleteUser",
  async (...args: Parameters<Api<any>["users"]["usersControllerRemove"]>) => {
    try {
      const response = await api.users.usersControllerRemove(...args);
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
    setFormUser: (state, action) => {
      state.form = action.payload;
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
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = state.data.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
        state.errorMessage = "";
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.errorMessage = "Failed to update user";
        state.loading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.errorMessage = "";
        state.loading = true;
      });
    builder
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (user) => user.username !== action.payload.username
        );
        state.errorMessage = "";
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.errorMessage = "Failed to delete user";
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.errorMessage = "";
        state.loading = true;
      });
    builder
      .addCase(CreateUser.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.loading = false;
        state.errorMessage = "";
      })
      .addCase(CreateUser.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.loading = false;
      })
      .addCase(CreateUser.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { setUsers, setFormUser } = userReducer.actions;

export const userData = (state: RootState) => state.user.data;
export const userForm = (state: RootState) => state.user.form;

export default userReducer.reducer;
