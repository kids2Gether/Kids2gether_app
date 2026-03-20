import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contentMarkers: [],
    userMarkers: null
};

export const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        //app markers actions
        setContentMarkers: (state, action) => {
            state.contentMarkers = action.payload;
        },
        //user markers actions
        setUserMarkers: (state, action) => {
            state.userMarkers = action.payload;
        },
        createdUserMarkers: (state, action) => {
          state.userMarkers = [... state.userMarkers, action.payload]
        },
        updateUserMarkers: (state, action) => {
            state.userMarkers = state.userMarkers.map((item) => item.id === action.payload.id? action.payload : item);
        },
        delUserMarkers: (state, action) => {
            state.userMarkers = state.userMarkers.filter((item) => item.id !== action.payload);
        },
        clearUserMarkers: (state) => {
            state.userMarkers = null;
        },
    },
});

export const { setContentMarkers, setUserMarkers, clearUserMarkers, updateUserMarkers, createdUserMarkers, delUserMarkers } = mapSlice.actions;

export default mapSlice.reducer;
