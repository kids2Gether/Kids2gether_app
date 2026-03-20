import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loaded: false,
};

export const ecoturismoSlice = createSlice({
  name: "ecoturismo",
  initialState,
  reducers: {
    setEcoTurismo: (state, action) => {
      state.data = action.payload;
      state.loaded = true;
    },
    clearEcoTurismo: (state) => {
      state.data = null;
      state.loaded = false;
    },
  },
});

export const { setEcoTurismo, clearEcoTurismo } = ecoturismoSlice.actions;

export default ecoturismoSlice.reducer;

