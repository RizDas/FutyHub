import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  epl: null,
  laliga: null,
  seriea: null,
  bundesliga: null,
  ligue1: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeams: (state, action) => {
      state.epl = action.payload.epl;
      state.laliga = action.payload.laliga;
      state.seriea = action.payload.seriea;
      state.bundesliga = action.payload.bundesliga;
      state.ligue1 = action.payload.ligue1;
    },
  },
});

export const { setTeams } = teamSlice.actions;
export const selectEpl = (state) => state.team.epl;
export const selectLaliga = (state) => state.team.laliga;
export const selectSeriea = (state) => state.team.seriea;
export const selectBundesliga = (state) => state.team.bundesliga;
export const selectLigue1 = (state) => state.team.ligue1;

export default teamSlice.reducer;
