import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Api, Task, UpdateTaskDto } from "../../../swagger/api";
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
  inprogress: {
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
    inprogress: {
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
  task: {} as Task,
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

export const updateTask: any = createAsyncThunk(
  "task/updateTask",
  async ({ id, data }: { id: string; data: UpdateTaskDto }) => {
    try {
      const response = await api.task.taskControllerUpdate(id, data);
      return response.data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  }
);

export const deleteTask: any = createAsyncThunk(
  "task/deleteTask",
  async (...args: Parameters<Api<any>["task"]["taskControllerRemove"]>) => {
    try {
      const response = await api.task.taskControllerRemove(...args);
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
    setTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
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
            result.inprogress = {
              name: "In Progress",
              items: [...(result.inprogress?.items || []), item],
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
    builder
      .addCase(updateTask.fulfilled, (state, action) => {
        if (action.payload.status === "todo") {
          state.data.todo.items = state.data.todo.items.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
        }
        if (action.payload.status === "inprogress") {
          state.data.inprogress.items = state.data.inprogress.items.map(
            (item) => (item.id === action.payload.id ? action.payload : item)
          );
        }
        if (action.payload.status === "done") {
          state.data.done.items = state.data.done.items.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
        }
        if (action.payload.status === "pending") {
          state.data.pending.items = state.data.pending.items.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
        }
        if (action.payload.status === "backlog") {
          state.data.backlog.items = state.data.backlog.items.map((item) =>
            item.id === action.payload.id ? action.payload : item
          );
        }

        state.loading = false;
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(deleteTask.fulfilled, (state, action) => {
        if (action.payload.status === "todo") {
          // remove item
          const result = state.data.todo.items.filter(
            (item) => item.title !== action.payload.title
          );
          state.data.todo.items = result;
        }
        if (action.payload.status === "inprogress") {
          state.data.inprogress.items = state.data.inprogress.items.filter(
            (item) => item.title !== action.payload.ititled
          );
        }
        if (action.payload.status === "done") {
          state.data.done.items = state.data.done.items.filter(
            (item) => item.title !== action.payload.title
          );
        }
        if (action.payload.status === "pending") {
          state.data.pending.items = state.data.pending.items.filter(
            (item) => item.title !== action.payload.title
          );
        }
        if (action.payload.status === "backlog") {
          state.data.backlog.items = state.data.backlog.items.filter(
            (item) => item.title !== action.payload.title
          );
        }

        state.loading = false;
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error;
        state.loading = false;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { setData, setTask } = taskReducer.actions;

export const taskData = (state: RootState) => state.task.data;
export const loadingTask = (state: RootState) => state.task.loading;
export const taskError = (state: RootState) => state.task.error;
export const taskDetail = (state: RootState) => state.task.task;

export default taskReducer.reducer;
