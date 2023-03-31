import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/persons/auth";
import users from "./slices/persons/users";
import attendances from "./slices/persons/attendances";
import rubrics from "./slices/persons/rubrics";
import tasks from "./slices/tasks";

export const store = configureStore({
  reducer: {
    auth,
    users,
    attendances,
    rubrics,
    tasks,
  },
});
