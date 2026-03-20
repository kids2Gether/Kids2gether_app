import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    //Adding the news
    setNews: (state, action) => {
      state.news = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNews } = newsSlice.actions;

export default newsSlice.reducer;
