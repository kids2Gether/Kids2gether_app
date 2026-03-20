import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tips: [],
};

export const tipsSlice = createSlice({
  name: "tips",
  initialState,
  reducers: {
    //Adding the tips
    setTips: (state, action) => {
      state.tips = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTips } = tipsSlice.actions;

export default tipsSlice.reducer;
