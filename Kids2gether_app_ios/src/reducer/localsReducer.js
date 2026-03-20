import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locals: [],
};

export const localsSlice = createSlice({
  name: "locals",
  initialState,
  reducers: {
    //Adding the locals
    setLocals: (state, action) => {
      state.locals = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocals } = localsSlice.actions;

export default localsSlice.reducer;
