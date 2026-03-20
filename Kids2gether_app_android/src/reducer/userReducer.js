import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //Add User
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setTeste: (state) => {
      state.user = {
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiMTQxMzRlN2YtNmNhOS00ZDM2LTk1MGUtYzM2MTFiNjFhYWY1IiwiaXNzIjoiaHR0cHM6XC9cL3d3dy5raWRzMmdldGhlci5jb20uYnIiLCJpYXQiOjE2ODkwOTE1NzYsIm5iZiI6MTY4OTA5MTU3NiwiZXhwIjoxNzIwNjI3NTc2LCJkYXRhIjp7InVzZXIiOnsiaWQiOiI0OTQifX19.AnFCUG8Kwe2D5-gehFF_eT8a6j_2dTMdSsLY9xAc9-w",
        user_id: "494",
        user_email: "juan.urgelles92@gmail.com",
        user_nicename: "juan",
        user_display_name: "Juan",
        membership: true,
        expires: "expiration date",
        token_expires: 1720560487,
      };
    },
    setMembership: (state, action) => {
      state.user.membership = action.payload;
    },
    //Delete the User
    delUser: (state) => {
      state.user = null;
      //Clean the "localStorage"
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, delUser, setTeste, setMembership } = userSlice.actions;

export default userSlice.reducer;
