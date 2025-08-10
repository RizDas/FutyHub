import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import teamReducer from "../features/teams/teamslice";

export default configureStore({
  reducer: {
    team: teamReducer,
  },

  middleware: getDefaultMiddleware({
    serializeableCheck: false,
  }),
});
