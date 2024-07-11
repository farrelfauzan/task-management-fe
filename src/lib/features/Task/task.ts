import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Task } from "../../../swagger/api";
import { api } from "../../../plugins/service";

const initialState = {
  data: [] as Task[],
};

export const getTasks: any = createAsyncThunk("task/getTasks", async () => {
  try {
    const response = await api.task.taskControllerFindAll();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const taskReducer = createSlice({
  name: "task",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Task[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = taskReducer.actions;

export const taskData = (state: RootState) => state.task.data;

export default taskReducer.reducer;
