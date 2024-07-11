import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Api, User } from "../../../swagger/api";
import { api } from "../../../plugins/service";
import { RootState } from "../../store";
import { RootStateOrAny } from "react-redux";

export type LoginAuthResonseDto = {
  user: User;
  bearerToken: string;
};

const initialState = {
  data: {} as LoginAuthResonseDto,
  errorMessage: "",
  loading: false,
};

export const login: any = createAsyncThunk(
  "auth/login",
  async (...args: Parameters<Api<any>["auth"]["authControllerLogin"]>) => {
    try {
      const response: any = await api.auth.authControllerLogin(...args);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const CreateUser: any = createAsyncThunk(
  "auth/register",
  async (...args: Parameters<Api<any>["auth"]["authControllerRegister"]>) => {
    try {
      const response: any = await api.auth.authControllerRegister(...args);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const loginReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<LoginAuthResonseDto>) => {
      state.data = action.payload;
    },
    setErrorMessageAuth: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.errorMessage = "Invalid email or password";
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(CreateUser.fulfilled, (state, _action) => {
        state.loading = false;
        state.errorMessage = "";
      })
      .addCase(CreateUser.rejected, (state, action) => {
        console.log(action);
        state.errorMessage = action.error.message as string;
        state.loading = false;
      })
      .addCase(CreateUser.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { setAuthData, setErrorMessageAuth } = loginReducer.actions;

export const authData = (state: RootStateOrAny) => state.auth.data;
export const errorMessage = (state: RootStateOrAny) => state.auth.errorMessage;
export const loadingAuth = (state: RootStateOrAny) => state.auth.loading;

export default loginReducer.reducer;
