import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Api, Task } from "../../../swagger/api";
import { api } from "../../../plugins/service";
import { Columns } from "../../../types";

export type TaskManagementType = {
  backlog: {
    name: string;
    items: Task[];
  };
  pending: {
    name: string;
    items: Task[];
  };
  inProgress: {
    name: string;
    items: Task[];
  };
  todo: {
    name: string;
    items: Task[];
  };
  done: {
    name: string;
    items: Task[];
  };
};

const initialState = {
  data: {
    backlog: {
      name: "Backlog",
      items: [],
    },
    pending: {
      name: "Pending",
      items: [],
    },
    inProgress: {
      name: "In Progress",
      items: [],
    },
    todo: {
      name: "To Do",
      items: [],
    },
    done: {
      name: "Done",
      items: [],
    },
  } as Columns,
  loading: false,
  error: null,
};

export const getTasks: any = createAsyncThunk("task/getTasks", async () => {
  try {
    const response = await api.task.taskControllerFindAll();
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
});

export const createTask: any = createAsyncThunk(
  "task/createTask",
  async (...args: Parameters<Api<any>["task"]["taskControllerCreate"]>) => {
    try {
      const response = await api.task.taskControllerCreate(...args);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const taskReducer = createSlice({
  name: "task",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Columns>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        let result = {
          backlog: {
            name: "Backlog",
            items: [],
          },
          todo: {
            name: "To Do",
            items: [],
          },
          pending: {
            name: "Pending",
            items: [],
          },
          inprogress: {
            name: "In Progress",
            items: [],
          },
          done: {
            name: "Done",
            items: [],
          },
        } as Columns;

        action.payload.map((item: Task) => {
          if (item.status === "todo") {
            result.todo = {
              name: "To Do",
              items: [...(result.todo?.items || []), item],
            };
          }
          if (item.status === "inprogress") {
            result.inProgress = {
              name: "In Progress",
              items: [...(result.inProgress?.items || []), item],
            };
          }
          if (item.status === "done") {
            result.done = {
              name: "Done",
              items: [...(result.done?.items || []), item],
            };
          }
          if (item.status === "pending") {
            result.pending = {
              name: "Pending",
              items: [...(result.pending?.items || []), item],
            };
          }
          if (item.status === "backlog") {
            result.backlog = {
              name: "Backlog",
              items: [...(result.backlog?.items || []), item],
            };
          }
        });
        state.data = result;
        state.loading = false;
        state.error = null;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(getTasks.pending, (state, action) => {
        state.data = action.payload;
        state.loading = true;
      });
    builder
      .addCase(createTask.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.status === "todo") {
          state.data.todo.items.push(action.payload);
        }
        if (action.payload.status === "inprogress") {
          state.data.inprogress.items.push(action.payload);
        }
        if (action.payload.status === "done") {
          state.data.done.items.push(action.payload);
        }
        if (action.payload.status === "pending") {
          state.data.pending.items.push(action.payload);
        }
        if (action.payload.status === "backlog") {
          state.data.backlog.items.push(action.payload);
        }

        state.loading = false;
        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { setData } = taskReducer.actions;

export const taskData = (state: RootState) => state.task.data;

export default taskReducer.reducer;
