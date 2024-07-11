import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import storage from "../storage";

import taskReducer from "./features/Task/task";
import authReducer from "./features/auth/auth";
import sessionReducer from "./features/session/session";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["task", "auth"],
};

const reducer = combineReducers({
  task: taskReducer,
  auth: authReducer,
  session: sessionReducer,
});

const PersistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: PersistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
