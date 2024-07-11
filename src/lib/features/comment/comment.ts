import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api, Comment } from "../../../swagger/api";
import { api } from "../../../plugins/service";
import { RootState } from "../../store";

const initialState = {
  data: [] as Comment[],
  loading: false,
  error: null,
};

export const getComments: any = createAsyncThunk(
  "comment/getComments",
  async (
    ...args: Parameters<Api<any>["comments"]["commentsControllerFindAll"]>
  ) => {
    try {
      const response = await api.comments.commentsControllerFindAll(...args);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const createComment: any = createAsyncThunk(
  "comment/createComment",
  async (data: Comment) => {
    try {
      const response = await api.comments.commentsControllerCreate(data);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setComments } = commentSlice.actions;

export const commentsData = (state: RootState) => state.comment.data;

export default commentSlice.reducer;
